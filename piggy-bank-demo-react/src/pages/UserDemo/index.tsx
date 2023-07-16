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
  Button,
  Checkbox,
  Stack
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { SectionCard } from '../../components';
import {getSessionStorage} from "../../utils";
import {QUEST_SESSION_STORAGE_KEY} from "../../constants";
import {QuestForm} from "../../@types";

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
  const [quests, setQuests] = useState<string[]>([]);
  const [completed, setCompleted] = useState<boolean>(false);

  const onPiggyClick = useCallback(() => {
    onOpen();
  }, []);

  const onClickCheckBox = useCallback(() => {

  }, [])

  useEffect(() => {
    setShowPiggy(!isOpen);
  }, [isOpen])

  useEffect(() => {
    const quest = getSessionStorage<QuestForm>(QUEST_SESSION_STORAGE_KEY);
    if(quest) {
      setQuests(quest.values != null ? quest.values : []);
    }
  }, [])

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
          <ModalBody>{
            <Box w="100%">
              <Stack direction="column" spacing={2}>
                {
                  quests.map((quest) => (
                      <Checkbox
                          key={`idx-${quest}`}
                          onChange={(e) => onClickCheckBox()}
                          value={quest}
                          colorScheme="pink">
                        {quest}
                      </Checkbox>
                  ))
                }
              </Stack>
            </Box>

          }</ModalBody>

          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={onClose}>
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
