import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { gql } from "@apollo/client";
import {client} from "../apollo/apollo-client";

import Section from '../components/section';
import Triangle from '../components/triangle';

import SectionSlider from "../components/home/MainSection"; 

import "swiper/css";
import "swiper/css/navigation";
import "react-lazy-load-image-component/src/effects/blur.css";
import "react-lazy-load-image-component/src/effects/opacity.css";

export default function Home({sportstats}) {

  return (
    <div className='container-main'>
      <Head>
        <title>Next.js Starter!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Header color='none' />

      <main style={{padding:'0', margin:'0', justifyContent:'flex-start'}}>
        
        <div 
              style={{
                  posistion:'relative',
                  display:'grid',
                  top:'0',
                  width: '100%',
                  maxHeight: '80vh',
                  minHeight: '450px',
                  overflow: 'hidden',
                //  backgroundImage: "url('https://cdn.athlinks.com/images/home/hero.jpg')",
                  backgroundSize: 'cover',
                  filter: 'grayscale(100%) brightness(80%) sepia(300%) hue-rotate(50deg) saturate(500%)'
                }} 
              >
               
                
                  <video width="1414" autoPlay muted loop style={{display: 'block', height: '100%', width: '100vw'}} >
                    <source src="https://d33vaoadodpfl.cloudfront.net/miami-cut.mp4" type="video/mp4"/>Please update your browser to support video
                  </video>

                  test
              
        </div>
          
        <Section.Container id="events" Background={Background} className='px-2'>
            <SectionSlider 
              data={sportstats?.upcomingEvents?.masterEvents}
              section={'Upcoming Events'}
              isLoadingSection={(sportstats?.upcomingEvents?.masterEvents)?false:true}
            />  
        </Section.Container>

      </main>

      <Footer />
    </div>
  )
}

export async function getStaticProps() {
    const { data } = await client.query({
      query: gql`
        query Countries {
          upcomingEvents {
            masterEvents {
              id
              mid
              info {
                name
                date
                imageUrl
                country
              }
              events {
                country
                city
              }
            }
          }
        }
      `,
    });

    return {
      props: {
        sportstats: data,
      },
   };
}

const Background = () => (
  <>
    <Triangle
      color="#f0e6f6"
      height={['35vh', '80vh']}
      width={['95vw', '60vw']}
    />
   
      <Triangle
        color="#0CAA56"
        height={['38vh', '80vh']}
        width={['50vw', '30vw']}
      />

    <Triangle
      color="#000"
      height={['25vh', '35vh']}
      width={['75vw', '60vw']}
      position="top-right"
    />
    <Triangle
      color="#f0e6f6"
      height={['20vh', '20vh']}
      width={['100vw', '100vw']}
      position="bottom-right"
    />
  </>
);
