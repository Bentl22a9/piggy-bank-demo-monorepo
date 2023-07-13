import React, {
  createContext,
  ReactNode,
  useEffect,
  useState,
  useContext,
  useCallback,
  useMemo
} from 'react';
import { ethers, JsonRpcProvider } from 'ethers';
import { EthersProvider } from '../contracts';

type Web3ContextValue = {
  provider: JsonRpcProvider;
  piggyBankVaultDeployer: ethers.Signer;
  piggyFrensDeployer: ethers.Signer;
  user: ethers.Signer;
};

const Web3Context = createContext<Web3ContextValue | undefined>(undefined);

type Web3ProviderProps = {
  children: ReactNode;
};

export const Web3Provider = ({ children }: Web3ProviderProps) => {
  const [provider, setProvider] = useState<ethers.JsonRpcProvider | undefined>(undefined);
  const [signers, setSigners] = useState<ethers.Signer[]>([]);

  const getSigners = useCallback(async () => {
    provider && setSigners(await provider.listAccounts());
  }, [provider]);

  useEffect(() => {
    setProvider(EthersProvider);
  }, []);

  useEffect(() => {
    getSigners();
  }, [provider]);

  const value = useMemo<Web3ContextValue | undefined>(() => {
    if (provider && signers && signers.length > 0) {
      return {
        provider,
        piggyBankVaultDeployer: signers[0],
        piggyFrensDeployer: signers[1],
        user: signers[2]
      };
    }
  }, [provider, signers]);

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
};

export const useWeb3 = () => useContext(Web3Context);
