import React from "react"


import styled from 'styled-components';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareAlt} from "@fortawesome/free-solid-svg-icons";


import {slugSet } from "../../utils/setSlug"

import Link from 'next/link'

import ss from '../../public/images/icons/white_sportstats.png'

import { LazyLoadImage } from "react-lazy-load-image-component";

const getCountryISO2 = require("country-iso-3-to-2");

const Card = ({e}) => {

  const handleOnClick = (event) => {
  	event.preventDefault()
    if (navigator.share) {
      navigator
        .share({
          title: `${e.info.name} | ${'Sportstats'}`,
          text: `Check out results from ${e.info.name}  on Sportstats`,
          url: document.location.href+`event/${slugSet(e.info.name).toLowerCase()}-results`,
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
   <EventCard  className="card" >
   
			<Link style={{maxWidth:'100%'}} href={`/event/${slugSet(e.info?.name).toLowerCase()}-results`} > 
			
					<Container style={{gap:'0'}} >
				
						<Row  >
							<Col xs='12' style={{display:'flex', justifyContent:'center', minHeight:'210px'}}> 
								<LazyLoadImage 
									width='auto' height='100%' maxHeight={['100px','150px']}  
									src={e.info?.imageUrl?e.info.imageUrl:ss} 
									alt={e.info?.name}
									loading="lazy"
									className="card__image"
	          			effect="blur"
									
								/>
							</Col>

				    	<Col xs='12' >
					    	<h5> 
					    		{ new Date(
					    			e.info?.date.slice(0,4)+'/'+e.info?.date.slice(4,6)+'/'+e.info?.date.slice(6,8)
					    			).toLocaleDateString('en-CA', { month: 'long', day: 'numeric' }
					    		)} {" "}
					    		{new Date(
					    			e.info?.date.slice(0,4)+'/'+e.info?.date.slice(4,6)+'/'+e.info?.date.slice(6,8)
					    		).toLocaleDateString('en-CA', {year: 'numeric'})} 
					    	</h5>
					    </Col>
				    	<Col xs='12'  >
					    	<h4 
					    		style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}
					    	>
					    		{e.info?.name}
					    	</h4> 
					    </Col>
				    </Row>
				    <Row>

				    	<Col xs='12' >
					    	<h4
					    		style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}
					    	> 
					    		{e.events[0]?.city} | {e.events[0]?.country}
					    	</h4>
				    	</Col>
				    	<Col>
				    		 <FontAwesomeIcon icon={faShareAlt} size='sm' />
				    	</Col>

				    </Row>

				</Container>
			</Link>
	</EventCard>
  )
}

export const EventCard = styled(Col)`
	max-width: 100%;
	transform: scale(1);
	cursor: pointer;
	border-radius: 10px;
	width: clamp(20rem, calc(20rem + 2vw), 20rem);
	transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s !important;
	.card__event {
		  display: flex;
		  flex-direction: column;
		 width: clamp(19rem, calc(19rem + 2vw), 19rem);
		  overflow: hidden;
		  box-shadow: 0 .1rem 1rem rgba(0, 0, 0, 0.1);
		  border-radius: 1em;
		  background: #ECE9E6;
		  background: linear-gradient(to right, #FFFFFF, #ECE9E6);
		  text-decoration:  none;
		  color: black;
	}
	@media only screen and (max-width: 480px) {
  	width: 100% !important;
	}
`

export default Card
