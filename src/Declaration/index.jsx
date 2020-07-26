import React from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import logo from "../assets/logo.png";
import "./style.css";
import EmployerNavigation from "../navigation/employerWrapper";
import EmployeeNavigation from "../navigation/employeeWrapper";
import { startGetCurrentUser } from "../redux/actions/userActions";
import { startGetCurrentUserEmployee } from "../redux/actions/employeeUserActions";
import { getStartAppFromStorage } from "../redux/actions/storageAction";
import { connect } from "react-redux";
// import LandingPage from '../containers/Landing Page/home-three';

class Declaration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentScreen: true,
      SelectApp: null,
      loader: true
    };
  }

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
      // <LandingPage EmployerApp={this.EmployerApp} EmployeeApp={this.EmployeeApp} />
      <div className="account">
        <div className="account__wrapper">
          <div className="account__card">
            <div className="account__head">
              <h3 className="account__title">
                Welcome to
                <span className="account__logo">
                  <img src={logo} alt="logo" />
                  {/* <span className="account__logo-accent">DEV</span> */}
                </span>
              </h3>
              {/* <h4 className="account__subhead subhead">Start your business easily</h4> */}
            </div>
            <div className="account__or">
              <h3>Lets Go</h3>
              <p>What is your role</p>
            </div>
            <div className="account__social">
              <Button
                color="success"
                className="square"
                outline
                onClick={this.EmployeeApp}
              >
                Employee
              </Button>
              <Button
                color="success"
                className="square"
                outline
                onClick={this.EmployerApp}
              >
                Employeer
              </Button>
            </div>
          </div>
        </div>
      </div>
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
)(Declaration);
