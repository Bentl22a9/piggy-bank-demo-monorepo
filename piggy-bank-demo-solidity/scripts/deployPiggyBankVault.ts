import { ethers } from "hardhat";

async function main() {
    const PiggyBankVault = await ethers.getContractFactory("PiggyBankVault");
    const piggyBankVault = await PiggyBankVault.deploy();
    console.log(`deployed PiggyBankVault to ${await piggyBankVault.getAddress()}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
