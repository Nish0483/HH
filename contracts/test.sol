// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;
contract test{

 uint public loginTime;
 address public owner;

 struct employee{
    string name;
    uint id;
    address wallet;  
 }
event employeeLogedIn (employee empl,uint loginTime);
event employeeLogedOut (employee empl,uint loginTime);

 constructor(){
    owner=msg.sender;
 }

modifier onlyOwner() {
    require(msg.sender==owner,"not owner!!");
    _;
}

mapping (address => bool) public aprovedWallets;

mapping  (uint256 =>employee) public EMPLOYEE;

 function logIn() public view{
 //login
 require(isMorningLogin(),"login time over or too early!");//fetch current real time using block time
 checkWallet(msg.sender);
 }

function checkWallet(address user)public view {
    require(aprovedWallets[user],"un authorized");
 }

function addEmployee(uint _id,string memory _name,address _wallet)public onlyOwner  {
    require(msg.sender==owner,"only admin can add/delete");
    employee memory newEmployee= employee(
        {name:_name,
        id:_id,
        wallet:_wallet
        }
    );
    EMPLOYEE[_id]=newEmployee;
    aprovedWallets[_wallet]=true;


 }
function isMorningLogin() public view returns (bool) {
        
        uint nineAMTimestamp = getTodayTimestamp(9, 0);
        uint currentTimestamp = block.timestamp;
        uint tolerance = 10 * 60; // 10 minutes in seconds
        return currentTimestamp >= nineAMTimestamp - 3600 && currentTimestamp <= nineAMTimestamp + tolerance;
    }

    // Function to calculate the timestamp for a specific time (hour, minute) on the current day
    function getTodayTimestamp(uint hour, uint minute) internal view returns (uint) {
        uint currentTimestamp = block.timestamp;

        // Get the current day's midnight timestamp (i.e., start of the day)
        uint startOfDayTimestamp = currentTimestamp - (currentTimestamp % (24 hours));

        // Calculate the timestamp for the given time on the current day
        uint specificTimeTimestamp = startOfDayTimestamp + (hour * 3600) + (minute * 60);
        return specificTimeTimestamp;
    }





}  