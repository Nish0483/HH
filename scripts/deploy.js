// This is a script for deploying  contracts.

const { ethers } = require("hardhat");

async function main() {

  
  if (network.name === "hardhat") {
    console.warn(
      "You are deploying to temporary hardahat network.\n"
    );
  }

  const [deployer] = await ethers.getSigners();
  console.log("Deploying the contracts from  account:", await deployer.getAddress(),"\n"); //display user wallet and bal

  console.log("Account balance:", (await deployer.getBalance()/10**18).toString()," ETH");
  // console.log("network name:", network.name);  // shows current network

  const test = await ethers.getContractFactory("test");
  const Test = await test.deploy();
  console.log("Test contract address:", Test.address);

  ///verification 
  
  await hre.run("verify:verify", {
    address: Test.address,
    constructorArguments: [],
  });

  console.log("Contract verified!");


  }

  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
