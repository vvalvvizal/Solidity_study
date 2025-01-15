// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.13;

import "./NTT.sol";

contract UseNTT {
    NTT public ntt;

    constructor(address _nttAddress) {
        ntt = NTT(_nttAddress);
    }

    function useNTT(address receiver) public {
        uint256 tokenId = 0; // Define token ID
        address minter = address(this);
        ntt.Mint(minter, tokenId);

        ntt.safeTransfer(minter, receiver, tokenId);
    }
}
