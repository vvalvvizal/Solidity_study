pragma solidity ^0.5.7;

contract Will{
    address owner;
    uint fortune;
    bool deceased;


    constructor () payable public{
        owner = msg.sender;
        fortune = msg.value;
        deceased = false;
    }
    modifier onlyOwner public{
        require(msg.sender==owner)
        _;
    }
    modifier mustBeDeceased public{
    require(deceased==owner)
    _;
    }


    address payable[] familyWallets
    
    mapping(address => uint) inheritance

    function setInheritance(address payable wallet, uint amount) public{
        familyWallets.push(wallet);
        inheritance[wallet] = amount;
    }
}