import NextLink  from 'next/link'
import { useTranslation } from 'next-i18next';

import { Flex, Center, Box, Heading, Grid, GridItem, Link as LinkOut, HStack, Stack  } from '@chakra-ui/react'
import styled from 'styled-components';
import styles from './Footer.module.css'

export default function Footer() {
  const { t } = useTranslation('app');
  return <>
    <footer className={styles.footer}>
      <Flex flexWrap='wrap' w='100%' alignItems='center' gap='2'>
        <Center flexWrap='wrap' py='8' w='100%'>
          <Box w='100%' ><Heading textAlign='center'>{t('footer.title')}</Heading></Box>
          <Center w='100%'>
            <HStack spacing='24px' mt='3'>

                  <LinkOut target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/sportstatsworld">
                    <Icon>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 35"
                        aria-hidden="false" aria-label="Navigate to Instagram" focusable="false"
                       >
                        <title>Instagram</title>
                        <path d="M17.5 3.154c4.672 0 5.227.018 7.073.102 4.742.216 6.958 2.467 7.173 7.174.085 1.845.101 2.399.101 7.071 0 4.674-.017 5.227-.1 7.072-.218 4.703-2.427 6.958-7.174 7.173-1.846.085-2.398.103-7.073.103-4.672 0-5.227-.018-7.071-.103-4.755-.217-6.958-2.477-7.174-7.175-.085-1.844-.102-2.397-.102-7.071 0-4.672.019-5.225.102-7.071.217-4.707 2.427-6.958 7.174-7.174 1.846-.083 2.399-.1 7.071-.1zM17.5 0c-4.753 0-5.348.02-7.214.105C3.93.397.398 3.923.106 10.285.02 12.151 0 12.746 0 17.5s.02 5.35.105 7.216c.292 6.355 3.818 9.887 10.18 10.179 1.867.085 2.462.105 7.215.105s5.35-.02 7.216-.105c6.35-.292 9.89-3.818 10.178-10.18.086-1.866.106-2.462.106-7.215s-.02-5.348-.105-7.214C34.609 3.936 31.079.398 24.717.106 22.85.02 22.253 0 17.5 0zm0 8.514A8.987 8.987 0 0 0 8.514 17.5a8.987 8.987 0 0 0 17.972 0A8.987 8.987 0 0 0 17.5 8.514zm0 14.82a5.833 5.833 0 1 1 0-11.667 5.834 5.834 0 0 1 0 11.666zm9.342-17.275a2.1 2.1 0 1 0-.001 4.202 2.1 2.1 0 0 0 .001-4.202z"></path>
                      </svg>
                    </Icon>
                  </LinkOut>

                  <LinkOut target="_blank" rel="noopener noreferrer" href="https://www.twitter.com/sportstats">
                    <Icon>
                      <title>Twitter</title>
                      <svg   
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 28"
                        aria-hidden="false" aria-label="Navigate to Twitter" focusable="false"
                      >
                        <path d="M35.467 3.315a14.862 14.862 0 0 1-4.18 1.112c1.503-.874 2.658-2.26 3.2-3.91a14.838 14.838 0 0 1-4.621 1.715A7.365 7.365 0 0 0 24.555 0c-4.698 0-8.15 4.258-7.09 8.678C11.42 8.384 6.06 5.57 2.47 1.293.563 4.47 1.481 8.627 4.72 10.731a7.408 7.408 0 0 1-3.294-.884c-.08 3.274 2.336 6.338 5.836 7.02a7.501 7.501 0 0 1-3.287.12c.925 2.809 3.612 4.851 6.798 4.909C7.714 24.226 3.86 25.266 0 24.824A21.04 21.04 0 0 0 11.154 28c13.51 0 21.143-11.084 20.682-21.026a14.587 14.587 0 0 0 3.63-3.66z">
                        </path>
                      </svg>
                    </Icon>
                  </LinkOut>

                  <LinkOut target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/channel/UCrEE7G1Za12M2kUGRENTf_w">
                    <Icon>
                      <title>Youtube</title>
                      <svg 
                        version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        aria-hidden="false" aria-label="Navigate to Youtube" focusable="false"
                        viewBox="0 0 209.673 209.673"
                        width="31" height="31"
                      >
                        <path d="M173.075,29.203H36.599C16.418,29.203,0,45.626,0,65.812v78.05c0,20.186,16.418,36.608,36.599,36.608h136.477
                            c20.18,0,36.598-16.422,36.598-36.608v-78.05C209.673,45.626,193.255,29.203,173.075,29.203z M194.673,143.861
                            c0,11.915-9.689,21.608-21.598,21.608H36.599c-11.91,0-21.599-9.693-21.599-21.608v-78.05c0-11.915,9.689-21.608,21.599-21.608
                            h136.477c11.909,0,21.598,9.693,21.598,21.608V143.861z"/>
                        <path d="M145.095,98.57L89.499,61.92c-2.303-1.519-5.254-1.649-7.684-0.342c-2.429,1.308-3.944,3.845-3.944,6.604v73.309
                            c0,2.759,1.515,5.295,3.944,6.604c1.113,0.6,2.336,0.896,3.555,0.896c1.442,0,2.881-0.415,4.129-1.239l55.596-36.659
                            c2.105-1.388,3.372-3.74,3.372-6.262C148.467,102.31,147.2,99.958,145.095,98.57z M92.871,127.562V82.109l34.471,22.723
                            L92.871,127.562z"/>
                      </svg>
                    </Icon>
                  </LinkOut>

                  <LinkOut target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/sportstatsmedia/" style={{marginRight: '0px'}}>
                    <Icon>
                      <svg 
                        width="31" height="31" viewBox="0 0 27 30" xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="false" aria-label="Navigate to Facebook" focusable="false"
                      >
                        <title>Facebook</title>
                        <path d="M25.287 0H1.62C.81 0 .156.74.156 1.652v26.696C.156 29.26.812 30 1.621 30h12.743V18.382h-3.485v-4.518h3.468v-3.35c0-3.872 2.094-5.983 5.15-5.983a24.452 24.452 0 0 1 3.095.18V8.76h-2.094c-1.671 0-1.992.897-1.992 2.207v2.892h4.006l-.52 4.518h-3.434v11.618h6.729c.809 0 1.465-.74 1.465-1.653V1.652C26.752.74 26.096 0 25.287 0z" fillRule="nonzero"></path>
                      </svg>
                    </Icon>
                  </LinkOut>

            </HStack>

          </Center>
        </Center>

        <Stack 
          direction={['column', 'row']} 
          spacing='24px' w='100%' justifyContent='space-around'
          pb='8'
        >
          
          <Box  h='40px'>
            <Heading>{t('common:about')} </Heading>
            <Stack direction='column' ml='4'  >
              <NextLink href='/about' > {t('public:help.topics.about-sportstats')} </NextLink>

            </Stack>
          </Box>

          <Box >
            <Heading mb='3'>{t('common:support')} </Heading>
            <Stack direction='column' ml='4'  >
              <NextLink href='/help/privacy' > {t('footer.privacy')} </NextLink>
              <NextLink href='/help/terms-of-use'> {t('footer.terms')} </NextLink>
              <NextLink href='/help'> {t('public:menu.help-center')} </NextLink>

            </Stack>
          </Box>

          <Box  h='40px' >
            © 2022, Sportstats. {t('footer.reserved')}
            <br/>
            build version - v.0.2.0 - 2022-09-26T22:28:09.408Z
          </Box>

        </Stack>

      </Flex>
    </footer>
  </>;
}




const Icon = styled.div`
  fill: #fff;
  margin-right: 30px;
  width: 30px;
  height: 30px;
  &:hover {
    fill: #0CAA56;
  }
`;