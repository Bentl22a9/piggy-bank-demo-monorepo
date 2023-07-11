import React, { ReactNode } from 'react';
import { Box, Container, Spacer, VStack } from '@chakra-ui/react';
import { Footer, Title } from '../components';

type LayoutProps = {
  title: string;
  children: ReactNode;
};

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <Box w="100vw" h="100vh" bg="blackAlpha.50">
      <Container w="100%" h="100%">
        <VStack w="100%" h="100%">
          <Spacer />
          <Title title={title} />
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
