const Web3 = require("web3");
const Reward = require("../build/contracts/Rewards.json");
const config = require("../config/networks");

let getData = async () => {
  let web3 = new Web3(config.ropsten);
  let address = Reward.networks[config.ropstenId].address;
  let data = await web3.eth.getStorageAt(address, 2);
  console.log(data);

};

getData();
