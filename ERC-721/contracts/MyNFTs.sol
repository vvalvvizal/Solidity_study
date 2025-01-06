pragma solidity ^0.8.7;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MyNFTs is ERC721URIStorage, Ownable{

	uint256 private _tokenIds;
	
  constructor() ERC721("MyNFT","NFT") Ownable() {}

	function mintNFT(string memory tokenURI) public onlyOwner returns (uint256){
		_tokenIds += 1;
		
		uint256 newItemId = _tokenIds;
		_mint(msg.sender, newItemId);
		_setTokenURI(newItemId, tokenURI);
		
		return newItemId; 
	}
}