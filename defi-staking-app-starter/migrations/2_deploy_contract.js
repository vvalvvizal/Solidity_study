//run_migrations.js
/* eslint-disable no-undef */
const Tether = artifacts.require("Tether");

module.exports = async function(deployer) {
  await deployer.deploy(Tether); //트랜잭션 업데이트
};
