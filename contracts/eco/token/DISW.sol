pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./ILeetSwap.sol";

contract DISW is ERC20("DisSwap", "DISW") {
    using SafeMath for uint256;

    uint256 public constant TOTAL_SUPPLY = 1_000_000_000 ether;

    address public manager;

    uint256 public sellFeeRate = 50;
    address public feeAddress;

    ISwapRouter private diswapV2Router;
    address public diswapV2Pair;

    mapping(address => bool) public whiteFeeList;

    event PairCreated(address pairAddr);

    constructor(address _target, address _feeAddress, address _swapRouter, address _wdis) {
        require(_target != address(0) && _feeAddress != address(0), "manage address setting invalid");
        feeAddress = _feeAddress;
        manager = msg.sender;

        initPair(_swapRouter, _wdis);
        super._mint(_target, TOTAL_SUPPLY);
    }

    function totalSupply() public view override virtual returns(uint256) {
        return TOTAL_SUPPLY;
    }

    function _transfer(address from, address to, uint256 amount) override internal virtual {
        require(from != address(0), "ERC20: transfer from the zero address");
        require(to != address(0), "ERC20: transfer to the zero address");
        require(amount > 0, "amount must gt 0");

        if((from != diswapV2Pair && to != diswapV2Pair)
            || feeAddress == address(0) || sellFeeRate == 0 || whiteFeeList[msg.sender]
        ) {
            super._transfer(from, to, amount);
            return;
        }

        if(to == diswapV2Pair) { // SELL DIS or Add Liquidity
            uint256 feeAmount = amount.mul(sellFeeRate).div(10000);
            super._transfer(from, feeAddress, feeAmount);
            amount -= feeAmount;
        }
        super._transfer(from, to, amount);
    }

    function initPair(address _swap, address _targetToken) private {
        diswapV2Router = ISwapRouter(_swap);
        diswapV2Pair = ISwapFactory(diswapV2Router.factory()).createPair(address(this), _targetToken);
        ERC20(_targetToken).approve(address(diswapV2Router), type(uint256).max);
        _approve(address(this), address(diswapV2Router),type(uint256).max);

        _approve(address(this), address(this),type(uint256).max);
        emit PairCreated(diswapV2Pair);
    }

    function configWhiteFeeList(address _user, bool _feeClose) external {
        require(msg.sender == manager, "need manager to operate");
        whiteFeeList[_user] = _feeClose;
    }

    function configFee(address _feeAddress, uint256 _feeRate) external {
        require(msg.sender == manager, "need manager to operate");
        feeAddress = _feeAddress;
        sellFeeRate = _feeRate;
    }

    function configManager(address _newManager) external {
        require(msg.sender == manager, "need manager to operate");
        manager = _newManager;
    }
}