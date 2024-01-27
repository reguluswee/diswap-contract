const hre = require("hardhat");

// npx hardhat run scripts/deploy_disw.js --network dis
async function main() {

    const [owner] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", owner.address);

    const mintTargetAddress = "0xDC6F036a6FE27c8e70F4cf3b2f87Bd97a6b29a2f";
    const feeAddress = "0x0926c669CC58E83Da4b9F97ceF30f508500732a6";
    const swapRouter = "0x9De94bbb8A88F50E90a2F421d8Bd77F2E0cE4975";
    const wdis = "0xF9F1234761Ae9DE3c576C5491631C6FC0d213b5E";

    const DISW = await ethers.getContractFactory("DISW");
    const DISWToken = await DISW.deploy(mintTargetAddress, feeAddress, swapRouter, wdis);
    console.log(DISWToken)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
