import React, { Component } from "react";
import {
  Card,
  CardBody,
  Col,
  Badge,
  Table,
  // Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ButtonToolbar,
  CardHeader,
  Collapse,
  Row,
  UncontrolledCollapse
} from "reactstrap";
import { PulseLoader } from "react-spinners";

import { translate } from "react-i18next";
import { connect } from "react-redux";
import moment from "moment";
import { Field, reduxForm } from "redux-form";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  deleteTask,
  getCompletedTask
} from "../../../../../redux/actions/TasksActions";
import renderCheckBoxField from "../../../../../shared/components/form/CheckBox";
import Divider from "@material-ui/core/Divider";
import CircularProgress from "@material-ui/core/CircularProgress";

class ListTasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskFor: "",
      completed: true,
      modal: false,
      delId: "",
      open: false,
      taskTitle: "",

      value: 0,
      title: "",
      Description: "",
      DueTime: "",
      AlottedTo: "",
      completionModal: false,
      completionNote: "",
      taskStatus: "",
      loader: true,
      PostedTime: "",
      TaskPurpose: "Employee",
      taskCompleted: "",
      id: "",
      uid: "",
      SelectForAllot: "",
      data: [],
      deleteLoader: false
    };
  }

  componentDidMount() {
    this.props.getCompletedTask(this.props.user.uid);
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.loader === "false") {
      this.setState({
        loader: false,
        data: nextProps.items
      });
    }

    if (nextProps.deleteStatusCom == "doneCom") {
      this.setState({ open: false, deleteLoader: false });
    }
  };

  delTask = () => {
    this.setState({ deleteLoader: true });
    this.props.deleteTask(this.state.delId);
  };

  handleClickOpen = () => {
    this.setState({ open: true });
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
          .format("MMM/DD/YYYY").toLowerCase().includes(searchQuery.toLowerCase()) || !searchQuery
      );
    };
  };

  render() {
    const { item, searchQuery } = this.props;
    const { loader, data, deleteLoader } = this.state;
    return (
      <Col md={12} lg={12} xl={12}>
        <Card>
          <CardHeader>
            <Row>
              <Col xs={3} sm={3} md={3} lg={3} xl={3}>
                <h5>Title</h5>
              </Col>
              <Col xs={3} sm={3} md={3} lg={3} xl={3}>
                <h5>Status</h5>
              </Col>
              <Col xs={3} sm={3} md={3} lg={3} xl={3}>
                <h5>Completed By</h5>
              </Col>
              <Col xs={3} sm={3} md={3} lg={3} xl={3}>
                <h5>completed At</h5>
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
                    <Row className="taskRow" key={index} id={`toggler${index}`}>
                      <Col
                        className="taskCol"
                        xs={3}
                        sm={3}
                        md={3}
                        lg={3}
                        xl={3}
                      >
                        <p>{item.title}</p>
                      </Col>
                      <Col
                        className="taskCol"
                        xs={3}
                        sm={3}
                        md={3}
                        lg={3}
                        xl={3}
                      >
                        <p>{item.DueTime}</p>
                      </Col>
                      <Col
                        className="taskCol"
                        xs={3}
                        sm={3}
                        md={3}
                        lg={3}
                        xl={3}
                      >
                        <p> {item.AllotedTo} </p>
                      </Col>
                      <Col
                        className="taskCol"
                        xs={3}
                        sm={3}
                        md={3}
                        lg={3}
                        xl={3}
                      >
                        <p>
                          {moment(item.taskCompleted).format(
                            "MMM/DD/YYYY hh:mm"
                          )}
                        </p>
                      </Col>

                      <Col sm={12} md={12} lg={12} xl={12}>
                        <Divider />
                        <UncontrolledCollapse
                          className="with-shadow"
                          toggler={`#toggler${index}`}
                        >
                          <div>
                            <h5>Description : {item.Description}</h5>
                            {/* <p style={{ marginLeft: "10px" }}>
                             
                            </p> */}
                          </div>
                          <div style={{ marginTop: "15px" }}>
                            <h5>Completion Note : {item.completionNote}</h5>
                            {/* <p style={{ marginLeft: "10px" }}> */}

                            {/* </p> */}
                          </div>
                          <Row>
                            <Col
                              sm={5}
                              md={5}
                              lg={5}
                              xl={5}
                              style={{
                                textAlign: "left",
                                marginTop: "15px",
                                flexDirection: "row"
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row"
                                }}
                              >
                                <p>Task For: </p>
                                <h5 style={{ marginLeft: "10px" }}>
                                  {item.TaskPurpose}
                                </h5>
                              </div>
                            </Col>

                            <Col sm={2} md={2} lg={2} xl={2} />
                            <Col
                              sm={5}
                              md={5}
                              lg={5}
                              xl={5}
                              style={{
                                textAlign: "center",
                                marginTop: "15px",
                                flexDirection: "row"
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row"
                                }}
                              >
                                <p>Posted At: </p>
                                <h5 style={{ marginLeft: "10px" }}>
                                  {moment(item.PostedTime).format(
                                    "MMM/DD/YYYY"
                                  )}
                                </h5>
                              </div>
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
                                {/* )} */}
                              </ButtonToolbar>
                            </Col>
                          </Row>
                        </UncontrolledCollapse>
                      </Col>
                      <Divider />
                    </Row>
                  );
                })
              ) : (
                <div style={{ textAlign: "center" }}>
                  <h3>No Found any Completed Task</h3>
                </div>
              )}
            </CardBody>
          )}
        </Card>

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
                onClick={this.delTask}
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
  items: state.TaskReducer.CompletedTask,
  user: state.userReducer.user,
  loader: state.TaskReducer.loader,
  deleteStatusCom: state.TaskReducer.deleteStatusCom
});

export default reduxForm({
  form: "ee_task_detail" // a unique identifier for this form
})(
  connect(
    mapStateToProps,
    { deleteTask, getCompletedTask }
  )(ListTasks)
);
