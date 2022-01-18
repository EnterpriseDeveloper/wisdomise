// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import {WToken} from "./tokens/WToken.sol";
import {USDToken} from "./tokens/USDToken.sol";

contract Rewards {
    WToken public wToken;
    USDToken public usdToken;

    address public owner;
    uint8 public index = 0;

    struct Staker {
        uint8 index;
        uint256 amount;
    }

    mapping(address => Staker) stakers;
    address[] public allStakers;

    constructor(WToken _wTokenAddr, USDToken _usdTokenAddr) public payable {
        owner = msg.sender;
        wToken = _wTokenAddr;
        usdToken = _usdTokenAddr;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    // TODO check functionality
    function setRewards(uint256 _amount) public payable onlyOwner {
        require(
            usdToken.allowance(msg.sender, address(this)) >= _amount,
            "Allowance err"
        );
        require(
            usdToken.transferFrom(msg.sender, address(this), _amount),
            "Transfer err"
        );
        index = index + 1;

        for (uint8 i = 0; i < allStakers.length; i++) {
            address wallet = allStakers[i];
            // TODO check function
            uint256 amount = stakers[wallet].amount - (stakers[wallet].index - index) / 2;
            require(usdToken.transfer(wallet, amount), "Transfer err");
        }
    }

    function setStake(uint256 _amount) public payable {
        require(
            wToken.allowance(msg.sender, address(this)) >= _amount,
            "Allowance err"
        );
        require(
            wToken.transferFrom(msg.sender, address(this), _amount),
            "Transfer err"
        );
        Staker memory staker;
        staker = Staker(index, _amount);
        stakers[msg.sender] = staker;
        allStakers.push(msg.sender);
    }
}
