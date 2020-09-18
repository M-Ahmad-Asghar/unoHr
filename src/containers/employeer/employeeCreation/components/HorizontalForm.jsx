import React, { Component } from "react";
import { Card, CardBody, Col, ButtonToolbar } from "reactstrap";
import { Field, reduxForm, reset } from "redux-form";
import { translate } from "react-i18next";
import PropTypes from "prop-types";
// import Datepicker from './DatePicker';
import CalendarBlankIcon from "mdi-react/CalendarBlankIcon";
import { v4 as uuidv4 } from 'uuid';
import { connect } from "react-redux";
import renderDatePickerField from "../../../../shared/components/form/DatePicker";
import { addNewEmployee } from "../../../../redux/actions/employerActions";
import { getStateWages } from "../../../../redux/actions/dbActions";
import { toast } from "react-toastify";
import { PulseLoader } from "react-spinners";
import Button from "@material-ui/core/Button";
import IntlTelInput from "react-intl-tel-input";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Zoom from "@material-ui/core/Zoom";
import HelpIcon from "../../../../assets/help.png";
import "../styles/style.css";
import renderRadioButtonField from "../../../../shared/components/form/RadioButton";

const afterSubmit = (result, dispatch) => dispatch(reset("horizontal_form"));
class HorizontalForm extends Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = {
      showPassword: false,
      firstName: "",
      lastName: "",

      cell: "",
      email: "",
      HourlyRate: "",
      WeekHr: "",
      chosenDate: new Date(),
      Duties: "",

      EAgreement: true,
      W4: true,
      I9: true,
      loader: false,

