// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.0;

import "./MerkleProof.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract DISWAirdrop {

    address public owner;
    address public manager;
    IERC20  public diswToken;
    bytes32 public merkleRoot;
    uint256 public startTs;
    uint256 public totalRewards;

    mapping(address => bool) public claimed;

    event Claimed(address indexed claimant, uint256 amount);
    event AddReward(uint256 _rewards);

    constructor(address _diswAddr, address _manager, uint256 _startTs) {
        require(_startTs > block.timestamp, "Invalid start timestamp");
        owner = msg.sender;
        startTs = _startTs;
        if(_diswAddr!=address(0)) {
            diswToken = IERC20(_diswAddr);
            diswToken.approve(address(this), ~uint256(0));
        }
        if(_manager == address(0)) {
            manager = msg.sender;
        } else {
            manager = _manager;
        }
    }

    function claim(uint256 _amount, bytes32[] calldata _merkleProof) external {
        require(startTs <= block.timestamp, "Airdrop has not starting");
        require(!claimed[msg.sender], "Airdrop already claimed.");
        
        bytes32 leaf = keccak256(abi.encode(msg.sender, _amount));
        require(MerkleProof.verify(_merkleProof, merkleRoot, leaf), "Invalid proof.");

        // 标记为已领取
        // claimed[msg.sender] = true;  // 暂时放开

        require(diswToken.transferFrom(address(this), msg.sender, _amount), "Failed to send DISW");
        emit Claimed(msg.sender, _amount);
    }

    function hasClaimed(address _address) public view returns (bool) {
        return claimed[_address];
    }
    
    function setMerkleRoot(bytes32 _newMerkleRoot) public {
        require(msg.sender == owner, "Only owner can make this operation");
        merkleRoot = _newMerkleRoot;
    }

    function setDisw(address _tokenAddress, address _manager) public {
        require(msg.sender == owner, "Only owner can make this operation");
        if(_tokenAddress!=address(0) && totalRewards == 0) {
            diswToken = IERC20(_tokenAddress); // 初始化ERC-20代币合约
            diswToken.approve(address(this), ~uint256(0));
        }
        if(_manager != address(0)) {
            manager = _manager;
        }
    }

    function withdraw(address _to, uint256 _amount) external {
        require(msg.sender == owner, "Only owner can make this operation");
        require(_to != address(0),  "forbid zero address");
        
        uint256 withdrawAmount;
        {
            if(_amount==0 || _amount >= diswToken.balanceOf(address(this))) {
                withdrawAmount = diswToken.balanceOf(address(this));
            } else {
                withdrawAmount = _amount;
            }
        }
        diswToken.transferFrom(address(this), _to, withdrawAmount);
    }

    function notifyReward(uint256 _amount) external {
        require(msg.sender == manager, "only manager can add rewards");
        require(_amount > 0, "forbid zero reward");

        require(diswToken.transferFrom(msg.sender, address(this), _amount), "Failed to send DISW");
    }
}