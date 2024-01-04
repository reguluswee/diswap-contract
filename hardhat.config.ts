import { HardhatUserConfig } from "hardhat/config";

import "@nomicfoundation/hardhat-toolbox";

import * as dotenv from "dotenv";
dotenv.config();

// tasks
import "./src/tasks/accounts";

const ACCOUNTS = [""]
const INFURA_KEY = "3a487e3317dd401caff0ec9033079989"

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
    mainnet: {
      url: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
      accounts: ACCOUNTS
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${INFURA_KEY}`,
      accounts: ACCOUNTS
    },
    polygon: {
      url: `https://polygon-mainnet.infura.io/v3/${INFURA_KEY}`,
      accounts: ACCOUNTS
    },
    polygonMumbai: {
      url: `https://polygon-mumbai.infura.io/v3/${INFURA_KEY}`,
      accounts: ACCOUNTS
    },
    optimism: {
      url: `https://optimism-mainnet.infura.io/v3/${INFURA_KEY}`,
      accounts: ACCOUNTS
    },
    arbitrum: {
      url: `https://arbitrum-mainnet.infura.io/v3/${INFURA_KEY}`,
      accounts: ACCOUNTS
    },
    linea: {
      url: `https://linea-mainnet.infura.io/v3/${INFURA_KEY}`,
      accounts: ACCOUNTS
    },
    zora: {
      url: `https://rpc.zora.energy`,
      accounts: ACCOUNTS
    },
    base: {
      url: `https://developer-access-mainnet.base.org`,
      accounts: ACCOUNTS
    },
    ganache: {
      url: `HTTP://127.0.0.1:8545`,
      accounts: ["c4d4119e5379948057e06ba17aa1a6523191beacfe0d70f2a28e04801fb32683","7dab2ba7c0260fd2c337d8f546aa5123ef0edf9d48b984c2df4f2ef81fe860c0","c30cb72618043bbc6586f60372ffa2ae399d2301982707b3f19a457149238d07"]
    }
  },
  etherscan: {
    apiKey: {
      mainnet: "5DQX3VQ8B3K7SZPJXCH6WV6AACS6PX2676",
      goerli: "5DQX3VQ8B3K7SZPJXCH6WV6AACS6PX2676",
      optimisticEthereum: "8BZPGY1VAPCT5QV4ZR8SFG1TUHU3ED7HAW",
      base:"DAF2QYN573FTR1A7BW83S6SRA1FXG374VW"
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