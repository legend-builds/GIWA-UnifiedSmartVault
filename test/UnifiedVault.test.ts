import { expect } from "chai";
import hre from "hardhat";

const { ethers } = hre;

describe("UnifiedSmartVault (Current Live Version)", function () {
  async function deployVault() {
    const [owner1, owner2, session, user, attacker] = await ethers.getSigners();
    const Vault = await ethers.getContractFactory("UnifiedSmartVault");
    const vault = await Vault.deploy(owner2.address);
    await vault.waitForDeployment();
    return { vault, owner1, owner2, session, user, attacker };
  }

  describe("Deployment & Ownership", function () {
    it("Should set owner1 and owner2 correctly", async function () {
      const { vault, owner1, owner2 } = await deployVault();
      expect(await vault.owner1()).to.equal(owner1.address);
      expect(await vault.owner2()).to.equal(owner2.address);
    });
  });

  describe("Deposit & Withdraw", function () {
    it("Should accept deposits and update balance", async function () {
      const { vault } = await deployVault();
      await vault.deposit({ value: ethers.parseEther("1.5") });
      expect(await vault.getBalance()).to.equal(ethers.parseEther("1.5"));
    });

    it("Should allow owners to withdraw", async function () {
      const { vault, owner1 } = await deployVault();
      await vault.deposit({ value: ethers.parseEther("1") });
      await vault.connect(owner1).withdraw(ethers.parseEther("0.4"));
      expect(await vault.getBalance()).to.equal(ethers.parseEther("0.6"));
    });

    it("Should reject withdraw from non-owner", async function () {
      const { vault, attacker } = await deployVault();
      await vault.deposit({ value: ethers.parseEther("1") });
      await expect(
        vault.connect(attacker).withdraw(ethers.parseEther("0.1"))
      ).to.be.revertedWith("Not an authorized owner");
    });
  });

  describe("Session Key", function () {
    it("Should set session key by owner", async function () {
      const { vault, owner1, session } = await deployVault();
      await vault.connect(owner1).setSessionKey(session.address, true);
      expect(await vault.isSessionKey(session.address)).to.equal(true);
    });

    it("Should reject session key set by non-owner", async function () {
      const { vault, attacker, session } = await deployVault();
      await expect(
        vault.connect(attacker).setSessionKey(session.address, true)
      ).to.be.revertedWith("Not an authorized owner");
    });
  });

  describe("Batch Execute", function () {
    it("Should execute batch transfers by owner", async function () {
      const { vault, owner1, user } = await deployVault();
      await vault.deposit({ value: ethers.parseEther("1") });

      const targets = [user.address, user.address];
      const values = [ethers.parseEther("0.1"), ethers.parseEther("0.2")];
      const datas = ["0x", "0x"];

      await vault.connect(owner1).batchExecute(targets, values, datas);
      expect(await vault.getBalance()).to.equal(ethers.parseEther("0.7"));
    });

    it("Should reject batch from non-owner", async function () {
      const { vault, attacker, user } = await deployVault();
      await vault.deposit({ value: ethers.parseEther("1") });

      await expect(
        vault.connect(attacker).batchExecute(
          [user.address],
          [ethers.parseEther("0.1")],
          ["0x"]
        )
      ).to.be.revertedWith("Not an authorized owner");
    });
  });

  describe("Paymaster", function () {
    it("Should set paymaster by owner", async function () {
      const { vault, owner1, user } = await deployVault();
      await vault.connect(owner1).setPaymaster(user.address);
      expect(await vault.paymaster()).to.equal(user.address);
    });
  });
});
