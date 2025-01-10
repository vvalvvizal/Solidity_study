//truffle-config.js

const HDWalletProvider = require("@truffle/hdwallet-provider");
const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*", //connect to any network
    },
    sepolia: {
      provider: () =>
        new HDWalletProvider(
          [process.env.MNEMONIC], // Private Key
          `https://eth-sepolia.g.alchemy.com/v2/${process.env.AICHEMY_PROJECT_ID}`
        ),
      network_id: 11155111,
      gas: 1000000, // 가스 한도를 낮춤
      maxFeePerGas: 2e8, // 가스 가격을 낮춤
      maxPriorityFeePerGas: 1e8, // 우선순위 보수를 낮춤
    },
  },
  contracts_directory: "./contracts/",
  contracts_build_directory: "./truffle_abis",
  compilers: {
    solc: {
      version: "0.8.20",
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
