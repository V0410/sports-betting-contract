import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    hardhat: {
    },
    // bsc_testnet: {
    //   url: process.env.BSC_TESTNET_RPC,
    //   chainId: 97,
    //   gasPrice: 20000000000,
    //   accounts: [process.env.PRIVATE_KEY!]
    // },
    // bsc_mainnet: {
    //   url: process.env.BSC_MAINNET_RPC,
    //   chainId: 56,
    //   gasPrice: 20000000000,
    //   accounts: [process.env.PRIVATE_KEY!]
    // },
    base_testnet: {
      url: process.env.BASE_TESTNET_RPC,
      chainId: 84532,
      gasPrice: 20000000000,
      accounts: [process.env.PRIVATE_KEY!]
    },
    base_mainnet: {
      url: process.env.BASE_MAINNET_RPC,
      chainId: 8453,
      gasPrice: 20000000000,
      accounts: [process.env.PRIVATE_KEY!]
    }
  },
  etherscan: {
    apiKey: process.env.BASE_SEPOLIASCAN_API_KEY,
    customChains: [
      {
        network: "base_testnet",
        chainId: 84532,
        urls: {
          apiURL: "https://api-sepolia.basescan.org/api",
          browserURL: "https://sepolia.basescan.org/"
        }
      }
    ]
  },
  solidity: {
    compilers: [
      {
        version: "0.4.17",
        settings: {
          optimizer: {
            enabled: true
          }
        },
      },
      {
        version: "0.4.24",
        settings: {
          optimizer: {
            enabled: true
          }
        },
      },
      {
        version: "0.5.16",
        settings: {
          optimizer: {
            enabled: true
          }
        },
      },
      {
        version: "0.6.6",
        settings: {
          optimizer: {
            enabled: true
          }
        },
      },
      {
        version: "0.8.10",
        settings: {
          optimizer: {
            enabled: true
          }
        },
      },
      {
        version: "0.8.20",
        settings: {
          optimizer: {
            enabled: true
          }
        },
      },
      {
        version: "0.8.24",
        settings: {
          optimizer: {
            enabled: true
          }
        },
      },
    ],
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 20000
  }
};

export default config;
