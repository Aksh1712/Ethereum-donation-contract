const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DonationContract", function () {
  let donationContract;
  let owner;
  let donor1;
  let donor2;
  let donor3;
  let donor4;
  
  beforeEach(async function () {
    [owner, donor1, donor2, donor3, donor4] = await ethers.getSigners();
    
    const DonationContract = await ethers.getContractFactory("DonationContract");
    donationContract = await DonationContract.deploy();
    await donationContract.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await donationContract.owner()).to.equal(owner.address);
    });

    it("Should initialize with zero values", async function () {
      expect(await donationContract.totalDonations()).to.equal(0);
      expect(await donationContract.totalDonors()).to.equal(0);
      expect(await donationContract.getContractBalance()).to.equal(0);
    });
  });

  describe("Donations", function () {
    it("Should accept donations and update state", async function () {
      const donationAmount = ethers.parseEther("1");
      const donorName = "Alice";
      
      await expect(donationContract.connect(donor1).donate(donorName, { value: donationAmount }))
        .to.emit(donationContract, "DonationReceived")
        .withArgs(donor1.address, donationAmount, donorName);
      
      expect(await donationContract.totalDonations()).to.equal(donationAmount);
      expect(await donationContract.totalDonors()).to.equal(1);
      expect(await donationContract.donorContributions(donor1.address)).to.equal(donationAmount);
      expect(await donationContract.donorNames(donor1.address)).to.equal(donorName);
    });

    it("Should reject donations with empty name", async function () {
      const donationAmount = ethers.parseEther("1");
      
      await expect(
        donationContract.connect(donor1).donate("", { value: donationAmount })
      ).to.be.revertedWith("Name cannot be empty");
    });

    it("Should reject donations with zero value", async function () {
      await expect(
        donationContract.connect(donor1).donate("Alice", { value: 0 })
      ).to.be.revertedWith("Donation amount must be greater than 0");
    });

    it("Should handle multiple donations from same donor", async function () {
      const firstDonation = ethers.parseEther("1");
      const secondDonation = ethers.parseEther("2");
      const donorName = "Alice";
      
      await donationContract.connect(donor1).donate(donorName, { value: firstDonation });
      await donationContract.connect(donor1).donate(donorName, { value: secondDonation });
      
      expect(await donationContract.totalDonors()).to.equal(1); // Still only 1 unique donor
      expect(await donationContract.donorContributions(donor1.address)).to.equal(
        firstDonation + secondDonation
      );
      expect(await donationContract.totalDonations()).to.equal(
        firstDonation + secondDonation
      );
    });
  });

  describe("Top Donors Tracking", function () {
    it("Should track top 3 donors correctly", async function () {
      // Make donations with different amounts
      await donationContract.connect(donor1).donate("Alice", { value: ethers.parseEther("3") });
      await donationContract.connect(donor2).donate("Bob", { value: ethers.parseEther("5") });
      await donationContract.connect(donor3).donate("Charlie", { value: ethers.parseEther("1") });
      await donationContract.connect(donor4).donate("David", { value: ethers.parseEther("4") });
      
      const topDonors = await donationContract.getTopDonors();
      
      // Should be sorted: Bob(5), David(4), Alice(3)
      expect(topDonors[0].donorAddress).to.equal(donor2.address);
      expect(topDonors[0].totalDonated).to.equal(ethers.parseEther("5"));
      expect(topDonors[0].name).to.equal("Bob");
      
      expect(topDonors[1].donorAddress).to.equal(donor4.address);
      expect(topDonors[1].totalDonated).to.equal(ethers.parseEther("4"));
      expect(topDonors[1].name).to.equal("David");
      
      expect(topDonors[2].donorAddress).to.equal(donor1.address);
      expect(topDonors[2].totalDonated).to.equal(ethers.parseEther("3"));
      expect(topDonors[2].name).to.equal("Alice");
    });

    it("Should update top donors when existing donor donates more", async function () {
      // Initial donations
      await donationContract.connect(donor1).donate("Alice", { value: ethers.parseEther("1") });
      await donationContract.connect(donor2).donate("Bob", { value: ethers.parseEther("2") });
      await donationContract.connect(donor3).donate("Charlie", { value: ethers.parseEther("3") });
      
      // Alice donates more to become top donor
      await donationContract.connect(donor1).donate("Alice", { value: ethers.parseEther("5") });
      
      const topDonors = await donationContract.getTopDonors();
      
      // Alice should now be #1 with 6 ETH total
      expect(topDonors[0].donorAddress).to.equal(donor1.address);
      expect(topDonors[0].totalDonated).to.equal(ethers.parseEther("6"));
      expect(topDonors[0].name).to.equal("Alice");
    });

    it("Should emit TopDonorsUpdated event", async function () {
      const donationAmount = ethers.parseEther("1");
      
      await expect(donationContract.connect(donor1).donate("Alice", { value: donationAmount }))
        .to.emit(donationContract, "TopDonorsUpdated")
        .withArgs(donor1.address, donationAmount);
    });
  });

  describe("Withdrawals", function () {
    beforeEach(async function () {
      // Add some donations first
      await donationContract.connect(donor1).donate("Alice", { value: ethers.parseEther("2") });
      await donationContract.connect(donor2).donate("Bob", { value: ethers.parseEther("3") });
    });

    it("Should allow owner to withdraw all funds", async function () {
      const initialBalance = await ethers.provider.getBalance(owner.address);
      const contractBalance = await donationContract.getContractBalance();
      
      const tx = await donationContract.connect(owner).withdraw();
      const receipt = await tx.wait();
      const gasUsed = receipt.gasUsed * receipt.gasPrice;
      
      const finalBalance = await ethers.provider.getBalance(owner.address);
      
      expect(finalBalance).to.be.closeTo(
        initialBalance + contractBalance - gasUsed,
        ethers.parseEther("0.01") // Small tolerance for gas estimation
      );
      
      expect(await donationContract.getContractBalance()).to.equal(0);
    });

    it("Should allow owner to withdraw partial funds", async function () {
      const withdrawAmount = ethers.parseEther("2");
      const initialContractBalance = await donationContract.getContractBalance();
      
      await expect(donationContract.connect(owner).withdrawPartial(withdrawAmount))
        .to.emit(donationContract, "Withdrawal")
        .withArgs(owner.address, withdrawAmount);
      
      expect(await donationContract.getContractBalance()).to.equal(
        initialContractBalance - withdrawAmount
      );
    });

    it("Should reject withdrawal from non-owner", async function () {
      await expect(
        donationContract.connect(donor1).withdraw()
      ).to.be.revertedWith("Only owner can call this function");
    });

    it("Should reject partial withdrawal of more than balance", async function () {
      const contractBalance = await donationContract.getContractBalance();
      const excessiveAmount = contractBalance + ethers.parseEther("1");
      
      await expect(
        donationContract.connect(owner).withdrawPartial(excessiveAmount)
      ).to.be.revertedWith("Insufficient contract balance");
    });
  });

  describe("Donation Pausing", function () {
    it("Should allow owner to pause and unpause donations", async function () {
      await donationContract.connect(owner).pauseDonations();
      expect(await donationContract.donationsPaused()).to.be.true;
      
      await donationContract.connect(owner).unpauseDonations();
      expect(await donationContract.donationsPaused()).to.be.false;
    });

    it("Should reject donations when paused", async function () {
      await donationContract.connect(owner).pauseDonations();
      
      await expect(
        donationContract.connect(donor1).donate("Alice", { value: ethers.parseEther("1") })
      ).to.be.revertedWith("Donations are currently paused");
    });

    it("Should reject direct Ether transfers when paused", async function () {
      await donationContract.connect(owner).pauseDonations();
      
      await expect(
        donor1.sendTransaction({
          to: await donationContract.getAddress(),
          value: ethers.parseEther("1")
        })
      ).to.be.revertedWith("Donations are currently paused");
    });
  });

  describe("Ownership Transfer", function () {
    it("Should allow owner to transfer ownership", async function () {
      await donationContract.connect(owner).transferOwnership(donor1.address);
      expect(await donationContract.owner()).to.equal(donor1.address);
    });

    it("Should reject ownership transfer from non-owner", async function () {
      await expect(
        donationContract.connect(donor1).transferOwnership(donor2.address)
      ).to.be.revertedWith("Only owner can call this function");
    });

    it("Should reject transfer to zero address", async function () {
      await expect(
        donationContract.connect(owner).transferOwnership(ethers.ZeroAddress)
      ).to.be.revertedWith("New owner cannot be zero address");
    });
  });

  describe("Direct Ether Transfers", function () {
    it("Should accept direct Ether transfers via receive function", async function () {
      const transferAmount = ethers.parseEther("1");
      
      await expect(
        donor1.sendTransaction({
          to: await donationContract.getAddress(),
          value: transferAmount
        })
      ).to.emit(donationContract, "DonationReceived")
      .withArgs(donor1.address, transferAmount, "Anonymous");
      
      expect(await donationContract.totalDonations()).to.equal(transferAmount);
    });
  });

  describe("View Functions", function () {
    it("Should return correct donor information", async function () {
      const donationAmount = ethers.parseEther("2");
      const donorName = "Alice";
      
      await donationContract.connect(donor1).donate(donorName, { value: donationAmount });
      
      const [contribution, name] = await donationContract.getDonorInfo(donor1.address);
      expect(contribution).to.equal(donationAmount);
      expect(name).to.equal(donorName);
    });

    it("Should return correct contract balance", async function () {
      const donation1 = ethers.parseEther("2");
      const donation2 = ethers.parseEther("3");
      
      await donationContract.connect(donor1).donate("Alice", { value: donation1 });
      await donationContract.connect(donor2).donate("Bob", { value: donation2 });
      
      expect(await donationContract.getContractBalance()).to.equal(donation1 + donation2);
    });
  });
});