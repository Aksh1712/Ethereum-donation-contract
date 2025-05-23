const hre = require("hardhat");

async function main() {
  console.log("Deploying DonationContract...");

  // Get the ContractFactory
  const DonationContract = await hre.ethers.getContractFactory("DonationContract");

  // Deploy the contract
  const donationContract = await DonationContract.deploy();

  // Wait for deployment to finish
  await donationContract.waitForDeployment();

  const contractAddress = await donationContract.getAddress();
  
  console.log("DonationContract deployed to:", contractAddress);
  console.log("Contract owner:", await donationContract.owner());
  
  // Verify contract on Etherscan (if not on localhost)
  if (hre.network.name !== "hardhat" && hre.network.name !== "localhost") {
    console.log("Waiting for block confirmations...");
    await donationContract.deploymentTransaction().wait(6);
    
    console.log("Verifying contract on Etherscan...");
    try {
      await hre.run("verify:verify", {
        address: contractAddress,
        constructorArguments: [],
      });
      console.log("Contract verified successfully!");
    } catch (error) {
      console.log("Error verifying contract:", error.message);
    }
  }

  // Save deployment info
  const fs = require("fs");
  const deploymentInfo = {
    contractAddress: contractAddress,
    network: hre.network.name,
    blockNumber: await hre.ethers.provider.getBlockNumber(),
    timestamp: new Date().toISOString()
  };

  fs.writeFileSync(
    "./frontend/contract-address.json",
    JSON.stringify(deploymentInfo, null, 2)
  );
  
  console.log("Deployment info saved to frontend/contract-address.json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });