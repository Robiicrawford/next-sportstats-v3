import * as React from "react"
import Skeleton from "../Skeleton";

import SectionSlider from "./SectionSlider";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const MainHomeFilms = ({
  data,
  section,
  isLoadingSection,
}) => {
 
  return (
    <>

      <Container fluid >
        {isLoadingSection ? (
          <>
            {new Array(2).fill("").map((_, index) => (
              <div key={index}>
                <Skeleton className="mb-3 max-w-[10%] h-8 rounded-md" />
                <SectionSlider events={undefined} />
              </div>
            ))}
          </>
        ) : (
              <Row >
                <Col xs='12'>
                  <h2 style={{borderBottom:'5px solid black', width:'fit-content'}}>
                    {section}
                  </h2>
                </Col>
                <Col xs='12'>
                   <SectionSlider events={data} /> 
                </Col>
              </Row>
            )
        }
      </Container>
    </>
  );
};

export default MainHomeFilms;