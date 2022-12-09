import React, {useState, useEffect, Suspense} from "react"
import { NextSeo } from 'next-seo';

import Link from 'next/link'

import { useRouter } from 'next/router'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import { useAuthenticator } from '@aws-amplify/ui-react';

import styled from "styled-components";
import { 
  Flex, Center, Box, Heading, Text, Button, 
  Spacer, Avatar, ButtonGroup, IconButton, VStack, Skeleton, 
  useDisclosure  
} from '@chakra-ui/react';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'


import { 
  useTable, useFilters, 
  useGlobalFilter, useSortBy, 
  useAsyncDebounce, usePagination, useControlledState 
} from 'react-table'

import Layout from '../../components/layout/Layout'

import Section from '../../components/section';
import Triangle from '../../components/triangle';

import HeroCard from '../../components/race/HeroCard';
import SearchBox from '../../components/race/SearchBox';


import ReactCountryFlag from "react-country-flag"

import { useQuery, gql } from "@apollo/client";
import {client} from "../../apollo/apollo-client";

import {msToTime, msToPace, calculatePace} from '../../utils/formatTime'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareAlt, faChartBar, faFilter, faTimes, faEye, faBackward, faBackwardStep, faForwardStep  } from "@fortawesome/free-solid-svg-icons";

import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const RaceStats = React.lazy(() => import('../../components/race/RaceStats'));
const ContactForm = React.lazy(() => import('../../components/help/ContactForm'));

const getCountryISO2 = require("country-iso-3-to-2");

const animatedComponents = makeAnimated();


const label_to_col = {
  name:'name',
  bib:'bib',
  category:'cat',
  rank: 'oRank',
  "gender place":'gRank',
  "cat. place":'cRank',
}


const Styles = styled.div`
  width: 100%;

  .active {
    color: #0CAA56;
  }
  table {

    border-spacing: 2px;
    width: 100%;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
      :nth-child(even) {
        background-color: surface ;
      }
      :nth-child(odd) {
        background-color: wash ;
      }
    }
    tbody {
      
      tr {
        cursor: pointer;
        border-bottom: 1px solid black; 
        :first-child {
          border-top: 1px solid black; 
        }
        .bold {
          font-weight: bolder;
          font-size: 30px;
        }
        .name {
          font-weight: bolder;
        }
          &:hover  {
            background-color: #80808087;
            
            .name { 
              color: green;
            }
          }
      }
    }
    
    th {
      margin: 0;
      padding: 0.1rem;
      text-transform: capitalize;
      width:2%;
      :last-child {
        border-right: 0;
      }
    }
    td {
     
      width:1%;
      :last-child {
      }
    }
    .center {
      text-align: center;
    }
    .sort {
      cursor: pointer;
    }
    .sortIcon {
      margin-left: 5px;
    }
   
  }
`

const GET_RESULTS = gql`
  query GetResults($rid: Int!, $page: Int, $gender: String, $cat: String, $searchData: String, $sort: String) {
    results(rid: $rid, page: $page, gender: $gender, cat: $cat, searchData: $searchData, sort: $sort ) {
      id
      rid
      pageInfo {
          currentPage
          totalPages
          hasNextPage
          totalRecords
          splitId
      }
      results {
        id
        bib
        givenName
        familyName
        user {
          id
          ssuid
          info{
            profilePhoto
          }
        }
        name
        country
        state
        city
        oRank
        gRank
        cRank
        cat
        gender
        status
        officialTime : OT
        coldata {
            CID
            RC
            RG
            RO
            CD
            TOD
            ST
        }
      }
    }
  }
`;


