// scripts/interact.js
const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
  const contractAddress = process.env.CONTRACT_ADDRESS; // Set this in .env
  const [deployer] = await ethers.getSigners();

  console.log("Interacting as:", deployer.address);

  const DonationContract = await ethers.getContractFactory("DonationContract");
  const contract = DonationContract.attach(contractAddress);

  // Example interaction: send donation
  const tx = await contract.connect(deployer).donate({
    value: ethers.utils.parseEther("0.01"), // donating 0.01 ETH
  });

  console.log("Donation sent! Tx Hash:", tx.hash);

  // Example read: total donations
  const total = await contract.getTotalDonations();
  console.log("Total donations received:", ethers.utils.formatEther(total), "ETH");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
