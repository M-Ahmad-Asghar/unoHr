import React, { Component } from "react";
import { Button, ButtonToolbar } from "reactstrap";
import { Field, reduxForm } from "redux-form";
import PropTypes from "prop-types";
import { compose } from "recompose";
import { connect } from "react-redux";
import { PulseLoader } from "react-spinners";
import { withRouter } from "react-router-dom";
import MapApi from "../../../../mapApi";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Zoom from "@material-ui/core/Zoom";
import HelpIcon from "../../../../assets/help.png";

import { resetSignUpLoader } from "../../../../redux/actions/employeeActions";

class WizardFormTwo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
    };
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({ loader: false });
    if (nextProps.reducerSignupLoader == false) {
      console.log(
        "======================reducer signupLoader====================="
      );
      console.log(nextProps.reducerSignupLoader);
      this.props.changeLoaderState(false);
      this.props.resetSignUpLoader();
    }

    if (nextProps.done == "move") {
      this.props.history.push("/employee/login");
    }
  };

  submitHandler = () => {
    this.props.handleSubmit();
  };

  render() {
    const {
      previousPage,
      street,
      city,
      state,
      zip,
      firstName,
      lastName,
      onChangeHandler,
      signupLoader,
    } = this.props;
    console.log("============signupLoader========================");
    // console.log(this.props.handleSubmit)
    console.log("====================================");
    return (
      <div>
        <form className="form form--horizontal wizard__form">
          <h3 className="wizard__title">What’s your address</h3>

          <div className="form__form-group">
            <span className="form__form-group-label">Locations</span>
            <div className="form__form-group-field">
              <MapApi getAddress={this.props.getAddress} />
              <Tooltip
                TransitionComponent={Zoom}
                title="Enter your business location"
              >
                <IconButton className="helpButton">
                  <img className="helpImage" src={HelpIcon} alt="help" />
                </IconButton>
              </Tooltip>
            </div>
          </div>

          <div className="form__form-group">
            <span className="form__form-group-label">First Name</span>
            <div className="form__form-group-field">
              <Field
                name="firstName"
                component="input"
                type="text"
                value={firstName}
                onChange={onChangeHandler}
                placeholder="Legal First Name"
              />
              <Tooltip
                TransitionComponent={Zoom}
                title="Enter your legal first name"
              >
                <IconButton className="helpButton">
                  <img className="helpImage" src={HelpIcon} alt="help" />
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
                placeholder="Legal Last Name"
                onChange={onChangeHandler}
              />
              <Tooltip
                TransitionComponent={Zoom}
                title="Enter your legal last name"
              >
                <IconButton className="helpButton">
                  <img className="helpImage" src={HelpIcon} alt="help" />
                </IconButton>
              </Tooltip>
            </div>
          </div>

          {/* <div className="form__form-group">
             <span className="form__form-group-label">Street</span>
             <div className="form__form-group-field">
               <Field
                 name="street"
                 component="input"
                 type="text"
                 value={street}
                 onChange={onChangeHandler}
                 placeholder="Street Address"
               />
             </div>
           </div>
          
           <div className="form__form-group">
             <span className="form__form-group-label">City</span>
             <div className="form__form-group-field">
               <Field
                 name="city"
                 component="input"
                 type="text"
                 value={city}
                 onChange={onChangeHandler}
                 placeholder="City name"
               />
             </div>
           </div>
           <div className="form__form-group">
             <span className="form__form-group-label">State</span>
             <div className="form__form-group-field">
               <Field
                 name="state"
                 component="input"
                 type="text"
                 value={state}
                 onChange={onChangeHandler}
               />
             </div>
           </div> */}
          <div className="form__form-group">
            <span className="form__form-group-label">ZIP Code</span>
            <div className="form__form-group-field">
              <Field
                name="zip"
                component="input"
                type="text"
                value={zip}
                onChange={onChangeHandler}
                placeholder="Zip Code"
              />
              <Tooltip
                TransitionComponent={Zoom}
                title="Enter zip code of your location e.g 38000"
              >
                <IconButton className="helpButton">
                  <img className="helpImage" src={HelpIcon} alt="help" />
                </IconButton>
              </Tooltip>
            </div>
          </div>

          <ButtonToolbar className="form__button-toolbar wizard__toolbar">
            <Button
              color="success"
              outline
              type="button"
              className="previous"
              onClick={previousPage}
            >
              Back
            </Button>
            {signupLoader ? (
              <Button color="primary" disabled={true}>
                <PulseLoader color={"#123abc"} size={15} />
              </Button>
            ) : (
              <Button color="primary" onClick={this.submitHandler}>
                Submit
              </Button>
            )}
          </ButtonToolbar>
        </form>
      </div>
    );
  }
}

WizardFormTwo.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  previousPage: PropTypes.func.isRequired,
  street: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  zip: PropTypes.string.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    loader: state.employeeReducer.loader,
    done: state.employeeReducer.done,
    reducerSignupLoader: state.employeeReducer.signupLoader,
  };
};

export default compose(
  reduxForm({
    form: "wizard", //                 <------ same form name
    destroyOnUnmount: false, //        <------ preserve form data
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  }),
  connect(
    mapStateToProps,
    {
      resetSignUpLoader,
    }
  ),
  withRouter
)(WizardFormTwo);
