import React, {useCallback, useEffect, useState} from 'react';
import {
  Box,
  Spacer,
  Text,
  VStack,
  Tag,
  Modal,
  keyframes,
  useDisclosure,
  ModalOverlay,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalContent,
  ModalHeader,
  Button
} from '@chakra-ui/react';
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
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [showPiggy, setShowPiggy] = useState<boolean>(true);

  const onPiggyClick = useCallback(() => {
    onOpen();
  }, []);

  useEffect(() => {
    setShowPiggy(!isOpen);
  }, [isOpen])

  return (
    <VStack w="100%" h="100%">
      <Spacer />
      <SectionCard
        title={'1. Find 🐷 from Burrito Wallet'}
        body={
          <Box w="100%" h="200px">
            {
              showPiggy && (
                    <Box as={motion.div} animation={animationX}>
                      <Box w="80px" h="80px" as={motion.div} animation={animationY}>
                        <VStack onClick={() => onPiggyClick()}>
                          <Text fontSize={'4xl'}>🐷</Text>
                          <Tag>catch me</Tag>
                        </VStack>
                      </Box>
                    </Box>
                )
            }
          </Box>
        }
      />
      <Spacer />
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>dummy</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default UserDemo;
