import * as React from "react"
import Skeleton from "../Skeleton";

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
                <Skeleton className="mb-3 max-w-[10%] h-8 rounded-md" />
                <SectionSlider events={undefined} />
              </div>
            ))}
          </>
        ) : (
              <>
            
                <h2 style={{borderBottom:'5px solid black', width:'fit-content'}}>
                  {section}
                </h2>
                <SectionSlider events={data} />
                
              </>
            )
        }
      </div>
    </>
  );
};

export default MainHomeFilms;