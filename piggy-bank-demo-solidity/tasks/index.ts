import {task} from "hardhat/config";

const CONTRACT_NAME = "PiggyFrens";

task("deployPiggyFrens", "Deploys the piggyFrens.sol contract")
    .addParam("name", "Name")
    .addParam("symbol", "Symbol")
    .addParam("supply", "TotalSupply not in wei", "10000")
    .setAction(async (taskArgs, hre) => {
        console.log(taskArgs);
        const {name, symbol, supply} = taskArgs;
        const PiggyFrens = await hre.ethers.getContractFactory(CONTRACT_NAME);
        const piggyFrens = await PiggyFrens.deploy(name, symbol, await hre.ethers.parseUnits(supply, 18));
        console.log(`deployed PiggyFrens to ${await piggyFrens.getAddress()}- name: ${name}, symbol: ${symbol}, totalSupply: ${hre.ethers.parseUnits(supply, 18)}`);
    });