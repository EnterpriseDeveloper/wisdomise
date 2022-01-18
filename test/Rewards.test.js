const WToken = artifacts.require('./contracts/tokens/WToken.sol');
const USDToken = artifacts.require('./contracts/tokens/USDToken.sol');
const Rewards = artifacts.require('./contracts/Rewards.sol');
const Web3 = require("web3");

contract('Rewards', (accounts) => {

    let wToken;
    let usdToken;
    let rewards;
    let owner = accounts[0];
    let sender1 = accounts[1];
    let sender2 = accounts[2];
    let sender3 = accounts[3];

    beforeEach(async () => {
        wToken = await WToken.deployed();
        usdToken = await USDToken.deployed();
        rewards = await Rewards.deployed();
    })

    it('Should have an address for WToken', () => {
        assert(wToken.address)
    });

    it('Should have an address for USDToken', () => {
        assert(usdToken.address)
    });

    it('Should have an address for Rewards', () => {
        assert(rewards.address)
    });
    
})