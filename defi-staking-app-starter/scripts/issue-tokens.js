/* eslint-disable no-undef */
const DecentralBank = artifacts.require("DecentralBank");

module.exports = async function issuReward(callback) {
  let decentralBank = await DecentralBank.deployed();
  //   const owner = await decentralBank.owner();
  //   console.log(owner);
  await decentralBank.issueTokens();
  console.log("Tokens have been issued successfully!");
  callback();
};
