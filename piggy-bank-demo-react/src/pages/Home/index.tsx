import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardFooter,
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

type SectionCardProps = {
  title: string;
  body: ReactNode;
};

const SectionCard = ({ title, body }: SectionCardProps) => {
  return (
    <Card w="100%">
      <CardHeader>
        <Heading size="md">{title}</Heading>
        <Divider color="gray.100" mt="4" />
      </CardHeader>

      <CardBody>{body}</CardBody>

      <CardFooter>
        <Box w="100%">
          <Flex flexDirection="row" justifyContent="end" alignItems="center">
            <Avatar size="sm" name="PEPEISLOVE" src={PEPE} />
            <Link
              href="https://github.com/Bentl22a9/piggy-bank-demo-monorepo"
              color="green.400"
              textDecor="underline">
              Sauce?
            </Link>
          </Flex>
        </Box>
      </CardFooter>
    </Card>
  );
};

const Home = () => {
  return (
    <Box w="100vw" h="100vh">
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
        </VStack>
      </Container>
    </Box>
  );
};

export default Home;
