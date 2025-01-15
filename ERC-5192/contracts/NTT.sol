// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.13;

import "erc5192/src/ERC5192.sol";


contract NTT is ERC5192 {
  bool private isLocked;
  constructor(string memory _name, string memory _symbol, bool _isLocked)
    ERC5192(_name, _symbol, _isLocked)
  {
    isLocked = _isLocked;
  }
  function Mint(address to, uint256 tokenId) external {
    _mint(to, tokenId);
    if (isLocked) emit Locked(tokenId);
  }

  function safeTransfer(address from, address to, uint256 tokenId) external {
    require(!isLocked, "NTT: Token is locked and cannot be transferred.");
    transferFrom(from, to, tokenId); // Calls ERC721's transferFrom
}
}