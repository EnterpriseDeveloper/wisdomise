const token = artifacts.require("Token");
const Web3 = require("web3");
const config = require("../config/tokenConfig");


module.exports = async (deployer, network) => {
    if (network === 'ropsten' || network === "development") {
        let web3 = new Web3();
        let initialSupplyCoins = web3.utils.toWei(String(config.initSuplay), "ether");
        await deployer.deploy(token, initialSupplyCoins, config.w_name, config.w_symbol);
        return await deployer.deploy(token, initialSupplyCoins, config.u_name, config.u_symbol);
    } else {
        return;
    }
};