# Custom Top-Level-Domain (TLD) in ENS

This project is for creating a custom TLD like "example.nish" in using Ethereum Name Service ENS . Creating a custom domain rather than "example.eth" involves usage of DNS domains in accordance with ENS contracts

## Getting Started

Follow these steps to get your custom ENS TLD 

### Prerequisites

- [Node.js](https://nodejs.org/) installed
- Ethereum wallet with sufficient funds for transactions (goerli used here)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/custom-ens-tld.git

2. Navigate to the project directory:
 
   ```bash
   cd custom-ens-tld

   
3. install dependencies

   ```bash
   npm install

4. Create a .env file in root folder with

    ```bash
   PRIVATE_KEY=<your wallet pvt key>
   API_KEY=https://goerli.infura.io/v3/<ur infura api key>

6. compile contracts
   
   ```bash
    npx hardhat compile


6. Deploy
   
   ```bash
   npm hardhat deploy --network goerli

## contracts
* ENSRegistery : 

