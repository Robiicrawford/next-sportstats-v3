import React, {useState, useEffect} from "react"
import { NextSeo } from 'next-seo';

import Link from 'next/link'
import { useRouter } from "next/router";

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import { useAuthenticator } from '@aws-amplify/ui-react';

import styled from "styled-components";
import { 
  Flex, Center, Box, Heading, Icon,
  Text, Button, Spacer, Avatar, CloseButton 
} from '@chakra-ui/react';

import { 
  Td, Tr,
  Table, Tbody
} from '@chakra-ui/react';

import Layout from '../../../components/layout/Layout'

import Section from '../../../components/section';
import Triangle from '../../../components/triangle';

import HeroCard from '../../../components/race/HeroCard';

import ReactCountryFlag from "react-country-flag"

import { useLazyQuery, gql } from "@apollo/client";
import {client} from "../../../apollo/apollo-client";

import {msToTime, msToPace, calculatePace} from '../../../utils/formatTime'

import {
  FiShare2,
  FiHash,
  FiUsers,
  FiArrowRight,
  FiArrowDown,
  FiClock
} from 'react-icons/fi'

import {
  MdVerified
} from 'react-icons/md'

const getCountryISO2 = require("country-iso-3-to-2");

const Styles = styled.div`
  width: 100%;

  table {
    border-spacing: 2px;
    border-collapse: collapse;
    width: 100%;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    tbody {
      :before {
        content:"@";
        display:block;
        line-height:10px;
        text-indent:-99999px;
      }
      tr {
        border-color: inherit;
        .name {

        }
        &:hover {
          .name { 
            color: ss_green;
          }
        }
      }
    }
    th {
      margin: 0;
      padding: 0.1rem;
      :last-child {
        border-right: 0;
      }
    }
    td {
      margin: 0;
      padding: 0.2em 0.5rem;
      :last-child {
        border-right: 0;
      }
    }
    .center {
      text-align: center;
    }
    .name_row {
      border-bottom: solid 2px black;
    
      td {
        .name_row_time{
          padding-left: 10px;
        }
      }
    }
  }
`

const BlankRow = () => <tr ><td colSpan={8} style={{height:'15px'}}></td></tr>

const NameRow = ({info, data, canOpen }) => {

  return (
    <Tr className="name_row" style={{textTransform: 'capitalize'}} pb='2'>
      <Td colSpan={1}><Text fontSize='30'> {info.CL}</Text></Td>
      <Td ><Text fontSize='25'><span style={{paddingLeft:'1rem'}}>{!data?.ST && !data?.CD ? '00:00:00' :msToTime( data?.ST?data?.ST:parseInt(data?.CD) )}</span></Text> </Td>
      <Td colSpan={6}></Td>
    </Tr>
  )
}

const TransitionRow = ({info, data}) => {

  return(
    <>
      <BlankRow />
      <Tr className="name_row" style={{textTransform: 'capitalize'}} pb='2'>
        <Td colSpan={1}><Text fontSize='30'> Transition - {info.CL}</Text></Td>
        <Td ><Text fontSize='25'><span style={{paddingLeft:'1rem'}}>{!data?.ST && !data?.CD ? '00:00:00' :msToTime( data?.ST?data?.ST:parseInt(data?.CD) )}</span></Text> </Td>
        <Td colSpan={6}></Td>
      </Tr>
      <BlankRow />
    </>
  )
}

const SplitRow = ({info, data, raceInfo, canOpen, setOpen, open}) => {

  return (
    <Tr className="split_row">
      
      <Td style={{textTransform: 'capitalize'}} colSpan={1}>
        <Text fontSize={'1em'} ml={2} fontWeight='bold' > {info.CL} </Text>
        {info.CD ? <Text pl={[1,2,3]} pt='0' mt='0' >{info.CD/1000}km || {Math.round(( (info.CD*0.000621371192) + Number.EPSILON) * 100) / 100}mi</Text> : null }
      </Td>
      
      <Td >
        {![6,7].includes(info.CT)&&  <Text fontSize='1em' >{msToTime(data?.ST)} | </Text> }
        <Text pl={[1,2,3]}>{msToTime(data?.CD)}</Text>
      </Td>

      <Td style={{textAlign:'center'}}>
        {[6,7].includes(info.CT) && raceInfo.type.toLowerCase() !== 'triathlon'
          ?  calculatePace( info.CDS?info.CDS:info.CD, data?.CD, raceInfo.CT , info.CL ) 
          : data?.CD && info.CD? calculatePace( info.CD, data.ST,  raceInfo.CT, info.CL  ): '---'
        }
      </Td>
      <Td className='center min-tablet'>{data?.TOD? msToTime(data?.TOD):'est. '+data?.estTod}</Td>
      <Td className='center min-desktop'>{data?.RO} </Td>
      <Td className='center min-desktop'>{data?.RG} </Td>
      <Td className='center min-desktop'>{data?.RC} </Td>
      
      {canOpen ? 
        <Td 
          className='center' style={{width:'20px'}}
          onClick={()=>setOpen(open === info.id ?null:info.id)}
        >
          <Icon as={open !== info.id ? FiArrowRight : FiArrowDown} boxSize="6" color='ss_green' />
        </Td>
        :<Td/>
      }
    </Tr>
  )
}

