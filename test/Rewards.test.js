const WToken = artifacts.require('./contracts/tokens/WToken.sol');
const USDToken = artifacts.require('./contracts/tokens/USDToken.sol');
const Rewards = artifacts.require('./contracts/Rewards.sol');
const Web3 = require("web3");

contract('Rewards', (accounts) => {

    let web3 = new Web3();
    let usdAmount = "1000";
    let wToken;
    let usdToken;
    let rewards;
    let owner = accounts[0];
    let users = [{
        acc: accounts[1],
        amount: "10",
    }, {
        acc: accounts[2],
        amount: "90",
    }, {
        acc: accounts[3],
        amount: "100",
    }];

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

    it("Let's send wToken to users", async () => {
        for (let i = 0; i < users.length; i++) {
            let amount = web3.utils.toWei(users[i].amount, "ether");
            await wToken.transfer(users[i].acc, amount, { from: owner })
        }

        for (let i = 0; i < users.length; i++) {
            let balance = await wToken.balanceOf(users[i].acc)
            let bal = web3.utils.fromWei(balance, "ether");
            assert.equal(bal, users[i].amount, `User by index ${i} does not have enought tokens`)
        }
    });

    it("Stake token from two first users", async () => {
        let totalAmount = 0;
        for (let i = 0; i < 2; i++) {
            totalAmount = Number(users[i].amount) + totalAmount;
            let amount = web3.utils.toWei(users[i].amount, "ether");
            await wToken.approve(rewards.address, amount, { from: users[i].acc })
            await rewards.setStake(amount, { from: users[i].acc });
        }

        let bal = await wToken.balanceOf(rewards.address);
        let balance = web3.utils.fromWei(bal, "ether");
        assert.equal(totalAmount, balance, `Staked amount is not a ${totalAmount}`)
    })

    it("Send USDtoken to reward contract", async () => {
        let amount = web3.utils.toWei(usdAmount, "ether");
        await usdToken.transfer(rewards.address, amount, { from: owner })

        let bal = await usdToken.balanceOf(rewards.address);
        let balance = web3.utils.fromWei(bal, "ether");
        assert.equal(usdAmount, balance, `Send first rewards must error`)
    })

    it("Execute function for rewarding first time", async () =>{
        let rewardsAmount = ["100", "900"]
        await rewards.setRewards({from: owner});
        
        for (let i = 0; i < rewardsAmount.length; i++) {
            let bal = await usdToken.balanceOf(users[i].acc);
            let balance = web3.utils.fromWei(bal, "ether");
            console.log(balance);
            assert.equal(balance, rewardsAmount[i], `User by index ${i} does not received enought tokens`)

        }
    })

    it("")

})