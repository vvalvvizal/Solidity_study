const MyNFTs = artifacts.require("MyNFTs");

module.exports = async function (deployer) {
  await deployer.deploy(MyNFTs);
  const myNFTs = await MyNFTs.deployed();
};
