import { useMemo } from 'react';
import Web3 from 'web3';
import TokenLockerFactory from '../contracts/TokenLockerFactory.json';
import Locker from "../contracts/TokenLocker.json";
import IDOFactory from '../contracts/IDOFactory.json';
import IDOPool from "../contracts/IDOPool.json";
import STORAGE from '../contracts/Storage.json';
import ERC20 from '../contracts/ERC20.json';
import { STORAGE_NETWORK_ID } from '../constants';
import { networks } from '../constants/networksInfo';
import { getContract, isAddress } from '../utils/utils';
import { useActiveWeb3React } from './index';
import { JsonRpcProvider } from '@ethersproject/providers'

export function useStorageContract() {
  const { storage, rpc } = networks[STORAGE_NETWORK_ID];

  return useMemo(() => {
    if (!storage) return null;

    try {
      const web3 = new Web3(rpc);
      return new web3.eth.Contract(STORAGE.abi, storage);
    } catch (error) {
      console.error('Failed to get Storage contract', error);
    }

    return null;
  }, [storage, rpc]);
}

// returns null on errors
function useContract(address, ABI, withSignerIfPossible = true, customChainId = 97) {
  let { library, account } = useActiveWeb3React()

  if (!account && customChainId) {
    console.log('>>> networks[customChainId].rpc', networks[customChainId].rpc)
    const library = new JsonRpcProvider(networks[customChainId].rpc)
    console.log('>>> new lib', library)
  }
  return useMemo(() => {
    if (!address || !isAddress(address) || !ABI || !library) {
      console.log('>>> no address')
      return null
    }
    try {
      return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined)
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [address, ABI, library, withSignerIfPossible, account])
}

export function useLockerFactoryContract(address, withSignerIfPossible, customChainId) {
  return useContract(address, TokenLockerFactory.abi, withSignerIfPossible, customChainId)
}

export function useLockerContract(address, withSignerIfPossible, customChainId) {
  return useContract(address, Locker.abi, withSignerIfPossible, customChainId)
}

export function useIDOFactoryContract(address, withSignerIfPossible, customChainId) {
  return useContract(address, IDOFactory.abi, withSignerIfPossible, customChainId)
}

export function useTokenContract(tokenAddress, withSignerIfPossible, customChainId) {
  return useContract(tokenAddress, ERC20.abi, withSignerIfPossible, customChainId)
}

export function useIDOPoolContract(IDOAddress, withSignerIfPossible, customChainId) {
  console.log('>>> useIDOFactoryContract', customChainId)
  return useContract(IDOAddress, IDOPool.abi, withSignerIfPossible, customChainId)
}
