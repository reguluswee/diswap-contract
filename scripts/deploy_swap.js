// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers } = require("hardhat");

//npx hardhat run scripts/deploy.js --network ganache
//验证方式一
//npx hardhat flatten ./contracts/Contract.sol > ./flatten/Contract_zot_flatten.sol
//验证方式二
//npx hardhat verify --network goerli 0xdA35C2e65143262FfC2ef608Ad341821af55fb42

//npx hardhat run scripts/dormy/deploy_dormy.js --network polygonMumbai
async function main() {

    const [owner] = await ethers.getSigners();

    let WDIS_ADDRESS = "0xF9F1234761Ae9DE3c576C5491631C6FC0d213b5E"

    // 部署 WETH 合约
    // const WDIS = await ethers.getContractFactory("WDIS");
    // const wids = await WDIS.deploy();
    // console.log("WDIS deployed to:", wids.target);

    const UniswapV2Factory = await ethers.getContractFactory("UniswapV2Factory");
    const uniswapV2Factory = await UniswapV2Factory.deploy(owner.address);

    console.log('UniswapV2Factory deployed to:', uniswapV2Factory.target);

    const UniswapV2Router02 = await ethers.getContractFactory("UniswapV2Router02");
    const uniswapV2Router02 = await UniswapV2Router02.deploy(uniswapV2Factory.target, WDIS_ADDRESS);//wids.target);

    console.log('UniswapV2Router02 deployed to:', uniswapV2Router02.target);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
