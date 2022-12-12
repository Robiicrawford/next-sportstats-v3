import React from "react"
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import { NextSeo } from 'next-seo';

import Link from 'next/link'

import { Box, Flex, Heading, Text, Center , SimpleGrid,
  Card, CardBody, CardFooter, Stack, Image, Badge  
} from '@chakra-ui/react';

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react'

import Layout from '../../components/layout/Layout'
import Section from '../../components/section';
import Triangle from '../../components/triangle';

import SideMenu from '../../components/help/SideMenu';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faRunning, faUserShield} from "@fortawesome/free-solid-svg-icons";


const IndexPage = ({ data }) => {
  const content = data?.allBuilderModels.oneHepCenter?.content;

  const {t} = useTranslation('public');
  const icons = {
    "about-sportstats":<FontAwesomeIcon icon={faUserCircle} size="lg" style={{margin:'0 0.1em'}}/>, 
    "your-account":<FontAwesomeIcon icon={faUserCircle} size="lg" style={{margin:'0 0.1em', color:'#0CAA56'}}/>,
    'your-events':<FontAwesomeIcon icon={faRunning} size="lg" style={{margin:'0 0.1em', color:'#0CAA56'}}/>,
    "terms-and-policies":<FontAwesomeIcon icon={faUserShield} size="lg" style={{margin:'0 0.1em', color:'#0CAA56'}}/>,
  }
 

  return (
    <Layout>
      <NextSeo title={t("help.title")} />

      <Center bg='tomato' h='100px' color='white'>
        <Heading> {t("help.welcome")} </Heading>
      </Center >
      <Section.Container id="settings"  Background={Background} >
      
      
          <Flex flexWrap='wrap' justifyContent='center' gap='2em' px={[1,3,5]} pt={2} pb='150px'>
            <SideMenu active='faq' />


            <Flex
              w={['100%','60%']} 
              flexWrap='wrap' height='fit-content'
              px={['1','6em']} className='card'
            >
              <Heading mb='4' pb='2' sx={{borderBottom:'3px solid black'}}> FAQ </Heading>
              {/*
              <SimpleGrid columns={[3]} spacing={10} pb='5' sx={{borderBottom:'1px solid black'}} pb='3' mb='3'>
                <Card
                  direction={{ base: 'column', sm: 'column' }}
                  overflow='hidden'
                  variant='outline'
                >
                  <Image
                    objectFit='cover'
                    maxW={{ base: '100%', sm: '100%' }}
                    maxH={{ base: '100%', sm: '100%' }}
                    style={{objectFit:'contain'}}
                    src='https://a.cdn-hotels.com/gdcs/production163/d857/cc29dd0e-f745-4507-80e1-6ae5a3532338.jpg'
                    alt='Caffe Latte'
                  />

                  <Stack>
                    <CardBody>
                      <Heading size='md'> Results </Heading>
                    </CardBody>
                  </Stack>
                </Card>

                 <Card
                  direction={{ base: 'column', sm: 'column' }}
                  overflow='hidden'
                  variant='outline'
                >
                  <Image
                    objectFit='cover'
                    maxW={{ base: '100%', sm: '100%' }}
                    maxH={{ base: '100%', sm: '100%' }}
                    style={{objectFit:'contain'}}
                    src='https://a.cdn-hotels.com/gdcs/production163/d857/cc29dd0e-f745-4507-80e1-6ae5a3532338.jpg'
                    alt='Caffe Latte'
                  />

                  <Stack>
                    <CardBody>
                      <Heading size='md'> Virtual Racing </Heading>
                    </CardBody>
                  </Stack>
                </Card>

                <Card
                  direction={{ base: 'column', sm: 'column' }}
                  overflow='hidden'
                  variant='outline'
                >
                  <Image
                    objectFit='cover'
                    maxW={{ base: '100%', sm: '100%' }}
                    maxH={{ base: '100%', sm: '100%' }}
                    style={{objectFit:'contain'}}
                    src='https://a.cdn-hotels.com/gdcs/production163/d857/cc29dd0e-f745-4507-80e1-6ae5a3532338.jpg'
                    alt='Caffe Latte'
                  />

                  <Stack>
                    <CardBody>
                      <Heading size='md'> Race Supply </Heading>
                    </CardBody>
                  </Stack>
                </Card>

              </SimpleGrid>
    */}
              <Accordion 
                allowToggle
                mb='5'
              >
                <AccordionItem>
                  <h2>
                    <AccordionButton _expanded={{ bg: 'ss_green', color: 'white' }}>
                      <Box flex='1' textAlign='left'>
                        What is the difference between 'Gun Time' and 'Chip Time'?
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    Many events calculate the official time based on the time when the event officially started. The difference between chip time and gun time is quite simple.  Most awards are based on GUN TIME – the time from the start of the race (gun) to when you cross the finish line as per IAAF, Athletics Canada, USATF, AIMS and International Awards standards. Chip Time is the time between when the athlete crossed the start mat and when the athlete reached the finish line.
                    <br/><br/>
                    Here’s an excerpt from the official rule book:
                    <br/>
                    <p
                      style={{    
                        backgroundColor:'#f5f5f5',
                        border:'1px solid #ccc',
                        padding:'5px'
                      }}
                    >
                      <strong>IAAF COMPETITION RULES 2014-2015 – Art 165.24e</strong>
                      <br/>
                       Note: The official time shall be the time elapsed between the firing of the starting gun (or the synchronised start signal) and the athlete reaching the finish line. However, the time elapsed between an athlete crossing the start line and the finish line can be made known to him, but will not be considered an official time.
              
                    </p>
                    <br/>
                    N.B. More events are now using only Chip time for results posting. However, the overall awards are still based on Gun time
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                  <h2>
                    <AccordionButton _expanded={{ bg: 'ss_green', color: 'white' }}>
                      <Box flex='1' textAlign='left'>
                        How do I know if my race is ranked using 'Gun Time' or 'Chip Time'?
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    Sportstats is not responsible for choosing which time will be used as the official time. This is the responsibility of the organisation committee of each race. In order to simplify the process, Sportstats is now using the term "Official time" to indicate the column used for ranking purposes. 
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                  <h2>
                    <AccordionButton _expanded={{ bg: 'ss_green', color: 'white' }}>
                      <Box flex='1' textAlign='left'>
                        How can I see my splits and personal information?
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                   From the results page, click on your result will navigate you to a page with all your splits.
                   <br/><br/>
                    From this view, you will have access to all your information: split details, pace, personal information, photo links, link to download your finisher certificate and access to your previous Sportstats results.
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                  <h2>
                    <AccordionButton _expanded={{ bg: 'ss_green', color: 'white' }}>
                      <Box flex='1' textAlign='left'>
                        Where do I go to see the photos of an event?
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    A link towards the event’s pictures will be present on our website only if Sportstats has an agreement with the photo company of the event. If there is an agreement, a camera icon ( 📷 ) will be present at the bottom of the athletes personal information box. Clicking on the icon will direct you to your race photos hosted on the photo company’s website. Please communicate with the photo company if you have any questions concerning the photos.
                    <br/><br/>
                    If the icon ( 📷 ) is not present on the results page, please consult the event’s website or communicate with the event’s organizing committee for details concerning your photos.
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                  <h2>
                    <AccordionButton _expanded={{ bg: 'ss_green', color: 'white' }}>
                      <Box flex='1' textAlign='left'>
                        Is it possible to remove my picture?
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    Sportstats only publishes a link towards the website of the photo company. The photo company is responsible of the photos of the event. If you wish to remove your photo from the site, please communicate with the photo company directly.
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                  <h2>
                    <AccordionButton _expanded={{ bg: 'ss_green', color: 'white' }}>
                      <Box flex='1' textAlign='left'>
                        How can I fix my time or personal info?
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    If you think there is an error in the posted time or if there is a mistake in your personal information, the Sportstats correction team can assist you in correcting such errors.
                    <br/><br/>
                    Please fill out the correction form properly and add as many details as possible about the event, your result and the required correction to facilitate the process. We are timing over 800 events each year; make sure you are precise when filling out the form.
                    <br/><br/>
                    You can find the correction form by <Link href='/help/contact'> clicking here. </Link>
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                  <h2>
                    <AccordionButton _expanded={{ bg: 'ss_green', color: 'white' }}>
                      <Box flex='1' textAlign='left'>
                        Why can't I claim my result?
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    A results claim could fail for several reasons. Listed below are the most common error messages and their recommended solutions.
                    <br/><br/>
                    Your claim result request was rejected because your profile does not contain enough information to allow results claiming. Please click on Edit Profile to add the missing information.
                    <br/><br/>
                    Your account needs to have first and last name, date of birth, gender and email to claim a result. Action required: Complete your profile information by clicking on the picture icon in the top right corner of the page and select ‘Edit Profile’
                    <br/><br/>
                    Your claim result request was rejected because the result you are claiming is incomplete. Our team was notified and will get back to you shortly by email.
                    <br/><br/>
                    The result you are trying to claim is missing a name or gender. Action required: none. Our corrections team will indentify and address the issue. If any additional information is required, you will be contacted directly by our corrections team.
                    <br/><br/>
                    Your gender does not match the results gender.
                    <br/><br/>
                    Your gender does not match the listed gender on the results. An email is sent to our corrections team and they will address the issue. Action required: none.
                    <br/><br/>
                    Your age at the time of the race does not match the results age range specified in its category
                    <br/><br/>
                    Race result does not have age or your age does not match the listed range. An email is sent to our corrections team. Action required: none.
                    <br/><br/>
                    Your name does not match the results name.
                    <br/><br/>
                    The name on the result does not match the listed name on your profile. If you’ve had a name change since you ran the race please use the contact form to notify our team to update your results to the name you would like. You can find the correction form by <Link href='/help/contact'> clicking here. </Link>
                  
                  </AccordionPanel>
                </AccordionItem>

              </Accordion>


            </Flex>
          </Flex>
          
        {/*
             <Flex flexWrap='wrap' width={1} >
               {menudata.map(topic=>(
                 <Box width={[1,1/2,1/4]} key={topic.title} spacing={1} mb={1}>
                   <Box width={1} justifyContent="flex-start" alignItems="center" >
                      {icons[topic.title]}               
                      <Heading py={1} ml={2} display='inline-block' color='#fff'>{t('help.topics.'+topic.title)}</Heading>
                    </Box>
                    {topic.data.map(a=>(
                      <Box width={1} key={a.i18} my={2} ml={3}>
                        <LangLink to={a.link} >
                            {t('help.topics.'+a.i18)}
                        </LangLink>
                      </Box>
                    ))}
                 </Box>
               ))}
             </Flex>
             <hr/>
            <Flex flexWrap='wrap' width={1}>

               <Box width={1} mb={2}>
                 <Heading color='#fff'>{t("help.popular")}</Heading>
               </Box>

            </Flex>
            <hr/>
          */}


      </Section.Container>
      <Flex flexWrap='wrap' w='100%' color='#fff' pb={4} bg='black' sx={{position:'absolute', bottom:0}}>

           <Box w='100%' mt={1} textAlign='center' >
             <Heading mb={1} >Contact Us</Heading>
           </Box>
           <Box w='100%' mt={2} textAlign='center'>
             <Text mb={1}>
               {t('help.cant-find-help')} 
               <Link href={`/help/contact`} style={{marginLeft:'10px', borderBottom:'3px solid green'}}>
                 {t('help.contact-us')}
                </Link>
              </Text>
           </Box>
      </Flex>

    </Layout>
  )
}

export default IndexPage


export async function getStaticProps({locale}) {
    return {
      props: {
        isPassedToWithAuthenticator: true,
        ...(await serverSideTranslations(locale, ['common', 'public', 'app','translation'], null, ['en', 'fr'])),
      },
   };
}


const Background = () => (
  <>
    <Triangle
      color="#f0e6f6"
      height={['35vh', '30vh']}
      width={['100vw', '100vw']}
      position="top-left"
    />

    <Triangle
      color="#0CAA56"
      height={['50vh', '55vh']}
      width={['70vw', '40vw']}
      position="bottom-left"
    />

    <Triangle
      color="#f0e6f6"
      height={['70vh', '55vh']}
      width={['100vw', '100vw']}
      position="bottom-right"
    />
  </>
);
