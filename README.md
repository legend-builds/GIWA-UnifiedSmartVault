<img width="1091" height="944" alt="Screenshot (2072)" src="https://github.com/user-attachments/assets/50fedc70-700e-4cc4-9bb4-347bacc49a13" />

# Unified Smart Vault (Modular Account Abstraction & Asset Management)

A production-grade, modular smart contract built for advanced EVM environments[cite: 1]. This protocol introduces dual-ownership control, native session-key management, gas sponsorship (Paymaster) integration, and secure batch execution capabilities[cite: 1].

---
## 🌐 Live Demo & Deployment

* **Live Frontend Dashboard:** [Netlify Live App](https://curious-crostata-b67241.netlify.app)[cite: 9]
* **UnifiedSmartVault Contract Address:** `0xDC541A92546c7A6C5D4fF7e133574e6764AC7fCe`[cite: 1]
* **Network:** GIWA Sepolia Testnet[cite: 1]
* **Explorer Verification:** Fully verified and interactable via block explorer[cite: 1].

---

## 🛠️ Core Architecture & Features

1. **Dual-Owner Authorization (`owner1` & `owner2`):**
   * Multi-admin governance ensuring critical operations require explicit authorization from authorized controllers[cite: 1].
2. **Batch Transaction Execution (`batchExecute`):**
   * Enables bundled execution of multiple calls within a single atomic transaction, optimizing gas consumption and streamlining multi-step interactions[cite: 1].
3. **Session Key Management (`setSessionKey`):**
   * Granular permission delegation allowing temporary or scoped access to delegated addresses without exposing core administrative privileges[cite: 1].
4. **Paymaster Integration (`setPaymaster`):**
   * Infrastructure readiness for gasless or sponsored transaction flows[cite: 1].
5. **Secure Asset Management:**
   * Built-in robust `deposit`, `withdraw`, and fallback mechanisms to safely handle native asset liquidity[cite: 1].

---

## 📂 Contract Overview (`UnifiedSmartVault.sol`)

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract UnifiedSmartVault {
    address public owner1;
    address public owner2;
    address public paymaster;
    
    mapping(address => bool) public isSessionKey;
    
    // Core features: deposit, withdraw, batchExecute, setSessionKey, setPaymaster
    // ...
}
```[cite: 1]

---

## 🧪 Getting Started & Development

### Prerequisites
* Node.js & npm
* Hardhat

### Installation & Compilation
```bash
git clone [https://github.com/legend-builds/Unified-Smart-Vault.git](https://github.com/legend-builds/Unified-Smart-Vault.git)
cd Unified-Smart-Vault
npm install
npx hardhat compile
