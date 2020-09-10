import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Container, Col, Row } from "reactstrap";
// Image and Styles
import homeImg from "../assets/home.png";
import playStore from "../assets/play-store.png";
import appStore from "../assets/appstore.png";
import TopBar from "./topBar";
import PlayButton from "../assets/play-button.png";
import ModalVideo from "react-modal-video";
import "react-modal-video/scss/modal-video.scss";
// Local Components
import TandC from './TandC'
import About from "./about";
import Features from "./features";
import Price from "./price";
import ContactUs from "./contact";
import EmployerNavigation from "../navigation/employerWrapper";
import EmployeeNavigation from "../navigation/employeeWrapper";
import { startGetCurrentUser } from "../redux/actions/userActions";
import { startGetCurrentUserEmployee } from "../redux/actions/employeeUserActions";
import { getStartAppFromStorage } from "../redux/actions/storageAction";





class Landing extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isOpen: false,
      currentScreen: true,
      SelectApp: null,
      loader: true
    };
  }
  openModal = () => {
    this.setState({ isOpen: true });
  };

  EmployerApp = () => {
    this.setState({
      SelectApp: "employerApp",
      currentScreen: false
    });
  };

  EmployeeApp = () => {
    this.setState({
      SelectApp: "employeeApp",
      currentScreen: false
    });
  };

  componentWillMount() {
    this.props.getStartAppFromStorage();
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.app == "nill") {
      this.setState({ loader: false });
    } else if (nextProps.app == "employeeApp") {
      this.setState({
        SelectApp: "employeeApp",
        currentScreen: false,
        loader: false
      });

      // }, 3000);
    } else if (nextProps.app == "employerApp") {
      // setTimeout(() => {

      this.setState({
        SelectApp: "employerApp",
        currentScreen: false,
        loader: false
      });

      // }, 3000);
    } else {
      this.setState({ loader: false });
    }
  };

  render() {
    const { currentScreen, SelectApp, loader } = this.state;
      console.log(window.location.hash)
    if(window.location.hash) {
      console.log("if")
      console.log(window.location.hash)
      try {
        localStorage.setItem("token",window.location.hash);
      } catch (error) {
        console.log(error);
      }}

    return loader ? (
      <div className="load">
        <div className="load__icon-wrap">
          <svg className="load__icon">
            <path
              fill="#3f51b5"
              d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"
            />
          </svg>
        </div>
      </div>
    ) : currentScreen ? (
      <Container className="containerLanding">
        <TopBar EmployerApp={this.EmployerApp} EmployeeApp={this.EmployeeApp} />

        <Row id="home"
          className="home home-three"
          style={{ backgroundImage: `url(${homeImg})` }}
        >
          <Col sm={12} md={5}>
            <div className="home-contain">
              <div className="text-white">
                <div className="contain">
                  <h2 className="banner-text">
                    Simplest way to manage household employees
                  </h2>
                  <p className="slide-cap-desc">
                    onBoarding | Payroll | Time Tracking | Year-End Tax filings
                  </p>
                  <a href={null}>
                    <img src={appStore} alt="appstore" className="store" />
                  </a>
                  <a href={null}>
                    <img
                      className="ml-10 store"
                      src={playStore}
                      alt="play-store"
                    />
                  </a>
                </div>
                <div className="play-button">
                  <ModalVideo
                    channel="vimeo"
                    isOpen={this.state.isOpen}
                    videoId="54298665"
                    height={600}
                    width={800}
                    onClose={() => this.setState({ isOpen: false })}
                  />
                  <a className="popup-vimeo animated-circle">
                    <img
                      src={PlayButton}
                      alt="play-button"
                      onClick={this.openModal}
                      className="img-fluid"
                    />
                  </a>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <About />
        <Features />
        <Price />
        <ContactUs />
        <TandC />
      </Container>
    ) : SelectApp === "employerApp" ? (
      <EmployerNavigation />
    ) : (
      <EmployeeNavigation />
    );
  }
}

const mapStateToProps = state => {
  return {
    app: state.storageReducer.getapp,
    loading: state.storageReducer.loading
  };
};

export default connect(
  mapStateToProps,
  { startGetCurrentUser, startGetCurrentUserEmployee, getStartAppFromStorage }
)(Landing);
