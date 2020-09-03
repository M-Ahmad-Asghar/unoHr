import React, { Component } from "react";
import {
  Card,
  CardBody,
  Col,
  ButtonToolbar,
  CardHeader,
  Row,
  UncontrolledCollapse
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
  deletOwnTask
} from "../../../../../redux/actions/TasksActions";
import { verifyNumber, updateEmployerMobNumber } from "../../../../../redux/actions/employerActions";
import Divider from "@material-ui/core/Divider";
import OtpDialog from "./otpDialog";
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";

import CircularProgress from "@material-ui/core/CircularProgress";
import { PulseLoader } from "react-spinners";

const inCorrect = {
  marginBottom: "-20px",
  fontSize: "0.7rem",
  color: "crimson",
  marginTop: "0px",
  position: "absolute",
  marginLeft: "125px",
  bottom: "0"
};

class ListTasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: "true",
      DueDate: "",
      loader: true,
      dataLength: true,
      data: [],
      delId: "",
      open: false,
      taskTitle: "",
      deleteLoader: false,

      otpOpen: false,
      resendbutton: false,
      numberStatus: false,
      verificationType: "",
      verificationCode: null,
      numberEntered: false,
      numberVerified: false,
      mobileNumber: "",
    };
  }

  componentDidMount() {
    this.props.getOwnTask(this.props.user.uid);
    this.setState({
      mobileNumber: this.props.user.cell
    })
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.loader === "false") {
      this.setState({
        loader: false,
        data: nextProps.items
      });
    }

    if (nextProps.deleteOwnStatus == "done") {
      this.setState({ open: false, deleteLoader: false });
    } else if (nextProps.deleteOwnStatus == "error") {
      this.setState({ open: false, deleteLoader: false });

    }
  };

  handleInputChange(telNumber, selectedCountry) {
   
  }

  handleInputBlur(telNumber, selectedCountry) {
   
  }

  openDialog = () => {
    var val = Math.floor(1000 + Math.random() * 9000);
    let data = {
      message: `Verification message from unhr! use verification code: ${val}`,
      number: this.state.mobileNumber
    };
    // console.log('OTP: ' ,val );
    this.props.verifyNumber(data);
    this.setState({ otpOpen: true, resendbutton: false, verificationCode: val });
  };

  onNumberStatus = status => {
    this.setState({
      numberVerified: status
    });
  };

  handleVerifyNumber = (id) => {
    this.setState({ delId: id })
    this.openDialog();
    this.handleresendbutton();
  };

  handleresendbutton = () => {
    setTimeout(() => {
      this.setState({
        resendbutton: true
      });
    }, 30000);
  };

  numberChangeHandler = number => {
      this.setState({
      mobileNumber: number
    });
  };

  verifyCodeEnteredInOTp = otp => {
    if (this.state.verificationCode == otp) {
      this.onNumberStatus(true);
      this.setState({
        numberVerified: true,
        otpOpen: false
      });
      toast.success("Phone Number is successfully Verified!");
      this.props.deletOwnTask(this.state.delId);
      this.props.updateEmployerMobNumber({
        id: this.props.user.docid,
        cell: this.state.mobileNumber
      });
    } else {
      toast.error("Not Verified! Verification Code Incorrect");
      this.onNumberStatus(false);
      this.setState({
        numberVerified: false
      });
    }
  }

  checkNumberStatus = () => {
    this.onNumberStatus(false);
    this.setState({
      numberVerified: false
    });
  };

  resendPhoneCode = () => {
    this.openDialog();
  };

  performNumberVerification = () => {
    if (this.state.mobileNumber !== "" || this.state.mobileNumber.length > 0) {
      this.setState({
        verifyNumber: true
      });
    } else {
      this.setState({
        verifyNumber: false
      });
    }
  };

  handleclosedialog = () => {
    this.setState({
      otpOpen: false,
      resendbutton: false
    });
  };

  deleteTask = () => {
    this.setState({ deleteLoader: true });
    this.props.deletOwnTask(this.state.delId);
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  searchingForName = searchQuery => {
    return function(employeeTask) {
        return (
        employeeTask.AllotedTo
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) || 
          employeeTask.title.toLowerCase().includes(searchQuery.toLowerCase()) || moment(employeeTask.PostedTime)
          .format("MMM/DD/YYYY").toLowerCase().includes(searchQuery.toLowerCase()) || moment(employeeTask.DueTime)
          .format("MMM/DD/YYYY").toLowerCase().includes(searchQuery.toLowerCase()) || !searchQuery
      );
    };
  };

  render() {
    const { loader, data, deleteLoader } = this.state;
    let { searchQuery } = this.props;
    
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
                data.filter(this.searchingForName(searchQuery)).map((item, index) => {
        
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
                          {
                            item.mobileVerification 
                              ?
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
                                  <Row style={{ marginTop: 5 , marginLeft:20}}>
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
                                <Row style={{ marginLeft:20 }}>
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
                                          marginLeft: "65px"
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
                                              defaultValue={this.state.mobileNumber}
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
                                                    numberStatus: true
                                                  });
                                                } else {
                                                  this.setState({
                                                    numberStatus: false
                                                  });
                                                }
                                                if (number.length > 0) {
                                                  this.setState({
                                                    numberEntered: true
                                                  });
                                                } else {
                                                  this.setState({
                                                    numberEntered: false
                                                  });
                                                }
                                              }}
                                              onPhoneNumberBlur={() => {
                                                this.performNumberVerification();
                                              }}
                                            />
                                            {!this.state.numberVerified && this.state.numberEntered && (
                                              !this.state.numberStatus && 
                                                ( <p style={inCorrect}>Incorrect Number</p> )
                                            )}
                                          </div>
                                        </div>
                                        <Button
                                          color="secondary"
                                          type="submit"
                                          style={{ marginLeft: "auto" }}
                                          onClick={() => this.handleVerifyNumber(item.id)}
                                        >
                                          Verify Number
                                        </Button>
                                      </div>
                                    </Col>
                                  </Row>
                                </UncontrolledCollapse>
                              :
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
                                  <Row style={{ marginTop: 5, marginLeft:20 }}>
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
                                <Row style={{marginLeft:20 }}>
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
                                      style={{ textAlign: "center", marginTop: "15px" }}
                                    >
                                      <ButtonToolbar>
                                        <Button
                                        style={{marginLeft: "auto", marginRight: "40px", marginBottom: "10px"}}
                                          color="secondary"
                                          variant="outlined"
                                          onClick={() =>
                                            this.setState({
                                              delId: item.id,
                                              open: true,
                                              taskTitle: item.title
                                            })
                                          }
                                        >
                                          Delete
                                        </Button>
                                      </ButtonToolbar>
                                    </Col>
                                  </Row>
                                </UncontrolledCollapse>
                          }
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
          resendPhoneCode={this.resendPhoneCode}
          verifyCodeEnteredInOTp={this.verifyCodeEnteredInOTp}
          resendbutton={this.state.resendbutton}
          handleclosedialog={this.handleclosedialog}
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
            {deleteLoader ? (
              <Button disabled variant="contained" color="secondary" autoFocus>
                <PulseLoader color={"#123abc"} size={10} />
              </Button>
            ) : (
              <Button
                onClick={this.deleteTask}
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
}

const mapStateToProps = state => ({
  items: state.TaskReducer.OwnTask,
  user: state.userReducer.user,
  loader: state.TaskReducer.loader,
  deleteOwnStatus: state.TaskReducer.deleteOwnStatus,
  loading: state.TaskReducer.loading
});
export default connect(
  mapStateToProps,
  { 
    deletOwnTask,
    verifyNumber,
    getOwnTask,
    updateEmployerMobNumber
  }
)(ListTasks);
