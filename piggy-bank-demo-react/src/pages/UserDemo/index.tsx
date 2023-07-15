import React from 'react';
import { Box, Spacer, Text, VStack, keyframes, Tag } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { SectionCard } from '../../components';

const keyframesX = keyframes`
  0% { transform: translate(0,0)}
  100% { transform: translate(calc(100% - 40px), 0) }
`;

const keyframesY = keyframes`
  0% { transform: translate(0,0)}
  100% { transform: translate(0, 160px) }
`;

const animationX = `${keyframesX} 3s linear infinite alternate`;
const animationY = `${keyframesY} 1.2s linear infinite alternate`;

const UserDemo = () => {
  return (
    <VStack w="100%" h="100%">
      <Spacer />
      <SectionCard
        title={'1. Find 🐷 from Burrito Wallet'}
        body={
          <Box w="100%" h="200px">
            <Box as={motion.div} animation={animationX}>
              <Box w="80px" h="80px" as={motion.div} animation={animationY}>
                <VStack>
                  <Text fontSize={'4xl'}>🐷</Text>
                  <Tag>catch me</Tag>
                </VStack>
              </Box>
            </Box>
          </Box>
        }
      />
      <Spacer />
    </VStack>
  );
};

export default UserDemo;
