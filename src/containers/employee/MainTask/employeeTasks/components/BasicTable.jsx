import React, { useState, useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";

function EmployeeTasks({ Tasks }) {
  const [modal, setModal] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [delId, setDelId] = useState("false");
  const [open, setOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [scroll, setScroll] = useState("body");
  const [taskDetail, setTaskDetail] = useState({});
  const [Tasks, setTasks] = useState([]); ////Doubt
  const [value, setValue] = useState(0);
  const [title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [DueTime, setDueTime] = useState("");
  const [AlottedTo, setAlottedTo] = useState("");
  const [completionModal, setCompletionModal] = useState(false);
  const [completionNote, setCompletionNote] = useState("");
  const [taskStatus, setTaskStatus] = useState("");
  const [loader, setLoader] = useState(false);
  const [PostedTime, setPostedTime] = useState("");
  const [TaskPurpose, setTaskPurpose] = useState("");
  const [taskCompleted, setTaskCompleted] = useState("");
  const [id, setId] = useState("");
  const [uid, setUid] = useState("");
  const [SelectForAllot, setSelectForAllot] = useState("");
  const dispatch = useDispatch();

  const items = useSelector((state) => state.TaskReducer.AllTask);
  const user = useSelector((state) => state.userReducer.user);
  const loader = useSelector((state) => state.TaskReducer.loader);

  useEffect(() => {
    let data = Tasks;
    setId(data.id);
    setTitle(data.title);
    setDescription(date.Description);
    setDueTime(data.DueTime);
    setSelectForAllot(data.AllotedTo);
    setAlottedTo(data.AlottedTo);
    setUid(data.uid);
    setPostedTime(data.PostedTime);
    setTaskPurpose(data.TaskPurpose);
    setCompletionNote(data.completionNote);

    if (data.taskCompleted != undefined) {
      setTaskCompleted(data.taskCompleted);
    }
  }, []);

  const CompleteTask = () => {
    if (completionNote !== "") {
      let data = {
        id: id,
        title: heading,
        Description: detail,
        AllotedTo: AlottedTo,
        DueTime: "Completed",
        completionNote: completionNote,
        PostedTime: PostedTime,
        taskCompleted: new Date().toString(),
        TaskPurpose: TaskPurpose,
        uid: uid,
      };
      // props.completedTask(data);
      console("Task completed successfully abaid ");
      setCompletionNote(false);
    } else {
      console.log("completion note is necessary");
    }
  };

  const deleteTask = () => {
    setOpen(false);
    dispatch(deleteTask(delId));

    // toast.success("Own Task Delete Successfully!");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdateDialogOpen = (data) => {
    // console.log("check data ::::: ", data);
    setUpdateDialogOpen(true);
  };

  const handleUpdateDialogClose = () => {
    setUpdateDialogOpen(false);
  };

  const handlecompletionModal = () => {
    setCompletionModal(true);
  };

  const handleCompleteClose = () => {
    setCompletionModal(false);
  };

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
                          defaultChecked={completed}
                          // disabled={true}
                          onClick={() => {
                            setCompletionModal(true);
                          }}
                          className="colored"
                        />
                      </td>
                      <td>
                        <Badge
                          color="success"
                          onClick={() => {
                            setTaskDetail(item);
                            setUpdateDialogOpen(true);
                          }}
                        >
                          Edit
                        </Badge>
                        &nbsp;
                        <Badge
                          color="danger"
                          onClick={() => {
                            setDelId(item.id);
                            setOpen(true);
                            setTaskTitle(item.title);
                          }}
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
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <span style={{color="black"}}> Do you want to delete this task?</span>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <strong>Task Name: </strong>
            <span>{taskTitle}</span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="default">
            Cancel
          </Button>
          <Button
            onClick={deleteTask}
            variant="contained"
            color="secondary"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Update Dialog */}
      <Dialog
        open={updateDialogOpen}
        onClose={handleUpdateDialogClose}
        scroll={scroll}
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
          <UpdateForm item={taskDetail} />
        </DialogContent>
      </Dialog>

      {/* Completing Dialog */}
      <Dialog
        open={completionModal}
        onClose={handleCompleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
         
          <span style={{color:"black"}}> Mark the task as Complete</span>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <strong>Task Name: </strong>
            <span>{taskTitle}</span>
            <h3>
              Mark as Complete:{" "}
              {
                <Field
                  name="checkbox_one"
                  component={renderCheckBoxField}
                  // label="Checkbox 1"
                  defaultChecked={completed}
                  // className="colored"
                />
              }
            </h3>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCompleteClose}
            variant="contained"
            color="default"
          >
            Cancel
          </Button>
          <Button
            onClick={handleCompleteClose}
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

export default reduxForm({
  form: "ee_task_detail", // a unique identifier for this form
})(EmployeeTasks);
