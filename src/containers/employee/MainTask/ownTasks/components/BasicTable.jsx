import React, { Component, Fragment } from "react";
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

const inCorrect = {
  marginBottom: "-20px",
  fontSize: "0.7rem",
  color: "crimson",
  marginTop: "0px",
  position: "absolute",
  marginLeft: "125px",
  bottom: "0",
};

class ListTasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      delId: "",
      open: false,
      taskTitle: "",
      updateDialogOpen: false,
      scroll: "body",
      taskDetail: {},
      Tasks: [],
      completeOpen: false,

      otpOpen: false,
      resendbutton: false,
      numberStatus: false,
      verificationType: "",
      verificationCode: null,
      numberEntered: false,
      numberVerified: false,
      mobileNumber: "",

      value: 0,
      title: "",
      Description: "",
      DueTime: "",
      AlottedTo: "",
      completionModal: false,
      completionNote: "",
      taskStatus: "",
      loader: false,
      PostedTime: "",
      TaskPurpose: "",
      taskCompleted: "",
      id: "",
      uid: "",
      SelectForAllot: "",
    };
  }

  componentDidMount() {
    // console.log("tabs=> : ", this.props);
    this.setState({
      loader: true,
      mobileNumber: this.props.user.cell,
    });
    this.props.getOwnTask(this.props.user.employeeid);
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.loader === "false") {
      this.setState({
        loader: false,
        Tasks: nextProps.items,
      });
    }
  };

  deleteTask = () => {
    this.setState({ open: false });
    this.props.deletOwnTask(this.state.delId);
    // toast.success("Own Task Delete Successfully!");
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleUpdateDialogOpen = (data) => {
    this.setState({ updateDialogOpen: true });
  };

  handleUpdateDialogClose = () => {
    this.setState({ updateDialogOpen: false });
  };

  handleCompleteOpen = () => {
    this.setState({ completeOpen: true });
  };

  handleCompleteClose = () => {
    this.setState({ completeOpen: false });
  };

  handleclosedialog = () => {
    this.setState({
      otpOpen: false,
      resendbutton: false,
    });
  };

  resendPhoneCode = () => {
    if (this.state.verificationType == "number") {
      this.openDialog();
    }
  };

  onNumberStatus = (status) => {
    this.setState({
      numberVerified: status,
    });
  };

  checkNumberStatus = () => {
    this.onNumberStatus(false);
    this.setState({
      numberVerified: false,
    });
  };

  verifyCodeEnteredInOTp = (otp) => {
    if (this.state.verificationCode == otp) {
      this.onNumberStatus(true);
      this.setState({
        numberVerified: true,
        otpOpen: false,
      });
      toast.success("Phone Number is successfully Verified!");
      this.props.deletOwnTask(this.state.delId);
      this.props.updateEmployeeMobNumber({
        id: this.props.user.docid,
        cell: this.state.mobileNumber,
      });
    } else {
      toast.error("Not Verified! Verification Code Incorrect");
      this.onNumberStatus(false);
      this.setState({
        numberVerified: false,
      });
    }
  };

  openDialog = () => {
    var val = Math.floor(1000 + Math.random() * 9000);
    let data = {
      message: `Verification message from unhr! use verification code: ${val}`,
      number: this.state.mobileNumber,
    };

    // console.log("Code OTP: ", data);
    this.props.verifyNumber(data);
    this.setState({
      otpOpen: true,
      resendbutton: false,
      verificationCode: val,
    });
  };

  numberChangeHandler = (number) => {
    this.setState({
      mobileNumber: number,
    });
  };

  handleresendbutton = () => {
    setTimeout(() => {
      this.setState({
        resendbutton: true,
      });
    }, 30000);
  };

  handleVerifyNumber = (id) => {
    this.setState({ delId: id });
    this.openDialog();
    this.handleresendbutton();
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

  searchingForName = (searchQuery) => {
    return function(item) {
      return (
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        moment(item.DueTime)
          .format("MMM/DD/YYYY")
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        moment(item.PostedTime)
          .format("MMM/DD/YYYY")
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        !searchQuery
      );
    };
  };

  render() {
    const { loader, Tasks } = this.state;
    let { searchQuery } = this.props;

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
                Tasks.filter(this.searchingForName(searchQuery)).map(
                  (item, index) => {
                    let id = ++index;
                    return (
                      <Fragment>
                        <Row
                          className="taskRow"
                          key={index}
                          id={`toggler${index}`}
                        >
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
                              {moment(item.PostedTime).format(
                                "MMM/DD/YYYY hh:mm"
                              )}
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
                                            value={this.state.mobileNumber}
                                            defaultValue={
                                              this.state.mobileNumber
                                            }
                                            onPhoneNumberChange={(
                                              status,
                                              value,
                                              countryData,
                                              number,
                                              id
                                            ) => {
                                              this.checkNumberStatus();

                                              this.numberChangeHandler(number);

                                              if (status) {
                                                this.setState({
                                                  numberStatus: true,
                                                });
                                              } else {
                                                this.setState({
                                                  numberStatus: false,
                                                });
                                              }
                                              if (number.length > 0) {
                                                this.setState({
                                                  numberEntered: true,
                                                });
                                              } else {
                                                this.setState({
                                                  numberEntered: false,
                                                });
                                              }
                                            }}
                                            onPhoneNumberBlur={() => {
                                              this.performNumberVerification();
                                            }}
                                          />
                                          {!this.state.numberVerified &&
                                            this.state.numberEntered &&
                                            (!this.state.numberStatus && (
                                              <p style={inCorrect}>
                                                Incorrect Number
                                              </p>
                                            ))}
                                        </div>
                                      </div>
                                      <Button
                                        color="secondary"
                                        type="submit"
                                        style={{ marginLeft: "auto" }}
                                        onClick={() =>
                                          this.handleVerifyNumber(item.id)
                                        }
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
                                        onClick={() =>
                                          this.setState({
                                            delId: item.id,
                                            open: true,
                                            taskTitle: item.title,
                                          })
                                        }
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
                  }
                )
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
          resendPhoneCode={this.resendPhoneCode}
          resendbutton={this.state.resendbutton}
          handleclosedialog={this.handleclosedialog}
          verifyCodeEnteredInOTp={this.verifyCodeEnteredInOTp}
          open={this.state.otpOpen}
        />

        {/* Delete Dialog */}
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure to delete this task?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <strong>Task Name: </strong>
              <span>{this.state.taskTitle}</span>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.handleClose}
              variant="contained"
              color="default"
            >
              Disagree
            </Button>
            <Button
              onClick={this.deleteTask}
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
}

const mapStateToProps = (state) => ({
  items: state.employeeTaskReducer.empOwnTask,
  user: state.employeeUserReducer.currentEmp,
  loader: state.employeeTaskReducer.loader,
});

export default reduxForm({
  form: "ee_task_detail", // a unique identifier for this form
})(
  connect(
    mapStateToProps,
    {
      verifyNumber,
      deletOwnTask,
      getOwnTask,
      updateEmployeeMobNumber,
    }
  )(ListTasks)
);
