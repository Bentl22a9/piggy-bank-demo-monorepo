import React, { ReactNode } from 'react';
import { Box, Container, Text, HStack, Spacer, VStack, Center } from '@chakra-ui/react';
import { Footer, Title } from '../components';
import { useWeb3 } from '../context';

type LayoutProps = {
  title: string;
  children: ReactNode;
};

const Layout = ({ title, children }: LayoutProps) => {
  const web3 = useWeb3();

  return (
    <Box w="100vw" h="100vh" bg="blackAlpha.50">
      <Container w="100%" h="100%">
        <VStack w="100%" h="100%">
          <Spacer />
          <Title title={title} />
          <Spacer/>
          <VStack w="100%">
            <Text fontSize={'xl'}>PFS Balance</Text>
            <Text fontSize={'s'} color={'gray.400'}>* PFS(PiggyFrens) is ERC-20 token</Text>
            <Center>
              <HStack spacing={4}>
                <Text fontSize={'xl'}>🌯: {web3 && web3.balance.PBVDBalance} <strong>PFS</strong></Text>
                <Text fontSize={'xl'}>🤝: {web3 && web3.balance.PFSDBalance} <strong>PFS</strong></Text>
                <Text fontSize={'xl'}>🐷: {web3 && web3.balance.piggyBankBalance} <strong>PFS</strong></Text>
                <Text fontSize={'xl'}>🥰: {web3 && web3.balance.userBalance} <strong>PFS</strong></Text>
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
