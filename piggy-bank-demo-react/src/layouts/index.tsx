import React, { ReactNode } from 'react';
import { Box, Container } from '@chakra-ui/react';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box w="100vw" h="100vh" bg="blackAlpha.50">
      <Container w="100%" h="100%">
        {children}
      </Container>
    </Box>
  );
};

export default Layout;
