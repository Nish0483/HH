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
  console.log("network name:", network.name);  // shows current network

  const _ensRegistry = await ethers.getContractFactory("ENSRegistry"); //deployment of ens registry
  const ensRegistry = await _ensRegistry.deploy();
  console.log("\ndeploying ens registry...");
  await ensRegistry.deployed();
  console.log("registry deployed to address:", ensRegistry.address);
  
  const owner= deployer.address;
  const node= ethers.utils.namehash("sample.nish");  //we calculate the byte32 hash of string 'sample.nish'

  const customResolver = await ethers.getContractFactory("CustomResolver"); //deployment of custom resolver
  const resolver = await customResolver.deploy(ensRegistry.address);
  console.log("\ndeploying custom resolver ...");
  await resolver.deployed()
  console.log("resolver deployed to address:", resolver.address);

  console.log("\n setting user address and node in resolver..."); //setting owner address and node in resolver
  console.log("\nowner:", owner);
  console.log("domain name :'sample.nish':","\n");
  console.log("node:", node);
  await resolver.setAddress(node,owner);
  console.log("\naddress added in resolver");

  console.log("\nsetting ens registry record with owner,custom resolver,TTL ..."); //setting ens registry record with above data check construstor
  await ensRegistry.setRecord(node,owner,resolver.address, 86400); // TTL: time to live in seconds
  console.log("record set");


  console.log("\ndeploying SuffixList..."); //deployment of suffix list .suffix list defines set of rules for a TLD
  const _tldPublicSuffixList = await ethers.getContractFactory("TLDPublicSuffixList");
  const tldPublicSuffixList = await _tldPublicSuffixList.deploy();
  console.log("TLDPublicSuffixList deployed to address:", tldPublicSuffixList.address);


  const publicKeyString = "0Lwhn8umSXHQdzgLk38VecwzHEFGpGvUKGBB+69EvBiIIUu1V+q1W+tkkiPOrBf3FI0pNKHrvVgHSmyvprSApA=="; // obtained from deSEC platform .Its a DSKEY : public key for our custom domain
  const anchors = new TextEncoder().encode(publicKeyString); // Convert public key string to bytes

  console.log("\ndeploying DNSSEC implimentation ..."); //deployment of dnssec contract
  const _dnssec = await ethers.getContractFactory("DNSSECImpl");

  const dnssec = await _dnssec.deploy(anchors); //dnssec contract expects public key in byes called anchors
  console.log("dnssec deployed to address:", dnssec.address);


  console.log("\ndeploying DNS Registar ..."); //the contract that registers domains and claims ownership

    const _dnsRegistrar = await ethers.getContractFactory("DNSRegistrar");
    const dnsRegistrar = await _dnsRegistrar.deploy('0x0000000000000000000000000000000000000000'/*previous registrar zero address */,resolver.address,dnssec.address,tldPublicSuffixList.address,ensRegistry.address);
    console.log("DNS Registrar deployed to address:", dnsRegistrar.address);

  }

  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
