import {
    time,
    loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import {HardhatEthersSigner} from "@nomicfoundation/hardhat-ethers/signers"
import {PiggyFrens} from "../typechain-types";

type PiggyFrensInitializer = {
    deployer: any,
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
            console.log(`deployed PiggyFrens to ${address} - name: ${name}, symbol: ${symbol}, totalSupply: ${ethers.parseUnits(totalSupply, 18)}`);
            frensList.push(piggyFrens);
        }
    });

    it("Should have the provided initializers",() => {
        frensList.map(async (fren, index) => {
            const initParam = initParams[index];
            const {name, symbol, totalSupply} = initParam;

            expect(await fren.name()).to.equal(name);
            expect(await fren.symbol()).to.equal(symbol);
            expect((await fren.totalSupply()).toString()).to.equal(ethers.parseUnits(totalSupply, 18));
        })
    });

});
