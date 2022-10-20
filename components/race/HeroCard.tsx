import React, { useState } from "react"
import { useTranslation } from 'next-i18next';

import styled from "styled-components";
import { Box, Flex, Heading, Text, Image, Button } from 'rebass/styled-components';
import { Label, Select } from '@rebass/forms'

import {LangLink, Link} from "../components/common/link"

import ReactCountryFlag from "react-country-flag"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown  } from "@fortawesome/free-solid-svg-icons";

import Badge from '../components/common/badge'
import {slugSet } from "../utils/setSlug"
import ss_icon from '../images/icons/icon_tri.png'

import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';


const IndProfile = ({raceid, data, loading}) => {
  const {t} = useI18next();
  const [open, setOpen] = useState(false)

  return (
    <Flex flexWrap='wrap'  pt={2} >
    <Modal open={open} onClose={()=> setOpen(false)} center  >
      <Flex flexWrap='wrap' >
        <Heading width={1} mb={2} sx={{borderBottom:'2px solid green'}}> Select Results to View </Heading>
        {data.event.races.map((r)=>
          <LangLink to={`/results/a/${r.id}`} onClick={()=> setOpen(false)} style={{width:'100%'}} key={r.i}>  
            <Box width={1} px={[1,2]} py={1} style={{borderBottom:'1px solid black'}}>
                <Text fontSize={2} color='black' > <span className={`tag tag-status tag-${r.status}`}> {r.status} </span> {r.name} - {r.date}</Text>
            </Box>
          </LangLink>
        )}
      </Flex>
    </Modal>
      <Box width={2/8} textAlign="center">
        {data &&
            <Link to={`/event/${slugSet(data?.masterEvent?.info?.name).toLowerCase()}-results`} hover_color='yellow'>
              <Image
                src={data.event.imageUrl?`${data?.event.imageUrl}`: data.masterEvent.info.imageUrl?data.masterEvent.info.imageUrl:ss_icon}
                sx={{ width: "auto", height:84, borderRadius: 10,}}
              />
            </Link>
        }
      </Box>
      <Box width={6/8} sx={{position:"relative"}} px={2}>
        {data 
          &&
            <>
              <Link to={`/event/${slugSet(data?.masterEvent.info.name).toLowerCase()}-results`} color="white" hover_color="grey"> 
                <Heading textAlign="left" fontSize={[2,3,4]} > {data?.event.name} - {t('common:event-details')}</Heading> 
              </Link>

             <Button fontSize={3} bg='grey' py={0.4} style={{cursor:'pointer', borderRadius:'15px'}} onClick={(e)=>setOpen(true)}> 
              {data.info.name} -  {data?.info.date} <FontAwesomeIcon icon={faAngleDown} style={{marginLeft:'0.5rem'}} />
              </Button>
           
            </>
         
        }
      </Box>
    </Flex>
  )
}

export default IndProfile
