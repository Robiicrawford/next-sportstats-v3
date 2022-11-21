import React, {useState, useEffect} from "react"
import { NextSeo } from 'next-seo';

import { useRouter } from 'next/router'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import { useAuthenticator } from '@aws-amplify/ui-react';

import { useQuery, gql } from "@apollo/client";
import {client} from "../../apollo/apollo-client";

import styled from "styled-components";
import { Flex, Center, Box, Heading, Text, Button, Spacer, ButtonGroup, IconButton,  Skeleton, Input  } from '@chakra-ui/react';

import {secondsToTime} from "../../utils/formatTime"

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react'

import { StackDivider,  VStack } from '@chakra-ui/react'

import { useTable, useFilters, useGlobalFilter, useSortBy, useAsyncDebounce, usePagination, useControlledState, useExpanded } from 'react-table'

import { useCSVDownloader } from 'react-papaparse';

import Layout from '../../components/layout/Layout'

import Section from '../../components/section';
import Triangle from '../../components/triangle';

import HeroCard from '../../components/race/HeroCard';

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;
    width: 100%;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
    
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px dotted black;
      :last-child {
        border-right: 0;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
  }
`


const GET_RESULTS = gql`
  query GetResults($rid: Int!) {
    allTeamResults(rid: $rid) {
        clubs {
          club
          place
          tp
          data{
            Number
            FName
            LName
            Div
            DivPlace
            Time
            diff
            points
          }
        }
        divs {
          CL
          CT
        }
      }
  }
