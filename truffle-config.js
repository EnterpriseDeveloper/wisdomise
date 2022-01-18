
const HDWalletProvider = require('@truffle/hdwallet-provider');
const path = require('path');
const fs = require('fs');
const mnemonic = fs.readFileSync(path.join(__dirname, './keys/ropsten_mnemonic'), 'utf-8');
const config = require("./config/networks");

module.exports = {

  networks: {
    ropsten: {
      provider: () => new HDWalletProvider(mnemonic, config.ropsten),
      network_id: config.ropstenId,       // Ropsten's id
      gas: 5500000,        // Ropsten has a lower block limit than mainnet
      confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50),
      gasPrice: 15000000001,
    },
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 7545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
    }
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.10",    // Fetch exact version from solc-bin (default: truffle's version)
      docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    }
  },
};
