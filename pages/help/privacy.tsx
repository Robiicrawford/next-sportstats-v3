import React from "react"
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import { NextSeo } from 'next-seo';

import Link from 'next/link'

import { Box, Flex, Heading, Text, Center, Stack , Container, StackDivider,
  UnorderedList, ListItem
   } from '@chakra-ui/react';

import Layout from '../../components/layout/Layout'
import Section from '../../components/section';
import Triangle from '../../components/triangle';
import ContactUsBanner from "../../components/help/ContactUsBanner"

import SideMenu from '../../components/help/SideMenu';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faRunning, faUserShield} from "@fortawesome/free-solid-svg-icons";


const IndexPage = ({ data }) => {

  const {t} = useTranslation('public');
  const icons = {
    "about-sportstats":<FontAwesomeIcon icon={faUserCircle} size="lg" style={{margin:'0 0.1em'}}/>, 
    "your-account":<FontAwesomeIcon icon={faUserCircle} size="lg" style={{margin:'0 0.1em', color:'#0CAA56'}}/>,
    'your-events':<FontAwesomeIcon icon={faRunning} size="lg" style={{margin:'0 0.1em', color:'#0CAA56'}}/>,
    "terms-and-policies":<FontAwesomeIcon icon={faUserShield} size="lg" style={{margin:'0 0.1em', color:'#0CAA56'}}/>,
  }
 

  return (
    <Layout>
      <NextSeo title={t('app:footer.privacy')} />

      <Center bg='tomato' h='100px' color='white' w='100%'>
        <Heading> {t("help.welcome")} </Heading>
      </Center >

      <Section.Container id="settings"  Background={Background} >
      
      
          <Flex flexWrap='wrap' justifyContent='center' gap='2em' px={[1,3,5]} pt={2}>
            <SideMenu active={3} />


            <Flex
              w={['100%','60%']}
              flexWrap='wrap' height='fit-content'
              px={['1','6em']} mb='150px' className='card'
            >
              <Heading mb='4' pb='2' sx={{borderBottom:'3px solid black'}}>  {t('app:footer.privacy')} </Heading>
              <p style={{paddingBottom:'1em'}}>
                This Privacy Policy sets out the privacy policies and practices for Sports Technology and Timing Systems Ltd. and its affiliates ("Sportstats, iRun etc...") with respect to our collection, use, and disclosure of personal information, including in respect of websites that we operate such as sportstats.ca, sportstats.us, sportstats.asia and irun.ca (collectively, the "Sites"). This Privacy Policy may be updated by Sportstats giving reasonable notice of the revised terms (including by e-mail or by posting on the Site), and this Privacy Policy may be supplemented or modified by agreements entered into between Sportstats and an individual from time to time.
              </p>
              <p style={{fontWeight:'600', marginBottom:'1em',}}>
                In this Privacy Policy, "personal information" means any information about an identifiable individual, as further defined under applicable Canadian laws.
              </p>
              <h3 style={{marginBottom:'1em', borderBottom:'2px solid black', fontWeight:'800' }}>
                Collection and Use of Personal Information
              </h3>
              <p style={{paddingBottom:'1em'}}>
                  Sportstats collects and uses personal information from customers and others (an "Individual") as follows:
              </p>
               <UnorderedList pb='2'>
                <ListItem>Sportstats may collect and maintain personal information such as an Individual's name, contact information, payment card information and purchase history when an Individual subscribes for services or purchases products on our website or at an event.</ListItem>
                <ListItem>Sportstats may collect personal information from an Individual where the Individual submits a membership application such as the Sportstats Results Platform (the "Platform").</ListItem>
                <ListItem>When participating in the results platform, we may collect personal information, such as a name, city of residence, date of birth and other information pertinent on creating a profile.</ListItem>
                <ListItem>From time to time, we may obtain an Individual's consent to use the Individual's contact or photo information to provide periodic newsletters or updates, announcements and special promotions regarding Sportstats products and services.</ListItem>
                <ListItem>Personal information about an Individual, including name, email address, mailing address, phone number, credit card or other financial information, and a username and password, may be collected when an Individual participates in the Membership Platform (the "Membership Platform"). Sportstats uses such personal information as is reasonably necessary for operating and managing the Membership Platform, including without limitation, processing online registrations, billing credit cards, contacting Membership Platform participants about the Membership Platform, setting up automatic payment and to develop and improve our product and service offerings.</ListItem>
                <ListItem>Sportstats may collect demographic and profile data in connection with the Sites and, together with publicly available information, we may use such data to tailor each Individual's experience at the Sites and display content according to an Individual's preferences.</ListItem>
                <ListItem>In order to use certain features on the Sites (such as to make results profile and awards publicly available personal information about yourself and others, including without limitation, photos and videos), an Individual may be required to register and provide personal information such as name, email address, location (i.e. city, province, postal code), date of birth and a user name and password that the Individual chooses. We use this information to identify you, provide the requested feature and, with respect to date of birth, to verify that your results are claimed within your age group. Your username, city and province will be published with your posting. By making publicly available his or her personal information on the Sites, the Individual consents to the publication of such personal information. By publishing personal information about another individual, the Individual represents that he or she has, where required by applicable privacy laws, obtained the consent of such individuals to publish such information.</ListItem>
                <ListItem>The "Followers and Following" and other similar features on our Sites permit an Individual to send email to others and view results and awards from each individual. This feature requires an Individual to submit their name and email address, as well as the name of the recipient during a search. We do not use the names or email addresses submitted in these circumstances for any other purpose without the consent of the Individual or the email recipient to do so.</ListItem>
                <ListItem>When you contact us with a comment, question or complaint, you may be asked for information that identifies you (such as your name, address and a phone number) along with additional information we need to help us promptly answer your question or respond to your comment or complaint. We may also retain this information to assist you in the future and to improve our customer service and product and service offerings.</ListItem>
              </UnorderedList>
               <p style={{paddingBottom:'1em'}}>
                  Sportstats may otherwise use customer information for additional purposes that are identified at or before the time that the information is used for such additional purposes.
              </p>
              <h3 style={{marginBottom:'1em', borderBottom:'2px solid black', fontWeight:'800' }}>
                Disclosure of Personal Information
              </h3>
              <p style={{paddingBottom:'1em'}}>
                  Sportstats will not disclose, trade, rent, sell or otherwise transfer personal information for purposes other than as those set our herein, except with an Individual's consent or as required or permitted by law.
                  <br/><br/>
                  Sportstats may transfer or disclose personal information as follows:
              </p>
              <UnorderedList pb='2'>
                <ListItem>Sportstats may transfer your personal information to third-party service providers or agents who provide services to or on behalf of Sportstats such as hosting, data management and storage services, market analyses, and retention services. Either Sportstats or such third party service provider may use servers for such purposes located in Canada, the United States or another foreign country. The personal information of an Individual may be processed and stored in Canada, the United States or such other foreign country, and the governments, courts or law enforcement or regulatory agencies of that country may be able to obtain disclosure of personal information through the laws of the foreign country.</ListItem>
                <ListItem>Sportstats, our affiliates and our Canadian, US and other service providers may provide your personal information in response to a search warrant or other legally valid inquiry or order, or to an investigative body in the case of a breach of an agreement or contravention of law, or as otherwise required by applicable Canadian, US or other law. We may also disclose personal information where necessary for the establishment, exercise or defence of legal claims.</ListItem>
                <ListItem>We may transfer any information we have about you as an asset in connection with a merger or sale (including transfers made as part of insolvency or bankruptcy proceedings) involving all or part of Sportstats or as part of a corporate reorganization or stock sale or other change in corporate control.</ListItem>
              </UnorderedList>
              <h3 style={{marginBottom:'1em', borderBottom:'2px solid black', fontWeight:'800' }}>
                Cookies and IP Addresses
              </h3>
               <p style={{paddingBottom:'1em'}}>
                  Sportstats collects and uses an Individual's IP address to help identify the Individual, gather broad demographic information about users of the Sites, diagnose problems with Sportstats' systems, and administer the Sites.
                   <br/><br/>
                  Depending on an Individual's browser settings, the Sites may use cookies. A cookie is a tiny element of data that our Sites can send to an Individual's browser, which may then be stored on their hard drive so we can recognize them when they return to the Sites. We use cookies to deliver content according to the Individual's preferences and to save the Individual's password so that the Individual is not required to re-enter it while the Individual uses the Sites. If an Individual's browser settings do not accept cookies from our Sites, they may not be able to take advantage of all of the features of our Sites.
              </p>
               <h3 style={{marginBottom:'1em', borderBottom:'2px solid black', fontWeight:'800' }}>
                Third party links
              </h3>
               <p style={{paddingBottom:'1em'}}>
                Our Sites may contain links to other sites that Sportstats does not own or operate. Also, links to our Website may be featured on third party websites on which we advertise. Except as provided herein, Sportstats will not provide an Individual's personal information to these third parties without the Individual's consent. We provide links to third party websites as a convenience to Individuals. These links are not intended as an endorsement of or referral to the linked websites. The linked websites have separate and independent privacy statements, notices and terms of use, which we recommend Individuals read carefully. Sportstats does not have any control over such websites, and therefore has no responsibility or liability for the manner in which the organizations that operate such linked websites may collect, use or disclose, secure and otherwise treat an Individual's personal information.  
              </p>
              <h3 style={{marginBottom:'1em', borderBottom:'2px solid black', fontWeight:'800' }}>
                Security
              </h3>
               <p style={{paddingBottom:'1em'}}>
                Sportstats has implemented measures designed to protect against the theft, loss, unauthorized access, use, disclosure  and alteration of personal information in our custody and control with security measures appropriate to the sensitivity of the information, including through the use of reasonable physical, organizational, and technological safeguards and appropriate training of employees. Sportstats' third party service providers are obligated to maintain confidentiality and security of the personal information transferred to them and are not authorized to use such information other than to provide the services or as otherwise permitted by law.
                <br/><br/>
                An Individual's online access to certain of their personal information may be protected with a username and/or password that the Individual chooses. Sportstats strongly suggests that Individuals do not disclose their username or password to anyone. Sportstats never asks for an Individual's password in any unsolicited communication.
                <br/><br/>
                Sportstats retains personal information only as long as necessary for the purposes outlined in this Privacy Policy or as required or permitted by law.
              </p>
               <h3 style={{marginBottom:'1em', borderBottom:'2px solid black', fontWeight:'800' }}>
                Opt-Out
              </h3>
              <p style={{paddingBottom:'1em'}}>
                Individuals are given the opportunity to opt-out of receiving communications from Sportstats by using the unsubscribe mechanism at the bottom of our email communications by contacting our Chief Privacy Officer (the "Privacy Officer") using the contact information provided below. 
              </p>
              <h3 style={{marginBottom:'1em', borderBottom:'2px solid black', fontWeight:'800' }}>
                Access/Corrections
              </h3>
              <p style={{paddingBottom:'1em'}}>
               An Individual may contact the Privacy Officer to access, modify or correct inaccuracies in any of his or her personal information that is under Sportstats' custody or control. An Individual may also direct a written complaint regarding compliance with this Privacy Policy to the Privacy Officer and, within a reasonable time upon receiving the written complaint, the Privacy Officer will conduct an investigation into the matter. Within a reasonable time of concluding the investigation, the Privacy Officer will respond to the complaint and, if appropriate, Sportstats will take appropriate measure necessary to rectify the source of the complaint.
              </p>

              <h3 style={{marginBottom:'1em', borderBottom:'2px solid black', fontWeight:'800' }}>
                Contact
              </h3>
              <p style={{paddingBottom:'1em'}}>
                If an Individual has any questions about this Privacy Policy or the collection, use, disclosure, or retention of the Individual's personal information by Sportstats or its service providers, please contact the Privacy Officer as follows:
                <br/><br/>
                Sports Technology and Timing Systems LTD.
                <br/>
                Attention: Chief Privacy Officer
                <br/>
                Address: 155 Colonnade Rd. #18, Ottawa, ON, K2E 7K1
                <br/><br/>
                Email: privacy@sportstats.ca
                <br/>
                Fax: 613-723-9139
              </p>

            </Flex>
          </Flex>
          
       


      </Section.Container>
      
       <ContactUsBanner />

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
