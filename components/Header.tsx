import Image from 'next/image'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import sportstats_logo from '../public/images/sportstats_logo.png'

export default function Header({ color }) {

  return (
    <header className="header" > 
      <Navbar collapseOnSelect expand="lg" bg={color==='none'?'none':"dark"} variant="dark" fixed="top" >
         <Container>
            <Navbar.Brand href="#home">
              <Image
                alt="Sportstats"
                src={sportstats_logo}
                layout="fixed"
                width={400}
                height={70}
                priority
              />
            </Navbar.Brand>
            <Navbar.Collapse className="justify-content-end">
              test
            </Navbar.Collapse>
        </Container>

      </Navbar>
    </header>

)}
