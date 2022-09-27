
import { 
	Box, Flex, Heading, Text, 
	Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody 
} from '@chakra-ui/react';


import styled from 'styled-components';


const language = ['en', 'fr', 'th'] ;

const languageName = {
  en: "English",
  fr: "Français",
  th: "ไทย",
  es: "Español"
}

const Login = ({open, onClose}) => {


  return (
    <Modal isOpen={open} onClose={()=>onClose()}  >
    	<ModalOverlay />
    	<ModalContent>
    		<ModalHeader >Select a Lanuage</ModalHeader>
        <ModalCloseButton onClose={()=>onClose()} />
        <ModalBody>
        	<Flex  w='100%' flexWrap='wrap'>
	            {language.map((lng:string) => (
	          		<Box key={lng} p={1} pb={2} width={[1/2,1/3]}>
	                <SelectLang
	               // 	active={lng === language?true:false}
	                	width={1}
	                  href="#"
	                  as={Text}
	                //  className={lng === language&&'active'}
	                  onClick={(e) => {
	                    e.preventDefault();
	                 //   changeLanguage(lng);
	                  }}>
	                    {languageName[lng]}
	                </SelectLang>   
	         			</Box>
	            ))}
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}


const SelectLang = styled.a`
  color: black;
  width: 100%;
  min-width: 110px;
  white-space: nowrap;
  text-align: center;
  padding: 0.3em 1em;
  border-style:solid;
	border-width:thin;
	border-radius:10px;
	cursor: pointer;
  ${({ active }) => 
	  	active && `
	   	color: #0CAA56;
	  	`
	};
	&:hover {
	    color: #0CAA56; 
	    border-color: #0CAA56;
	}
`;

export default Login
