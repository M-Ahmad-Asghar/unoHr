import React from 'react';
import NavBar from './NavBar';
import Main from './Main';
import Features from './features';
import Pricing from './Pricing';
import FAQ from './FAQ';
import About from './about';
import Footer from './Footer';

import './Landinpage.css';

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
            <Footer/>
        </>
    );
}

export default Landing;