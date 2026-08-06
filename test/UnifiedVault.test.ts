import { expect } from "chai";
import { ethers } from "hardhat";

describe("UnifiedSmartVault", function () {
  async function deployVault() {
    const [owner1, owner2, otherAccount] = await ethers.getSigners();
    const Vault = await ethers.getContractFactory("UnifiedSmartVault");
    const vault = await Vault.deploy(owner2.address);
    return { vault, owner1, owner2, otherAccount };
  }

  it("Should deposit and report balance correctly", async function () {
    const { vault } = await deployVault();
    await vault.deposit({ value: ethers.parseEther("1.0") });
    expect(await vault.getBalance()).to.equal(ethers.parseEther("1.0"));
  });

  it("Should allow owners to withdraw funds", async function () {
    const { vault, owner1 } = await deployVault();
    await vault.deposit({ value: ethers.parseEther("1.0") });
    
    const initialBalance = await ethers.provider.getBalance(owner1.address);
    await vault.withdraw(ethers.parseEther("0.5"));
    
    expect(await vault.getBalance()).to.equal(ethers.parseEther("0.5"));
  });

  it("Should set the session key correctly", async function () {
    const { vault, otherAccount } = await deployVault();
    await vault.setSessionKey(otherAccount.address, true);
    expect(await vault.isSessionKey(otherAccount.address)).to.equal(true);
  });

  it("Should execute batch operations successfully", async function () {
    const { vault, otherAccount } = await deployVault();
    await vault.deposit({ value: ethers.parseEther("1.0") });

    const targets = [otherAccount.address];
    const values = [ethers.parseEther("0.1")];
    const datas = ["0x"];

    await vault.batchExecute(targets, values, datas);
    expect(await vault.getBalance()).to.be.below(ethers.parseEther("1.0"));
  });
});
