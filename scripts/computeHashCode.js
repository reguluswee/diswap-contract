
const { ethers:hdEthers } = require("hardhat");
const ethers = require("ethers");

async function main() {

    const [owner] = await hdEthers.getSigners();

    // 部署 WETH 合约
    const UniswapV2Pair = await hdEthers.getContractFactory("UniswapV2Pair");
    const hash = ethers.keccak256(UniswapV2Pair.bytecode);
    console.log('INIT HASH CODE:', hash)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
