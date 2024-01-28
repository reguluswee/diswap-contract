const hre = require("hardhat");

const MyContractABI = [{"inputs":[{"internalType":"address","name":"_diswAddr","type":"address"},{"internalType":"address","name":"_manager","type":"address"},{"internalType":"uint256","name":"_startTs","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_rewards","type":"uint256"}],"name":"AddReward","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"claimant","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Claimed","type":"event"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"bytes32[]","name":"_merkleProof","type":"bytes32[]"}],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"claimed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"diswToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"hasClaimed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"manager","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"merkleRoot","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"notifyReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_tokenAddress","type":"address"},{"internalType":"address","name":"_manager","type":"address"}],"name":"setDisw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_newMerkleRoot","type":"bytes32"}],"name":"setMerkleRoot","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startTs","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]
// npx hardhat run scripts/deploy_disairdrop.js --network dis
async function main() {

    const [owner] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", owner.address);
    const merkleRoot = "0x613bc2d355d83af72e3f0832b8ad380762a97a6c74351671caf00bb25d82794d";
    
    const DISWToken = "0x27Ec1be83d7A52a250b223E988A58849Cb29d5f6";
    const Manager = "0xDC6F036a6FE27c8e70F4cf3b2f87Bd97a6b29a2f"

    const AirdropFact = await ethers.getContractFactory("DISWAirdrop");
    const airdrop = await AirdropFact.deploy(DISWToken, Manager, 1706411200);

    // const airdrop = new ethers.Contract("0xfaee057CD4b23947E553E17Dc4984C414477cFf6", MyContractABI, owner);

    console.log("Airdrop contract deployed:", airdrop.target)

    const gasLimit = 500000
    const r = await airdrop.setMerkleRoot(merkleRoot, { gasLimit: gasLimit })

    console.log("setting merkle root:", r)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
