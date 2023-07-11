import React from 'react';
import { Center, Spacer, Text, VStack } from '@chakra-ui/react';
import { SectionCard } from '../../components';

const BurritoDemo = () => {
  return (
    <VStack w="100%" h="100%">
      <Spacer />
      <SectionCard
        body={
          <Center>
            <Text>It&#39;s calm, nothing to do on our end 😇😇😇</Text>
          </Center>
        }
      />
      <Spacer />
    </VStack>
  );
};

export default BurritoDemo;
