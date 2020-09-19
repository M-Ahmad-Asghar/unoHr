import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import Main from "./Main";
import Features from "./Features";
import Pricing from "./Pricing";
import FAQ from "./FAQ";
import About from "./About";
import Footer from "./Footer";
import "./Landinpage.css";
import { getStartAppFromStorage } from "../redux/actions/storageAction";
import { connect } from "react-redux";
import EmployerNavigation from "../navigation/employerWrapper";
import EmployeeNavigation from "../navigation/employeeWrapper";

const Landing = (props) => {
    const [currentScreen, setCurrentScreen] = useState(true);
    const [selectApp, setSelectApp] = useState(null);
    const [loader, setLoader] = useState(true);

    const EmployerApp = () => {
        setSelectApp("employerApp");
        setCurrentScreen(false);
    };

    const EmployeeApp = () => {
        setSelectApp("employeeApp");
        setCurrentScreen(false);
    };

    useEffect(() => {
        props.getStartAppFromStorage();
    }, []);

    useEffect(() => {
        if (props.app == "nill") {
        setLoader(false);
        } else if (props.app == "employeeApp") {
        setSelectApp("employeeApp");
        setCurrentScreen(false);
        setLoader(false);
        } else if (props.app == "employerApp") {
        setSelectApp("employerApp");
        setCurrentScreen(false);
        setLoader(false);
        } else {
        setLoader(false);
        }
    }, [props.app]);

    if (window.location.hash) {
        console.log("if");
        console.log(window.location.hash);
        try {
        localStorage.setItem("token", window.location.hash);
        } catch (error) {
        console.log(error);
        }
    }

    return loader ? (
        <div className="load">
        <div className="load__icon-wrap">
            <svg className="load__icon">
            <path fill="#3f51b5" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
            </svg>
        </div>
        </div>
    ) : currentScreen ? (
        <>
        <div className="lp-body-styles">
            <NavBar EmployerApp={EmployerApp} EmployeeApp={EmployeeApp} />
            <Main />
            <div className="lp-wrapper">
                <Features />
                <Pricing />
                <FAQ />
                <About />
            </div>
            <Footer />
        </div>

        </>
    ) : selectApp === "employerApp" ? (
        <EmployerNavigation />
    ) : (
        <EmployeeNavigation />
    );
};

const mapStateToProps = (state) => {
    return {
        app: state.storageReducer.getapp,
        loading: state.storageReducer.loading,
    };
};

export default connect(
    mapStateToProps,
    { getStartAppFromStorage }
)(Landing);
