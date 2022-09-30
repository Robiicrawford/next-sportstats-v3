import * as React from "react"
import Skeleton from "../Skeleton";

import {  Heading } from '@chakra-ui/react'

import SectionSlider from "./SectionSlider";


const MainHomeFilms = ({
  data,
  section,
  isLoadingSection,
}) => {
 
  return (
    <>

      <div>
        {isLoadingSection ? (
          <>
            {new Array(2).fill("").map((_, index) => (
              <div key={index}>
                <Skeleton className="mb-3 max-w-[10%] h-8 rounded-md" >
                here
                </Skeleton>
                <SectionSlider events={undefined} />
              </div>
            ))}
          </>
        ) : (
              <>
            
                <Heading 
                  style={{borderBottom:'5px solid #0CAA56', width:'fit-content'}} 
                  mb='2'
                  pl='3'
                >
                  {section}
                </Heading>
                <SectionSlider events={data} />
                
              </>
            )
        }
      </div>
    </>
  );
};

export default MainHomeFilms;