import React, { Component } from "react";
import {
  Card,
  CardBody,
  Col,
  Badge,
  Table,
  CardHeader,
  Row,
  UncontrolledCollapse,
  ButtonToolbar
} from "reactstrap";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import moment from "moment";
import Divider from "@material-ui/core/Divider";
import { Field, reduxForm } from "redux-form";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  deleteTask,
  completedTask
} from "../../../../../redux/actions/TasksActions";
import { getTask } from "../../../../../redux/actions/EmployeeTaskActions";
import {
  getEmployeStatus,
  getWeekStatus,
  
  
} from "../../../../../redux/actions/attendanceAction";
import UpdateForm from "../../employeeTasks/UpdateTask";

class EmployeeTasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      completed: false,
      modal: false,
      delId: "",
      open: false,
      taskTitle: "",
      updateDialogOpen: false,
      scroll: "body",
      taskDetail: {},
      Tasks: [],

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
      TaskPurpose: "",
      taskCompleted: "",
      id: "",
      uid: "",
      SelectForAllot: ""
    };
  }

  componentDidMount() {
    this.props.getEmployeStatus(
      this.props.user.employeeid,
      this.props.user.timeMode
    );
    this.props.getWeekStatus(this.props.user.employeeid);
    this.props.getTask(this.props.user.employeruid, this.props.user.employeeid);
  }

  componentWillReceiveProps = nextProps => {
    this.setState({ loader: false });
    if (nextProps.loader === "false") {
      this.setState({
        Tasks: nextProps.items
      });
    }
  };

  onChangeHandler = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  CompleteTask = () => {
    console.log("you call completion fun");
    this.setState({ completionModal: false });

    if (this.state.completionNote !== "") {
      let data = {
        id: this.state.taskDetail.id,
        title: this.state.taskDetail.title,
        Description: this.state.taskDetail.Description,
        AllotedTo: this.state.taskDetail.AllotedTo,
        DueTime: "Completed",
        completionNote: this.state.completionNote,
        PostedTime: this.state.taskDetail.PostedTime,
        taskCompleted: new Date().toString(),
        TaskPurpose: this.state.taskDetail.TaskPurpose,
        uid: this.state.taskDetail.uid
      };
      this.props.completedTask(data);
      toast.success("Task completed successfully");
      this.setState({ completionNote: "" });
    } else {
      toast.error("Failed to complete this task, please write description");
    }
  };

  deleteTask = () => {
    this.setState({ open: false });
    this.props.deleteTask(this.state.delId);
    toast.success("Own Task Delete Successfully!");
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleUpdateDialogOpen = data => {
    // console.log("check data ::::: ", data);
    this.setState({ updateDialogOpen: true });
  };

  handleUpdateDialogClose = () => {
    this.setState({ updateDialogOpen: false });
  };

  handlecompletionModal = () => {
    // console.log("gd click");
    this.setState({ completionModal: true });
  };

  handleCompleteClose = () => {
    this.setState({ completionModal: false });
  };

  searchingForName = searchQuery => {
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
    const { Tasks, loader } = this.state;
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
                            {moment(item.PostedTime).format("MMM/DD/YYYY")}
                          </p>
                        </Col>

                        <Col sm={12} md={12} lg={12} xl={12}>
                          <Divider />
                          <UncontrolledCollapse
                            className="with-shadow"
                            toggler={`#toggler${index}`}
                          >
                            <div>
                              <h5>
                                <strong>Description :</strong>{" "}
                              </h5>
                              <p style={{ marginLeft: "10px" }}>
                                {item.Description}
                              </p>
                            </div>

                            <Row>
                              <Col
                                sm={12}
                                md={12}
                                lg={12}
                                xl={12}
                                style={{
                                  textAlign: "center",
                                  marginTop: "15px"
                                }}
                              >
                                <ButtonToolbar>
                                  <Button
                                    disabled={this.state.checkIn}
                                    color="primary"
                                    onClick={() =>
                                      this.setState({
                                        completionModal: true,
                                        taskDetail: item
                                      })
                                    }
                                  >
                                    Mark as Complete
                                  </Button>

                                  {/* <Button
                                  disabled={this.state.checkIn}
                                  color="primary"
                                  variant="outlined"
                                  onClick={() =>
                                    this.setState({
                                      taskDetail: item,
                                      updateDialogOpen: true
                                    })
                                  }
                                >
                                  Edit
                                </Button>&nbsp;
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
                                </Button> */}
                                </ButtonToolbar>
                              </Col>
                            </Row>
                          </UncontrolledCollapse>
                        </Col>
                        <Divider />
                      </Row>
                    );
                  }
                )
              ) : (
                <div style={{ textAlign: "center", padding: 20 }}>
                  <h3>No Found any Employee Task</h3>
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

        {/* Update Dialog */}
        <Dialog
          open={this.state.updateDialogOpen}
          onClose={this.handleUpdateDialogClose}
          scroll={this.state.scroll}
          aria-labelledby="scroll-dialog-title"
          style={{ padding: 0 }}
        >
          <DialogTitle
            id="scroll-dialog-title"
            style={{
              textAlign: "center",
              borderBottom: "1px solid lightgrey "
            }}
          >
            Update Task
          </DialogTitle>
          <DialogContent style={{ padding: 0 }}>
            <UpdateForm item={this.state.taskDetail} />
          </DialogContent>
        </Dialog>

        {/* Completing Dialog */}

        <Dialog
          open={this.state.completionModal}
          onClose={this.handleCompleteClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth={true}
          maxWidth={"sm"}
        >
          <DialogTitle id="alert-dialog-title">
            {"Mark the task as Complete"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <textarea
                rows="5"
                placeholder="Task Completion Note"
                name="completionNote"
                onChange={this.onChangeHandler}
                className="completionBox"
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.handleCompleteClose}
              variant="contained"
              color="default"
            >
              Cencel
            </Button>
            <Button
              onClick={this.CompleteTask}
              variant="contained"
              color="primary"
              autoFocus
            >
              Complete
            </Button>
          </DialogActions>
        </Dialog>
      </Col>
    );
  }
}

const mapStateToProps = state => ({
  // employee: state.employeeUserReducer.currentEmp,
  // currentEmp: state.employeeUserReducer.currentEmp,
  items: state.employeeTaskReducer.AllTask,
  user: state.employeeUserReducer.currentEmp,
  loader: state.employeeTaskReducer.loader
});

export default reduxForm({
  form: "ee_task_detail" // a unique identifier for this form
})(
  connect(
    mapStateToProps,
    {
      getTask,
      // getEmployees,
      getEmployeStatus,

      getWeekStatus,
      deleteTask,
      completedTask
    }
  )(EmployeeTasks)
);