      statesWages: [],
      statesLoader: true,
      stateName: "",
      minRate: 0,
      timeMode: "Punch",
      paymentMethod: ""
    };
  }

  componentDidMount() {
    this.props.getStateWages();
  }

  validateEmail = email => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-z  A-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  setDate = newDate => {
    const { _d } = newDate;
    this.setState({ chosenDate: _d });
  };

  showPassword = e => {
    e.preventDefault();
    this.setState({
      showPassword: !this.state.showPassword
    });
  };

  onChangeHandler = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onStateSelectHandler = e => {
    const { value } = e.target;
    if (value != "select state") {
      var minRate;
      this.state.statesWages.map(state => {
        if (state.stateName == value) {
          minRate = state.minRate;
        }
      });
      minRate = minRate.substring(1);
      minRate = minRate.slice(0, minRate.indexOf(" / hour"));
      this.setState({
        stateName: value,
        minRate: minRate
      });
    } else {
      this.setState({
        stateName: ""
      });
    }
  };

  onPaymentSelectHandler = e => {
    const { value } = e.target;
    if (value != "select payment method") {
      this.setState({
        paymentMethod: value
      });
    } else {
      this.setState({
        paymentMethod: ""
      });
    }
  };

  addEmployee = e => {
    e.preventDefault();

    if (this.state.firstName == "") {
      toast.error("Please provide Employee's First Name");
    } else if (this.state.lastName == "") {
      toast.error("Please provide Employee's Last Name");
    } else if (this.state.cell == "") {
      toast.error("Please provide Employee's Mobile Number");
    } else if (
      this.state.email == "" ||
      !this.validateEmail(this.state.email)
    ) {
      toast.error("Please Provide a valid Email address");
    } else if (this.state.stateName == "") {
      toast.error("Please select the Employee State");
    } else if (this.state.paymentMethod == "") {
      toast.error("Please select a payment method");
    } else if (this.state.HourlyRate == "") {
      toast.error("Set an Hourly Rate for the Employee");
    } else if (
      parseFloat(this.state.HourlyRate) < parseFloat(this.state.minRate)
    ) {
      toast.error(
        `Hourly rate cannot be less than ${this.state.minRate}$ for ${
          this.state.stateName
        }`
      );
    } else if (this.state.WeekHr == "") {
      toast.error("Provide Employee's minimum weekly hours");
    } else if (this.state.Duties == "") {
      toast.error("Set the major duties for the employee");
    } else {
      this.setState({ loader: true });
      let uuidemp = uuidv4().slice(0, 8);
      let employeeData = {
        status: "invite",
        employeruid: this.props.employeruid,
        employeeid: uuidemp,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        cell: this.state.cell,
        email: this.state.email.toLowerCase(),
        stateName: this.state.stateName,
        paymentMethod: this.state.paymentMethod,
        HourlyRate: this.state.HourlyRate,
        chosenDate: this.state.chosenDate.toString(),
        WeekHr: this.state.WeekHr,
        duties: this.state.Duties,
        timeMode: this.state.timeMode,
        createdAt: new Date().toString(),
        lunchFacility: false,
        breakFacility: false
      };
      console.log("invite form data is: ", employeeData);
      this.props.getEmpData(employeeData);
      // this.props.addNewEmployee(employeeData);
      this.props.handleNext();
    }
  };

  componentWillReceiveProps = nextProps => {
    // this.setState({ loader: false });
    if (nextProps.successDone == "move") {
      this.props.reset();
    }
    if (nextProps.getStatesWagesStatus == "done") {
      this.setState({
        statesWages: nextProps.statesWages,
        statesLoader: false
      });
    }
  };

  render() {
    const { handleSubmit, reset, t } = this.props;
    const { statesWages, statesLoader } = this.state;

    return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody>
            <div className="card__title">
              <h5 className="bold-text">{t("Invite Employee")}</h5>
              {/* <h5 className="subhead">Labels are left from fields</h5> */}
            </div>
            <form className="form form--horizontal" onSubmit={this.addEmployee}>
              <div className="form__form-group">
                <span className="form__form-group-label">First Name</span>
                <div className="form__form-group-field">
                  <Field
                    name="firstName"
                    component="input"
                    type="text"
                    onChange={this.onChangeHandler}
                    placeholder="Enter First Name"
                  />
                  <Tooltip
                    TransitionComponent={Zoom}
                    title="Enter employee's first name"
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
                    onChange={this.onChangeHandler}
                    placeholder="Enter Last Name"
                  />
                  <Tooltip
                    TransitionComponent={Zoom}
                    title="Enter employee's last name"
                  >
                    <IconButton className="helpButton">
                      <img className="helpImage" src={HelpIcon} alt="help" />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">Email</span>
                <div className="form__form-group-field">
                  <Field
                    name="email"
                    component="input"
                    type="text"
                    onChange={this.onChangeHandler}
                    placeholder="Enter the Email Address"
                  />
                  <Tooltip
                    TransitionComponent={Zoom}
                    title="Enter employee email address e.g abc@example.com"
                  >
                    <IconButton className="helpButton">
                      <img className="helpImage" src={HelpIcon} alt="help" />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">Mobile #</span>
                <div className="form__form-group-field">
                  <IntlTelInput
                    style={{ width: "100%" }}
                    fieldName="cell"
                    name="cell"
                    id="number"
                    fieldId="employeeNumber"
                    preferredCountries={["us"]}
                    defaultCountry="United States"
                    onPhoneNumberChange={(
                      status,
                      value,
                      countryData,
                      number
                    ) => {
                      this.setState({
                        cell: number
                      });
                    }}
                  />
                  <Tooltip
                    TransitionComponent={Zoom}
                    title="Enter employee mobile number"
                  >
                    <IconButton className="helpButton">
                      <img className="helpImage" src={HelpIcon} alt="help" />
                    </IconButton>
                  </Tooltip>
                  {/* <Field
                    name="cell"
                    component="input"
                    type="text"
                    onChange={this.onChangeHandler}
                    placeholder="Enter the Mobile Number"
                  /> */}
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">State</span>
                <div className="form__form-group-field">
                  <Field
                    name="stateName"
                    component="select"
                    type="select-multi"
                    className="selectDropdown"
                    onChange={this.onStateSelectHandler}
                  >
                    <option
                      style={{ color: "red !important" }}
                      value="select state"
                    >
                      Select State
                    </option>
                    {!statesLoader &&
                      statesWages.map(state => (
                        <option value={state.stateName}>
                          {state.stateName}
                        </option>
                      ))}
                  </Field>
                  <Tooltip
                    TransitionComponent={Zoom}
                    title="Select employee's state"
                  >
                    <IconButton className="helpButton">
                      <img className="helpImage" src={HelpIcon} alt="help" />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">Payment Method</span>
                <div className="form__form-group-field">
                  <Field
                    name="paymentMethod"
                    component="select"
                    type="select-multi"
                    className="selectDropdown"
                    onChange={this.onPaymentSelectHandler}
                  >
                    {this.props.user.isDirectDeposit ? (
                      <React.Fragment>
                        <option
                          style={{ color: "#A0A0A0 !important" }}
                          value="select payment method"
                        >
                          Select Payment Method
                        </option>
                        <option value="manual">Manual</option>
                        <option value="direct deposit">Direct Deposit</option>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <option
                          style={{ color: "#A0A0A0 !important" }}
                          value="select payment method"
                        >
                          Select Payment Method
                        </option>
                        <option value="manual">Manual</option>
                        {/* <option value="direct deposit">Direct Deposit</option> */}
                      </React.Fragment>
                    )}
                  </Field>
                  <Tooltip
                    TransitionComponent={Zoom}
                    title="Select Payment Method"
                  >
                    <IconButton className="helpButton">
                      <img className="helpImage" src={HelpIcon} alt="help" />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">Hourly Rate</span>
                <div className="form__form-group-field">
                  <Field
                    name="HourlyRate"
                    component="input"
                    type="text"
                    onChange={this.onChangeHandler}
                    placeholder="Enter Hourly Rate"
                  />
                  <Tooltip
                    TransitionComponent={Zoom}
                    title="Enter employee hourly rate"
                  >
                    <IconButton className="helpButton">
                      <img className="helpImage" src={HelpIcon} alt="help" />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">Start Date:</span>
                <div className="form__form-group-field">
                  <Field
                    name="chosenDate"
                    component={renderDatePickerField}
                    onChange={this.setDate}
                  />
                  <div className="form__form-group-icon">
                    <CalendarBlankIcon />
                  </div>
                  <Tooltip
                    TransitionComponent={Zoom}
                    title="Enter employee start date"
                  >
                    <IconButton className="helpButton">
                      <img className="helpImage" src={HelpIcon} alt="help" />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">Hours / Week</span>
                <div className="form__form-group-field">
                  <Field
                    name="WeekHr"
                    component="input"
                    type="text"
                    onChange={this.onChangeHandler}
                    placeholder="Enter Hours Per Week"
                  />
                  <Tooltip
                    TransitionComponent={Zoom}
                    title="Enter employee working hours per week"
                  >
                    <IconButton className="helpButton">
                      <img className="helpImage" src={HelpIcon} alt="help" />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">Time mode</span>
                <div className="form__form-group-field">
                  <span style={{ width: "100%" }}>
                    <Field
                      name="radio"
                      component={renderRadioButtonField}
                      label="Punch"
                      radioValue="Punch"
                      defaultChecked
                      className="colored-click"
                      onChange={value => {
                        this.setState({
                          timeMode: value
                        })
                      }}
                    />
                    <Field
                      name="radio"
                      component={renderRadioButtonField}
                      label="Manual"
                      radioValue="Manual"
                      className="colored-click"
                      onChange={value => {
                        this.setState({
                          timeMode: value
                        })
                      }}
                    />
                  </span>
                  <Tooltip
                    TransitionComponent={Zoom}
                    title="How an employee mark his/her attendence"
                  >
                    <IconButton className="helpButton">
                      <img className="helpImage" src={HelpIcon} alt="help" />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">Duties</span>
                <div className="form__form-group-field">
                  <Field
                    style={{ width: "100%" }}
                    name="Duties"
                    component="textArea"
                    type="text"
                    onChange={this.onChangeHandler}
                    placeholder="Enter Duties"
                  />
                  <Tooltip
                    TransitionComponent={Zoom}
                    title="Enter employee duties"
                  >
                    <IconButton className="helpButton">
                      <img className="helpImage" src={HelpIcon} alt="help" />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
              {/* <ButtonToolbar className="form__button-toolbar"> */}
              {/* {this.state.loader ? (
                <Button color="primary" disabled={true}>
                  <PulseLoader color={"#123abc"} size={15} />
                </Button>
              ) : ( */}
              <Button
                variant="contained"
                style={{ width: "10%" }}
                color="primary"
                type="submit"
              >
                Next
              </Button>
              {/* )} */}
              {/* </ButtonToolbar> */}
            </form>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

const mapStateToProps = state => {
  console.log("user uid", state.userReducer.user.uid);

  return {
    user: state.userReducer.user,
    employeruid: state.userReducer.user.uid,
    loading: state.employer.Loading,
    successDone: state.employer.successDone,
    isLoading: state.employer.isLoading,
    statesWages: state.dbReducers.statesWages,
    getStatesWagesStatus: state.dbReducers.getStatesWagesStatus
  };
};

export default reduxForm({
  form: "horizontal_form", // a unique identifier for this form
  onSubmitSuccess: afterSubmit
})(
  translate("common")(
    connect(
      mapStateToProps,
      {
        addNewEmployee,
        getStateWages
      }
    )(HorizontalForm)
  )
);

// export default connect(mapStateToProps, {addNewEmployee})(SendDocuments);
