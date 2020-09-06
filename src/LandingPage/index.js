import React from 'react';
import Main from './Main';
import Features from './Features';
import Pricing from './Pricing';
import FAQ from './FAQ';
import About from './About';
import './Landinpage.css';
import NavBar from './Navbar';
const Landing = () => {
    return (
        <>
            <NavBar/>
            <Main/>
            <div className='wrapper'>
                <Features/>
                <Pricing/>
                <FAQ/>
                <About/>
            </div>
        </>
    );
}

export default Landing;