import React, {useRef} from "react"
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import { NextSeo } from 'next-seo';

import { motion } from "framer-motion"


import Layout from '../../components/layout/Layout'
import Hero from '../../components/about/Hero';
import MainFeature from '../../components/about/MainFeature';
import Features from '../../components/about/Features';
import Testimonials from '../../components/about/Testimonials';

import ContactUs from '../../components/about/ContactUs';

import ClientBanner from '../../components/about/ClientBanner';

const IndexPage = () => {

  const {t} = useTranslation('public');



  return (
    <Layout header_color='none'>
      <NextSeo title={t('public:help.topics.about-sportstats')} />
      
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{  once: true }}
          style={{width:'100%'}}
        >
          <Hero />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}

          style={{width:'100%'}}
          transition={{
            delay: 0.5,
            x: { duration: 1 },
            default: { ease: "linear" }
          }}
        >
          <MainFeature />
        </motion.div>

        <motion.div
          initial={{ marginLeft: 2000 }}
          whileInView={{ marginLeft: 0 }}
          viewport={{ once: true }}
          style={{width:'100%'}}
        >
          <Features />
        </motion.div>

        <motion.div
          initial={{ marginRight: 2000 }}
          whileInView={{ marginRight: 0 }}
          viewport={{ once: true }}
          style={{width:'100%'}}
        >

          <Testimonials />
        </motion.div>

        <motion.div
          initial={{ marginLeft: 2000 }}
          whileInView={{ marginLeft: 0 }}
          viewport={{ once: true }}
          style={{width:'100%'}}
        >

          <ContactUs />
        </motion.div>

        <ClientBanner />
  
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

