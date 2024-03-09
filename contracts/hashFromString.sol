//helper contract to byte32 node namehash format from string 

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract NamehashExample {

    /**
     * @dev Calculate the namehash of a domain.
     * @param name The domain name.
     * @return bytes32 The namehash of the domain.
     */
   function namehash(string memory name) external pure returns (bytes32) {
        bytes32 node = 0x0000000000000000000000000000000000000000000000000000000000000000;
        
        bytes memory nameBytes = bytes(name);
        for (uint i = 0; i < nameBytes.length; i++) {
            node = keccak256(abi.encodePacked(node, uint8(nameBytes[i])));
        }
        
        return node;
    }

    function convertToByte32(string memory label) public view returns (bytes32){
     return keccak256(bytes(label));
    }
}
