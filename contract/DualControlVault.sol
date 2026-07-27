// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract UnifiedSmartVault {
    address public owner1;
    address public owner2;
    address public paymaster;
    
    mapping(address => bool) public isSessionKey;

    event Deposited(address indexed sender, uint256 amount);
    event Withdrawn(address indexed owner, uint256 amount);
    event BatchExecuted(uint256 count);
    event SessionKeyUpdated(address indexed sessionKey, bool status);
    event PaymasterUpdated(address indexed newPaymaster);

    constructor(address _owner2) {
        owner1 = msg.sender;
        owner2 = _owner2;
    }

    modifier onlyOwner() {
        require(msg.sender == owner1 || msg.sender == owner2, "Not an authorized owner");
        _;
    }

    // --- توابع مدیریت دارایی ---
    function deposit() external payable {
        emit Deposited(msg.sender, msg.value);
    }

    function withdraw(uint256 amount) external onlyOwner {
        require(address(this).balance >= amount, "Insufficient balance");
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "Withdrawal failed");
        emit Withdrawn(msg.sender, amount);
    }

    // --- تابع برای مشاهده موجودی دقیق ---
    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }

    // --- تابع اجرای دسته‌ای ---
    function batchExecute(address[] calldata targets, uint256[] calldata values, bytes[] calldata datas) external onlyOwner {
        for (uint256 i = 0; i < targets.length; i++) {
            (bool success, ) = targets[i].call{value: values[i]}(datas[i]);
            require(success, "Batch operation failed");
        }
        emit BatchExecuted(targets.length);
    }

    // --- توابع پیشرفته ---
    function setSessionKey(address _key, bool _status) external onlyOwner {
        isSessionKey[_key] = _status;
        emit SessionKeyUpdated(_key, _status);
    }

    function setPaymaster(address _paymaster) external onlyOwner {
        paymaster = _paymaster;
        emit PaymasterUpdated(_paymaster);
    }

    receive() external payable {}
}