`;


function Table({ columns: userColumns, data, renderRowSubComponent, isLoading }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
 //   rows,
    prepareRow,
    setFilter, 
    visibleColumns,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: {expanded, pageIndex, pageSize },
  } = useTable(
    {
      columns: userColumns,
      data,
      initialState: { pageIndex: 0 },
    },
    useExpanded, // Use the useExpanded plugin hook
    useFilters ,
    usePagination,
  )

  const [filterInput, setFilterInput] = React.useState("");
  const handleFilterChange = e => {
  const value = e.target.value || undefined;
    setFilter("club", value); // Update the show.name filter. Now our table will filter and show only the rows which have a matching value
    setFilterInput(value);
  };

  return (
    <>
      <Input
        value={filterInput}
        onChange={handleFilterChange}
        placeholder={"Search club name"}
      />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
               <>
                {isLoading&& new Array(10).fill("").map((_, index) => (
                          <tr key={index}> 
                            <td colSpan={999} > <Skeleton height='65px' width='100%' startColor='pink.500' endColor='pink.500'  noOfLines={10}  /> </td>
                          </tr>
                      ))}
                
              {data && (
                <>
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => {
                      return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    })}
                  </tr>
                  {/*
                    If the row is in an expanded state, render a row with a
                    column that fills the entire length of the table.
                  */}
                  {row.isExpanded ? (
                    <tr>
                      <td colSpan={visibleColumns.length}>
                        {/*
                            Inside it, call our renderRowSubComponent function. In reality,
                            you could pass whatever you want as props to
                            a component like this, including the entire
                            table instance. But for this example, we'll just
                            pass the row
                          */}
                        {renderRowSubComponent({ row })}
                      </td>
                    </tr>
                  ) : null}
                  </>
                )}
              </>
            )
          })}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  )
}

function ResultPageInd({ race }) {
  const { t } = useTranslation('common');

  const { loading, data, called, refetch, networkStatus, fetchMore  } = useQuery(
    GET_RESULTS, {
      //fetchPolicy: "no-cache",
      notifyOnNetworkStatusChange: true, 
      variables: {rid: parseInt(race.rid) }
    });

  const columns = React.useMemo(
    () => [
          {
            // Make an expander cell
            Header: () => null, // No header
            id: 'expander', // It needs an ID
            Cell: ({ row }) => (
              // Use Cell to render an expander for each row.
              // We can use the getToggleRowExpandedProps prop-getter
              // to build the expander.
              <span {...row.getToggleRowExpandedProps()}>
                {row.isExpanded ? '👇' : '👉'}
              </span>
            ),
          },
          {
            Header: 'Place',
            accessor: 'place'
          },
          {
            Header: 'Tri Club',
            accessor: 'club'
          },
          {
            Header: 'Total Points',
            accessor: row => Math.round(row.tp * 10) / 10
          },
        ],
    []
  )

  const dataFinal = React.useMemo(()=> 
    data?.allTeamResults?.clubs?data?.allTeamResults?.clubs:[]
  ,[data]);


  const renderRowSubComponent = React.useCallback(
    ({ row }) => {
      return(<>
        <table>
          <thead>
            <tr> 
              <th>Nmber</th>
              <th>Name</th>
              <th>Div</th>
              <th>Place </th>
              <th>Time </th>
              <th>Diff </th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {row.original.data.map((r,i)=>
              <tr key={i}>

                <th>{r.Number}</th>
                <th>{r.FName+' '+r.LName}</th>
                <th>{r.Div}</th>
                <th>{r.DivPlace}</th>
                <th>{r.Time}</th>
                <th>{r.diff?'+':''}{r.diff}</th>
                <th>{r.points}</th>
              </tr>
            )}
          </tbody>
        </table>
      </>
    )},
    []
  )

  const { user } = useAuthenticator((context) => [context.user]);
  const { CSVDownloader, Type } = useCSVDownloader();
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Layout header_color='black' >
      <NextSeo
        title={`${race?.event?.name} - ${race?.info?.name} - Team Points`}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Category Times</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack
              divider={<StackDivider borderColor='gray.200' />}
              spacing={1}
              align='stretch'
            >
              {data?.allTeamResults?.divs.map((div)=>
                <Flex flexWrap='wrap' justifyContent='space-evenly' >
                  <strong>{div.CL}</strong> <span> - </span> <span> {secondsToTime(div.CT)} </span>
                </Flex>
              )}
            </VStack>


          </ModalBody>
        </ModalContent>
      </Modal>

      <Section.Container id="series" Background={Background} >
        {/* race card */}
        <HeroCard race={race} />

        <Spacer mb='4'/>
        {/* result section */}
        <Flex  flexWrap='wrap'  w='100%' pt={3} className='card__base'  >
          {!data?.allTeamResults?.divs && !loading && <Heading w='100%' textAlign='center'>No Results Yet</Heading>}
          {data?.allTeamResults?.divs &&
            <>
              <ButtonGroup  spacing='6' px='3'>
                <Button colorScheme='teal' onClick={onOpen}>
                  Category Times
                </Button>
                {/* @ts-ignore */}
                {["superAdmin", "admin","timer", "RaceDirector"].some( i => user?.signInUserSession?.accessToken?.payload['cognito:groups'].includes(i) ) &&
                  <Button
                     colorScheme='teal'
                      as={CSVDownloader}
                     data={()=>{
                      if(!data?.allTeamResults?.clubs){
                        return false
                      } else {
                       
                        return data?.allTeamResults?.clubs.map((c)=> {
                          return {place:c.place, club: c.club, points:c.tp}
                        })

                     }}}
                     type={Type.Button}
                     filename={`${race?.event?.name} - ${race?.info?.name} - Team Points`}
                     bom={true}
                   >
                     Download as CSV
                   </Button>
                }
                  
              </ButtonGroup>

              <Styles>
                <Table 
                  isLoading={loading}
                  columns={columns} 
                  data={dataFinal}
                  renderRowSubComponent={renderRowSubComponent}
                />
              </Styles>
            </>
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

  //var data = {}
  const { data } = await client.query({
      query: query,
      variables: {
        rid: parseInt(params.raceid)
      }
    });

  // Pass post data to the page via props
  return { 
    props: { 
      ...(await serverSideTranslations(locale, ['common', 'public', 'app','translation'], null, ['en', 'fr'])),
      race: data?.race?data?.race:{},
      revalidate: 130, // In seconds
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
