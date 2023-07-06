import { ethers } from "hardhat";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { PiggyBankVault, PiggyFrens } from "../typechain-types";
import { PiggyFrensInitializer } from "./types";
import { expect } from "chai";
import { getSignPaymentHash } from "../utils";

describe("PiggyBankVault", function () {
  let signers: HardhatEthersSigner[];
  let initParams: PiggyFrensInitializer[];
  // contracts
  let frensList: PiggyFrens[] = [];

  let piggyMaster: HardhatEthersSigner;
  let piggyBankVault: PiggyBankVault;

  before(async () => {
    signers = await ethers.getSigners();
    initParams = [
      {
        deployer: signers[0],
        name: "bunny",
        symbol: "BUNNY",
        totalSupply: "10000"
      },
      {
        deployer: signers[1],
        name: "tiger",
        symbol: "TIGER",
        totalSupply: "42069"
      }
    ];

    piggyMaster = signers[2];

    const PiggyBankVault = await ethers.getContractFactory("PiggyBankVault");
    piggyBankVault = await PiggyBankVault.connect(piggyMaster).deploy();
    console.log(`\tdeployed PiggyBankVault to ${await piggyBankVault.getAddress()}`);

    for await (const initParam of initParams) {
      const {deployer, name, symbol, totalSupply} = initParam;
      const PiggyFrens = await ethers.getContractFactory("PiggyFrens");
      const piggyFrens = await PiggyFrens.connect(deployer).deploy(name, symbol, ethers.parseUnits(totalSupply, 18));
      const address = await piggyFrens.getAddress();
      console.log(`\tdeployed PiggyFrens to ${address} - name: ${name}, symbol: ${symbol}, totalSupply: ${ethers.parseUnits(totalSupply, 18)}`);
      frensList.push(piggyFrens);
    }

  });

  it("1. isPartner should be set true, after addPartner", async () => {

    await Promise.all(frensList.map(async (fren, index) => {
      const frenAddress = await fren.getAddress();
      await piggyBankVault.connect(piggyMaster).addPartner(frenAddress);
      expect(await piggyBankVault.isPartner(frenAddress)).to.be.true;
    }));

  });

  it("2. deposit should update PiggyBankVault balance correctly", async () => {

    await Promise.all(frensList.map(async (fren, index) => {
      const initParam = initParams[index];
      const { deployer } = initParam;

      const amount = ethers.parseUnits("100", 18);

      await fren.connect(deployer).transferFixedAmount(piggyMaster.address, amount);

      expect(await fren.getBalanceOf(piggyMaster.address)).to.equal(amount);
    }));

  });

  it("3. approve PiggyBankVault", async () => {
    await Promise.all(frensList.map(async (fren) => {
      await fren.connect(piggyMaster).approve(await piggyBankVault.getAddress(), ethers.MaxUint256);
    }));
  });

  it("4. breakPiggyBank should transfer with valid signature", async () => {
    const receiver = signers[3];
    const partner = frensList[0];
    const piggyMasterInitBalance = await partner.getBalanceOf(piggyMaster.address);
    const receiverInitBalance = await partner.getBalanceOf(receiver.address);
    const amount = ethers.parseUnits("5", 18);
    const hash = getSignPaymentHash(await receiver.getAddress(), await partner.getAddress(), amount.toString(), await piggyBankVault.getAddress());
    console.log(`\t${hash}`);
    const messageToSign = ethers.getBytes(hash);

    const signature = await piggyMaster.signMessage(messageToSign);

    await piggyBankVault.connect(receiver).breakPiggyBank(partner, amount, signature);

    expect(await partner.getBalanceOf(piggyMaster.address)).to.equal(piggyMasterInitBalance - amount);
    expect(await partner.getBalanceOf(receiver.address)).to.equal(receiverInitBalance + amount);
  });

  it("5. breakPiggyBank should revert against invalid signature", async () => {
    const receiver = signers[3];
    const partner = frensList[0];
    const amount = ethers.parseUnits("5", 18);
    const wrongAmount = ethers.parseUnits("2.5", 18);
    const hash = getSignPaymentHash(await receiver.getAddress(), await partner.getAddress(), amount.toString(), await piggyBankVault.getAddress());
    const wrongHash = getSignPaymentHash(await receiver.getAddress(), await partner.getAddress(), wrongAmount.toString(), await piggyBankVault.getAddress());
    const messageToSign = ethers.getBytes(hash);
    const signature = await piggyMaster.signMessage(messageToSign);

    expect(hash).to.not.equal(wrongHash);
    await expect(piggyBankVault.connect(receiver).breakPiggyBank(partner, wrongAmount, signature)).to.be.reverted;
  });

});
