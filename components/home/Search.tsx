import React, {useState} from "react"

import { useTranslation } from 'next-i18next';

import { useLazyQuery, gql  } from '@apollo/client';

import styled from 'styled-components';
import { Flex, Box, Image, Heading, Text, Button, Stack, Spacer  } from '@chakra-ui/react';
import { Input, InputGroup, InputLeftElement, Select } from '@chakra-ui/react'


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faCaretLeft, faTimes, faSearch } from "@fortawesome/free-solid-svg-icons";

import ResultCard from "./ResultCard"
import EventCard from "./EventCardSearch"


const GET_EVENTS_SEARCH = gql`
  query GetEventsSearch($name: String!, $page: Int!, $month: String!, $region: String!) {
    masterEvents(name: $name,page: $page, month: $month, region: $region) {
      id
      pageInfo {
           currentPage
          hasNextPage
      }
      masterEvents {
        id
        mid
        info{
          name
          imageUrl
          date
          country
          city
        }
    }
  }
  }
`;

const GET_RESULT_SEARCH = gql`
  query GetResultSearch($searchData: String!, $page: Int!) {
    allResults(searchData:$searchData, page: $page){
      pageInfo{
        currentPage
        hasNextPage
      }
      result{
        id
        bib
        givenName
        familyName
        cat
        country
        city
        officialTime
        user{
          id
          info{
            profilePhoto
          }   
        }
        masterEvent{
          id : mid
          info{
            name
          }
        }
        race{
          id
          date
          name
          status
        }
      }
  }
  }
`;


