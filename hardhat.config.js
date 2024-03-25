require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("@nomiclabs/hardhat-ethers");

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const API_KEY = process.env.API_KEY;


/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.20",
        settings: {
          optimizer: { enabled: true, runs: 100_000 },
          evmVersion: "berlin",
        },
      },
      {
        version: "0.8.0",
        settings: {
          optimizer: { enabled: true, runs: 100_000 },
        },
      },
      {
        version: "0.8.4",
        settings: {
          optimizer: { enabled: true, runs: 100_000 },
        },
      },
      {
        version: "0.4.11",
        settings: {
          optimizer: { enabled: true, runs: 100_000 },
        },
      },
      {
        version: "0.7.0",
        settings: {
          optimizer: { enabled: true, runs: 100_000 },
        },
      },
      {
        version: "0.8.17",
        settings: {
          optimizer: { enabled: true, runs: 100_000 },
        },
      },
    ],
  },

  networks:{

    
   hardhat:{},
   mumbai:{
    url:API_KEY,
    accounts:[PRIVATE_KEY]
   },

   

  },


  etherscan: {
    url: "https://api-goerli.etherscan.io/api",
    apiKey: {
      goerli: "UNSPPQV7EXNJE8MK4RE4JJ7JQ3HIVWWCXC",
      mumbai: "UNSPPQV7EXNJE8MK4RE4JJ7JQ3HIVWWCXC"
    }
   },

  paths: {
    artifacts: "./artifacts",
    cache: "./cache",
    
    tests: "./test",
    // Exclude the node_modules directory explicitly
    nodeModules: "./node_modules",
  },
};
