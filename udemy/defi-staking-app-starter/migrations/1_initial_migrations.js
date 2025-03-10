//run_migrations.js
/* eslint-disable no-undef */
const Migrations = artifacts.require("Migrations");

module.exports = async function(deployer) {
  await deployer.deploy(Migrations); //트랜잭션 업데이트
};
