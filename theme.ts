import { theme as proTheme } from '@chakra-ui/pro-theme'
import { extendTheme  } from '@chakra-ui/react'

const colors = {
  
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
 
    background: '#FFFFFF',
    surface: '#242526',
    wash: '#18191a',
    muted: '#f0e6f6',
    gray: '#e4e6eb',
    text: '#e4e6eb',

    slate: '#2f4f4ff7',

    green: '#005C30',
    ss_green: '#005C30',
    ss_green_old: '#0CAA56',
    
    primary: '#000',
    secondary: '#0CAA56',
    highlight: '#0CAA56',

}

const queries = {
    xs: '@media screen and (max-width: 40em)',
    sm: '@media screen and (min-width: 40em) and (max-width: 52em)',
    'sm+': '@media screen and (min-width: 40em)',
    md: '@media screen and (min-width: 52em) and (max-width: 64em)',
    'md+': '@media screen and (min-width: 52em)',
    lg: '@media screen and (min-width: 64em)',
  }

export const theme = extendTheme(
  {
    colors: { ...colors , ...proTheme.colors, brand: proTheme.colors.green },
  },
  queries,
  proTheme,
)