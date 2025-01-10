// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.13;

import "./NTT.sol";

contract UseNTT {

    address public owner;
    NTT public ntt;
    constructor(address _NTTAddress) {
        owner = msg.sender;
        ntt = NTT(_NTTAddress); 
    }

    function useNTT(address receiver) public {
        address minter = address(this);
        uint256 tokenId = 0;
        ntt.safeMint(minter, tokenId);
        ntt.transferFrom(minter, receiver, tokenId);
    }
}
