import { ethers } from "hardhat";

export const getSignPaymentHash = (
  receiver: string,
  partner: string,
  amount: string,
  piggyBankVault: string
): string => {
  const types = ["address", "address", "uint256", "address"];
  const values = [receiver, partner, amount, piggyBankVault];

  return ethers.solidityPackedKeccak256(types, values);
}