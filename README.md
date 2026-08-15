### Note to Reviewers (Stage 3)

The current live contract on GIWA Sepolia (0xDC541A92546c7A6C5D4fF7e133574e6764AC7fCe) is the stable version under review.

**Planned upgrades for Mainnet (after Stage 3):**
- Full UUPS upgradeability
- Real Session Keys with spending limits + expiry (currently basic flag)
- Enhanced security (ReentrancyGuard, Pausable, stricter access control)
- Better Paymaster integration
- Additional execution helpers tailored for GIWA

All core ideas (Dual Ownership, Session Key concept, Batch Execution, Paymaster readiness) remain the same.  
We are keeping the current address stable during the review process and will migrate cleanly to an upgradeable version for Mainnet.

---

# Unified Smart Vault – GIWA

Modular Smart Vault with Dual Ownership, Session Key management, Batch Execution and Paymaster readiness.  
Built for **GIWA Chain** (OP Stack).

## Live on GIWA Sepolia

| Item                    | Value |
|-------------------------|-------|
| **Contract**            | `0xDC541A92546c7A6C5D4fF7e133574e6764AC7fCe` |
| **Network**             | GIWA Sepolia (Chain ID: 91342) |
| **Explorer**            | [View Contract](https://sepolia-explorer.giwa.io/address/0xDC541A92546c7A6C5D4fF7e133574e6764AC7fCe) |
| **Live Demo**           | [https://giwa-unified-smartvault.netlify.app/](https://giwa-unified-smartvault.netlify.app/) |

## Core Features

- **Dual Ownership** (`owner1` + `owner2`)
- **Session Key Management** (delegated access control)
- **Batch Execution** (atomic multi-call)
- **Paymaster Ready** (gas sponsorship slot)
- **Secure Deposit / Withdraw**

## Quick Start

```bash
git clone https://github.com/legend-builds/GIWA-UnifiedSmartVault.git
cd GIWA-UnifiedSmartVault
npm install
npx hardhat compile
npx hardhat test


Network Info
Chain ID: 91342
RPC: https://sepolia-rpc.giwa.io
Explorer: https://sepolia-explorer.giwa.io
Currency: ETH
Note to Reviewers (Stage 3)
The current live contract is intentionally kept stable during the review.
Roadmap after Stage 3 / for Mainnet:
Migrate to UUPS upgradeable architecture
Implement real Session Keys with spending limits and expiry
Add ReentrancyGuard + Pausable
Stronger access control and execution helpers
Full mainnet deployment
The core vision and feature set remain unchanged.

License:MIT