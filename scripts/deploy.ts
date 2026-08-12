import { ethers } from "hardhat";

async function main() {
  const [deployer, owner2Signer] = await ethers.getSigners();
  const owner2 = owner2Signer.address;

  console.log("Deploying contract to GIWA network with:", deployer.address);

  const DualControlVault = await ethers.getContractFactory("UnifiedSmartVault");
  const vault = await DualControlVault.deploy(owner2);

  await vault.waitForDeployment();

  console.log("DualControlVault deployed to:", await vault.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
