import React from 'react';

import IndexNavbar from "./../components/Navbars/IndexNavbar.js";
import IndexHeader from "./../components/Headers/IndexHeader.js";
import DemoFooter from "./../components/Footers/DemoFooter.js";
import AdsSection from "./../components/AdsSection/AdsSection.js";
import SectionDark from "./../components/SectionDark/SectionDark.js";
import Faq from "./../components/FAQ/Faq.js";

const Leanding = ()=>{
    return(
        <>
        <IndexNavbar />
        <IndexHeader />
      <div className="main">
        <AdsSection />
       
        <SectionDark />
        <Faq/>
        <DemoFooter />
      </div>
        </>
    )
}

export default Leanding;