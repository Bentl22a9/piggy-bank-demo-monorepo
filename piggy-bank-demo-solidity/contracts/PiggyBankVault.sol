// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "hardhat/console.sol";

// https://docs.soliditylang.org/en/v0.8.11/solidity-by-example.html#micropayment-channel
// ERC-20 micropayment-channel
contract PiggyBankVault {
  address _piggyBankMaster;
  mapping(address => bool) _partners; // ERC20 contract addresses

  constructor() payable {
    _piggyBankMaster = msg.sender;
  }

  /// claim reward
  function breakPiggyBank(
    address partner,
    uint256 amount,
    bytes memory signature
  ) external {
    require(_partners[partner], "Invalid token address");

    // this recreates the message that was signed on the client
    bytes32 message = prefixed(
      keccak256(abi.encodePacked(msg.sender, partner, amount, this))
    );
    require(
      recoverSigner(message, signature) == _piggyBankMaster,
      "Invalid signature"
    );

    IERC20(partner).transferFrom(_piggyBankMaster, msg.sender, amount);
  }

  /// partner should also include signature generated by piggy bank master to whitelist themselves
  function joinAsPartner(address partner, bytes memory signature) external {
    bytes32 message = prefixed(keccak256(abi.encodePacked(partner, this)));
    require(
      recoverSigner(message, signature) == _piggyBankMaster,
      "Invalid signature"
    );
    _partners[partner] == true;
  }

  function addPartner(address partner) external {
    require(
      msg.sender == _piggyBankMaster,
      "Invalid sender, piggy bank master only"
    );
    _partners[partner] = true;
  }

  function removePartner(address partner) external {
    require(
      msg.sender == _piggyBankMaster,
      "Invalid sender, piggy bank master only"
    );
    _partners[partner] = false;
  }

  function withdraw(address partner, address recipient) external {
    require(
      msg.sender == _piggyBankMaster,
      "Invalid sender, piggy bank master only"
    );
    require(_partners[partner], "Invalid token address");

    uint256 balance = getBalanceOf(partner);
    IERC20(partner).transferFrom(_piggyBankMaster, recipient, balance);
  }

  function getBalanceOf(address partner) public view returns (uint256) {
    return IERC20(partner).balanceOf(_piggyBankMaster);
  }

  /// signature methods.
  function splitSignature(
    bytes memory signature
  ) internal pure returns (uint8 v, bytes32 r, bytes32 s) {
    require(signature.length == 65, "Invalid signature length");
    assembly {
      // first 32 bytes, after the length prefix.
      r := mload(add(signature, 32))
      // second 32 bytes.
      s := mload(add(signature, 64))
      // final byte (first byte of the next 32 bytes).
      v := byte(0, mload(add(signature, 96)))
    }
    return (v, r, s);
  }

  function recoverSigner(
    bytes32 message,
    bytes memory signature
  ) internal pure returns (address) {
    (uint8 v, bytes32 r, bytes32 s) = splitSignature(signature);
    return ecrecover(message, v, r, s);
  }

  /// builds a prefixed hash to mimic the behavior of eth_sign.
  function prefixed(bytes32 hash) internal pure returns (bytes32) {
    return
      keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", hash));
  }
}
