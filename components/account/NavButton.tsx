import { As, Button, ButtonProps, HStack, Icon, Text } from '@chakra-ui/react'
import * as React from 'react'

import Link from 'next/link'

interface NavButtonProps extends ButtonProps {
  icon: As
  label: string
  link: string
}

export const NavButton = (props: NavButtonProps) => {
  const { icon, label, link = '', ...buttonProps } = props
  return (
    <Button as={Link} href={link} variant="ghost-on-accent" justifyContent="start" {...buttonProps}>
      <HStack spacing="3">
        <Icon as={icon} boxSize="6" color="on-accent-subtle" />
        <Text>{label}</Text>
      </HStack>
    </Button>
  )
}