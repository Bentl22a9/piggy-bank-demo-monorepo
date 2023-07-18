import { ethers } from 'ethers';

export function getSessionStorage<T>(key: string): T | null {
  try {
    const item = window.sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export function setSessionStorage<T>(key: string, item: T) {
  try {
    window && window.sessionStorage.setItem(key, JSON.stringify(item));
  } catch (e) {
    console.error(e);
  }
}

export const getSignPaymentHash = (
  receiver: string,
  partner: string,
  amount: string,
  piggyBankVault: string
): string => {
  const types = ['address', 'address', 'uint256', 'address'];
  const values = [receiver, partner, amount, piggyBankVault];

  return ethers.solidityPackedKeccak256(types, values);
};

export const formatDecimal = (number: string): string => {
  try {
    return parseFloat(number).toFixed(2);
  } catch (e) {
    return number;
  }
}
