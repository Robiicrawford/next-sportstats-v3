import React from "react";
import Link from 'next/link'

import { useTranslation } from 'next-i18next';

import { 
  Box, Flex, Text, Heading,
  Card, CardBody, CardFooter, ButtonGroup,
  Button, Avatar, Image, Stack, HStack,
  useColorModeValue
} from '@chakra-ui/react';

import {msToTime} from '../../utils/formatTime'

export default function Settings({result}) {
  const { t } = useTranslation('public');

  return (
    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow='hidden'
      variant='outline'
    >
      <Image
        objectFit='cover'
        maxW={{ base: '100%', sm: '250px' }}
        src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
        alt={result.EL}
      />
      <Stack>
        <CardBody pb='0'>
          <Heading size="sm" fontWeight="extrabold" letterSpacing="tight">{result.EL}</Heading>
          <Text color={useColorModeValue('gray.600', 'gray.400')}>
            {result.RL} | {result.RDT} | VR
          </Text>
          <HStack spacing='8'>
            <Text py='2'>
              Total Time <br/>
              {msToTime(result.CD)}
            </Text>

            <Text py='2'>
              Age group <br/>
              {result.AC}
            </Text>

            <Text py='2'>
              Rank <br/>
              {result.RO}
            </Text>

          </HStack>

        </CardBody>

        <CardFooter pt='1' >
          <ButtonGroup
            variant='outline'
            colorScheme='green'
            size='sm'
          >
            <Button as={Link} href={`/results/${result.RID}/${result.BIB}`} variant='solid'>
              Submit Results
            </Button>
            <Button as={Link} href={`/results/${result.RID}/${result.BIB}`}  >
              View Results
            </Button>
            
          </ButtonGroup>
        </CardFooter>
      </Stack>
     
    </Card>

  );
}
