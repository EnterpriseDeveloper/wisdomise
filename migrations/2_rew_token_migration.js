const Wtoken = artifacts.require("WToken");
const USDtoken = artifacts.require("USDToken");
const Rewards = artifacts.require("Rewards");
const Web3 = require("web3");
const config = require("../config/tokenConfig");


module.exports = async (deployer, network) => {
    if (network === 'ropsten' || network === "development") {
        let web3 = new Web3();
        let initialSupplyCoins = web3.utils.toWei(String(config.initSuplay), "ether");
        await deployer.deploy(Wtoken, initialSupplyCoins, config.w_name, config.w_symbol); // deploy wToken
        await deployer.deploy(USDtoken, initialSupplyCoins, config.u_name, config.u_symbol); // deploy USDToken
        return await deployer.deploy(Rewards, Wtoken.address, USDtoken.address); // deploy Rewards
    } else {
        return;
    }
};