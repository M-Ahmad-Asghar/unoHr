import React, { Component, useState, useEffect } from "react";
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
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Zoom from "@material-ui/core/Zoom";
import HelpIcon from "../../../../assets/help.png";
import "../styles/style.css";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function LogInForm(props) {
  const [disableBtn, setDisableBtn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalidEmail, setInvalidEmail] = useState("");
  const [invalidPswrd, setInvalidPswrd] = useState("");
  const [loader, setLoader] = useState(false);
  const [hasErroredErr, setHasErroredErr] = useState(false);
  const propTypes = {
    dispatch: PropTypes.func.isRequired,
  };
  const dispatch = useDispatch();
  const history = useHistory();
  const forgetWait = useSelector(
    (state) => state.employeeUserReducer.forgetWait
  );

  useEffect(() => {
    setLoader(false);
    setDisableBtn(false);

    if (forgetWait === "move") {
      history.push("/employee/login");
    }
  }, [forgetWait]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setEmail(e.target.value);
    // this.setState({ [name]: value });
  };

  const validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-z  A-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const login = () => {
    if (email == "" || !validateEmail(email)) {
      setInvalidEmail("invalid email address");
    } else {
      setInvalidEmail("");
      setLoader(true);
      console.log("email", email);
      dispatch(startRessetPassword(email.toLowerCase()));
    }
  };

  // const { disableBtn } = this.state;
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
            onChange={onChangeHandler}
          />
          <Tooltip
            TransitionComponent={Zoom}
            title="Enter your email address e.g abc@gmail.com"
          >
            <IconButton className="helpButton">
              <img className="helpImage" src={HelpIcon} alt="help" />
            </IconButton>
          </Tooltip>
        </div>
        <div className="account__forgot-password">
          <Link to="/employee/login">Login Page</Link>
        </div>
        <span style={{ color: "red" }}> {invalidEmail}</span>
      </div>

      <div className="form__form-group">
        <div className="form__form-group-field">
          <p>
            Add your email address, we will send you a email where you can
            change your password
          </p>
        </div>

        {loader ? (
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
                onClick={login}
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

// const mapStateToProps = (state) => {
//   return {
//     loader: state.employeeUserReducer.forget,
//     forgetWait: state.employeeUserReducer.forgetWait,
//   };
// };

export default reduxForm({
  form: "log_in_form", // a unique identifier for this form
})(withRouter(LogInForm));
