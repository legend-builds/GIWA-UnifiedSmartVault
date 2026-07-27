import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    baseVibenet: {
      url: "https://vibenet.base.org", // RPC مربوطه
      accounts: ["YOUR_PRIVATE_KEY_HERE"] // پرایوت کی خود را اینجا بگذارید
    }
  }
};

export default config;