const IndexPage = () => {
  const {t} = useTranslation();

  const [searchType, setType] = useState('results')

  const [filter, setFilter]  = useState(false)
  const [region, setRegion] = useState('');
  const [words, setWords] = useState<any>('');
  const [month, setDate] = useState('');

  const [ getSearch, { called, loading: loading2, data: data2, networkStatus: networkStatus2, fetchMore} ] = useLazyQuery(GET_EVENTS_SEARCH);
  const [ getSearchResult, { called: called3, loading: loading3, data: data3, networkStatus: networkStatus3, fetchMore: fetchMore3} ] = useLazyQuery(GET_RESULT_SEARCH);


  const nextPage = () => {
    if (searchType == 'events') {
      fetchMore({variables: {name: words,page:data2.masterEvents.pageInfo.currentPage+1, month:month, region: region}})
    } else {
      fetchMore3({variables: {searchData: words,page:data3.allResults.pageInfo.currentPage+1}})
    }
    
  }

  const backPage = () => {
    if (searchType == 'events') {
      fetchMore({variables: {name: words,page:data2.masterEvents.pageInfo.currentPage-1, month:month, region: region}})
    } else {
      fetchMore3({variables: {searchData: words,page:data3.allResults.pageInfo.currentPage-1}})
    }
  }

  const changeWords = (e) => {
    setWords(e.target.value)
    if (e.target.value.length > 2) {
      setFilter(true)
      if (e.target.value.replace(/ /g, '') != words.replace(/ /g, '')) {
        if (searchType == 'events') {
          if (!called) {
            getSearch({variables: {name: e.target.value,page:0, month:month, region: region}})
          } else {
            fetchMore({variables: {name: e.target.value,page:0, month:month, region: region}})
          }
        } else {
          if (!called3) {
            getSearchResult({variables: {searchData: e.target.value, page:0}})
          } else {
            fetchMore3({variables: {searchData: e.target.value, page:0}})
          }
        }
      }
    } 
  }

  const removeWord = (i) => {
    let arr = words.split(" ")
      arr.splice(i,1);
    let arr2 = arr.join(' ');
     setWords(arr2)
     
     if (searchType == 'events') {
       fetchMore({variables: {name: arr2,page:0, month:month, region: region}})
     } else {
       fetchMore3({variables: {searchData: arr2,page:0}})
     }
     
     if (arr2.length == 0 && region == '' && month == '') {
       clearAll()
     }
  }

   const clearAll = () => {
    setWords(false)
    setRegion('')
    setDate('')
    setFilter(false)
  }

  React.useEffect(()=> {
   // document.getElementById("input_search").focus();
  },[])

  return (
    <>

      <SearchFlex 
        flexWrap='wrap' 
        style={{position:'absolute', top:'34%', left:'0', right:'0'}}
        w='600px'
        maxW='750px'
        mx='auto'
      >
        <Box
          as='h2'
          color='white'
          fontWeight='bold'
          w='100%'
          justifyContent='center'
          mb='3'
        >
          {t('translation:description')}
        </Box>
      
        <Flex w='100%' bg='white'  >
        
          <Box flex='1 1 30%' color='black'>
                       <Select
                         bg='white'
                         color='black'
                         sx={{fontWeight:'bold'}}
                         variant='filled'
                         onChange={(e)=>setType(e.target.value)}
                       >
                         <option value='results'>{t('common:athletes')}</option>
                         <option value='events'>{t('common:events')}</option>
                       </Select>
          </Box>
          <InputGroup flex='1 1 70%'>
            <InputLeftElement
              pointerEvents='none'
              children={<FontAwesomeIcon icon={faSearch} color='gray.300' />}
            />
            <Input 
              w='100%' bg='white' color='black' height={['50px']} 
              id='input_search'
             // sx={{borderRadius:'0 10px 10px 0'}}
              onChange={changeWords}
              autoComplete="off"
              placeholder={
                searchType == 'results'
                  ?t('common:search-athlete')+'...'
                  :t('common:search-event')+'...'
              } 
              value={words? words:''}   
            />
          </InputGroup>
        </Flex>

          {words&&
            <Flex bg='#808080' w='100%' py='1' px='1'>
             
                     <Stack  direction='row' spacing={4} >
                       {words &&(
                         words.split(" ").map((w,i) =>
                           w.length >= 1 && (
                             <Button 
                               key={i} variant='outline'
                               m={0} p={0.5} px={2}
                               style={{borderColor:'#0CAA56', cursor:'pointer'}}
                               onClick={()=>removeWord(i)}
                             >
                               {w}
                               <FontAwesomeIcon style={{marginLeft:'0.5rem'}} icon={faTimes} size="1x"/>
                             </Button>
                           )
                         )
                       )}
                     </Stack >
                     <Spacer />
                     <Box >
                       <Button 
                          colorScheme='teal'
                           m={0} p={0.5} px={2}
                          height='fit-content' onClick={clearAll}
                        > 
                          Clear All 
                        </Button>
                     </Box>
            
              </Flex>
            }
        {words &&
          <Flex 
            w='100%' flexWrap='wrap' bg='white'   
            pb={[1,2,3]}
            sx={{position:'relative',zIndex:'100'}}
          >
            { words && data3 && searchType == 'results' && (
              <> 
                      {data3.allResults.result.slice(0,3).map((e,i)=>
                        <ResultCard key={i} e={e} />
                      )}

                      <Stack w='100%' direction='row' spacing={4} justifyContent='center' >
                        {data3.allResults.pageInfo.currentPage !=0 &&(
                          <Button 
                            style={{padding:'0 1rem'}} 
                            onClick={backPage} 
                            > <FontAwesomeIcon style={{marginRight:'0.5rem'}} icon={faCaretLeft} size="lg"/> Last </Button>
                        )}
                        {data3.allResults.pageInfo.hasNextPage &&(
                          <Button   
                            style={{padding:'0 1rem'}} 
                            onClick={nextPage} > 
                              Next 
                              <FontAwesomeIcon style={{marginLeft:'0.5rem'}} icon={faCaretRight} size="lg"/> 
                            </Button>
                        )}
                      </Stack>
                      
              </>
            )}
            { words && data2 && searchType =='events' && (
                data2.masterEvents.masterEvents.length > 0
                  ? (<>
                        
                        {data2.masterEvents.masterEvents.slice(0,3).map((e,i)=>
                            <EventCard key={e.mid} e={e}  />
                         
                        )}

                        <Stack w='100%' direction='row' spacing={4} justifyContent='center' >
                         
                              {data2.masterEvents.pageInfo.currentPage !=0 &&(
                                <Button style={{padding:'0 1rem'}} onClick={backPage} > <FontAwesomeIcon style={{marginRight:'0.5rem'}} icon={faCaretLeft} size="lg"/> Last </Button>
                              )}

                              {data2.masterEvents.pageInfo.hasNextPage &&(
                                <Button  style={{padding:'0 1rem'}} onClick={nextPage} > Next <FontAwesomeIcon style={{marginLeft:'0.5rem'}} icon={faCaretRight} size="lg"/> </Button>
                              )}
                        
                        </Stack>
                      </>)

                  : 
                    <Box width={1} height='30vh'><Text fontSize={[3,4]} textAlign='center'>No Events Where Found For Your Search :-(</Text></Box>
                  
              )}

        </Flex> 
      }

       
      </SearchFlex>
    </>
)}

export default IndexPage


const SearchFlex = styled(Flex)`
  box-shadow:  0 3px 3px 3px rgba(0, 0, 0, 0.4);
`