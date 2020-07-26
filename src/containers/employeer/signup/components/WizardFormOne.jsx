import React, { Component } from "react";
import { Button, ButtonToolbar } from "reactstrap";
import { Field, reduxForm } from "redux-form";
import EyeIcon from "mdi-react/EyeIcon";
import PropTypes from "prop-types";
import OtpDialog from "./otpDialog";
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";
import { toast } from "react-toastify";
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Zoom from '@material-ui/core/Zoom';
import HelpIcon from "../../../../assets/help.png";

const correct = {
  marginBottom: "-20px",
  fontSize: "0.7rem",
  color: "crimson",
  cursor: "pointer",
  marginTop: "0px",
  textAlign: "right",
  position: "absolute",
  right: "0",
  bottom: "0"
};
const inCorrect = {
  marginBottom: "-20px",
  fontSize: "0.7rem",
  color: "crimson",
  marginTop: "0px",
  textAlign: "right",
  position: "absolute",
  right: "0",
  bottom: "0"
};
const verified = {
  marginBottom: "-20px",
  fontSize: "0.7rem",
  color: "green",
  marginTop: "0px",
  textAlign: "right",
  position: "absolute",
  right: "0",
  bottom: "0"
};

class WizardFormOne extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    firstName: PropTypes.string.isRequired,
    // onChangeFirstName: PropTypes.func.isRequired,
    lastName: PropTypes.string.isRequired,
    // onChangeLastName: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
    // onChangeEmail: PropTypes.func.isRequired,
    mobileNumber: PropTypes.string.isRequired,
    // onChangeMobileNumber: PropTypes.func.isRequired,
    password: PropTypes.string.isRequired,
    // onChangePassword: PropTypes.func.isRequired,
    onChangeHandler: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = {
      showPassword: false,
      verificationOfNumber: false,
      verificationOfEmail: false,
      open: false,
      resendbutton: false,
      numberStatus: false,
      showOtpbutton: false,
      verificationType: "",
      verificationCode: null,
      numberEntered: false,
      emailEntered: false,
      emailExists: false,
      numberVerified: false,
      emailVerified: false
    };
  }

  showPassword = e => {
    e.preventDefault();
    this.setState({
      showPassword: !this.state.showPassword
    });
  };

  handleOpenDialog = () => {
    var val = Math.floor(1000 + Math.random() * 9000);
    let data = {
      email: this.props.email,
      message: `Verification message from unhr! use verification code: ${val}`
    };
    // console.log('OTP: ' ,val );
    this.props.verifyEmailMethod(data);
    this.setState({ open: true, resendbutton: false, verificationCode: val });
  };

  CloseDialog = () => {
    this.setState({ open: true, resendbutton: false });
  };

  handleclosedialog = () => {
    this.setState({
      open: false,
      resendbutton: false
    });
  };

  // handleListItemClick = value => {
  //   this.props.onClose(value);
  // };

  ////////////////////////// Number Details /////////////////////////
  handleInputChange(telNumber, selectedCountry) {
    console.log(
      "input changed. number: ",
      telNumber,
      "selected country: ",
      selectedCountry
    );
  }
  handleInputBlur(telNumber, selectedCountry) {
    console.log(
      "Focus off the ReactTelephoneInput component. Tel number entered is: ",
      telNumber,
      " selected country is: ",
      selectedCountry
    );
  }
  /////////////////////////////////////////////////////////////////////

  // openDialog = () => {
  //   var val = Math.floor(1000 + Math.random() * 9000);
  //   let data = {
  //     message: `Verification message from unhr! use verification code: ${val}`,
  //     number: this.props.mobileNumber
  //   };
  //   console.log('no.' ,this.props.mobileNumber );
    

  //   this.props.verifyPhoneNumber(data);
  //   this.setState({ open: true, resendbutton: false, verificationCode: val });
  // };

  handleresendbutton = () => {
    setTimeout(() => {
      this.setState({
        resendbutton: true
      });
    }, 30000);
  };

  verifyCodeEnteredInOTp = otp => {
    // alert("Message by FormOne:perform number verification here" + otp);
    var verificationCode = this.state.verificationCode;
    var typeOfVerification = this.state.verificationType;
    if (typeOfVerification === "email") {
      if (this.state.verificationCode == otp) {
        this.props.onEmailStatus(true);
        this.setState({
          emailVerified: true,
          open: false
        });
      } else {
        toast.error("Not Verified! Verification Code Incorrect");
        this.props.onEmailStatus(false);
        this.setState({
          emailVerified: false
        });
      }
    } 
    // else if (typeOfVerification === "number") {
    //   if (this.state.verificationCode == otp) {
    //     this.props.onNumberStatus(true);
    //     this.setState({
    //       numberVerified: true,
    //       open: false
    //     });
    //   } else {
    //     toast.error("Not Verified! Verification Code Incorrect");
    //     this.props.onNumberStatus(false);
    //     this.setState({
    //       numberVerified: false
    //     });
    //   }
    // } 
    else {
      this.setState({
        verificationType: ""
      });
    }
  };
  checkEmailStatus = () => {
    if (this.state.emailVerified) {
      this.props.onEmailStatus(false);
      this.setState({
        emailVerified: false
      });
    }
  };
  checkNumberStatus = () => {
    this.props.onNumberStatus(false);
    this.setState({
      numberVerified: false
    });
  };

  resendPhoneCode = () => {
    if (this.state.verificationType == "email") {
      this.handleOpenDialog();
    } 
    // else {
    //   this.openDialog();
    // }
  };

  render() {
    const {
      onSubmit,
      handleSubmit,
      firstName,
      lastName,
      email,
      mobileNumber,
      password,
      onChangeHandler,
      numberChangeHandler,
      performEmailVerification,
      performNumberVerification,
      verifyEmail,
      verifyNumber,
      validateEmail
    } = this.props;

    return (
      <div>
        <form
          className="form form--horizontal wizard__form"
          onSubmit={onSubmit}
        >
          <h3 className="wizard__title">Fill your personal data</h3>

          <div className="form__form-group">
            <span className="form__form-group-label">Email</span>
            <div className="form__form-group-field">
              <Field
                name="email"
                component="input"
                type="email"
                value={email}
                placeholder="Email Address"
                // onChange={onChangeHandler}
                onChange={e => {
                  onChangeHandler(e);
                  this.checkEmailStatus();
                  if (e.target.value.length > 0) {
                    this.setState({
                      emailExists: true
                    });
                  } else {
                    this.setState({
                      emailExists: false
                    });
                  }
                  if (validateEmail(e.target.value)) {
                    this.setState({
                      emailEntered: true
                    });
                  } else {
                    this.setState({
                      emailEntered: false
                    });
                  }
                }}
                onBlur={performEmailVerification}
              />
              <Tooltip TransitionComponent={Zoom} title="Enter your email address e.g abc@example.com">
                <IconButton className="helpButton">
                  <img className="helpImage" src={HelpIcon} alt="help"/>
                </IconButton>
              </Tooltip>
            </div>

            {!this.state.emailVerified && this.state.emailExists ? (
              this.state.emailEntered ? (
                <span
                  style={correct}
                  onClick={() => {
                    this.handleOpenDialog();
                    this.handleresendbutton();
                    this.setState({ verificationType: "email" });
                  }}
                >
                  Verify Email
                </span>
              ) : (
                <p style={inCorrect}>Incorrect Email</p>
              )
            ) : (
              ""
            )}
            {this.state.emailVerified ? (
              <p style={verified}>Email Verified</p>
            ) : (
              ""
            )}
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">Mobile #</span>
            <div className="form__form-group-field">
              <IntlTelInput
                fieldName="mobileNumber"
                name="mobileNumber"
                id="number"
                fieldId="employeeNumber"
                preferredCountries={["us"]}
                defaultCountry="United States"
                onPhoneNumberChange={(
                  status,
                  value,
                  countryData,
                  number,
                  id
                ) => {
                  this.checkNumberStatus();

                  numberChangeHandler(number);
                  console.log(
                    "onPhoneNumberChange",
                    value,
                    status,
                    // number,
                    this.props.mobileNumber
                  );
                  // numberChangeHandler(value);
                  // performNumberVerification();
                  if (status) {
                    this.setState({
                      numberStatus: true
                    });
                  } else {
                    this.setState({
                      numberStatus: false
                    });
                  }
                  if (number.length > 0) {
                    this.setState({
                      numberEntered: true
                    });
                  } else {
                    this.setState({
                      numberEntered: false
                    });
                  }
                }}
                onPhoneNumberBlur={() => {
                  performNumberVerification();
                  if (this.state.numberStatus) {
                    this.setState({ showOtpbutton: true });
                  } else {
                    this.setState({ showOtpbutton: false });
                  }
                }}
              />
              <Tooltip TransitionComponent={Zoom} title="Enter your mobile number">
                <IconButton className="helpButton">
                  <img className="helpImage" src={HelpIcon} alt="help"/>
                </IconButton>
              </Tooltip>
              {!this.state.numberVerified && this.state.numberEntered && (
                // <p style={style}>Verify Number</p>
                !this.state.numberStatus && 
                  ( <p style={inCorrect}>Incorrect Number</p> )
              )}
                {/* (
                   <p
                     onClick={() => {
                       this.openDialog();
                     }}
                     style={correct}
                   >
                     <span
                       onClick={() => {
                         this.handleresendbutton();
                         this.setState({ verificationType: "number" });
                       }}
                     >
                       Verify Number
                     </span>
                   </p>
                 ) : 
                : (
                 ""
               )}
               {this.state.numberVerified && (
                 <p style={verified}>Number Verified</p>
               ) */}
            </div>
          </div>
          <div className="form__form-group">
            <div className="form__form-group">
              <span className="form__form-group-label">First Name</span>
              <div className="form__form-group-field">
                <Field
                  name="firstName"
                  component="input"
                  type="text"
                  value={firstName}
                  onChange={onChangeHandler}
                  placeholder="First Name"
                  autoFocus
                />
                <Tooltip TransitionComponent={Zoom} title="Enter your first name">
                  <IconButton className="helpButton">
                    <img className="helpImage" src={HelpIcon} alt="help"/>
                  </IconButton>
                </Tooltip>
              </div>
            </div>
            <div className="form__form-group">
              <span className="form__form-group-label">Last Name</span>
              <div className="form__form-group-field">
                <Field
                  name="lastName"
                  component="input"
                  type="text"
                  value={lastName}
                  placeholder="Last Name"
                  onChange={onChangeHandler}
                />
                <Tooltip TransitionComponent={Zoom} title="Enter your last name">
                  <IconButton className="helpButton">
                    <img className="helpImage" src={HelpIcon} alt="help"/>
                  </IconButton>
                </Tooltip>
              </div>
            </div>
            <span className="form__form-group-label">Password</span>
            <div className="form__form-group-field">
              <Field
                name="password"
                component="input"
                type={this.state.showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={onChangeHandler}
              />
              <button
                className={`form__form-group-button${
                  this.state.showPassword ? " active" : ""
                }`}
                tabIndex="-1"
                onClick={e => this.showPassword(e)}
              >
                <EyeIcon />
              </button>
              <Tooltip TransitionComponent={Zoom} title="Enter your password">
                <IconButton className="helpButton">
                  <img className="helpImage" src={HelpIcon} alt="help"/>
                </IconButton>
              </Tooltip>
            </div>
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">Confirm Password</span>
            <div className="form__form-group-field">
              <Field
                name="cPassword"
                component="input"
                type="password"
                placeholder="Confirm your Password"
                onChange={onChangeHandler}
              />
              <Tooltip TransitionComponent={Zoom} title="Reenter your password">
                <IconButton className="helpButton">
                  <img className="helpImage" src={HelpIcon} alt="help"/>
                </IconButton>
              </Tooltip>
            </div>
          </div>
          <ButtonToolbar className="form__button-toolbar wizard__toolbar">
            <Button
              color="success"
              outline
              type="button"
              disabled
              className="previous"
            >
              Back
            </Button>
            <Button color="success"
             type="submit"
              className="next">
              Next
            </Button>
          </ButtonToolbar>
        </form>
        {/* ////////////////////////////Dialog ////////////////////////////////////////////// */}

        <OtpDialog
          resendPhoneCode={this.resendPhoneCode}
          verifyCodeEnteredInOTp={this.verifyCodeEnteredInOTp}
          resendbutton={this.state.resendbutton}
          handleclosedialog={this.handleclosedialog}
          open={this.state.open}
        />
      </div>
    );
  }
}

export default reduxForm({
  form: "wizard", //                 <------ same form name
  destroyOnUnmount: false, //        <------ preserve form data
  forceUnregisterOnUnmount: true // <------ unregister fields on unmount
})(WizardFormOne);
