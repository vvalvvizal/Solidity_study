// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract Coin{
    address public minter;
    mapping(address=>uint) public balances;

    event Sent(address from, address to, uint amount);

    constructor(){
        minter = msg.sender;
    }

    function mint(address receiver, uint amount) public{
        require(msg.sender==minter);
        balances[receiver] += amount;
    }


    error insufficientBalance(uint requested, uint available);

    function send(address receiver, uint amount) public{
        if(amount>balances[msg.sender])
        revert insufficientBalance({
	        requested: amount,
	        available: balances[msg.sender]
        });
        balances[msg.sender]-=amount;
        balances[receiver]+=amount;
        emit Sent(msg.sender, receiver,amount);
    }
 
}