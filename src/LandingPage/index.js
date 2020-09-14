import React from 'react';
import NavBar from './Navbar';
import Main from './Main';
import Features from './Features';
import Pricing from './Pricing';
import FAQ from './FAQ';
import About from './About';
import Footer from './Footer';

import './Landinpage.css';

const Landing = () => {
    return (
        <>
            <div className="lp-body-styles">
                <NavBar/>
                <Main/>
                <div className='lp-wrapper'>
                    <Features/>
                    <Pricing/>
                    <FAQ/>
                    <About/>
                </div>
                <Footer/>
            </div>

        </>
    );
}

export default Landing;