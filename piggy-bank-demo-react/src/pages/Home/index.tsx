import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Center,
  Container,
  Divider,
  Flex,
  Heading,
  Link,
  List,
  ListIcon,
  ListItem,
  OrderedList,
  Spacer,
  Text,
  UnorderedList,
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
          <SectionCard
            title="What is Piggy Bank?"
            body={
              <Box>
                <UnorderedList>
                  <ListItem>
                    Piggy Bank is where user rewards are stored, and can later be claimed
                  </ListItem>
                  <ListItem>
                    It removes manual airdrops thereby saving us time, let alone gas fees
                  </ListItem>
                  <ListItem>
                    Moreover, it enhances the gamification experience and provides a clear reason to
                    use the Burrito Wallet: complete quests and earn rewards!
                  </ListItem>
                </UnorderedList>
              </Box>
            }
          />
          <Spacer />
          <SectionCard
            title="How it works? - Partner"
            body={
              <Box>
                <OrderedList>
                  <ListItem>Fill a quest form</ListItem>
                  <ListItem>Send 💰 to Piggy Bank Vault(Smart Contract)</ListItem>
                </OrderedList>
                <Flex>
                  <Spacer />
                  <Button>Demo</Button>
                </Flex>
              </Box>
            }
          />
          <Spacer />
          <SectionCard
            title="How it works? - Burrito"
            body={
              <Box>
                ...
                <Flex>
                  <Spacer />
                  <Button>Demo</Button>
                </Flex>
              </Box>
            }
          />
          <Spacer />
          <SectionCard
            title="How it works? - User"
            body={
              <Box>
                <OrderedList>
                  <ListItem>Find 🐷</ListItem>
                  <ListItem>Complete a quest</ListItem>
                  <ListItem>Earn reward</ListItem>
                  <ListItem>Smash and claim!</ListItem>
                </OrderedList>
                <Flex>
                  <Spacer />
                  <Button>Demo</Button>
                </Flex>
              </Box>
            }
          />
          <Spacer />
          <Footer />
          <Spacer />
        </VStack>
      </Container>
    </Box>
  );
};

export default Home;
