const NTT = artifacts.require("NTT");
const UseNTT = artifacts.require("UseNTT");

module.exports = async function (deployer, network, accounts) {
  const name = "Non-Transferrable Token";
  const symbol = "NTT";
  const isLocked = true;

  await deployer.deploy(NTT, name, symbol, isLocked);
  const nttInstance = await NTT.deployed();

  await deployer.deploy(UseNTT, nttInstance.address);
  const useNttInstance = await UseNTT.deployed();

  console.log("UseNTT deployed at:", useNttInstance.address);
};
