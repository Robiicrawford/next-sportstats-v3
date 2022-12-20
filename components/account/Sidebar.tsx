import { Flex, Stack, Text } from '@chakra-ui/react'
import * as React from 'react'

import {
  FiSettings,
  FiCamera,
  FiHome,
  FiAward,
  FiUser,
  FiBarChart2
} from 'react-icons/fi'

import {GiFinishLine} from 'react-icons/gi'

import { NavButton } from './NavButton'

export const Sidebar = () => (
  <Flex
    flex="1"
    bg="ss_green"
    color="on-accent"
    overflowY="auto"
    maxW={{ base: 'full', sm: 'xs' }}
    py={{ base: '6', sm: '8' }}
    px={{ base: '4', sm: '6' }}
  >
    <Stack justify="space-between" spacing="1" width="full">
      <Stack spacing="8" shouldWrapChildren>
        <Stack spacing="1">
          <NavButton label="Home" link='/account' icon={FiHome} />
          <NavButton label="Settings" icon={FiSettings} link='/account/settings' aria-current="page" />
        </Stack>
        <Stack>
          <Text fontSize="sm" color="on-accent-muted" fontWeight="medium">
            My Stuff
          </Text>
          <Stack spacing="1">
            <NavButton label="Results" link='/account/results' icon={GiFinishLine} />
            <NavButton label="Awards" link='/account/awards' icon={FiAward} />
            <NavButton label="Pictures" link='/account/photos' icon={FiCamera} />
            <NavButton label="Friends" link='/account/friends' icon={FiUser} />
            <NavButton label="Stats" link='/account/stats' icon={FiBarChart2} />
          </Stack>
        </Stack>
        {/*<Stack>
          <Text fontSize="sm" color="on-accent-muted" fontWeight="medium">
            Social
          </Text>
          <Stack spacing="1">
            <NavButton label="Twitter" icon={FiTwitter} />
            <NavButton label="Instagram" icon={FiInstagram} />
            <NavButton label="Linkedin" icon={FiLinkedin} />
          </Stack> 
        </Stack>*/}
      </Stack>
    </Stack>
  </Flex>
)