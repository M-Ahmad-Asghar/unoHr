import React, { Component, useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { toast } from "react-toastify";
import EyeIcon from "mdi-react/EyeIcon";
import KeyVariantIcon from "mdi-react/KeyVariantIcon";
import AccountOutlineIcon from "mdi-react/AccountOutlineIcon";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Button, Row, Col } from "reactstrap";
import CircularProgress from "@material-ui/core/CircularProgress";
import renderCheckBoxField from "../../../../shared/components/form/CheckBox";
import { startLoginEmployee } from "../../../../redux/actions/employeeUserActions";
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Zoom from '@material-ui/core/Zoom';
import HelpIcon from "../../../../assets/help.png";
import "../styles/style.css";
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

function LogInForm() {
  const [disableBtn, setDisableBtn] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [invalidEmail, setInvalidEmail] = useState("")
  const [invalidPswrd, setInvalidPswrd] = useState("")
  const [loader, setLoader] = useState(useSelector(state => state.employeeUserReducer.loader))
  const [hasErroredErr, setHasErroredErr] = useState(useSelector(state => state.employeeUserReducer.hasErroredErr))
  const [showPassword, setShowPassword] = useState(false)


  const dispatch = useDispatch()
  const history = useHistory()


  // const userStatusEmp = useSelector(state=>state.employeeUserReducer.userStatusEmp)

  // const  propTypes = {
  //   dispatch: PropTypes.func.isRequired
  // };


  // this.showPassword = this.showPassword.bind(this);


  const stateLoader = useSelector(state => state.employeeUserReducer.loader)
  const stateHasErroredErr = useSelector(state => state.employeeUserReducer.hasErroredErr)
  useEffect(() => {
    setLoader(false)
    setDisableBtn(false)
    if (stateHasErroredErr) {

      setInvalidPswrd("Wrong password Try again!")

    }
    if (stateLoader === "move") {

      history.push("/home/employee/dashboard");
    }
  }, [stateLoader, stateHasErroredErr])

  const onChangeHandler = e => {
    const { name, value } = e.target;
    if (name == "email") {
      setEmail(value)
    }
    if (name == "password") {
      setPassword(value)
    }
  };


  const togglePassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword)
  }

  const validateEmail = email => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-z  A-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  const validate = () => {
    if (email == "" || !validateEmail(email)) {

      setInvalidEmail("invalid email address")

    }
    if (validateEmail(email)) {

      setInvalidEmail("")

    }
    if (password <= 7) {

      setInvalidPswrd("password must be greater than 8 letters")

    }

    if (password != "") {

      setInvalidPswrd("")

    }
  };

  const login = e => {
    e.preventDefault();

    if (
      email == "" ||
      password == "" ||
      !validateEmail(email)
    ) {
      validate();
    } else if (email !== "" || password !== "") {
      setLoader(true)
      setDisableBtn(true)


      let data = {
        email: email.toLowerCase(),
        password: password
      };

      // console.log("Data is: ", data);
      dispatch(startLoginEmployee(data));
    }
  };



  return (

    <form className="form" onSubmit={login}>
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

            onChange={onChangeHandler}
          />
          <Tooltip TransitionComponent={Zoom} title="Enter your email address e.g abc@gmail.com">
            <IconButton className="helpButton">
              <img className="helpImage" src={HelpIcon} alt="help" />
            </IconButton>
          </Tooltip>
        </div>
        <span style={{ color: "red" }}> {invalidEmail}</span>
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
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            onChange={onChangeHandler}
          />
          <button
            className={`form__form-group-button${showPassword ? " active" : ""
              }`}
            onClick={e => togglePassword(e)}
          >
            <EyeIcon />
          </button>
          <Tooltip TransitionComponent={Zoom} title="Enter your password">
            <IconButton className="helpButton">
              <img className="helpImage" src={HelpIcon} alt="help" />
            </IconButton>
          </Tooltip>
        </div>
        <div className="account__forgot-password">

          <Link to="/employee/forgetpassord" >Forgot a password?</Link>

        </div>
        <span style={{ color: "red" }}> {invalidPswrd} </span>
      </div>
      <div className="form__form-group">
        <div className="form__form-group-field">
          <Field
            name="remember_me"
            component={renderCheckBoxField}
            label="Remember me"
          />
        </div>

        {loader ? (
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
                disabled={disableBtn}
                className="square"
                outline
              >
                Sign In
              </Button>
            </Col>
            <Col>
              <Link to="/employee/signup" style={{ margin: "auto" }}>
                <Button
                  style={{ width: "100%" }}
                  color="success"
                  disabled={disableBtn}
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


  )
}

export default reduxForm({
  form: "log_in_form",

})(LogInForm)
