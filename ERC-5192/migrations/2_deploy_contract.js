const NTT = artifacts.require("NTT");
const UseNTT = artifacts.require("UseNTT");

module.exports = async function (deployer) {
  const name = "MyNTTToken";
  const symbol = "MNT";
  const isLocked = true;

  const gasLimit = 5000000; // 가스 한도
  const gasPrice = 1000000000; // 가스 가격을 낮춰볼 것

  await deployer.deploy(NTT, name, symbol, isLocked, {
    gas: gasLimit,
    gasPrice: gasPrice,
  });
  const ntt = await NTT.deployed();

  await deployer.deploy(UseNTT, ntt.address, {
    gas: gasLimit,
    gasPrice: gasPrice,
  });
};
