import React, {
  createContext,
  ReactNode,
  useEffect,
  useState,
  useContext,
  useCallback,
  useMemo,
} from 'react';
import { ethers, JsonRpcProvider } from 'ethers';
import { EthersProvider, PiggyFrens } from '../contracts';

type Web3ContextValue = {
  provider: JsonRpcProvider;
  piggyBankVaultDeployer: ethers.Signer;
  piggyFrensDeployer: ethers.Signer;
  user: ethers.Signer;
  balance: Balance;
  setBalance: React.Dispatch<React.SetStateAction<Balance>>
};

const Web3Context = createContext<Web3ContextValue | undefined>(undefined);

type Web3ProviderProps = {
  children: ReactNode;
};

type Balance = {
  PBVDBalance: string;
  PFSDBalance: string;
  piggyBankBalance: string;
  userBalance: string;
}

export const Web3Provider = ({ children }: Web3ProviderProps) => {
  const [provider, setProvider] = useState<ethers.JsonRpcProvider | undefined>(undefined);
  const [signers, setSigners] = useState<ethers.Signer[]>([]);
  const [balance, setBalance] = useState<Balance>({
    PBVDBalance: "0",
    PFSDBalance: "0",
    piggyBankBalance: "0",
    userBalance: "0"
  });

  const getSigners = useCallback(async () => {
    provider && setSigners(await provider.listAccounts());
  }, [provider]);

  const loadBalance = useCallback(async () => {
    if (provider && signers && signers.length > 0) {

      setBalance({
        ...balance,
        PBVDBalance: ethers.formatUnits(
          await PiggyFrens.getBalanceOf(await signers[0].getAddress()),
          18
        ),
        PFSDBalance: ethers.formatUnits(
          `${await PiggyFrens.getBalanceOf(await signers[1].getAddress())}`,
          18
        ),
        userBalance: ethers.formatUnits(await PiggyFrens.getBalanceOf(await signers[2].getAddress()), 18)
      })
    }
  }, [provider, signers])

  useEffect(() => {
    setProvider(EthersProvider);
  }, []);

  useEffect(() => {
    getSigners();
  }, [provider]);

  useEffect(() => {
    loadBalance();
  }, [provider, signers])

  const value = useMemo<Web3ContextValue | undefined>(() => {
    if (provider && signers && signers.length > 0) {
      return {
        provider,
        piggyBankVaultDeployer: signers[0],
        piggyFrensDeployer: signers[1],
        user: signers[2],
        balance,
        setBalance
      };
    }
  }, [provider, signers, balance]);

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
};

export const useWeb3 = () => useContext(Web3Context);
