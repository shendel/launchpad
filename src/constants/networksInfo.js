export const networks = {
  1: {
    name: "Ethereum",
    rpc: 'https://rpc.ankr.com/eth',
    chainId: 1,
    explorer: "https://etherscan.io",
    color: "#627EEA",
    multicall: "0x5ba1e12693dc8f9c48aad8770482f4739beed696",
    ENSRegistry: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
    fromBlock: 16669000,
    baseCurrency: {
      decimals: 18,
      name: "ETH",
      symbol: "ETH"
    },
    wrappedToken: {
      address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      name: "Wrapped Etherer",
      symbol: "WETH"
    }
  },
  5: {
    name: "Görli",
    rpc: "https://eth-goerli.g.alchemy.com/v2/wNvkA78LYEG7fb5S5z4nJIfB22dAcvuH", //"https://rpc.ankr.com/eth_goerli",
    chainId: 5,
    explorer: "https://goerli.etherscan.io",
    color: "#f6c343",
    storage: "0x171a664f12672a61E4e948BC7Fd38eB34b64a15b",
    multicall: "0x5ba1e12693dc8f9c48aad8770482f4739beed696",
    ENSRegistry: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
    fromBlock: 8385000,
    baseCurrency: {
      decimals: 18,
      name: "ETH",
      symbol: "ETH"
    },
    wrappedToken: {
      address: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
      name: "Wrapped Ether",
      symbol: "WETH"
    }
  },
  56: {
    name: "BSC",
    rpc: "https://bscrpc.com/",
    chainId: 56,
    explorer: "https://bscscan.com",
    color: "#CC9B00",
    storage: "0xa7472f384339D37EfE505a1A71619212495A973A",
    multicall: "0xcA11bde05977b3631167028862bE2a173976CA11",
    fromBlock: 25825000,
    baseCurrency: {
      decimals: 18,
      name: "BNB",
      symbol: "BNB"
    },
    wrappedToken: {
      address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
      name: "Wrapped BNB",
      symbol: "WBNB"
    }
  },
  97: {
    name: "BSC Testnet",
    rpc: "https://data-seed-prebsc-2-s3.binance.org:8545",
    chainId: 97,
    explorer: "https://testnet.bscscan.com/",
    color: "#CC9B00",
    multicall: "0xcA11bde05977b3631167028862bE2a173976CA11",
    fromBlock: 27113000,
    baseCurrency: {
      decimals: 18,
      name: "BNB",
      symbol: "BNB"
    },
    wrappedToken: {
      address: "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd",
      name: "Wrapped BNB",
      symbol: "WBNB"
    }
  },
  34: {
    name: "SCAI Mainnet",
    rpc: "https://mainnet-rpc.scai.network/",
    chainId: 34,
    explorer: "https://explorer.securechain.ai/",
    color: "#CC9B00",
    storage: "0x48d7ac38530697aDB91061B6D141C8c763edE565",
    multicall: "0x87a6417F03E106A05698F18829bB3a40CBC54f61",
    fromBlock: 25825000,
    baseCurrency: {
      decimals: 18,
      name: "SCAI",
      symbol: "SCAI"
    },
    wrappedToken: {
      address: "0xe30E2F0aFD56dacF8b8D4afBc594f63eE21B9441",
      name: "Wrapped SCAI",
      symbol: "WSCAI"
    }
  },
  420044: {
    name: "Vector (testnet)",
    rpc: "https://testnet-rpc.vsgofficial.com",
    chainId: 420044,
    explorer: "https://testnet-scan.vsgofficial.com/",
    color: "#CC9B00",
    multicall: "0x8D3185295E7800FB687BA75e8F9685e3D2435676",
    fromBlock: 366635,
    baseCurrency: {
      decimals: 18,
      name: "VSG",
      symbol: "VSG"
    },
    wrappedToken: {
      address: "0xc6807ddc8DfB31c66114eFFaDe883b3C8eABBA83",
      name: "Wrapped VSG",
      symbol: "WVSG"
    }
  },
}

export const chainRouter = {
  1: [
    {
      name: "Uniswap",
      FACTORY: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
      WETH: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      ROUTER: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
    },
  ],
  5: [
    {
      name: "Uniswap",
      FACTORY: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
      WETH: "0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6",
      ROUTER: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
    },
  ],
  56: [
    {
      name: "PancakeSwap",
      FACTORY: "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73",
      WETH: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
      ROUTER: "0x10ED43C718714eb63d5aA57B78B54704E256024E",
    },
  ],
  97: [
    {
      name: "PancakeSwap",
      FACTORY: "0x6725F303b657a9451d8BA641348b6761A6CC7a17",
      WETH: "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd",
      ROUTER: "0xD99D1c33F9fC3444f8101754aBC46c52416550D1",
    },
  ],
  34: [
    {
      name: "LaunchpadSwap",
      FACTORY: "0xd4a711333C41cC01B005dBE5389BcFb99D4f5d64",
      WETH: "0xe30E2F0aFD56dacF8b8D4afBc594f63eE21B9441",
      ROUTER: "0xC3B6Bb923Cd49661563956730432c7aA97eF7f9B",
    },
  ],
  420044: [
    {
      name: "LaunchpadSwap",
      FACTORY: "0x89f15Ae832e67EFC7e1dd08abf530EF271DCf84E",
      WETH: "0xc6807ddc8DfB31c66114eFFaDe883b3C8eABBA83",
      ROUTER: "0x9FE00944ec08c6fcDf7B5012DE6EAa58Ed74E13e",
    },
  ],
};


export default {
  chainRouter,
  networks,
}
