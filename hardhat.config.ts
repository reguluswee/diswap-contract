import { HardhatUserConfig } from "hardhat/config";

import "@nomicfoundation/hardhat-toolbox";

import * as dotenv from "dotenv";
dotenv.config();

// tasks
import "./src/tasks/accounts";

const config: HardhatUserConfig = {
  networks: {
    hardhat: {
      blockGasLimit: 30000000,
    },
  },
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