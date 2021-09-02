import React, { useState, useEffect, useRef } from "react";
import NavBar from "./NavBar";
import Main from "./Main";
import Features from "./features";
import Pricing from "./Pricing";
import FAQ from "./FAQ";
import About from "./about";
import Footer from "./Footer";
import "./Landinpage.css";
import { getStartAppFromStorage } from "../redux/actions/storageAction";
import { startGetCurrentUser } from "../redux/actions/userActions";
import { startGetCurrentUserEmployee } from "../redux/actions/employeeUserActions";
import { connect } from "react-redux";
import EmployerNavigation from "../navigation/employerWrapper";
import EmployeeNavigation from "../navigation/employeeWrapper";
import { useHistory } from "react-router-dom";
// import axios from 'axios';
// import url from "../EndPoint";
// testing code

const Landing = (props) => {
  const history = useHistory();
  const [currentScreen, setCurrentScreen] = useState(true);
  const [selectApp, setSelectApp] = useState(null);
  const [loader, setLoader] = useState(true);

  const featuresRef = useRef();
  const pricingRef = useRef();
  const faqRef = useRef();
  const contactRef = useRef();
  const executeScroll = (page) => {
    switch (page) {
      case "home":
        window.scrollTo(0, 0);
        break;
      case "features":
        featuresRef.current.scrollIntoView();
        break;
      case "pricing":
        pricingRef.current.scrollIntoView();
        break;
      case "faq":
        faqRef.current.scrollIntoView();
        break;
      case "contact":
        contactRef.current.scrollIntoView();
        break;
      default:
        // homeRef.currenct.scrollIntoView();
        window.scrollTo(0, 0);
        break;
    }
  };

  //testing code

  // const [file, setFile] = useState(null);

  // const submitFile = async () => {
  //   try {
  //     if (!file) {
  //       throw new Error("Select a file first!");
  //     }
  //     const formData = new FormData();
  //     formData.append("file", file[0]);
  //     await axios.post(`${url}/testAws/testing`, formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });
  //     // handle success
  //   } catch (error) {
  //     // handle error
  //   }
  // };

  const EmployerApp = () => {
    history.replace("/");
    setSelectApp("employerApp");
    setCurrentScreen(false);
  };

  const EmployeeApp = () => {
    history.replace("/");
    setSelectApp("employeeApp");
    setCurrentScreen(false);
  };

  useEffect(() => {
    props.getStartAppFromStorage();
    props.startGetCurrentUser();
    props.startGetCurrentUserEmployee();
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
    try {
      localStorage.setItem("token", window.location.hash);
    } catch (error) {
      console.log(error);
    }
  }

  return props.userLoading ? (
    <Loading />
  ) : currentScreen ? (
    <>
      <div className="lp-body-styles">
        {/* test code */}

        <NavBar
          executeScroll={executeScroll}
          EmployerApp={EmployerApp}
          EmployeeApp={EmployeeApp}
        />

        <Main />

        {/* <form onSubmit={submitFile}> */}
        {/* <label>Upload file</label> */}
        {/* <input type="file" onChange={event => setFile(event.target.files)} /> */}
        {/* <button onClick={submitFile}>Send</button> */}
        {/* </form> */}
        <div className="lp-wrapper">
          <div ref={featuresRef}>
            <Features />
          </div>
          <div ref={pricingRef}>
            <Pricing />
          </div>
          <div ref={faqRef}>
            <FAQ />
          </div>
          <div ref={contactRef}>
            <About />
          </div>
        </div>
        <Footer />
      </div>
    </>
  ) : selectApp === "employerApp" ? (
    props.userLoading ? (
      <Loading />
    ) : (
      <EmployerNavigation />
    )
  ) : props.empLoading ? (
    <Loading />
  ) : (
    <EmployeeNavigation />
  );
};

const mapStateToProps = (state) => {
  return {
    app: state.storageReducer.getapp,
    loading: state.storageReducer.loading,
    user: state.userReducer.user,
    userLoading: state.userReducer.userLoading,
    empLoading: state.employeeUserReducer.userLoading,
  };
};

export default connect(mapStateToProps, {
  getStartAppFromStorage,
  startGetCurrentUser,
  startGetCurrentUserEmployee,
})(Landing);

const Loading = () => (
  <div className="load">
    <div className="load__icon-wrap">
      <svg className="load__icon">
        <path fill="#3f51b5" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
      </svg>
    </div>
  </div>
);