const SubRow = ({info, raceInfo, data, prepareRow}) => {

  return (
    <Tr className="split_row" style={ {backgroundColor: !data? '#564949ab ':''}}>
      
      <Td style={{textTransform: 'capitalize', paddingLeft:'2rem'}} colSpan={1}>
        <Text fontSize={'1em'} fontWeight='bold' ml='3' > {info.CL} </Text>
        {info.CD ? <Text pl={[1,2,3]} >{info.CD/1000}km || {Math.round(( (info.CD*0.000621371192) + Number.EPSILON) * 100) / 100}mi</Text> : null }
      </Td>
      
      <Td>
        {![6,7].includes(info.CT)&&  <Text fontSize='1.1em' fontWeight='bold' >{msToTime(data?.ST)} | </Text> }
        <Text pl={[1,2,3]}>{msToTime(data?.CD)}</Text>
      </Td>

      <Td style={{textAlign:'center'}}>
        {[6,7].includes(info.CT) && raceInfo.type.toLowerCase() !== 'triathlon'
            ?  calculatePace( info.CDS?info.CDS:info.CD, data?.CD, raceInfo.CT , info.CL ) 
            : data?.CD && info.CD? calculatePace( info.CD, data.ST,  raceInfo.CT, info.CL  ): '---'
          }
      </Td>
      <Td className='center min-tablet'>{data?.TOD? msToTime(data.TOD):'est. '+data?.estTod}</Td>
      <Td className='center min-desktop'>{data?.RO} </Td>
      <Td className='center min-desktop'>{data?.RG} </Td>
      <Td className='center min-desktop'>{data?.RC} </Td>
      <Td/>
    </Tr>
  )
}

function ordinal_suffix_of(i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st"; 
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}