function Table({race, columns, data, isLoading, setOpenStats, fetchMore, pageInfo}) {
  const { t } = useTranslation('common');
  const router = useRouter()

  //state of support modal // used to open or close support modal
  const { isOpen, onOpen, onClose } = useDisclosure()
  /// state of open help form 
  const [open, setOpen] = useState(false)

  const btnRefFilter = React.useRef()

  const skipPageResetRef = React.useRef()
  const [controlledPageIndex, setControlledPage] = React.useState(0)
  const [filters, setFilter] = React.useState([])
  const [searchText, setSearchText] = useState('')
  const [sort, setSort] = useState(null)

  
  const rowClick =(row)=>{ router.push(`/results/${race.rid}/${row.original.bib}`)}

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    setState,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
    setSortBy,
    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, sortBy },
  } = useTable(
    {
      columns,
      data,
      manualPagination: true,
      manualFilters: true,
      manualSortBy: true,
      initialState: {
        pageIndex: 0,
      //  pageCount: usePageInfo.totalPages,
        hiddenColumns:['est next'],
      },
      //stopping basically every piece of state from changing as they normally do
      autoResetPage: !skipPageResetRef.current,
      autoResetExpanded: !skipPageResetRef.current,
      autoResetGroupBy: !skipPageResetRef.current,
      autoResetSelectedRows: !skipPageResetRef.current,
      autoResetSortBy: !skipPageResetRef.current,
      autoResetFilters: !skipPageResetRef.current,
      autoResetRowState: !skipPageResetRef.current,
      useControlledState: state => {
       return React.useMemo(
        () => ({
           ...state,
        //   pageCount: usePageInfo.totalPages,
           pageIndex: controlledPageIndex,
        }),
         [state,  controlledPageIndex ]
        )
      },
    },
    useFilters, // useFilters!
    useGlobalFilter, // useGlobalFilter!
    useSortBy,
    usePagination,
    
  )


  useEffect(()=> {
    if(!isLoading && race.rid){

      fetchMore({
        variables: {
          rid: parseInt(race.rid),
          page: state.pageIndex,
          gender: filters.filter((f)=> f.type ==='gender').map(a => a.value).join(";"),
          cat: filters.filter((f)=> f.type ==='category').map(a => a.value).join(";"),
          searchData: searchText, 
          sort:sort
        }
      })
    }
  },[state,filters, searchText, sort])

  const changeSort = (id) => {
    var ss = sort ? {...sort}:{}
      ss = (sort?.split(";")[0] == 'asc' && sort?.split(";")[1] == id)?'desc':'asc';
      if(sort?.split(";")[0] === 'desc') {
        ss = ''
      }else {
        ss += `;${id}`
      }
    setSort(ss)
  }

  const handleShare = (event) => {
    event.preventDefault()
    if (navigator.share) {
      navigator
        .share({
          title: `${race?.event?.name} | ${'Sportstats'}`,
          text: `Check out results for ${race?.event?.name} - ${race?.info?.name}  on Sportstats`,
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

  const handleNext = (scroll) => {
    let i = controlledPageIndex ;
    setControlledPage(i+1)
    nextPage(); 
  }

  const handleBack = (value) => {
    setControlledPage(value)
    previousPage()
  }

  console.log(race)
  return (
    <>
   

      <Flex flexWrap='wrap' w='100%'>
        <Flex flexWrap='wrap' w='100%' px='3' sx={{borderBottom:'1px solid black'}} justifyContent='space-around'>
         
          <Box w={['100%','100%','100%', '100%', '50%']} p='1'>
            <SearchBox  searchText={searchText} setSearchText={setSearchText} />
          </Box>

          <Flex w={['100%','100%','100%', '100%', '50%', '40%']} pb='1' my={['2', 'auto']} justifyContent={'flex-end'}  >

            
            <ButtonGroup  spacing='6' w='100%' flexWrap='wrap' justifyContent={'flex-end'} >
              {(race?.category?.genders.length > 0 || race?.category?.cats.length > 0 ) && 
                <ButtonGroup size='md' isAttached mb='1' w={['100%', '100%','50%']} sx={{flexGrow:1}}  >
                  <Button colorScheme='green' isLoading={isLoading}   ref={btnRefFilter} > Filter <FontAwesomeIcon icon={faFilter}  /> </Button>
                  <Select
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    //defaultValue={[colourOptions[4], colourOptions[5]]}
                    isMulti
                    styles={{
                      container: (baseStyles, state) => ({
                        ...baseStyles,
                        flexGrow:1
                      }),
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        height:'100%'
                      }),
                    }}
                    onChange={(e)=>setFilter(e)}
                    defaultValue={filters}
                    options={[
                      {
                        label:  t('public:signup.gender'),
                        options:  race?.category?.genders?.map((s)=> {
                          return {
                            label:t('public:signup.gender-data.'+s.GL?.toLowerCase()) , 
                            value:s.GL, type:'gender', 
                            count: s.GC,
                            isDisabled: filters?.map(a => a.type).includes('category')

                          }}) ,
                      },
                      {
                        label: 'Category',
                        options:  race?.category?.cats?.map((cat)=> {return {label:cat.CL, value:cat.CL, type:'category', count: cat.CC}}).sort( dynamicSort("label") ) ,
                      },
                    ]}
                  /> 

                </ButtonGroup>
              }

              <Button colorScheme='blue' onClick={()=>setOpenStats(true)}  > Stats <FontAwesomeIcon icon={faChartBar} style={{marginLeft:'1em'}} /> </Button>

              <Button colorScheme='black' variant='outline' onClick={handleShare}  > Share <FontAwesomeIcon icon={faShareAlt} style={{marginLeft:'1em'}} /> </Button>

            </ButtonGroup>
          
          </Flex>
        
        </Flex> 

        <Flex flexWrap='wrap' w='100%' px={['0','3','4']}>
         
            <Styles>
              {columns && columns.length > 0  &&
                  <table {...getTableProps()} style={{marginBottom:'1em'}} className="tableWrap" >
                    <thead>
                      {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                          {headerGroup.headers.map(column => (
                            <th 
                             {...column.getHeaderProps(column.getSortByToggleProps())}
                              {...column.getHeaderProps({className: column.className})} 
                              onClick={()=>changeSort(column.rci)}
                              style={column.rci&&{cursor:'pointer'}}
                            > 
                              {t(column.render('Header'))} 
                              {column.filter == 'sort' &&
                                sort?.split(";")[1] == column.rci &&(
                                  <span className='sortIcon'> 
                                    {sort?.split(";")[0] == 'asc' ? '🔽' : '🔼' }
                                  </span>
                                )
                              }
                            </th>
                          ))}
                        </tr>
                      ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                      { !isLoading && data.length == 0 &&(<tr><td colSpan={999} style={{textAlign:'center'}}> No Results Found </td></tr>) }
                      {/* !loading && data[0]?.bib == null &&(<tr><td colSpan={999} style={{textAlign:'center'}}> First athlete estimated at {data[0]?.estTod} </td></tr>) */} 
                      {isLoading && new Array(10).fill("").map((_, index) => (
                          <tr key={index}> 
                            <td colSpan={999} > <Skeleton height='65px' width='100%' startColor='pink.500' endColor='pink.500'  noOfLines={10}  /> </td>
                          </tr>
                      ))}

                      {!isLoading && data && data.length > 0 && (
                        page?.map((row, i) => {
                          prepareRow(row)
                            return (
                              <tr {...row.getRowProps()} onClick={()=> rowClick(row)}>
                                {row?.cells?.map(cell => {
                                  return <td {...cell.getCellProps({className: cell.column.className})}>{cell.render('Cell')}</td>
                                })}
                              </tr>
                            )
                        })
                      )}  
                    </tbody>
                  </table>
                }
              </Styles>
            
        </Flex>

        <Flex w='100%' pb='1' my={['2', 'auto']} justifyContent={'center'} position='relative'  >
          <ButtonGroup gap='3' colorScheme='green' variant='outline'>
            <Button isDisabled={pageIndex==0?true:false} onClick={()=>handleBack(0)} > <FontAwesomeIcon icon={faBackward} size='lg' /> </Button> 
            <Button isDisabled={pageIndex==0?true:false} onClick={()=>handleBack(controlledPageIndex-1)} >  <FontAwesomeIcon icon={faBackwardStep} size='lg' /> </Button> 
            <Box fontWeight='semibold'> 
              {pageSize*pageIndex+1} - { (pageSize*pageIndex)+(data.length>0?data.length:0) } out of {pageInfo?.totalRecords}
            </Box>     
            <Button isDisabled={data.length == 10 ?false:true} onClick={handleNext} > <FontAwesomeIcon icon={faForwardStep} size='lg' />  </Button>
          </ButtonGroup>
          
          <Text 
            sx={{
              position:'absolute', 
              right:'25px', 
              borderBottom:'1px solid black', 
              cursor:'pointer'
            }}
            onClick={onOpen}
          > 
            Need Help? 
          </Text>

        </Flex>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Support</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {!open?
              <Flex flexWrap='wrap' gap='8'>

                {/* email contact for the event */}
                <Flex w='100%' flexWrap='wrap' justifyContent='center'>
                  <Text w='100%' textAlign='center'>For General Event questions</Text>
                  <Button >Contact : org@email.com </Button>
                </Flex>

                {/* link to sportstats FAQ */}
                <Flex w='100%' flexWrap='wrap' justifyContent='center'>
                  <Text w='100%' pb='2'  textAlign='center'>For General Result Questions </Text>
                  <Link href='/help'><Button colorScheme='teal' >Help Center</Button></Link>
                </Flex>

                {/* open corrections form*/}
                <Flex w='100%' flexWrap='wrap' justifyContent='center'>
                  <Text w='100%' pb='2' textAlign='center'>Live Result Corrections </Text>
                 <Button colorScheme='teal' onClick={()=>setOpen(true)} >Contact Us</Button>
                </Flex>
              
              </Flex>
              :
                <Suspense fallback={<div>Loading...</div>}>
                  <ContactForm 
                    info={{
                      category:'corrections',
                      event: race?.event?.name,
                      eid: race?.event?.eid,
                      race: race?.info?.name,
                      rid: race?.event?.rid
                    }} 
                  />
                </Suspense>
            }
          </ModalBody>

          <ModalFooter>
            {open &&
              <Button colorScheme='gray' mr={3} onClick={()=>setOpen(false)}>
                Back
              </Button>
            }
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </>
  )
}

function compareNumericString(rowA, rowB, id, desc) {
    let a = Number.parseFloat(rowA.values[id]);
    let b = Number.parseFloat(rowB.values[id]);
    if (Number.isNaN(a)) {  // Blanks and non-numeric strings to bottom
        a = desc ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY;
    }
    if (Number.isNaN(b)) {
        b = desc ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY;
    }
    if (a > b) return 1; 
    if (a < b) return -1;
    return 0;
}

function dynamicSort(property) {
  var sortOrder = 1;
  if(property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function (a,b) {
    /* next line works with strings and numbers, 
    * and you may want to customize it to your needs
     */
    var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
    return result * sortOrder;
  }
}

function ResultPageInd({ race, rid }) {
  const { t } = useTranslation('common');
  const [view, setView] = useState(null)

  const [isLoading, setLoading] = useState(true)

  const { loading, data, called, refetch, networkStatus, fetchMore  } = useQuery(
    GET_RESULTS, {
      //fetchPolicy: "no-cache",
      notifyOnNetworkStatusChange: true, 
      variables: {rid:parseInt(rid), page: 0}
    });

  const handleShare = (event) => {
    event.preventDefault()
    if (navigator.share) {
      navigator
        .share({
          title: `${race.event.name} | ${'Sportstats'}`,
          text: `Check out results for ${race.event.name} on Sportstats`,
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

  const computeCols =(cols) =>{ 
    if(cols?.layout) {
      // total number of results columns 
      var col_num = cols?.layout.filter((c)=> { return (c.CID? false: true) } ).length ;
      var set =  race?.layout?.map((item,id)=>{
        var {CL: label} = item
        if(label == 'gender place' && ['live', 'results'].includes(race.info.status) || label == 'cat. place'  && ['live', 'results'].includes(race.info.status)) {
          // output for rank fields 
          return {
              id:id,
              Header: label,
              accessor: (label == 'gender place')?'gRank':'cRank',
              co:(label == 'gender place')?1:2,
              className: 'center  min-desktop'
          }
        }
        else if(item.CID && ['live', 'results'].includes(race.info.status)) {
            // output for result fields

            return {
              id:id,
              Header: label,
              accessor:  (props)=> { 
                var index = props?.coldata?.findIndex(object => {
                  return object.CID == item.CID;
                });

                if(!props?.coldata?.[index]) {
                  return ''
                } else {
                  return  props?.coldata?.[index][ ["6","7"]?.includes(item.CT) ? 'CD' :'ST' ]+";"+props?.coldata?.[index]?.CD
                }
              } ,
              className:`center ${ !["6","7"].includes(item.CT) && 'min-tablet' }`,
              co: item.CO+3,
              rci: item.CID,
              filter: (item.CID) ? 'sort' :'',
              sortType: compareNumericString,
              Cell: (props)=> 
                !["1", "2"].includes(item.CT)?
                  <>
                    <Heading fontSize={'22px'} sx={{borderBottom:'1px dotted grey'}}> {msToTime(props.cell.value.split(';')[0])}  </Heading>
                    <Text fontSize={'20px'} display={['none','none', 'block' ]}> {msToTime(props.cell.value.split(';')[1])}  </Text>
                  </>
                : <Heading fontSize={'22px'} > {item.CF === "1" ?msToTime(props.cell.value.split(';')[1]) : props.cell.value.split(';')[1] }  </Heading>  
              } 
          }
          else if(label == 'view') {
            // view icon // old web v2 setup icon 
            return {
              id:id,
              Header: label,
              accessor: 'view',
              className:'center min-desktop',
              Cell: props =>  <FontAwesomeIcon icon={faEye} />     
            }
          } else if( label == 'name'){
            return {
              Header: label,
              co: 0,
              className:'center-header',
              accessor: row => (  
                <Flex  pr={[1,2,3]}>
                      <Flex 
                        px={1} sx={{position:'relative'}} flexWrap='wrap'
                        justifyContent='center' alignContent='center'
                        ml={race.info.status === 'preview'? 4: 1}
                      >
                        <Avatar size='lg' name={row.givenName+" "+row.familyName} src={row.user?.profilePhoto} />  

                              {row.country && (
                                <ReactCountryFlag 
                                  svg 
                                  countryCode={ row.country.length > 2 ? getCountryISO2(row.country.toUpperCase()):row.country }
                                  title={row.country}
                                  style={{ marginBottom:'0', width: '2em', height: '2em', position:'absolute', bottom:0,left:'-16px' }}
                                /> 
                              )}
                            
                  </Flex>
                  <Flex flexWrap='wrap' pl={['2','3','4']} height='fit-content'>
                    <Text className="name" fontSize={'22px'} sx={{borderBottom:'1px solid black'}}>
                            {/* shorten first name if things get to long */}
                      { row.givenName?.length+row.familyName?.length > 20 
                        ? `${row.givenName.split(' ').map(word => word[0]).join('. ')} ${row.familyName}`
                        : `${row.givenName} ${row.familyName}`
                      }
                    </Text>
                    <Text  fontSize={'15px'} width={'100%'}> {row.cat} | {t('common:bib')}: {row.bib} </Text> 
                    <Text color="grey" fontSize={'15px'}> {row.city} </Text>
                  </Flex>
                </Flex>
              )
            } 
          }
           else  if(item.label !== 'watch' && item.label !== 'bib' && ['live', 'results'].includes(race.info.status) ) {
            return {
              id:id,
              Header: label,
              accessor:  (view?.cat && label==='rank' || view?.gender && label==='rank')? (view?.gender)?'gRank':'cRank' :label_to_col[label] ,
              co: -1,
              className: (label === 'rank' || label === 'category' )?'center bold':'center  min-desktop'
            } 
          } 
      }).filter((item)=> {return item !== undefined})
      return set?.sort((a,b)=> {return a.co - b.co}) 

    } else {
      return []
    }
  } 

  const columns = React.useMemo( () => computeCols(race)  ,[race, race?.rid, data?.results] ) ;
  const dataFinal = React.useMemo(()=> (data && data?.results?.results?.length>= 1)? data?.results?.results: [],[data?.results, race?.rid]);


  const [openStats, setOpenStats] = useState(false)

  useEffect(()=>{
    if(loading === false) {
      setLoading(false)
    }
  },[loading, race?.rid])

  console.log(data)
  return (
    <Layout header_color='black' >
      <NextSeo
        title={`${race?.event?.name} - ${race?.info?.name}`}
      />
      <Section.Container id="series" Background={Background} >
        {/* race card */}
        <HeroCard race={race} />

        <Spacer mb='4'/>
        {/* result section */}
        <Flex  flexWrap='wrap'  w='100%' pt={3} className='card__base'  >
          {!openStats
            ? <Table 
                race={race} 
                columns={columns} 
                data={dataFinal} 
                isLoading={isLoading}
                setOpenStats={setOpenStats}
                fetchMore={fetchMore}
                pageInfo={data?.results.pageInfo}
              />
            : <Suspense fallback={<div>Loading...</div>}>
                <RaceStats 
                  race={race} 
                  setOpenStats={setOpenStats}
                />
              </Suspense>
          }
          
        
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
    query GetRaceResults($rid: Int!) {
      
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
          CAO
        }
        layout {
          CID
          CL
          CT
          CF
          CO
          CD
          CHO
        }
        category{
          genders {
            GL
            GC
          }
          cats {
            CL
            CC
          }
        }
        stats {
          id
          PC
          DNS
          DNF
          DSQ
          FIN
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

  var data

  try{
      var { data } = await client.query({
        query: query,
        variables: {
          rid: parseInt(params.raceid)
        }
      });
    } catch(err) {
      console.log(err)
      console.log(err.graphQLErrors)
      console.log(err.graphQLErrors[0].locations)
      console.log(err.graphQLErrors[0].extensions)
    }

    console.log(data)
  // Pass post data to the page via props
  return { 
    props: { 
      ...(await serverSideTranslations(locale, ['common', 'public', 'app','translation'], null, ['en', 'fr'])),
      race: data?.race?data?.race:{},
      rid: parseInt(params.raceid),
      revalidate: 160, // In seconds
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
