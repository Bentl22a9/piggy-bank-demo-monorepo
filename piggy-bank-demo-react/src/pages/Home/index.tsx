import {
  Box,
  Button,
  Flex,
  ListItem,
  OrderedList,
  Spacer,
  UnorderedList,
  VStack
} from '@chakra-ui/react';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { SectionCard } from '../../components';

const Home = () => {
  const navigate = useNavigate();

  const onClickUserDemo = useCallback(() => {
    navigate('/user-demo');
  }, []);

  const onClickPartnerDemo = useCallback(() => {
    navigate('/partner-demo');
  }, []);

  const onClickBurritoDemo = useCallback(() => {
    navigate('/burrito-demo');
  }, []);

  return (
    <VStack w="100%" h="100%">
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
                Moreover, it enhances the gamification experience and provides a clear reason to use
                the Burrito Wallet: complete quests and earn rewards!
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
              <Button onClick={() => onClickPartnerDemo()}>Demo</Button>
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
              <Button onClick={() => onClickBurritoDemo()}>Demo</Button>
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
              <Button onClick={() => onClickUserDemo()}>Demo</Button>
            </Flex>
          </Box>
        }
      />
      <Spacer />
    </VStack>
  );
};

export default Home;
