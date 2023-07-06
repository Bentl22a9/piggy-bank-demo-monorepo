pragma solidity ^0.8.0;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";

contract PiggyFrens is ERC20 {
  address internal deployer;

  constructor(
    string memory name,
    string memory symbol,
    uint256 totalSupply
  ) ERC20(name, symbol) {
    _mint(msg.sender, totalSupply);
    deployer = msg.sender;
  }

  function transferFixedAmount(address recipient, uint256 amount) external {
    require(msg.sender == deployer, "Only the contract deployer can transfer");
    _transfer(msg.sender, recipient, amount);
  }

  function getBalanceOf(address account) external view returns (uint256) {
    return balanceOf(account);
  }
}
