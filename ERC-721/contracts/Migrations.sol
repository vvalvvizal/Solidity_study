pragma solidity ^0.8.7;

contract Migrations{
    address public owner;
    uint public last_completed_migration;

    modifier restricted(){
        require(msg.sender == owner, "This function is restructed to the owner");
        _;
    }
    constructor(){
        owner = msg.sender;
    }

    function setCompleted(uint completed) public restricted{
        last_completed_migration = completed;
    }

}