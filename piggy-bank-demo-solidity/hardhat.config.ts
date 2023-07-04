import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "./tasks/index";

const config: HardhatUserConfig = {
  solidity: "0.8.18",
};

export default config;