function ResultPageInd({ result, race, rid }) {
  const { t } = useTranslation('common');
  const router = useRouter()

  const [open, setOpen] = useState(null)
  const { user } = useAuthenticator((context) => [context.user]);

  const handleClaim =  async() => {
    try{
      var claim = await fetch(
        `${process.env.NEXT_PUBLIC_MEMBER_URL}/resultClaim.php`
        ,{  
          method: 'POST',
          headers:{
            // @ts-ignore
            Authorization:`Bearer ${user?.signInUserSession.accessToken.jwtToken}`, 
           //     'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            SSUID: user.attributes['custom:ssuid'],
            rid: result.rid,
            bib: result.bib
          })
        }
      )
      const response = await claim.json();

      console.log(response)

    } catch (err) {
      console.log(err)  
    }
  }

  const handleShare = (event) => {
    event.preventDefault()
    if (navigator.share) {
      navigator
        .share({
          title: `${race.event.name} | ${'Sportstats'}`,
          text: `Check out results for ${result.givenName} ${result.familyName}  on Sportstats`,
          url: document.location.href,
        })
        .then(() => {
          console.log('Successfully shared');
        })
        .catch(error => {
          console.error('Something went wrong sharing the blog', error);
        });
    } else{
      console.log('share not supported')
    }
  };


  return (
    <Layout header_color='black' >
      <NextSeo
        title={`${race?.event.name} - ${race?.info?.name}`}
      />
      <Section.Container id="series" Background={Background} >
        <Flex
          justifyContent='center'
          direction="column"
          maxW='8xl' pb='6' mx='auto'
        >
          {/* race card */}
          <HeroCard race={race} />

          {/* result section */}
          <Flex  flexWrap='wrap'  w='100%' pt={3} className='card__base' sx={{borderRadius:'0 0 15px 15px'}} position='relative'  >
            
            <CloseButton 
              style={{border:'1px solid black', position:'absolute', right:'5px', top:'5px'}} 
              as={Link}
              href={`/results/${rid}`}
            />

            <Flex flexWrap='wrap' w='100%'>

              <Flex flexWrap='wrap' w={['100%','35%']} flex='1 1 15%' sx={{position:'relative'}} justifyContent='space-evenly' >
                 {user && !result.user.ssuid ?
                   <Button 
                      colorScheme='green' 
                      size='md'
                      sx={{position:'absolute', top:'0', left:'5', zIndex:'1'}}
                      onClick={handleClaim}
                    >
                      Claim
                    </Button>
                    :<Icon 
                      as={MdVerified} 
                      boxSize="9"
                      color='ss_green'
                      sx={{position:'absolute', top:'0', left:'0', zIndex:'1'}}
                    />
                  }

                <Flex flexWrap='wrap' justifyContent='center' style={{position:'relative'}} w='35%'>

                  <Box sx={{position:'absolute', right:'5px', top:'0',zIndex:'1', cursor:'pointer'}} className='shareButton'  onClick={handleShare} >
                    <Icon as={FiShare2} boxSize="8" color="black" />
                  </Box>

                  <Avatar 
                    size={['xl','2xl']} 
                    ml='2' 
                    as={Link}
                    href={`/profile/${result?.user?.ssuid}`}
                    className={result?.user?.ssuid?"":"disabled"}
                    sx={{pointerEvents: result?.user?'':'none'}}
                    name={result.givenName+" "+result.familyName} 
                    src={
                      result.user?.profilePhoto?.split(":")[1]
                      ? 'https://s3-us-west-2.amazonaws.com/ss-profile-pics/'+result?.user?.profilePhoto.split(":")[1]
                      :result?.user?.profilePhoto
                    }
                  />  

                  <Box sx={{position:'absolute' ,right:'0', bottom:'5px'}}> 
                    {result.country&&(
                      <ReactCountryFlag 
                        svg 
                        countryCode={getCountryISO2(result.country)}
                        title={result.country}
                        style={{marginBottom:'0',width:'2.5em', height:'2.5em'}}
                      /> 
                    )}
                  </Box>
                </Flex>
                
                <Flex direction='column' h='fit-content' w='65%' pl='6'>
                  <Text w='100%' fontSize='2em' fontWeight='bold' textAlign='center' pb='2' > {result.givenName+" "+result.familyName} </Text>
                
                  <Flex   flexWrap='wrap'>
                    <Icon as={FiHash} boxSize="5" color="black" />  <Text ml='2' fontSize='1.1em'>{result.bib} </Text>
                  </Flex>
                  <Flex   flexWrap='wrap'>
                    <Icon as={FiUsers} boxSize="5" color="black" /><Text ml='2' fontSize='1.1em'>  {result.cat} </Text>
                  </Flex>
                  <Flex   flexWrap='wrap'>
                    <Icon as={FiClock} boxSize="5" color="black" /><Text ml='2' fontSize='1.1em'>  {msToTime(result.OT)} </Text>
                  </Flex>
                
                </Flex>
              </Flex>

              <Box w={['100%','65%']} mb={[0,2]}   h='fit-content'>

                

                <Flex flexWrap='wrap' mb='3' justifyContent='space-evenly' sx={{borderBottom: '1px solid #000'}} >
                  <Box w={3/9} textAlign='center' my={2} sx={{borderRight: '1px solid #000'}} >
                    <Text fontSize='1.5em'>Overall</Text>
                    <Text fontSize='1.5em'>{ordinal_suffix_of(result?.oRank)} </Text>
                  </Box>
                  <Box w={3/9} textAlign='center' my={2} sx={{borderRight: '1px solid #000'}}>
                    <Text fontSize='1.5em'>Gender</Text>
                    <Text fontSize='1.5em'>{ordinal_suffix_of(result?.gRank)} </Text>
                  </Box>
                  <Box w={3/9} textAlign='center' my={2}>
                    <Text fontSize='1.5em' >Category</Text>
                    <Text fontSize='1.5em'>{ordinal_suffix_of(result?.cRank)} </Text>
                  </Box>
                </Flex>

              </Box>

            </Flex>

            <Box w='100%' className='timingTable' px={[1,2,3]} pb='6' >
              <Styles>  

                <Table style={{width:"100%"}} bg='none' >
                  <thead>
                    <tr className="eventColors" style={{color:''}}>

                      <th colSpan={1} className="pboxpoint center" style={{paddingLeft:"0.5rem",textAlign:"left"}}>Point</th>
                      <th className="pboxtime fulltime">Time</th>
                      <th className="pboxpace center">Pace</th>
                      <th className="pboxtod timeofdaytext center min-tablet">Time of Day</th>
                      <th className="pboxtod rank center min-desktop">Overall</th>
                      <th className="pboxtod rank center min-desktop">Gender</th>
                      <th className="pboxtod rank center min-desktop">Category</th>
                      <th/>
                    </tr>
                  </thead>
                  <Tbody>
                    {race?.cols?.filter(item => item != null).filter(item => !item.CL?.match(/_meta/g) ).sort((a, b) => a.CO - b.CO).map((p, i, a )=> 

                      //check if it's the first row
                      [9,6,7].includes(p.CT) ?
                        <>
                         <BlankRow key={p.id+"blank"}/> 
                          <NameRow  info={p} data={result?.coldata.filter((col)=>col.CID == p.id)[0]} key={p.id} canOpen={race?.cols[i-1]?.CT == 4 ?true:false}/> 
                          <SplitRow 
                            info={{...p, RCDS: p.RCD}} 
                            data={result?.coldata.filter((col)=>col.CID == p.id)[0]}  
                            key={p.id+"splitrow"} 
                            raceInfo={race?.info}
                            canOpen={race?.cols?.[i-1]?.CT == 4 ?true:false}
                            setOpen={setOpen}
                            open={open}
                          />

                          {open === p.id && 
                          
                            a.slice(0, i).filter(row=> row.CT !== 5).map((pp, ii, aa )=> {
                              if( pp.CT === 4 && ii > aa.map(element=> element.CT === 9).lastIndexOf(true) || aa.map(element=> element.CT === 9).lastIndexOf(true) === -1  ){
                             
                               return (
                                <SubRow 
                                  info={{...pp, RCDS: aa[ii-1]?.RCD && aa[ii-1]?.CT === 4 ? pp.RCD - aa[ii-1].RCD : pp.RCD }} 
                                  data={result?.coldata.filter((col)=>col.CID == pp.id)[0]}  
                                  prepareRow={{data : result?.coldata.filter((col)=>col.CID == aa[ii-1]?.id)?.[0], info:  aa[ii-1]   }}
                                  raceInfo={race?.info}
                                  key={pp.id+"splitrow"} 
                                />
                              )}}
                            )}
                        </>
                      : p.CT === 5 && 
                        <>
                         <TransitionRow info={p}  data={result?.coldata.filter((col)=>col.CID == p.id)[0]} key={p.data+"ta"} />
                        </>
                      
                                      
                    )}
                  </Tbody>
                </Table>

              </Styles>
            </Box>
          </Flex>
        </Flex>

      </Section.Container>
    </Layout>
  )
}



