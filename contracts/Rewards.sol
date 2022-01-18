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

    constructor(WToken _wTokenAddr, USDToken _usdTokenAddr) payable {
        owner = msg.sender;
        wToken = _wTokenAddr;
        usdToken = _usdTokenAddr;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    function setRewards() public payable onlyOwner {
        require(
            usdToken.balanceOf(address(this)) > 0,
            "do not have rewards on contract"
        );
        index = index + 1;
        for (uint8 i = 0; i < allStakers.length; i++) {
            address wallet = allStakers[i];
            uint256 amount = stakers[wallet].amount / (index - stakers[wallet].index);
            if (amount > 0) {
                require(usdToken.transfer(wallet, amount * 10), "Transfer err");
            }
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
