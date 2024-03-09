// This is a script for deploying  contracts.

const { ethers } = require("hardhat");

async function main() {

  
  if (network.name === "hardhat") {
    console.warn(
      "You are deploying to temporary hardahat network.\n"
    );
  }

  const [deployer] = await ethers.getSigners();
  console.log("Deploying the contracts from  account:", await deployer.getAddress(),"\n");

  console.log("Account balance:", (await deployer.getBalance()/10**18).toString()," ETH");
  console.log("network name:", network.name);

  const _ensRegistry = await ethers.getContractFactory("ENSRegistry");
  const ensRegistry = await _ensRegistry.deploy();
  console.log("\n deploying ens registry...");
  await ensRegistry.deployed();

  console.log("registry deployed to address:", ensRegistry.address);
  

  const owner= deployer.address;
   const node= ethers.utils.namehash("sample.nish");
   console.log("\nowner:", owner);
   console.log("node:", node,"\n");
  

  const customResolver = await ethers.getContractFactory("CustomResolver");
  const resolver = await customResolver.deploy(ensRegistry.address);
  console.log("\n deploying custom resolver ...");
  await resolver.deployed()
  console.log("resolver deployed to address:", resolver.address);

  console.log("\n setting user address and node in resolver...");
  await resolver.setAddress(node,owner);
  
  console.log("address added in resolver");

  console.log("\n setting ens registry record with owner ,custom resolver ,TTL ...");
  await ensRegistry.setRecord(node,owner,resolver.address, 86400);
   
  console.log("record set");


console.log("\n deploying TLDPublicSuffixList...");

const _tldPublicSuffixList = await ethers.getContractFactory("TLDPublicSuffixList");
const tldPublicSuffixList = await _tldPublicSuffixList.deploy();
console.log("tldPublicSuffixList deployed to address:", tldPublicSuffixList.address);


const publicKeyString = "0Lwhn8umSXHQdzgLk38VecwzHEFGpGvUKGBB+69EvBiIIUu1V+q1W+tkkiPOrBf3FI0pNKHrvVgHSmyvprSApA=="; // from deSec platform

const anchors = new TextEncoder().encode(publicKeyString); // Convert public key string to bytes

console.log("\n deploying DNSSEC ...");
const _dnssec = await ethers.getContractFactory("DNSSECImpl");

const dnssec = await _dnssec.deploy(anchors);
console.log("dnssec deployed to address:", dnssec.address);


console.log("\n deploying dns registar ...");

  const _dnsRegistrar = await ethers.getContractFactory("DNSRegistrar");
  const dnsRegistrar = await _dnsRegistrar.deploy('0x0000000000000000000000000000000000000000'/*previous registrar zero address */,resolver.address,dnssec.address,tldPublicSuffixList.address,ensRegistry.address);
  console.log("dns registrar deployed to address:", dnsRegistrar.address);

  
  if (network.name === "goerli") {
    try{
    await run("verify:verify", {
      address: ensRegistry.address,
      // constructorArguments: [], // Pass your constructor arguments if any
    });}catch(err){
      console.log(err);
    }
  }

  
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
