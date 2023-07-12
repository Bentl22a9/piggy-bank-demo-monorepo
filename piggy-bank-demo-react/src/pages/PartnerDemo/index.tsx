import React, { useCallback, useEffect, useState } from 'react';
import { Box, Button, Checkbox, Flex, Spacer, Spinner, Stack, VStack } from '@chakra-ui/react';
import { SectionCard } from '../../components';

const PartnerDemo = () => {
  const [values, setValues] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formCompleted, setFormCompleted] = useState<boolean>(false);

  const onClickCheckBox = useCallback(
    (item: string) => {
      if (values.includes(item)) setValues(values.filter((each) => each !== item));
      else setValues([...values, item]);
    },
    [values]
  );

  const onFormButtonClick = useCallback(() => {
    setFormCompleted(true);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    console.log('values: ', values);
  }, [values]);

  return (
    <VStack w="100%">
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
            <Box>
              <Flex justifyContent="end">
                <Button
                  isDisabled={values.length === 0 || formCompleted}
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
      <Spacer/>
    </VStack>
  );
};

export default PartnerDemo;
