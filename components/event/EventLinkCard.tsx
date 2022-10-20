import React, { useState, useEffect } from "react"


import { Flex, Text } from '@chakra-ui/react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faMap, faRegistered, faBars, faLink } from "@fortawesome/free-solid-svg-icons";
import {faFacebookF, faTwitter, faInstagram, faYoutube} from "@fortawesome/free-brands-svg-icons";

const linkType = ['', 'Event Website', 'Reg Link', 'Sportstats Link', 'Outside Link', 'Facebook', 'Insta', 'Twitter', 'Youtube', 'Points Link']
const linkIcon = [faMap, faMap, faRegistered, faLink, faLink, faFacebookF, faInstagram, faTwitter, faYoutube, faLink]



const style = {
  border: '1px dashed gray',
  cursor: 'pointer',
  textDecoration:'none'
}


const LinkCard = ({ id, text : link, index }) => {
  return (
    <a target="_blank" rel="noopener noreferrer" href={link.lu} style={{ ...style }}  className='card_info' >
      {link.la !== 'pub' && <Text pl={2} bg={'red'} > {link.la === 'pub'? 'Public': 'Private'} </Text> }

       <div className="card__header" style={{textAlign:'center', paddingTop:'1em', minHeight:'100px', display:'flex'}} >
         <FontAwesomeIcon icon={linkIcon[link.lt]} size="3x" style={{color:'green', margin:'0 auto'}} className="card__image"  />
        </div>
       <div className="card__body">
        <h4 className='card__title' style={{textAlign:'center'}}>{[4].includes(link.lt)? link.ll:linkType[link.lt] }</h4>
      </div>                   
    </a>
  )
}

export default LinkCard