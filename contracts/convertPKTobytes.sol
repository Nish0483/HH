/*this contract will convert public key string of DSKEY of doamin to bytes */

//SPDX-Lisence-Identifier: MIT
pragma solidity 0.8.0;
contract converter {
// Example public key  "jN3Z3MVTvuShiM3Xhq/Th1aiXr3ev9u60jKAsMS2Ch3gUEnNixfIS0ng8YQkR5hbs3jpw1HRXLNcZwvt+k9w6w==";

function getkeyinbytes(string memory publicKeyString)public view returns(bytes memory){
bytes memory publicKeyBytes = abi.encodePacked(bytes(publicKeyString));
return publicKeyBytes;
}
// Convert public key string to bytes


}