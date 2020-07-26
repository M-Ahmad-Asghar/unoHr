import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import EyeIcon from "mdi-react/EyeIcon";
import KeyVariantIcon from "mdi-react/KeyVariantIcon";
import AccountOutlineIcon from "mdi-react/AccountOutlineIcon";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Button, Row, Col } from "reactstrap";
import CircularProgress from "@material-ui/core/CircularProgress";
import renderCheckBoxField from "../../../../shared/components/form/CheckBox";
import { startLogin } from "../../../../redux/actions/userActions";
import { toast } from "react-toastify";
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
      showPassword: false,
      disableBtn: false,
      email: "",
      password: "",
      invalidEmail: "",
      invPswrd: "",
      loader: false,
      hasErroredErr: false
    };
    this.showPassword = this.showPassword.bind(this);
  }

  componentWillReceiveProps = nextProps => {
    // console.log("check props:::::", nextProps);

    this.setState({
      loader: false,
      disableBtn: false
    });

    if (nextProps.hasErroredErr) {
      this.setState({
        invPswrd: "Wrong password Try again!"
      });
    }

    if (nextProps.isLoading === "move") {
      toast.success("Successfully Login!");
      this.props.history.push("/home/employeer/dashboard");
    }
  };

  onChangeHandler = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  showPassword(e) {
    e.preventDefault();
    this.setState({
      showPassword: !this.state.showPassword
    });
  }

  validateEmail = email => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-z  A-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  validate = () => {
    if (this.state.email == "" || !this.validateEmail(this.state.email)) {
      this.setState({
        invalidEmail: "invalid email address"
      });
    }
    if (this.validateEmail(this.state.email)) {
      this.setState({
        invalidEmail: ""
      });
    }
    if (this.state.password <= 7) {
      this.setState({
        invPswrd: "password must be greater than 8 letters"
      });
    }

    if (this.state.password != "") {
      this.setState({
        invPswrd: ""
      });
    }
  };

  handleSubmit = e => {
    e.preventDefault();

    if (
      this.state.email == "" ||
      this.state.password == "" ||
      !this.validateEmail(this.state.email)
    ) {
      this.validate();
    } else if (this.state.email !== "" || this.state.password !== "") {
      this.setState({
        loader: true,
        disableBtn: true
      });

      let data = {
        email: this.state.email.toLowerCase(),
        password: this.state.password
      };

      // console.log("Data is: ", data);
      this.props.startLogin(data);
    }
  };

  render() {

    return (
      <form className="form" onSubmit={this.handleSubmit}>
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
          <span style={{ color: "red" }}> {this.state.invalidEmail}</span>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">Password</span>
          <div className="form__form-group-field">
            <div className="form__form-group-icon">
              <KeyVariantIcon />
            </div>
            <Field
              name="password"
              component="input"
              type={this.state.showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={this.onChangeHandler}
            />
            <button
              className={`form__form-group-button${
                this.state.showPassword ? " active" : ""
              }`}
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
          <div className="account__forgot-password">
          
            <Link to="/employeer/forgetpassword">Forgot a password?</Link>
          </div>
          <span style={{ color: "red" }}> {this.state.invPswrd} </span>
        </div>
        <div className="form__form-group">
          <div className="form__form-group-field">
            <Field
              name="remember_me"
              component={renderCheckBoxField}
              label="Remember me"
            />
          </div>

          {this.state.loader ? (
            <Row>
              <Col style={{ textAlign: "center" }}>
                <CircularProgress size="22px" />
              </Col>
            </Row>
          ) : (
            <Row>
              <Col>
                <Button
                  style={{ width: "100%" }}
                  color="success"
                  // disabled={disableBtn}
                  className="square"
                  outline
                  onClick={this.handleSubmit}
                  type="submit"
                >
                  Sign In
                </Button>
              </Col>
              <Col>
                <Link to="/employeer/signup" style={{ margin: "auto" }}>
                  <Button
                    style={{ width: "100%" }}
                    color="success"
                    // disabled={disableBtn}
                    className="square"
                    outline
                  >
                    Create Account
                  </Button>
                </Link>
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
    user: state.userReducer.user,
    isLoading: state.userReducer.isLoading,
    hasErrored: state.userReducer.hasErrored
  };
};

export default reduxForm({
  form: "log_in_form" // a unique identifier for this form
})(
  connect(
    mapStateToProps,
    { startLogin }
  )(withRouter(LogInForm))
);
