import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { Box, Container, Text, HStack, Spacer, VStack, Center } from '@chakra-ui/react';
import { Footer, Title } from '../components';
import { useWeb3 } from '../context';
import { PiggyFrens } from '../contracts';
import { ethers } from 'ethers';

type LayoutProps = {
  title: string;
  children: ReactNode;
};

const Layout = ({ title, children }: LayoutProps) => {
  const web3 = useWeb3();

  const [PBVDBalance, setPBVDBalance] = useState('');
  const [PFSDBalance, setPFSDBalance] = useState('');
  const [piggyBankBalance, setPiggyBankBalance] = useState('0.0');
  const [userBalance, setUserBalance] = useState('');

  const init = useCallback(async () => {
    if (web3) {
      setPBVDBalance(
        ethers.formatUnits(
          await PiggyFrens.getBalanceOf(await web3.piggyBankVaultDeployer.getAddress()),
          18
        )
      );
      setPFSDBalance(
        ethers.formatUnits(
          `${await PiggyFrens.getBalanceOf(await web3.piggyFrensDeployer.getAddress())}`,
          18
        )
      );
      setUserBalance(
        ethers.formatUnits(await PiggyFrens.getBalanceOf(await web3.user.getAddress()), 18)
      );
    }
  }, [web3]);

  useEffect(() => {
    init();
  }, [web3]);

  return (
    <Box w="100vw" h="100vh" bg="blackAlpha.50">
      <Container w="100%" h="100%">
        <VStack w="100%" h="100%">
          <Spacer />
          <Title title={title} />
          <VStack w="100%">
            <Text fontSize={'xl'}>PFS Balance</Text>
            <Center>
              <HStack spacing={2}>
                <Text>🌯: {PBVDBalance} PFS</Text>
                <Text>🤝: {PFSDBalance} PFS</Text>
                <Text>🐷: {piggyBankBalance} PFS</Text>
                <Text>🥰: {userBalance} PFS</Text>
              </HStack>
            </Center>
          </VStack>
          <Spacer />
          {children}
          <Spacer />
          <Footer />
          <Spacer />
        </VStack>
      </Container>
    </Box>
  );
};

export default Layout;
