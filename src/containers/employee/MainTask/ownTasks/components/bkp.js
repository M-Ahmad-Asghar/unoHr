import React, { useState, useEffect, Fragment } from "react";
import {
  Card,
  CardBody,
  Col,
  ButtonToolbar,
  Row,
  CardHeader,
  Collapse,
  UncontrolledCollapse,
} from "reactstrap";
import Divider from "@material-ui/core/Divider";
import { connect } from "react-redux";
import moment from "moment";
import { Field, reduxForm } from "redux-form";
import { toast } from "react-toastify";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  deleteTask,
  deletOwnTask,
} from "../../../../../redux/actions/TasksActions";
import { verifyNumber } from "../../../../../redux/actions/employerActions";
import { updateEmployeeMobNumber } from "../../../../../redux/actions/employeeActions";
import { getOwnTask } from "../../../../../redux/actions/EmployeeTaskActions";
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";
import renderCheckBoxField from "../../../../../shared/components/form/CheckBox";
import CircularProgress from "@material-ui/core/CircularProgress";
import UpdateForm from "../../employeeTasks/UpdateTask";
import OtpDialog from "./otpDialog";
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
  const [modal, setModal] = useState(false);
  const [loader, setLoader] = useState(true);
  const [delId, setDelId] = useState("");
  const [open, setOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [screel, setScroll] = useState("body");
  const [taskDetail, setTaskDetail] = {};
  const [Tasks, setTasks] = useState([]);
  const [completeOpen, setCompleteOpen] = useState(false);
  const [otpOpen, setOtpOpen] = useState(false);
  const [resendbutton, setResendbutton] = useState(false);
  const [numberStatus, setNumberStatus] = useState(false);
  const [verificationType, setVerificationType] = useState("");
  const [verificationCode, setVerificationCode] = useState(null);
  const [numberEntered, setNumberEntered] = useState(false);
  const [numberVerified, setNumberVerified] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [verifyNumber, setVerifyNumber] = useState(false);
  const [value, setValue] = useState(0);
  const [title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [DueTime, setDueTime] = useState("");
  const [AlottedTo, setAlottedTo] = useState("");
  const [completionModal, setCompletionModal] = useState(false);
  const [completionNote, setCompletionNote] = useState("");
  const [taskStatus, setTaskStatus] = useState("");

  const [PostedTime, setPostedTime] = useState("");
  const [TaskPurpose, setTaskPurpose] = useState("");
  const [taskCompleted, setTaskCompleted] = useState("");
  const [id, setId] = useState("");
  const [uid, setUid] = useState("");
  const [SelectForAllot, setSelectForAllot] = useState("");

  const dispatch = useDispatch();

  const items = useSelector((state) => state.employeeTaskReducer.empOwnTask);
  const user = useSelector((state) => state.employeeUserReducer.currentEmp);
  const stateLoader = useSelector((state) => state.employeeTaskReducer.loader);

  useEffect(() => {
    setLoader(true);
    setMobileNumber(user.cell);
    dispatch(getOwnTask(user.employeeid));
  }, []);

  useEffect(() => {
    if (stateLoader === "false") {
      setLoader(false);
      setTasks(items);
    }
  }, [stateLoader]);

  const deleteTask = () => {
    setOpen(false);
    dispatch(deletOwnTask(delId));

    // toast.success("Own Task Delete Successfully!");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdateDialogOpen = (data) => {
    setUpdateDialogOpen(true);
  };

  const handleUpdateDialogClose = () => {
    setUpdateDialogOpen(false);
  };

  const handleCompleteOpen = () => {
    setCompleteOpen(true);
  };

  const handleCompleteClose = () => {
    setCompleteOpen(false);
  };

  const handleclosedialog = () => {
    setOtpOpen(false);
    setResendbutton(false);
  };

  resendPhoneCode = () => {
    if (verificationType == "number") {
      openDialog();
    }
  };

  onNumberStatus = (status) => {
    setNumberVerified(statue);
  };

  checkNumberStatus = () => {
    onNumberStatus(false);
    setNumberVerified(false);
  };

  verifyCodeEnteredInOTp = (otp) => {
    if (verificationCode == otp) {
      onNumberStatus(true);
      setNumberVerified(true);
      setOtpOpen(false);

      toast.success("Phone Number is successfully Verified!");
      deletOwnTask(delId);
      updateEmployeeMobNumber({
        id: user.docid,
        cell: mobileNumber,
      });
    } else {
      toast.error("Not Verified! Verification Code Incorrect");
      onNumberStatus(false);
      setNumberVerified(false);
    }
  };

  const openDialog = () => {
    var val = Math.floor(1000 + Math.random() * 9000);
    let data = {
      message: `Verification message from unhr! use verification code: ${val}`,
      number: mobileNumber,
    };

    // console.log("Code OTP: ", data);
    verifyNumber(data);
    setOtpOpen(true);
    setResendbutton(false);
    setVerificationCode(val);
  };

  const numberChangeHandler = (number) => {
    setMobileNumber(number);
  };

  const handleresendbutton = () => {
    setTimeout(() => {
      setResendbutton(true);
    }, 30000);
  };

  const handleVerifyNumber = (id) => {
    setDelId(id);

    openDialog();
    handleresendbutton();
  };

  const performNumberVerification = () => {
    if (mobileNumber !== "" || mobileNumber.length > 0) {
      setVerifyNumber(true);
    } else {
      setVerifyNumber(false);
    }
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
    <Col
      md={12}
      lg={12}
      xl={12}
      style={{ backgroundColor: "white", paddingTop: 20, borderRadius: 5 }}
    >
      <Card>
        <CardHeader>
          <Row>
            <Col xs={4} sm={4} md={4} lg={4} xl={4}>
              <h5>
                <strong> Title </strong>{" "}
              </h5>
            </Col>
            <Col xs={4} sm={4} md={4} lg={4} xl={4}>
              <h5>
                <strong> Due Date </strong>{" "}
              </h5>
            </Col>
            {/* <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                <h5><strong> Alloted To </strong> </h5>
              </Col> */}
            <Col xs={4} sm={4} md={4} lg={4} xl={4}>
              <h5>
                <strong> Posted At </strong>{" "}
              </h5>
            </Col>
          </Row>
        </CardHeader>
        {loader ? (
          <div style={{ marginTop: "35px", textAlign: "center" }}>
            <CircularProgress />
          </div>
        ) : (
          <CardBody style={{ padding: "0px" }}>
            {Tasks.length > 0 ? (
              Tasks.filter(searchingForName(searchQuery)).map((item, index) => {
                let id = ++index;
                return (
                  <Fragment>
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
                        <p>{moment(item.DueTime).format("MMM/DD/YYYY")}</p>
                      </Col>
                      {/* <Col
                        className="taskCol"
                        xs={4}
                        sm={4}
                        md={4}
                        lg={4}
                        xl={4}
                      >
                        <p>{item.AllotedTo}</p>
                      </Col> */}
                      <Col
                        className="taskCol"
                        xs={4}
                        sm={4}
                        md={4}
                        lg={4}
                        xl={4}
                      >
                        <p>
                          {" "}
                          {moment(item.PostedTime).format("MMM/DD/YYYY hh:mm")}
                        </p>
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
                              {/* <Col
                                    xs={4}
                                    sm={3}
                                    md={2}
                                    lg={2}
                                    xl={2}
                                    style={{ textAlign: "center", marginTop: "15px" }}
                                  >
                                    <ButtonToolbar>
                                      <Button
                                        color="secondary"
                                        // variant="outlined"
                                        // onClick={() =>
                                        //   this.setState({
                                        //     delId: item.id,
                                        //     open: true,
                                        //     taskTitle: item.title
                                        //   })
                                        // }
                                      >
                                        Verify Number
                                      </Button>
                                    </ButtonToolbar>
                                  </Col> */}
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

                            <Row>
                              <Col xs={8} sm={9} md={10} lg={10} xl={10} />
                              <Col
                                xs={4}
                                sm={3}
                                md={2}
                                lg={2}
                                xl={2}
                                style={{
                                  textAlign: "center",
                                  marginTop: "15px",
                                }}
                              >
                                <ButtonToolbar>
                                  <Button
                                    color="secondary"
                                    variant="outlined"
                                    style={{
                                      marginLeft: "auto",
                                      marginRight: "40px",
                                      marginBottom: "10px",
                                    }}
                                    onClick={() => {
                                      setDelid(item.id);
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
                    </Row>
                    <Divider />
                  </Fragment>
                );
              })
            ) : (
              <div style={{ textAlign: "center", padding: 30 }}>
                <h3>Could Not Find any Employee Task</h3>
              </div>
            )}
          </CardBody>
        )}
      </Card>

      {/* ////////////////////////////Dialog ////////////////////////////////////////////// */}
      <OtpDialog
        resendPhoneCode={resendPhoneCode}
        resendbutton={resendbutton}
        handleclosedialog={handleclosedialog}
        verifyCodeEnteredInOTp={verifyCodeEnteredInOTp}
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
          <Button
            onClick={deleteTask}
            variant="contained"
            color="secondary"
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Col>
  );
}

export default reduxForm({
  form: "ee_task_detail", // a unique identifier for this form
})(ListTasks);
