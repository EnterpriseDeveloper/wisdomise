const Wtoken = artifacts.require("Wtoken");
const Web3 = require("web3");
const config = require("../config/tokenConfig");


module.exports = async (deployer, network) => {
    if (network === 'ropsten' || network === "development") {
        let web3 = new Web3();
        let name = config.name
        let symbol = config.symbol
        let initialSupplyCoins = web3.utils.toWei(String(config.initSuplay), "ether");
        return await deployer.deploy(USDTToken, initialSupplyCoins, name, symbol);
    } else {
        return;
    }
};