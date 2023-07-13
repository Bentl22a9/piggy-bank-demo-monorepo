import { ethers } from "hardhat";

async function main() {
  const [piggyBankVaultDeployer, piggyFrensDeployer] =
    await ethers.getSigners();
  const PiggyBankVault = await ethers.getContractFactory("PiggyBankVault");
  const piggyBankVault = await PiggyBankVault.connect(
    piggyBankVaultDeployer
  ).deploy();
  console.log(
    `deployed PiggyBankVault to ${await piggyBankVault.getAddress()} by piggyBankVaultDeployer: ${await piggyBankVaultDeployer.getAddress()}`
  );

  const PiggyFrens = await ethers.getContractFactory("PiggyFrens");
  const piggyFrens = await PiggyFrens.connect(piggyFrensDeployer).deploy(
    "PiggyFrens",
    "PFS",
    ethers.parseUnits("101010", 18)
  );

  console.log(
    `deployed PiggyFrens to ${await piggyFrens.getAddress()} by piggyFrensDeployer: ${await piggyFrensDeployer.getAddress()}`
  );

  await piggyBankVault
    .connect(piggyBankVaultDeployer)
    .addPartner(await piggyFrens.getAddress());

  console.log(`added PiggyFren to partner list`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
