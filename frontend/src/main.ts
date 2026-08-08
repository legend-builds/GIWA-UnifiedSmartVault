import { ethers } from "ethers";

const CONTRACT_ADDRESS = "0xDC541A92546c7A6C5D4fF7e133574e6764AC7fCe";
const CONTRACT_ABI = [
  "function deposit() external payable",
  "function withdraw(uint256 amount) external",
  "function getBalance() external view returns (uint256)",
  "function batchExecute(address[] calldata targets, uint256[] calldata values, bytes[] calldata datas) external"
];

const connectBtn = document.getElementById("connectBtn") as HTMLButtonElement;
const depositBtn = document.getElementById("depositBtn") as HTMLButtonElement;
const withdrawBtn = document.getElementById("withdrawBtn") as HTMLButtonElement;
const depositInput = document.getElementById("depositAmount") as HTMLInputElement;
const withdrawInput = document.getElementById("withdrawAmount") as HTMLInputElement;
const vaultBalance = document.getElementById("vaultBalance") as HTMLSpanElement;
const consoleLog = document.getElementById("consoleLog") as HTMLDivElement;

let provider: ethers.BrowserProvider | null = null;
let signer: ethers.Signer | null = null;
let vaultContract: ethers.Contract | null = null;

function log(msg: string) {
  const time = new Date().toTimeString().split(" ")[0];
  consoleLog.innerText += `\n[${time}] ${msg}`;
  consoleLog.scrollTop = consoleLog.scrollHeight;
}

connectBtn.addEventListener("click", async () => {
  if (window.ethereum) {
    try {
      provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      signer = await provider.getSigner();
      const address = await signer.getAddress();
      
      vaultContract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      
      connectBtn.innerText = `${address.substring(0, 6)}...${address.substring(38)}`;
      log(`Wallet connected successfully: ${address}`);
      
      updateBalance();
    } catch (err: any) {
      log(`Connection failed: ${err.message}`);
    }
  } else {
    alert("Please install MetaMask or Web3 wallet!");
  }
});

async function updateBalance() {
  if (!vaultContract) return;
  try {
    const balance = await vaultContract.getBalance();
    vaultBalance.innerText = `${ethers.formatEther(balance)} GIWA`;
    log(`Fetched live vault balance successfully.`);
  } catch (err: any) {
    log(`Error fetching balance: ${err.message}`);
  }
}

depositBtn.addEventListener("click", async () => {
  if (!vaultContract) { alert("Please connect wallet first!"); return; }
  const amount = depositInput.value;
  if (!amount) { alert("Enter amount to deposit"); return; }
  
  try {
    log(`Initiating deposit of ${amount} GIWA...`);
    const tx = await vaultContract.deposit({ value: ethers.parseEther(amount) });
    log(`Transaction sent: ${tx.hash}`);
    await tx.wait();
    log(`Deposit successful! Funds secured in UnifiedSmartVault.`);
    updateBalance();
  } catch (err: any) {
    log(`Deposit failed: ${err.message}`);
  }
});

withdrawBtn.addEventListener("click", async () => {
  if (!vaultContract) { alert("Please connect wallet first!"); return; }
  const amount = withdrawInput.value;
  if (!amount) { alert("Enter amount to withdraw"); return; }
  
  try {
    log(`Submitting withdrawal request for ${amount} GIWA...`);
    const tx = await vaultContract.withdraw(ethers.parseEther(amount));
    log(`Transaction broadcasted: ${tx.hash}`);
    await tx.wait();
    log(`Withdrawal executed successfully by authorized controller.`);
    updateBalance();
  } catch (err: any) {
    log(`Withdrawal failed: ${err.message}`);
  }
});