import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Col,
  ButtonToolbar,
  CardHeader,
  Row,
  UncontrolledCollapse,
} from "reactstrap";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import moment from "moment";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  getOwnTask,
  deletOwnTask,
} from "../../../../../redux/actions/TasksActions";
import {
  verifyNumber,
  updateEmployerMobNumber,
} from "../../../../../redux/actions/employerActions";
import Divider from "@material-ui/core/Divider";
import OtpDialog from "./otpDialog";
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";

import CircularProgress from "@material-ui/core/CircularProgress";
import { PulseLoader } from "react-spinners";
import { faDoorClosed } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";

const inCorrect = {
  marginBottom: "-20px",
  fontSize: "0.7rem",
  color: "crimson",
  marginTop: "0px",
  position: "absolute",
  marginLeft: "125px",
  bottom: "0",
};

function ListTasks({ searchQuery }) {
  const [active, setActive] = useState("true");
  const [DueDate, setDueDate] = useState("");
  const [loader, setLoader] = useState(true);
  const [dataLength, setDataLength] = useState(true);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [data, setData] = useState([]);
  const [delId, setDelId] = useState("");
  const [open, setOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [otpOpen, setOtpOpen] = useState(false);
  const [resendbutton, setResendbutton] = useState(false);
  const [numberStatus, setNumberStatus] = useState(false);
  const [verificationType, setVerificationType] = useState("");
  const [verificationCode, setVerificationCode] = useState(null);
  const [numberEntered, setNumberEntered] = useState(false);
  const [numberVerified, setNumberVerified] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");

  const dispatch = useDispatch();

  const items = useSelector((state) => state.TaskReducer.OwnTask);
  const user = useSelector((state) => state.userReducer.user);
  const stateLoader = useSelector((state) => state.TaskReducer.loader);
  const deleteOwnStatus = useSelector(
    (state) => state.TaskReducer.deleteOwnStatus
  );
  const loading = useSelector((state) => state.TaskReducer.loading);

  useEffect(() => {
    dispatch(getOwnTask(user.uid));

    setMobileNumber(user.cell);
  }, []);

  useEffect(() => {
    if (stateLoader === "false") {
      setLoader(false);
      setData(items);
      console.log("DATA", items);
    }

    if (deleteOwnStatus == "done") {
      setOpen(false);
      setLoader(false);
    } else if (deleteOwnStatus == "error") {
      setOpen(false);
      setDeleteLoader(false);
    }
  }, [stateLoader, deleteOwnStatus]);

  const handleInputChange = (telNumber, selectedCountry) => {};

  const handleInputBlur = (telNumber, selectedCountry) => {};

  const openDialog = () => {
    var val = Math.floor(1000 + Math.random() * 9000);
    let data = {
      message: `Verification message from unhr! use verification code: ${val}`,
      number: mobileNumber,
    };
    // console.log('OTP: ' ,val );
    dispatch(verifyNumber(data));
    setOtpOpen(true);
    setResendbutton(false);
    setVerificationCode(val);
  };

  const onNumberStatus = (status) => {
    setNumberVerified(status);
  };

  const handleVerifyNumber = (id) => {
    setDelId(id);

    setDelId(id);
    openDialog();
    handleresendbutton();
  };

  const handleresendbutton = () => {
    setTimeout(() => {
      setResendbutton(true);
    }, 30000);
  };

  const numberChangeHandler = (number) => {
    setMobileNumber(number);
  };

  const verifyCodeEnteredInOTp = (otp) => {
    if (verificationCode == otp) {
      onNumberStatus(true);

      setNumberVerified(true);
      setOtpOpen(false);
      toast.success("Phone Number is successfully Verified!");
      deletOwnTask(delId);
      updateEmployerMobNumber({
        id: user.docid,
        cell: mobileNumber,
      });
    } else {
      toast.error("Not Verified! Verification Code Incorrect");
      onNumberStatus(false);

      setNumberVerified(false);
    }
  };

  const checkNumberStatus = () => {
    // onNumberStatus(false);
    // setState({
    //   numberVerified: false
    // });
  };

  const resendPhoneCode = () => {
    openDialog();
  };

  const performNumberVerification = () => {
    // if (mobileNumber !== "" || mobileNumber.length > 0) {
    //   setverifNu,
    //   setState({
    //     verifyNumber: true
    //   });
    // } else {
    //   setState({
    //     verifyNumber: false
    //   });
    // }
  };

  const handleclosedialog = () => {
    setOtpOpen(false);
    setResendbutton(false);
  };

  const deleteTask = () => {
    setDeleteLoader(true);

    dispatch(deletOwnTask(delId));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const searchingForName = (searchQuery) => {
    return function(employeeTask) {
      return (
        employeeTask.AllotedTo.toLowerCase().includes(
          searchQuery.toLowerCase()
        ) ||
        employeeTask.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        moment(employeeTask.PostedTime)
          .format("MMM/DD/YYYY")
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        moment(employeeTask.DueTime)
          .format("MMM/DD/YYYY")
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        !searchQuery
      );
    };
  };

  return (
    <Col md={12} lg={12} xl={12}>
      <Card>
        <CardHeader>
          <Row>
            <Col xs={4} sm={4} md={4} lg={4} xl={4}>
              <h5>Title</h5>
            </Col>
            <Col xs={4} sm={4} md={4} lg={4} xl={4}>
              <h5>Posted At</h5>
            </Col>
            <Col xs={4} sm={4} md={4} lg={4} xl={4}>
              <h5>Due Date</h5>
            </Col>
          </Row>
        </CardHeader>
        {loader ? (
          <div style={{ marginTop: "35px", textAlign: "center" }}>
            <CircularProgress />
          </div>
        ) : (
          <CardBody style={{ padding: "0px" }}>
            {data.length > 0 ? (
              data.filter(searchingForName(searchQuery)).map((item, index) => {
                return (
                  <React.Fragment>
                    <Row className="taskRow" key={index} id={`toggler${index}`}>
                      <Col
                        className="taskCol"
                        xs={4}
                        sm={4}
                        md={4}
                        lg={4}
                        xl={4}
                      >
                        <p>{item.title}</p>
                      </Col>
                      <Col
                        className="taskCol"
                        xs={4}
                        sm={4}
                        md={4}
                        lg={4}
                        xl={4}
                      >
                        <p> {moment(item.PostedTime).format("MMM/DD/YYYY")}</p>
                      </Col>
                      <Col
                        className="taskCol"
                        xs={4}
                        sm={4}
                        md={4}
                        lg={4}
                        xl={4}
                      >
                        <p> {moment(item.DueTime).format("MMM/DD/YYYY")} </p>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={12} md={12} lg={12} xl={12}>
                        <Divider />
                        {item.mobileVerification ? (
                          <UncontrolledCollapse
                            className="with-shadow"
                            toggler={`#toggler${index}`}
                          >
                            <div style={{ paddingLeft: "33px" }}>
                              <h5>
                                <strong>Description :</strong>{" "}
                              </h5>
                              <p style={{ marginLeft: "10px" }}>
                                {item.Description}
                              </p>
                            </div>
                            <Row style={{ marginTop: 5, marginLeft: 20 }}>
                              <Col sm={6} md={4} xl={4}>
                                <h5>Task For</h5>
                              </Col>
                              <Col sm={6} md={4} xl={4}>
                                <h5>Recurring Task</h5>
                              </Col>
                              <Col sm={6} md={4} xl={4}>
                                <h5>Task Note</h5>
                              </Col>
                            </Row>
                            <Row style={{ marginLeft: 20 }}>
                              <Col sm={6} md={4} xl={4}>
                                {item.TaskPurpose}
                              </Col>
                              <Col sm={6} md={4} xl={4}>
                                {item.recurringTask ? "True" : "False"}
                              </Col>
                              <Col sm={6} md={4} xl={4}>
                                {item.isTaskNote ? "True" : "False"}
                              </Col>
                            </Row>
                            <Row>
                              <Col xs={8} sm={9} md={10} lg={10} xl={10}>
                                <div
                                  className="form form--horizontal"
                                  style={{
                                    marginTop: 7,
                                    padding: 10,
                                    border: "1px solid",
                                    borderColor: "#BEBEBE",
                                    borderRadius: 3,
                                    marginLeft: "65px",
                                  }}
                                >
                                  <div className="form__form-group">
                                    <span className="form__form-group-label">
                                      <b>Mobile Number</b>
                                    </span>
                                    <div className="form__form-group-field">
                                      <IntlTelInput
                                        fieldName="mobileNumber"
                                        name="mobileNumber"
                                        id="number"
                                        fieldId="employeeNumber"
                                        preferredCountries={["us"]}
                                        defaultCountry="United States"
                                        value={mobileNumber}
                                        defaultValue={mobileNumber}
                                        onPhoneNumberChange={(
                                          status,
                                          value,
                                          countryData,
                                          number,
                                          id
                                        ) => {
                                          checkNumberStatus();

                                          numberChangeHandler(number);
                                          if (status) {
                                            setNumberStatus(true);
                                          } else {
                                            setNumberStatus(false);
                                          }
                                          if (number.length > 0) {
                                            setNumberEntered(true);
                                          } else {
                                            setNumberEntered(false);
                                          }
                                        }}
                                        onPhoneNumberBlur={() => {
                                          performNumberVerification();
                                        }}
                                      />
                                      {!numberVerified &&
                                        numberEntered &&
                                        !numberStatus && (
                                          <p style={inCorrect}>
                                            Incorrect Number
                                          </p>
                                        )}
                                    </div>
                                  </div>
                                  <Button
                                    color="secondary"
                                    type="submit"
                                    style={{ marginLeft: "auto" }}
                                    onClick={() => handleVerifyNumber(item.id)}
                                  >
                                    Verify Number
                                  </Button>
                                </div>
                              </Col>
                            </Row>
                          </UncontrolledCollapse>
                        ) : (
                          <UncontrolledCollapse
                            className="with-shadow"
                            toggler={`#toggler${index}`}
                          >
                            <div style={{ paddingLeft: "33px" }}>
                              <h5>
                                <strong>Description :</strong>{" "}
                              </h5>
                              <p style={{ marginLeft: "10px" }}>
                                {item.Description}
                              </p>
                            </div>
                            <Row style={{ marginTop: 5, marginLeft: 20 }}>
                              <Col sm={6} md={4} xl={4}>
                                <h5>Task For</h5>
                              </Col>
                              <Col sm={6} md={4} xl={4}>
                                <h5>Recurring Task</h5>
                              </Col>
                              <Col sm={6} md={4} xl={4}>
                                <h5>Task Note</h5>
                              </Col>
                            </Row>
                            <Row style={{ marginLeft: 20 }}>
                              <Col sm={6} md={4} xl={4}>
                                {item.TaskPurpose}
                              </Col>
                              <Col sm={6} md={4} xl={4}>
                                {item.recurringTask ? "True" : "False"}
                              </Col>
                              <Col sm={6} md={4} xl={4}>
                                {item.isTaskNote ? "True" : "False"}
                              </Col>
                            </Row>
                            <Row>
                              <Col
                                sm={12}
                                md={12}
                                lg={12}
                                xl={12}
                                style={{
                                  textAlign: "center",
                                  marginTop: "15px",
                                }}
                              >
                                <ButtonToolbar>
                                  <Button
                                    style={{
                                      marginLeft: "auto",
                                      marginRight: "40px",
                                      marginBottom: "10px",
                                    }}
                                    color="secondary"
                                    variant="outlined"
                                    onClick={() => {
                                      setDelId(item.id);
                                      setOpen(true);
                                      setTaskTitle(item.title);
                                    }}
                                  >
                                    Delete
                                  </Button>
                                </ButtonToolbar>
                              </Col>
                            </Row>
                          </UncontrolledCollapse>
                        )}
                      </Col>
                      <Divider />
                    </Row>
                  </React.Fragment>
                );
              })
            ) : (
              <div style={{ textAlign: "center" }}>
                <h3>Could Not Find any Own Task</h3>
              </div>
            )}
          </CardBody>
        )}
      </Card>

      {/* ////////////////////////////Dialog ////////////////////////////////////////////// */}
      <OtpDialog
        resendPhoneCode={resendPhoneCode}
        verifyCodeEnteredInOTp={verifyCodeEnteredInOTp}
        resendbutton={resendbutton}
        handleclosedialog={handleclosedialog}
        open={otpOpen}
      />

      {/* Delete Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure to delete this task?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <strong>Task Name: </strong>
            <span>{taskTitle}</span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="default">
            Disagree
          </Button>
          {deleteLoader ? (
            <Button disabled variant="contained" color="secondary" autoFocus>
              <PulseLoader color={"#123abc"} size={10} />
            </Button>
          ) : (
            <Button
              onClick={deleteTask}
              variant="contained"
              color="secondary"
              autoFocus
            >
              Agree
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Col>
  );
}

export default ListTasks;
