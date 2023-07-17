import React, { useCallback, useEffect, useState } from 'react';
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
  Stack,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Flex,
  Spinner,
  Center
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { SectionCard } from '../../components';
import { getSessionStorage, getSignPaymentHash, setSessionStorage } from '../../utils';
import {
  PIGGY_BANK_BALANCE,
  PIGGY_BANK_VAULT_ADDRESS,
  PIGGY_FRENS_CONTRACT_ADDRESS,
  QUEST_SESSION_STORAGE_KEY
} from '../../constants';
import { QuestForm } from '../../@types';
import { useWeb3 } from '../../context';
import { ethers } from 'ethers';
import { PiggyBankVault, PiggyFrens } from '../../contracts';

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
  const web3 = useWeb3();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [showPiggy, setShowPiggy] = useState<boolean>(true);
  const [quests, setQuests] = useState<string[]>([]);
  const [completed, setCompleted] = useState<string[]>([]);
  const [questDone, setQuestDone] = useState<boolean>(false);
  const [reward, setReward] = useState<string>('0');
  const [amount, setAmount] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(false);

  const onPiggyClick = useCallback(() => {
    onOpen();
  }, []);

  const onClickCheckBox = useCallback((item: string) => {
    setCompleted((prevValues) => {
      if (prevValues.includes(item)) {
        return prevValues.filter((each) => each !== item);
      } else {
        return [...prevValues, item];
      }
    });
  }, []);

  const onClickSave = useCallback(
    (value: string) => {
      if (web3) {
        web3.setBalance({
          ...web3.balance,
          piggyBankBalance: String(Number(web3.balance.piggyBankBalance) + Number(value))
        });
        setSessionStorage(
          PIGGY_BANK_BALANCE,
          String((Number(web3.balance.piggyBankBalance) + Number(value)).toFixed(2))
        );
      }
      setCompleted([]);
      onClose();
    },
    [web3]
  );

  const onBreak = async () => {
    try {
      if (web3) {
        const bigIntAmount = ethers.parseUnits(amount, 18);

        const hash = getSignPaymentHash(
          await web3.user.getAddress(),
          PIGGY_FRENS_CONTRACT_ADDRESS,
          bigIntAmount.toString(),
          PIGGY_BANK_VAULT_ADDRESS
        );
        const messageToSign = ethers.getBytes(hash);
        const signature = await web3.piggyBankVaultDeployer.signMessage(messageToSign);

        await (PiggyBankVault.connect(web3.user) as any).breakPiggyBank(
          PIGGY_FRENS_CONTRACT_ADDRESS,
          bigIntAmount,
          signature
        );

        setSessionStorage(
          PIGGY_BANK_BALANCE,
          `${Number(web3.balance.piggyBankBalance) - Number(amount)}`
        );

        web3.setBalance({
          ...web3.balance,
          piggyBankBalance: `${Number(web3.balance.piggyBankBalance) - Number(amount)}`,
          PBVBalance: ethers.formatUnits(
            await PiggyFrens.getBalanceOf(PIGGY_BANK_VAULT_ADDRESS),
            18
          ),
          userBalance: ethers.formatUnits(
            await PiggyFrens.getBalanceOf(await web3.user.getAddress()),
            18
          )
        });

        setAmount('');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const onCloseModal = () => {
    setCompleted([]);
    onClose();
  };

  useEffect(() => {
    setShowPiggy(!isOpen);
  }, [isOpen]);

  useEffect(() => {
    const quest = getSessionStorage<QuestForm>(QUEST_SESSION_STORAGE_KEY);
    if (quest) {
      setQuests(quest.values != null ? quest.values : []);
    }
  }, []);

  useEffect(() => {
    setQuestDone(quests.length !== 0 && quests.length === completed.length);
  }, [completed, quests]);

  useEffect(() => {
    questDone && setReward(`${(Math.random() * 100).toFixed(2)}`);
  }, [questDone]);

  useEffect(() => {
    if (web3?.balance?.piggyBankBalance) {
      setIsValid(Number(amount) > 0 && Number(web3.balance.piggyBankBalance) >= Number(amount));
    } else {
      setIsValid(false);
    }
  }, [amount, web3?.balance?.piggyBankBalance]);

  return (
    <VStack w="100%" h="100%">
      <Spacer />
      <SectionCard
        title={'1. Find 🐷 from Burrito Wallet'}
        body={
          <Box w="100%" h="200px">
            {showPiggy && (
              <Box as={motion.div} animation={animationX}>
                <Box w="80px" h="80px" as={motion.div} animation={animationY}>
                  <VStack onClick={() => onPiggyClick()}>
                    <Text fontSize={'4xl'}>🐷</Text>
                    <Tag>catch me</Tag>
                  </VStack>
                </Box>
              </Box>
            )}
          </Box>
        }
      />
      <Spacer />
      <SectionCard
        title={'2. Smash and claim rewards!'}
        body={
          <Box w="100%">
            <VStack w="100%">
              <FormControl isInvalid={!isValid}>
                <FormLabel mb="2">Amount to claim</FormLabel>
                <Input
                  type="number"
                  inputMode="numeric"
                  value={amount}
                  onChange={(e) => {
                    e.preventDefault();
                    // It's good to validate the input again here since not all browsers respect the 'pattern' attribute.
                    setAmount(e.target.value);
                  }}
                />
                <Box mt="8">
                  <Flex justifyContent="end">
                    <VStack>
                      <Button isDisabled={!isValid} onClick={onBreak}>
                        🐷 + 🔨 = 💰
                      </Button>
                    </VStack>
                  </Flex>
                </Box>
              </FormControl>
            </VStack>
          </Box>
        }
      />
      <Spacer />
      <Modal isOpen={isOpen} onClose={onCloseModal} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Complete quests and earn reward!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box w="100%">
              <Stack direction="column" spacing={2}>
                {quests.map((quest) => (
                  <Checkbox
                    key={`idx-${quest}`}
                    onChange={(e) => onClickCheckBox(e.target.value)}
                    value={quest}
                    colorScheme="pink">
                    {quest}
                  </Checkbox>
                ))}

                {questDone && (
                  <Box>
                    <Text>
                      {`Congrats!! You've earned ${reward}`}
                      <strong>PFS</strong> 🥳🥳🥳
                    </Text>
                  </Box>
                )}
              </Stack>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={onCloseModal}>
              Close
            </Button>
            {questDone && (
              <Button colorScheme="pink" onClick={() => onClickSave(reward)}>
                Save to Piggy Bank
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default UserDemo;
