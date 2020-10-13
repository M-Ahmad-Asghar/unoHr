import React, { Component } from "react";
import { Card, CardBody, Col, Badge, Table } from "reactstrap";
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
  getTask,
  completedTask,
} from "../../../../../redux/actions/TasksActions";
import { getEmployees } from "../../../../../redux/actions/employerActions";

import renderCheckBoxField from "../../../../../shared/components/form/CheckBox";
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
      TaskPurpose: "Employee",
      taskCompleted: "",
      id: "",
      uid: "",
      SelectForAllot: "",
    };
  }

  componentDidMount() {
    let data = this.props.Tasks;

    this.setState({
      id: data.id,
      title: data.title,
      Description: data.Description,
      DueTime: data.DueTime,
      SelectForAllot: data.AllotedTo,
      AlottedTo: data.AlottedTo,
      uid: data.uid,
      PostedTime: data.PostedTime,
      TaskPurpose: data.TaskPurpose,
      completionNote: data.completionNote,
      TaskPurpose: data.TaskPurpose,
    });

    if (data.taskCompleted != undefined) {
      this.setState({
        taskCompleted: this.data.taskCompleted,
      });
    }
  }

  CompleteTask = () => {
    if (this.state.completionNote !== "") {
      let data = {
        id: this.state.id,
        title: this.state.heading,
        Description: this.state.detail,
        AllotedTo: this.state.AlottedTo,
        DueTime: "Completed",
        completionNote: this.state.completionNote,
        PostedTime: this.state.PostedTime,
        taskCompleted: new Date().toString(),
        TaskPurpose: this.state.TaskPurpose,
        uid: this.state.uid,
      };
      // this.props.completedTask(data);
      console("Task completed successfully abaid ");

      this.setState({
        completionModal: false,
        // DueTime: "Completed"
      });
    } else {
      console.log("completion note is necessary");
    }
  };

  deleteTask = () => {
    this.setState({ open: false });
    this.props.deleteTask(this.state.delId);
    // toast.success("Own Task Delete Successfully!");
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleUpdateDialogOpen = (data) => {
    // console.log("check data ::::: ", data);
    this.setState({ updateDialogOpen: true });
  };

  handleUpdateDialogClose = () => {
    this.setState({ updateDialogOpen: false });
  };

  handlecompletionModal = () => {
    this.setState({ completionModal: true });
  };

  handleCompleteClose = () => {
    this.setState({ completionModal: false });
  };

  render() {
    const { Tasks } = this.props;
    const { completed } = this.state;
    return (
      <Col md={12} lg={12} xl={12}>
        <Card>
          <CardBody>
            <Table responsive hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Posted At</th>
                  <th>Due Date</th>
                  <th>Alloted To</th>
                  <th>Complete</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {Tasks.length > 0 ? (
                  Tasks.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{++index}</td>
                        <td>{item.title}</td>
                        <td>{item.Description}</td>
                        <td>
                          {moment(item.PostedTime).format("MMM/DD/YYYY hh:mm")}
                        </td>
                        <td>{moment(item.DueTime).format("MMM/DD/YYYY")}</td>
                        <td>{item.AllotedTo}</td>
                        <td>
                          <Field
                            name="checkbox_one"
                            component={renderCheckBoxField}
                            label="Mark as Complete"
                            defaultChecked={this.state.completed}
                            // disabled={true}
                            onClick={() =>
                              this.setState({
                                completionModal: true,
                              })
                            }
                            className="colored"
                          />
                        </td>
                        <td>
                          <Badge
                            color="success"
                            onClick={() =>
                              this.setState({
                                taskDetail: item,
                                updateDialogOpen: true,
                              })
                            }
                          >
                            Edit
                          </Badge>
                          &nbsp;
                          <Badge
                            color="danger"
                            onClick={() =>
                              this.setState({
                                delId: item.id,
                                open: true,
                                taskTitle: item.title,
                              })
                            }
                          >
                            Delete
                          </Badge>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="8" style={{ textAlign: "center" }}>
                      <h3>No Found any Own Task</h3>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </CardBody>
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
              borderBottom: "1px solid lightgrey ",
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
        >
          <DialogTitle id="alert-dialog-title">
            {"Mark the task as Complete"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <strong>Task Name: </strong>
              <span>{this.state.taskTitle}</span>
              <h3>
                Mark as Complete:{" "}
                {
                  <Field
                    name="checkbox_one"
                    component={renderCheckBoxField}
                    // label="Checkbox 1"
                    defaultChecked={this.state.completed}
                    // className="colored"
                  />
                }
              </h3>
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
              onClick={this.handleCompleteClose}
              variant="contained"
              color="primary"
              autoFocus
            >
              Mark as Complete
            </Button>
          </DialogActions>
        </Dialog>
      </Col>
    );
  }
}

const mapStateToProps = (state) => ({
  items: state.TaskReducer.AllTask,
  user: state.userReducer.user,
  loader: state.TaskReducer.loader,
});

export default reduxForm({
  form: "ee_task_detail", // a unique identifier for this form
})(
  connect(
    mapStateToProps,
    {
      getTask,
      getEmployees,
      deleteTask,
      completedTask,
    }
  )(EmployeeTasks)
);
