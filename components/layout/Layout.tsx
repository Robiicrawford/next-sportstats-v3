import * as React from "react"

import Header from "./Header"
import Footer from "./Footer"

// The following import prevents a Font Awesome icon server-side rendering bug,
// where the icons flash from a very large icon down to a properly sized one:
import '@fortawesome/fontawesome-svg-core/styles.css';
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false; /* eslint-disable import/first */

type Layout = {
    header_color?: String
}


const Layout = ({ children, header_color }) => {
 

  return (
   <>
    <Header header_color={header_color} />
    {children}
    <Footer/>
   </>
  )
}

export default Layout

