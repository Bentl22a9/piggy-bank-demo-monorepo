import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

export type PiggyFrensInitializer = {
  deployer: HardhatEthersSigner,
  name: string,
  symbol: string,
  totalSupply: string
}