export async function getStaticPaths() {
  // When this is true (in preview environments) don't
  // prerender any static pages
  // (faster builds, but slower initial page load)

    return {
      paths: [],
      fallback: 'blocking',
    }
  
}

// This also gets called at build time
export async function getStaticProps({ params, locale }) {
  // params contains the series `slug`.
  // If the route is like /series/1, then params.slug is 1

  const query = gql`
    query GetProfileResults($bib: String!, $rid: Int!) {
      result(bib: $bib, rid: $rid) {
        id
        rid
        bib
        name
        givenName
        familyName
        country
        state
        city
        oRank
        gRank
        cRank
        cat
        gender
        status
        OT
        user{
          id
          ssuid
          profilePhoto
        }
        coldata{
          id: CID
          CID
          RC
          RG
          RO
          CD
          TOD
          ST
        }
      }
      race(rid:$rid){
        id
        rid
        info {
          id
          name
          date
          extResultUrl
          status
          type
          img
          RFC
        }
        cols {
          id: CID
          CL
          CT
          CO
          CD
          CHO
          CAO
        }
        event {
          id
          name
          eimg
          races {
            id
            rid
            name
            date
            extResultUrl
            status
          }
        }
        master {
          id
          slug
          country
          state
          city
        }
      }
    }
  `;

  const { data } = await client.query({
      query: query,
      variables: {
        bib: params.bib.toString(),
        rid: parseInt(params.raceid)
      }
    });

  // Pass post data to the page via props
  return { 
    props: { 
      ...(await serverSideTranslations(locale, ['common', 'public', 'app','translation'], null, ['en', 'fr'])),
      result: data.result,
      race: data.race,
      revalidate: 160, // In seconds
      rid: parseInt(params.raceid)
    } 
  }
}

export default ResultPageInd


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
