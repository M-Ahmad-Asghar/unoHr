import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { toast } from "react-toastify";
import AccountOutlineIcon from "mdi-react/AccountOutlineIcon";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Button, Row, Col } from "reactstrap";
import CircularProgress from "@material-ui/core/CircularProgress";
import { startRessetPassword } from "../../../../redux/actions/employeeUserActions";
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Zoom from '@material-ui/core/Zoom';
import HelpIcon from "../../../../assets/help.png";
import "../styles/style.css";

class LogInForm extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      disableBtn: false,
      email: "",
      password: "",
      invalidEmail: "",
      invPswrd: "",
      loader: false,
      hasErroredErr: false
    };
  }

  componentWillReceiveProps = nextProps => {
   
    this.setState({
      loader: false,
      disableBtn: false
    });

    if (nextProps.forgetWait === "move") {
      this.props.history.push("/employeer/login");
    }
  };

  onChangeHandler = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  validateEmail = email => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-z  A-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };


  login = () => {


    if (this.state.email == "" || !this.validateEmail(this.state.email)) {
      this.setState({
        invalidEmail: "invalid email address"
      });
    }
   
    else  {

      this.setState({
        invalidEmail: "",
        loader:true
      });
     
      this.props.startRessetPassword(this.state.email.toLowerCase());

    }

   
    
  };

  render() {
    const { disableBtn } = this.state;
    return (
      <form className="form">
        <div className="form__form-group">
          <span className="form__form-group-label">Email</span>
          <div className="form__form-group-field">
            <div className="form__form-group-icon">
              <AccountOutlineIcon />
            </div>
            <Field
              name="email"
              component="input"
              type="text"
              placeholder="Email"
              onChange={this.onChangeHandler}
            />
            <Tooltip TransitionComponent={Zoom} title="Enter your email address e.g abc@example.com">
              <IconButton className="helpButton">
                <img className="helpImage" src={HelpIcon} alt="help"/>
              </IconButton>
            </Tooltip>
          </div>
          <div className="account__forgot-password">
            <Link to="/employeer/login">Login Page</Link>
          </div>
          <span style={{ color: "red" }}> {this.state.invalidEmail}</span>
        </div>

        <div className="form__form-group">
          <div className="form__form-group-field">
            <p>
              Add your email address, we will send you a email where you can
              change your password
            </p>
          </div>

          {this.state.loader ? (
            <Row>
              <Col style={{ textAlign: "center" }}>
                <CircularProgress size="22px" />
              </Col>
            </Row>
          ) : (
            <Row style={{ marginTop: "15px" }}>
              <Col>
                <Button
                  style={{ width: "100%" }}
                  color="success"
                  className="square"
                  outline
                  onClick={this.login}
                >
                  Forget Password
                </Button>
              </Col>
            </Row>
          )}
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    loader: state.employeeUserReducer.forget,
    forgetWait: state.employeeUserReducer.forgetWait,
  };
};

export default reduxForm({
  form: "log_in_form" // a unique identifier for this form
})(
  connect(
    mapStateToProps,
    { startRessetPassword }
  )(withRouter(LogInForm))
);
