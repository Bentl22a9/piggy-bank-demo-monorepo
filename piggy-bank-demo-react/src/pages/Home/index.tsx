import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardHeader,
  Container,
  Divider,
  Flex,
  Heading,
  Link,
  Spacer,
  Text,
  VStack
} from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import PEPE from '../../assets/images/mmga.png';

const Title = () => {
  return (
    <Box w="100%" p={4}>
      <Flex>
        <Spacer />
        <Heading size="xl">Piggy Bank Demo 🐷 + 🔨 = 💰</Heading>
        <Spacer />
      </Flex>
    </Box>
  );
};

const Footer = () => {
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

type SectionCardProps = {
  title: string;
  body: ReactNode;
};

const SectionCard = ({ title, body }: SectionCardProps) => {
  return (
    <Card w="100%" boxShadow="md">
      <CardHeader>
        <Heading size="md">{title}</Heading>
        <Divider color="gray.100" mt="4" />
      </CardHeader>

      <CardBody>{body}</CardBody>
    </Card>
  );
};

const Home = () => {
  return (
    <Box w="100vw" h="100vh" bg="blackAlpha.50">
      <Container w="100%" h="100%">
        <VStack w="100%" h="100%">
          <Spacer />
          <Title />
          <Spacer />
          <SectionCard title="What is Piggy Bank?" body={<Text>dummy</Text>} />
          <Spacer />
          <SectionCard title="Partner demo" body={<Text>dummy</Text>} />
          <Spacer />
          <SectionCard title="Burrito demo" body={<Text>dummy</Text>} />
          <Spacer />
          <SectionCard title="User claim demo" body={<Text>dummy</Text>} />
          <Spacer />
          <Footer />
          <Spacer />
        </VStack>
      </Container>
    </Box>
  );
};

export default Home;
