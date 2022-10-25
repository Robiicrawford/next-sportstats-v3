import * as React from "react"
import Link from 'next/link'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from '@chakra-ui/react'

const Bread = ({links}) => {
  return (
    <Breadcrumb>
      {links.map((link)=>
        <BreadcrumbItem>
          <BreadcrumbLink href={link.to}> {link.title} </BreadcrumbLink>
        </BreadcrumbItem>
      )}
      

    </Breadcrumb>
  );
};

export default Bread;
