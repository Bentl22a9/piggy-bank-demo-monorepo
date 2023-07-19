import React, { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Spacer,
  Spinner,
  Stack,
  useToast,
  VStack
} from '@chakra-ui/react';
import { SectionCard } from '../../components';
import { PiggyFrens } from '../../contracts';
import { useWeb3 } from '../../context';
import { ethers } from 'ethers';
import {formatDecimal, setSessionStorage} from '../../utils';
import { PIGGY_BANK_VAULT_ADDRESS, QUEST_SESSION_STORAGE_KEY } from '../../constants';

const PartnerDemo = () => {
  const web3 = useWeb3();
  const toast = useToast();

  const [values, setValues] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [questFormDone, setQuestFormDone] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>('');

  const onClickCheckBox = useCallback((item: string) => {
    setValues((prevValues) => {
      if (prevValues.includes(item)) {
        return prevValues.filter((each) => each !== item);
      } else {
        return [...prevValues, item];
      }
    });
  }, []);

  useEffect(() => {
    setSessionStorage(QUEST_SESSION_STORAGE_KEY, {
      values
    });
  }, [values]);

  const depositPFS = useCallback(async () => {
    if (web3) {
      setIsSending(true);
      await (PiggyFrens.connect(web3.piggyFrensDeployer) as any).transferFixedAmount(
        PIGGY_BANK_VAULT_ADDRESS,
        ethers.parseUnits(amount, 18)
      );
      setIsSending(false);
      toast({
        title: `Partner Deposited!`,
        description: `Partner deposited ${amount} PFS to PiggyBankVault 🥰`,
        status: 'success',
        duration: 3000,
        isClosable: true
      });
      web3.setBalance({
        ...web3.balance,
        PBVBalance: formatDecimal(ethers.formatUnits(await PiggyFrens.getBalanceOf(PIGGY_BANK_VAULT_ADDRESS), 18)),
        PFSDBalance: formatDecimal(ethers.formatUnits(
            `${await PiggyFrens.getBalanceOf(await web3.piggyFrensDeployer.getAddress())}`,
            18
        ))
      });
    }
  }, [web3, amount]);

  const onFormButtonClick = useCallback(() => {
    setQuestFormDone(true);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <VStack w="100%" h="100%">
      <Spacer />
      <SectionCard
        title={'1. Fill out quest form'}
        body={
          <Box w="100%">
            <Stack direction="column" spacing={2}>
              <Checkbox
                onChange={(e) => onClickCheckBox(e.target.value)}
                value={'follow twitter account'}
                colorScheme="pink">
                follow twitter account
              </Checkbox>
              <Checkbox
                onChange={(e) => onClickCheckBox(e.target.value)}
                value={'execute swap'}
                colorScheme="pink">
                execute swap
              </Checkbox>
              <Checkbox
                onChange={(e) => onClickCheckBox(e.target.value)}
                value={'sign up for discord'}
                colorScheme="pink">
                sign up for discord
              </Checkbox>
              <Checkbox
                onChange={(e) => onClickCheckBox(e.target.value)}
                value={'share link to frens'}
                colorScheme="pink">
                share link to frens
              </Checkbox>
              <Checkbox
                onChange={(e) => onClickCheckBox(e.target.value)}
                value={'retweet twitter post'}
                colorScheme="pink">
                retweet twitter post
              </Checkbox>
            </Stack>
            <Box mt="8">
              <Flex justifyContent="end">
                <Button
                  isDisabled={values.length === 0 || questFormDone}
                  isLoading={isLoading}
                  onClick={() => onFormButtonClick()}
                  spinner={<Spinner />}>
                  Done
                </Button>
              </Flex>
            </Box>
          </Box>
        }
      />
      <Spacer />
      <SectionCard
        title="2. Send it!"
        body={
          <Box>
            <FormControl>
              <FormLabel mb="2">How much?</FormLabel>
              <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
              <FormHelperText>As much as you can:)</FormHelperText>
              <Box mt="8">
                <Flex justifyContent="end">
                  <Button
                    isDisabled={!questFormDone}
                    isLoading={isSending}
                    onClick={async () => {
                      await depositPFS();
                    }}
                    spinner={<Spinner />}>
                    Send
                  </Button>
                </Flex>
              </Box>
            </FormControl>
          </Box>
        }
      />
      <Spacer />
    </VStack>
  );
};

export default PartnerDemo;
