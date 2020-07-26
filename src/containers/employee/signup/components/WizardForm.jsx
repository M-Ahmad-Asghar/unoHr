import React, { Component } from "react";
import { Col, Card, Row } from "reactstrap";
// import PropTypes from 'prop-types';
import WizardFormOne from "./WizardFormOne";
import WizardFormTwo from "./WizardFormTwo";
import WizardFormThree from "./WizardFormThree";
import { connect } from "react-redux";
import {
  getEmployeData,
  employeeSignup
} from "../../../../redux/actions/employeeActions";

import {
  verifyNumber,
  verifyEmail
} from "../../../../redux/actions/employerActions";

import "../style.css";
import { toast } from "react-toastify";

class WizardForm extends Component {
  static propTypes = {
    // onSubmit: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = {
      loader: false,
      EmpId: "",
      page: 1,
      firstName: "",
      lastName: "",
      email: "",
      mobileNumber: "",
      password: "",
      cPassword: "",
      empData: {},
      street: "",
      city: "",
      state: "",
      zip: "",
      ein: "",
      tax: "",
      date: "",
      report: "",
      token: "",
      plan: null,
      emailVerified: false,
      numberVerified: false,
      signupLoader: false
    };
  }

  onNumberStatus = status => {
    this.setState({
      numberVerified: status
    });
  };

  changeLoaderState = state => {
    this.setState({
      signupLoader: state
    });
  }

  onEmailStatus = status => {
    this.setState({
      emailVerified: status
    });
  };

  validateEmail = email => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-z  A-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  onCheckoutToken = token => {
    this.setState({ token });
  };

  onChangeRadioTax = (e, checked) => {
    // console.log(e);
    this.setState({ tax: checked });
  };

  onChangeRadioReport = (e, checked) => {
    // console.log(e);
    this.setState({ report: checked });
  };

  onChangeDate = date => {
    const { _d } = date;
    this.setState({ date: _d });
  };

  onChangeHandler = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    // console.log(e.target);
  };

  nextPage = () => {
    // if (!this.state.emailVerified) {
    //   toast.error("Please Verify Your Email");
    // } 
    // // else if (!this.state.numberVerified) {
    // //   toast.error("Please verify your Number");
    // // }
    // else if (this.state.EmpId.length != 8) {
    //   toast.error("Please provide your valid 8 letter Id");
    // } else if (this.state.password.length <= 7) {
    //   toast.error("Password Must be greater than 8 letters");
    // } else if (this.state.cPassword != this.state.password) {
    //   toast.error("Password does not match");
    // } else if (!this.state.empData.employeeid) {
    //   toast.error("Id is incorrect provide correct id");
    // } else if (this.state.empData.status == "active") {
    //   toast.error("Id already in use!");
    // } else {
      if (this.state.page == 1) {
        this.setState({ page: 2 });
      }
    // }
  };

  previousPage = () => {
    this.setState({ page: this.state.page - 1 });
  };

  signUp = () => {
    if (this.state.page == 2) {
      if (this.state.address == "") {
        toast.error("Please enter your  address");
      } else if (this.state.firstName == "") {
        toast.error("Please provide Your First Name");
      } else if (this.state.lastName == "") {
        toast.error("Please provide Your Last Name");
      }
      // else if (this.state.city == "") {
      //   toast.error("Please enter your city name");
      // } else if (this.state.state == "") {
      //   toast.error("Please enter your state");
      // } else if (this.state.zip == "" || isNaN(this.state.zip)) {
      //   toast.error("Invalid your zip code");
      // }
      else {
        this.setState({
          signupLoader: true
        });
        // toast.success("Contect Information validated!");
        const data = {
          cell: this.state.mobileNumber,
          // street: this.state.street,
          // city: this.state.city,
          // state: this.state.state,
          zip: this.state.zip,
          address: this.state.address,
          email: this.state.email.toLowerCase(),
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          paymentMethod: this.state.empData.paymentMethod,
          name: this.state.firstName + " " + this.state.lastName,
          password: this.state.password,
          docid: this.state.empData.docid,
          numVerifyTask: {
            AllotedTo: "",
            title: "Verify Mobile Number",
            Description: "Please verify your mobile number in order to receive useful messages in future!",
            mobileVerification: true,
            DueTime: new Date(),
            PostedTime: new Date(),
            employeeid: this.state.EmpId
          }
          
        };
        console.log("data is: ", data);
        // toast.success("okay done!");
        this.props.employeeSignup(data);
      }
    }
  };

  getEmploy = () => {
    if (this.state.EmpId.length != 8) {
      // toast.error("Please provide your valid 8 letter Id");
    } else {
      this.setState({ loader: true });
      this.props.getEmployeData(this.state.EmpId);
    }
  };

  componentWillReceiveProps = nextProps => {
    console.log("malik props: ", nextProps.data);
    this.setState({ loader: false, empData: nextProps.data });
  };
  performEmailVerification = () => {
    if (this.state.email !== "" || this.state.email.length > 0) {
      this.setState({
        verifyEmail: true
      });
    } else {
      this.setState({
        verifyEmail: false
      });
    }
  };
  // performNumberVerification = () => {
  //   if (this.state.mobileNumber !== "" || this.state.mobileNumber.length > 0) {
  //     this.setState({
  //       verifyNumber: true
  //     });
  //   } else {
  //     this.setState({
  //       verifyNumber: false
  //     });
  //   }
  // };
  numberChangeHandler = number => {
    if (number.length > 0) {
      this.setState({
        mobileNumber: number
      });
    } else {
      this.setState({
        mobileNumber: ""
      });
    }
  };

  getPlan = plan => {
    console.log(plan);
    this.setState({
      plan
    });
  };
  getAddress = address => {
    console.log(address);
    this.setState({
      address
    });
  };

  render() {
    // const { onSubmit } = this.props;
    const { page, signupLoader } = this.state;

    return (
      <Row>
        <Col md={12} lg={12}>
          <Card>
            <div className="wizard">
              <div className="wizard__steps">
                <div
                  className={`wizard__step${
                    page === 1 ? " wizard__step--active" : ""
                  }`}
                >
                  <p>Step 1</p>
                </div>
                <div
                  className={`wizard__step${
                    page === 2 ? " wizard__step--active" : ""
                  }`}
                >
                  <p>Step 2</p>
                </div>
                {/* <div
                  className={`wizard__step${
                    page === 3 ? " wizard__step--active" : ""
                  }`}
                >
                  <p>Step 3</p>
                </div> */}
              </div>
              <div className="wizard__form-wrapper">
                {page === 1 && (
                  <WizardFormOne
                    onNumberStatus={this.onNumberStatus}
                    onEmailStatus={this.onEmailStatus}
                    verifyPhoneNumber={this.props.verifyNumber}
                    verifyEmailMethod={this.props.verifyEmail}
                    onSubmit={this.nextPage}
                    mobileNumber={this.state.mobileNumber}
                    password={this.state.password}
                    onChangeHandler={this.onChangeHandler}
                    onBlurHandler={this.getEmploy}
                    email={this.state.email}
                    verifyEmail={this.state.verifyEmail}
                    verifyNumber={this.state.verifyNumber}
                    numberChangeHandler={this.numberChangeHandler}
                    performEmailVerification={this.performEmailVerification}
                    performNumberVerification={this.performNumberVerification}
                    validateEmail={this.validateEmail}
                  />
                )}
                {page === 2 && (
                  <WizardFormTwo
                    previousPage={this.previousPage}
                    onSubmit={this.signUp}
                    street={this.state.street}
                    city={this.state.city}
                    state={this.state.state}
                    zip={this.state.zip}
                    ein={this.state.ein}
                    firstName={this.state.firstName}
                    lastName={this.state.lastName}
                    // date={this.state.date}
                    // report={this.state.report}
                    onChangeHandler={this.onChangeHandler}
                    onChangeDate={this.onChangeDate}
                    onChangeRadioTax={this.onChangeRadioTax}
                    onChangeRadioReport={this.onChangeRadioReport}
                    getAddress={this.getAddress}
                    signupLoader={signupLoader}
                    changeLoaderState={this.changeLoaderState}
                  />
                )}
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.employeeReducer.isLoading,
    data: state.employeeReducer.data
  };
};

export default connect(
  mapStateToProps,
  {
    getEmployeData,
    employeeSignup,
    verifyNumber,
    verifyEmail
  }
)(WizardForm);
