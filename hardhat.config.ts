import { HardhatUserConfig } from "hardhat/config";

import "@nomicfoundation/hardhat-toolbox";

import * as dotenv from "dotenv";
dotenv.config();

const infuraKey = process.env.INFURA_KEY || ''
const liveNetworkPK = process.env.LIVE_PK || ''
const privateKey = [ liveNetworkPK ]
const ether_api_eth = process.env.ETHER_API_ETH || ''
const ether_api_base = process.env.ETHER_API_BASE || ''
// tasks
import "./src/tasks/accounts";

const ACCOUNTS = privateKey
const INFURA_KEY = infuraKey

const config: HardhatUserConfig = {
  solidity: {
    compilers:[
      {
        version: "0.8.10",
        settings: {
          optimizer: {
            enabled: true,
            runs: 9999,
          },
          metadata: {
            bytecodeHash: "none",
          },
        },
      },
      {
        version: "0.5.16",
        settings: {
          optimizer: {
            enabled: true,
            runs: 9999,
          },
          metadata: {
            bytecodeHash: "none",
          },
        },
      },
      {
        version: "0.6.6",
        settings: {
          optimizer: {
            enabled: true,
            runs: 9999,
          },
          metadata: {
            bytecodeHash: "none",
          },
        },
      }
    ],
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    hardhat: {
      blockGasLimit: 30000000,
    },
    dis: {
      url: `https://rpc.dischain.xyz`,
      accounts: ACCOUNTS
    },
    polygon: {
      url: `https://polygon-mainnet.infura.io/v3/${INFURA_KEY}`,
      accounts: ACCOUNTS
    },
  },
  etherscan: {
    apiKey: {
      mainnet: ether_api_eth,
      base:ether_api_base
      // arbitrumOne: "YOUR_ARBISCAN_API_KEY",
    },
    customChains: [
      {
        network: "zora",
        chainId: 7777777,
        urls: {
          apiURL: "https://explorer.zora.energy/api",
          browserURL: "https://explorer.zora.energy"
        }
      }
    ]
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  typechain: {
    outDir: "typechain-types",
    target: "ethers-v6",
  },
  paths: {
    tests: "./src/test",
  },
};

export default config;