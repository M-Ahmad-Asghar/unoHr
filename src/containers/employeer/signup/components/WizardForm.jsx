import React, { Component } from "react";
import { Col, Card, Row } from "reactstrap";
// import PropTypes from 'prop-types';
import WizardFormOne from "./WizardFormOne";
import WizardFormTwo from "./WizardFormTwo";
import WizardFormThree from "./WizardFormThree";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import {
  registerEmployer,
  verifyNumber,
  verifyEmail,
} from "../../../../redux/actions/employerActions";

import { searchDistrict } from "../../../../utils/search";
import { getWcStates } from "../../../../redux/actions/wcStateAction";
import { getIndustry } from "../../../../redux/actions/dbActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import { getSystemDocuments } from "../../../../redux/actions/paperWorkActions";
// import { EMPLOYER_SIGN_UP } from '../../../../redux/actions/employerSignUpActions';
class WizardForm extends Component {
  static propTypes = {
    // onSubmit: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = {
      loader: false,
      page: 1,
      firstName: "",
      lastName: "",
      email: "",
      mobileNumber: "",
      password: "",
      cPassword: "",
      country: "USA",
      street: "",
      city: "",
      state: "",
      zip: "",
      ein: "",
      tax: "Yes",
      date: new Date(),
      report: "Yes",
      token: "",
      verifyEmail: false,
      verifyNumber: false,
      plan: "Basic",
      address: "",
      numberVerified: false,
      emailVerified: false,
      defualtVal: { value: "Basic", label: "Basic-$39" },
      wcStates: [],
      industries: [],
      industry: "select industry",
      districts: [],
      searchText: "",
      district: {},
      bankName: "",
      bankAccountNumber: "",
      bankRoutingNumber: "",
      bankAccountType: "",
    };
    this.timer = null;
  }

  onNumberStatus = (status) => {
    this.setState({
      numberVerified: status,
    });
  };

  onEmailStatus = (status) => {
    this.setState({
      emailVerified: status,
    });
  };

  onCheckoutToken = (token) => {
    this.setState({ token });
  };
  onChangeRadioTax = (e, checked) => {
    this.setState({ tax: checked });
  };

  onChangeRadioReport = (e, checked) => {
    this.setState({ report: checked });
  };

  onChangeDate = (date) => {
    const { _d } = date;
    this.setState({ date: _d });
  };

  onChangeHandler = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  numberChangeHandler = (number) => {
    this.setState({
      mobileNumber: number,
    });
  };

  validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-z  A-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  ///////// SEARCH DISTRICTS ////////////

  onChangeAutoComplete = (event, newValue) => {
    this.setState({ district: newValue });
  };

  onChangeText = (event) => {
    let value = event.target.value;
    clearTimeout(this.timer);
    this.setState({
      searchText: value,
    });
    this.timer = setTimeout(this.triggerSearch, 1000);
  };
  // Triger search
  triggerSearch = () => {
    if (this.state.searchText.length > 1) {
      searchDistrict(this.state.searchText.toUpperCase())
        .then((doc) => {
          let firebaseData = [];
          doc.forEach((docRecord) => {
            let data = docRecord.data();
            firebaseData.push(data);
          });
          this.setState({ districts: firebaseData });
        })
        .catch((err) => {});
    }
  };

  nextPage = (e) => {
    e.preventDefault();
    if (this.state.firstName == "") {
      toast.error("Please provide Your First Name");
    } else if (this.state.lastName == "") {
      toast.error("Please provide Your Last Name");
    }

    //  else if (!this.state.emailVerified) {
    //   toast.error("Please Verify Your Email");
    // }

    // else if (!this.state.numberVerified) {
    //   toast.error("Please verify your Number");
    // }
    else if (this.state.password.length <= 7) {
      toast.error("Password Must be greater than 8 letters");
    } else if (this.state.cPassword != this.state.password) {
      toast.error("Password does not match");
    } else if (this.state.bankname == "") {
      toast.error("Please Enter Bank Name");
    } else if (this.state.bankAccountNumber == "") {
      toast.error("Please Enter Bank Account Number");
    } else if (this.state.bankAccountNumber.length !== 12) {
      toast.error(
        "Bank Routing Number Is Required & Must be Equal To 9 Digits"
      );
    } else if (this.state.bankRoutingNumber.length !== 9) {
      toast.error(
        "Bank Routing Number Is Required & Must be Equal To 9 Digits"
      );
    } else if (this.state.bankAccountType == "") {
      toast.error("Please Enter Bank Account Type");
    } else {
      if (this.state.page == 1) {
        this.setState({ page: 2 });
      } else {
        // 2nd Form

        if (this.state.page == 2) {
          // if (this.state.street == "") {
          //   toast.error("Please enter your street address");
          // } else if (this.state.city == "") {
          //   toast.error("Please enter your city name");
          if (this.state.state == "") {
            toast.error("Please enter your state");
          } else if (this.state.industry == "") {
            toast.error("Please enter your industry");
          } else if (this.state.district.zipCode === undefined) {
            toast.error("Please enter your district");
          }
          // else if (this.state.zip == "" || isNaN(this.state.zip)) {
          //   toast.error("Invalid your zip code");
          // }
          if (this.state.address === "") {
            toast.error("Please enter your  address");
          } else if (this.state.ein == "" || isNaN(this.state.ein)) {
            toast.error("Invalid Your EIN");
          } else {
            this.setState({ page: 3 });
            toast.success("Contect Information validated!");
          }
        }
        // End 2nd Form
      }
    }
  };

  previousPage = () => {
    this.setState({ page: this.state.page - 1 });
  };

  signUp = () => {
    if (this.state.plan == null) {
      toast.error("Please select a plan");
    } else {
      this.setState({ loader: true });

      let data = {
        address: this.state.address,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        name: this.state.firstName + " " + this.state.lastName,
        email: this.state.email.toLowerCase(),
        cell: this.state.mobileNumber,
        password: this.state.password,
        bankName: this.state.bankname,
        bankAccountNumber: this.state.bankAccountNumber,
        bankRoutingNumber: this.state.bankRoutingNumber,
        bankAccountType: this.state.bankAccountType,
        // street: this.state.street,
        // city: this.state.city,
        state: this.state.state,
        // zip: this.state.zip,
        ein: this.state.ein,
        // country: this.state.country,
        jointTex: this.state.tax,
        chosenDate: this.state.date,
        wagesReport: this.state.report,
        token: { tokenId: this.state.token },
        subscription: this.state.plan,
        isDirectDeposit: false,
        createdAt: new Date(),
        documents: this.props.documents,
        district: this.state.district,
        industry: this.state.industry,
        numVerifyTask: {
          AllotedTo: "My Own",
          title: "Verify Mobile Number",
          Description:
            "Please verify your mobile number in order to receive useful messages in future!",
          mobileVerification: true,
          DueTime: new Date(),
          PostedTime: new Date(),
          TaskPurpose: "My Own",
        },
      };

      this.props.registerEmployer(data);
    }
  };

  componentDidMount() {
    this.props.getWcStates();
    this.props.getSystemDocuments();
    this.props.getIndustry();
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({ loader: false });

    if (nextProps.done == "move") {
      this.props.history.push("/employeer/login");
    }

    if (nextProps.getWCStatesStatus === "done") {
      this.setState({
        wcStates: nextProps.wcStates,
      });
    }
    if (nextProps.getIndustryStatus == "done") {
      this.setState({
        industries: nextProps.industry,
      });
    }
  };
  performEmailVerification = () => {
    if (this.state.email !== "" || this.state.email.length > 0) {
      this.setState({
        verifyEmail: true,
      });
    } else {
      this.setState({
        verifyEmail: false,
      });
    }
  };
  performNumberVerification = () => {
    if (this.state.mobileNumber !== "" || this.state.mobileNumber.length > 0) {
      this.setState({
        verifyNumber: true,
      });
    } else {
      this.setState({
        verifyNumber: false,
      });
    }
  };

  getPlan = (e) => {
    this.setState({
      plan: e.target.value,
    });
  };
  getAddress = (address) => {
    this.setState({
      address,
    });
  };

  render() {
    // const { onSubmit } = this.props;
    const { page } = this.state;

    return (
      <Row>
        <Col md="12" lg="12">
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
                <div
                  className={`wizard__step${
                    page === 3 ? " wizard__step--active" : ""
                  }`}
                >
                  <p>Step 3</p>
                </div>
              </div>
              <div className="wizard__form-wrapper">
                {page === 1 && (
                  <WizardFormOne
                    onNumberStatus={this.onNumberStatus}
                    onEmailStatus={this.onEmailStatus}
                    verifyPhoneNumber={this.props.verifyNumber}
                    verifyEmailMethod={this.props.verifyEmail}
                    onSubmit={this.nextPage}
                    firstName={this.state.firstName}
                    lastName={this.state.lastName}
                    email={this.state.email.toLowerCase()}
                    mobileNumber={this.state.mobileNumber}
                    password={this.state.password}
                    onChangeHandler={this.onChangeHandler}
                    numberChangeHandler={this.numberChangeHandler}
                    performEmailVerification={this.performEmailVerification}
                    performNumberVerification={this.performNumberVerification}
                    verifyEmail={this.state.verifyEmail}
                    verifyNumber={this.state.verifyNumber}
                    validateEmail={this.validateEmail}
                  />
                )}
                {page === 2 && (
                  <WizardFormTwo
                    previousPage={this.previousPage}
                    onSubmit={this.nextPage}
                    street={this.state.street}
                    city={this.state.city}
                    country={this.state.country}
                    state={this.state.state}
                    wcStates={this.state.wcStates}
                    industries={this.state.industries}
                    districts={this.state.districts}
                    onChangeText={this.onChangeText}
                    district={this.state.district}
                    onChangeAutoComplete={this.onChangeAutoComplete}
                    zip={this.state.zip}
                    ein={this.state.ein}
                    // date={this.state.date}
                    // report={this.state.report}
                    onChangeHandler={this.onChangeHandler}
                    onChangeDate={this.onChangeDate}
                    onChangeRadioTax={this.onChangeRadioTax}
                    onChangeRadioReport={this.onChangeRadioReport}
                    getAddress={this.getAddress}
                  />
                )}
                {page === 3 && (
                  <WizardFormThree
                    previousPage={this.previousPage}
                    onCheckoutToken={this.onCheckoutToken}
                    onSubmit={this.signUp}
                    getPlan={this.getPlan}
                    plan={this.state.plan}
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

// export default withRouter(WizardForm);

const mapStateToProps = (state) => {
  return {
    isLoading: state.employer.isLoading,
    done: state.employer.done,
    wcStates: state.wcStateReducer.wcStates,
    getWCStatesStatus: state.wcStateReducer.getWCStatesStatus,
    documents: state.paperWorkReducer.verifieddocuments,
    industry: state.dbReducers.industry,
    getIndustryStatus: state.dbReducers.getIndustryStatus,
  };
};

export default connect(mapStateToProps, {
  registerEmployer,
  verifyNumber,
  verifyEmail,
  getWcStates,
  getIndustry,
  getSystemDocuments,
})(withRouter(WizardForm));
