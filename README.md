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

* ENSRegistry:

The ENSRegistry contract is the core contract managing the ENS system.
It maintains a mapping between domain names (represented as Ethereum hashes) and their corresponding owners.
It also handles the assignment of subdomains to different owners.

* Resolver:

The Resolver contract is associated with each domain registered in the ENS system.
It contains information about the domain, such as the address associated with the domain (e.g., an Ethereum address).
Users can interact with the Resolver to update or retrieve information linked to a specific domain.

* Registrar:

The Registrar contract manages the registration of new domains within the ENS system.
It ensures that users can claim ownership of a domain name by following a specific registration process.
The Registrar contract may have additional features like handling the release of expired domains or managing the auction process for premium names.

* PublicSuffixList:

The PublicSuffixList is often an external contract or library used to validate domain names and ensure they conform to public suffix rules.
It helps prevent certain types of attacks and ensures that users cannot claim certain reserved or high-level domains.

* DNSSEC (Domain Name System Security Extensions):

DNSSEC is a set of extensions to DNS that adds an additional layer of security to the domain name system.
In the context of ENS, a DNSSEC oracle contract may be used to verify DNSSEC proofs provided during the domain claiming process.
DNSSEC ensures the integrity and authenticity of DNS data associated with a domain.

## claiming process 

* Running the deploy.js in scripts folder  in hardhat will deploy necessory contracts
- claiming onchain :

  the DNSRegistrar contract can help with claiming of DNS domain in ENS
  Since 2021, it has been possible to import a DNS name and use that as an ENS name. This process involves enabling DNSSEC, setting a specific TXT record, and submitting a proof to the DNSRegistrar smart contract.

Expect your TXT record to look something like this:

~~~
TXT @ _ens a=<eth-address>
~~~

There is no ENS protocol fee to import a DNS name, but it requires a large amount of gas (up to a few million !!!) to submit the proof onchain. Continue reading to learn how this has been mitigated.
  
- Claiming off chain :
  
  EP5.1 introduced a new DNSSECOracle and DNSRegistrar which makes it possible to perform DNSSEC verification at query time, enabling truly free usage of DNS names in ENS. We call this "gasless DNSSEC".

It works by enabling wildcard resolution at the DNS TLD level. During the name resolution process, if a name doesn't already exist onchain but has been configured for usage in ENS, the DNSSEC proof will be fetched offchain via CCIP Read and then verified onchain with the same DNSSECOracle mentioned above.

To configure a DNS name for usage in ENS, simply add a TXT record with the following format:

~~~
TXT @ ENS1 <resolver-address>
~~~

## Read more
- https://makoto-inoue.medium.com/step-by-step-guide-of-how-to-claim-your-dns-domain-on-ens-60a2d2dcbe6e
- https://discuss.ens.domains/t/gasless-offchain-for-dns-and-ens-via-theoffchainresolver/18783
- https://docs.ens.domains/registry/dns
