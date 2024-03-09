//a custom reslover like public resolver
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@ensdomains/ens-contracts/contracts/resolvers/ResolverBase.sol";
import "@ensdomains/ens/contracts/ENS.sol";

contract CustomResolver is ResolverBase {
    constructor(ENS _ens)  {}
    struct Record {
    address addr;
}
    event AddrChanged(bytes32 indexed node, address addr);
    mapping(bytes32 => Record) public records;
    // Function to set the address associated with the domain
    function setAddress(bytes32 node, address addr) external  {
        records[node].addr = addr;
        emit AddrChanged(node, addr);
    }

    // Function to retrieve the address associated with the domain
    function addr(bytes32 node) external view returns (address) {
        return records[node].addr;
    }

   

  function isAuthorised(bytes32 node) internal view override returns (bool) {  //a demo implimentation for resloverbase
    return true; 
}


}
