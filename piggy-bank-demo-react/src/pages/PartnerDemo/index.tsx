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

const PartnerDemo = () => {
  const web3 = useWeb3();
  const toast = useToast();

  const [values, setValues] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [questFormDone, setQuestFormDone] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>('');

  const onClickCheckBox = useCallback(
    (item: string) => {
      if (values.includes(item)) setValues(values.filter((each) => each !== item));
      else setValues([...values, item]);
    },
    [values]
  );

  const depositPFS = useCallback(async () => {
    if (web3) {
      setIsSending(true);
      await (PiggyFrens.connect(web3.piggyFrensDeployer) as any).transferFixedAmount(
        await web3.piggyBankVaultDeployer.getAddress(),
        ethers.parseUnits(amount, 18)
      );
      setIsSending(false);
      toast({
        title: `Partner Deposit`,
        description: `Partner deposited ${amount} PFS to PiggyBankVault🥰`,
        status: 'success',
        duration: 2000,
        isClosable: true
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

  useEffect(() => {
    console.log('values: ', values);
  }, [values]);

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
