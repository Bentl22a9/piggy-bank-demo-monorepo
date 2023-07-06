import { expect } from "chai";
import { ethers } from "hardhat";
import {HardhatEthersSigner} from "@nomicfoundation/hardhat-ethers/signers"
import {PiggyFrens} from "../typechain-types";

type PiggyFrensInitializer = {
    deployer: HardhatEthersSigner,
    name: string,
    symbol: string,
    totalSupply: string
}

describe("PiggyFrens", async () => {
    let signers: HardhatEthersSigner[];
    let initParams: PiggyFrensInitializer[];
    // contracts
    let frensList: PiggyFrens[] = [];

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

        for await (const initParam of initParams) {
            const {deployer, name, symbol, totalSupply} = initParam;
            const PiggyFrens = await ethers.getContractFactory("PiggyFrens");
            const piggyFrens = await PiggyFrens.connect(deployer).deploy(name, symbol, ethers.parseUnits(totalSupply, 18));
            const address = await piggyFrens.getAddress();
            console.log(`\tdeployed PiggyFrens to ${address} - name: ${name}, symbol: ${symbol}, totalSupply: ${ethers.parseUnits(totalSupply, 18)}`);
            frensList.push(piggyFrens);
        }
    });

    it("1. Should have the provided initializers",async () => {
        await Promise.all(frensList.map(async (fren, index) => {
            const initParam = initParams[index];
            const {name, symbol, totalSupply} = initParam;

            expect(await fren.name()).to.equal(name);
            expect(await fren.symbol()).to.equal(symbol);
            expect((await fren.totalSupply()).toString()).to.equal(ethers.parseUnits(totalSupply, 18));
        }));
    });

    it("2. Deployer balance should be totalSupply", async () => {
        await Promise.all(frensList.map(async (fren, index) => {
            const initParam = initParams[index];
            const {deployer, totalSupply} = initParam;

            expect((await fren.getBalanceOf(deployer)).toString()).to.equal(ethers.parseUnits(totalSupply, 18));
        }));
    });

    it("3. Should revert transferFixedAmount if not deployer", async () => {
        const receiver = signers[2];

        await Promise.all(frensList.map(async (fren, index) => {
            const initParam = initParams[index];
            const {deployer} = initParam;

            expect(deployer.address === receiver.address).to.be.false;
            await expect( fren.connect(receiver).transferFixedAmount(receiver.address, ethers.parseUnits("6969", 18))).to.be.reverted;
            await expect( fren.connect(deployer).transferFixedAmount(receiver.address, ethers.parseUnits("6969", 18))).to.be.not.reverted;
        }));
    });

    it("4. Should update receiver balance correctly", async () => {
       const receiver = signers[3];
       const [bunny] = frensList;
       const [bunnyMaster] = initParams.map(each => each.deployer);

       const amount = ethers.parseUnits("10", 18);

       const senderInitBalance = await bunny.getBalanceOf(bunnyMaster);
       const receiverInitBalance = await bunny.getBalanceOf(receiver);

       await bunny.connect(bunnyMaster).transferFixedAmount(receiver, amount);

       const senderFinalBalance = await bunny.getBalanceOf(bunnyMaster);
       const receiverFinalBalance = await bunny.getBalanceOf(receiver);

       expect(senderFinalBalance).to.equal(senderInitBalance - amount);
       expect(receiverFinalBalance).to.equal(receiverInitBalance + amount);
    });

});
