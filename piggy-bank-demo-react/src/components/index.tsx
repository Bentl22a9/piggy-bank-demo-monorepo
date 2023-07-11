import React from 'react';
import { Avatar, Box, Flex, Heading, Link, Spacer } from '@chakra-ui/react';
import PEPE from '../assets/images/mmga.png';

export const Footer = () => {
  return (
    <Box w="100%">
      <Flex flexDirection="row" justifyContent="center" alignItems="center">
        <Avatar size="sm" name="PEPEISLOVE" src={PEPE} />
        <Link
          href="https://github.com/Bentl22a9/piggy-bank-demo-monorepo"
          color="green.400"
          textDecor="underline"
          target="_blank">
          Sauce?
        </Link>
      </Flex>
    </Box>
  );
};

type TitleProps = {
  title: string;
};

export const Title = ({ title }: TitleProps) => {
  return (
    <Box w="100%" p={4}>
      <Flex>
        <Spacer />
        <Heading size="xl">{title}</Heading>
        <Spacer />
      </Flex>
    </Box>
  );
};
