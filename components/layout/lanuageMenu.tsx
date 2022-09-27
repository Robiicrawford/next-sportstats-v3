import Link from 'next/link'
import { useRouter } from "next/router";

import { useTranslation } from 'next-i18next';

import { 
	Grid, GridItem,
	Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody 
} from '@chakra-ui/react';

import styled from 'styled-components';

const language = ['en', 'fr', 'th'] ;

const languageName = {
	'en': "English",
  'en-CA': "English",
  'en-US': "English",
  fr: "Français",
  th: "ไทย",
  es: "Español"
}

const Login = ({open, onClose}) => {
	const { locale, locales } = useRouter();
	const { t } = useTranslation('app');

  return (
    <Modal isOpen={open} onClose={()=>onClose()}  >
    	<ModalOverlay />
    	<ModalContent>
    		<ModalHeader >{t('common:prefered-language')}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
        	<Grid  templateColumns='repeat(3, 2fr)' gap={6} w='100%' pb='6'>
	            {language.map((lng:string) => (
	          		<SelectLang key={lng} p={1} pb={2} style={{color:lng === locale&&'#0CAA56'}}>
	                <Link
	                  href="#"
	                  locale={lng}
	                >
	                  {languageName[lng]}
	                </Link>   
	         			</SelectLang>
	            ))}
          </Grid>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

const SelectLang = styled(GridItem)`
  color: black;
  width: 100%;
  min-width: 110px;
  white-space: nowrap;
  text-align: center;
  padding: 0.3em 1em;
  border: 2px solid black ;
	border-radius:10px;
	cursor: pointer;
	&:hover {
	    color: #0CAA56; 
	    border-color: #0CAA56;
	}
`;

export default Login
