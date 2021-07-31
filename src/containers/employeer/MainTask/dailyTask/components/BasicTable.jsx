import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Row,
  Col,
  CardHeader,
  UncontrolledCollapse,
  ButtonToolbar,
} from "reactstrap";
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
import Divider from "@material-ui/core/Divider";
import CircularProgress from "@material-ui/core/CircularProgress";
import { PulseLoader } from "react-spinners";
import { useSelector, useDispatch } from "react-redux";

// import Collapse from "../../../../../shared/components/Collapse";

import {
  deleteTask,
  getTask,
  completedTask,
} from "../../../../../redux/actions/TasksActions";
import { getEmployees } from "../../../../../redux/actions/employerActions";

import UpdateForm from "../../employeeTasks/UpdateTask";

function EmployeeTasks({ searchQuery }) {
  const dispatch = useDispatch();

  const [modal, setModal] = useState(false);
  const [delId, setDelId] = useState("false");
  const [open, setOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [scroll, setScroll] = useState("body");
  const [taskDetail, setTaskDetail] = useState({});
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
  const [collapse, setCollapse] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [completeLoader, setCompleteLoader] = useState(false);

  const items = useSelector((state) => state.TaskReducer.AllTask);
  const user = useSelector((state) => state.userReducer.user);
  const stateLoader = useSelector((state) => state.TaskReducer.loader);
  const taskDeleteStatus = useSelector(
    (state) => state.TaskReducer.taskDeleteStatus
  );
  const loading = useSelector((state) => state.TaskReducer.loading);
  const completionStatus = useSelector(
    (state) => state.TaskReducer.completionStatus
  );

  useEffect(() => {
    dispatch(getTask(user.uid));
  }, []);

  const onChangeHandler = (e) => {
    setCompletionNote(e.target.value);
  };

  const completeTask = () => {
    // this.setState({ completionModal: false });

    if (completionNote !== "") {
      setCompleteLoader(true);

      let data = {
        id: taskDetail.id,
        title: taskDetail.title,
        Description: taskDetail.Description,
        AllotedTo: taskDetail.AllotedTo,
        DueTime: "Completed",
        completionNote: completionNote,
        PostedTime: taskDetail.PostedTime,
        taskCompleted: new Date().toString(),
        TaskPurpose: taskDetail.TaskPurpose,
        uid: taskDetail.uid,
      };

      dispatch(completedTask(data));
      toast.success("Task completed successfully");

      // this.setState({ completionNote: "" });
    } else {
      toast.error("Failed to complete this task, please write description");
    }
  };

  const handleModelState = () => {
    setCompletionModal(false);
  };

  useEffect(() => {
    if (stateLoader === "false") {
      setLoader(false);
      if (taskDeleteStatus == "done") {
        setDeleteLoader(false);
        setOpen(false);
      } else if (taskDeleteStatus == "error") {
        setDeleteLoader(false);
        setOpen(false);
      }
      if (completionStatus == "done") {
        setCompleteLoader(false);
        setCompletionModal(false);
      } else if (completionStatus == "error") {
        setCompleteLoader(false);
      }
    }
  }, [stateLoader, taskDeleteStatus, completionStatus]);

  const handleDeleteTask = () => {
    setDeleteLoader(true);
    dispatch(deleteTask(delId));

    //toast.success("Own Task Delete Successfully!");
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

  const handleCompleteClose = () => {
    setCompletionModal(false);
  };

  return (
    <Col md={12} lg={12} xl={12}>
      <Card>
        <CardHeader>
          <Row>
            <Col xs={3} sm={3} md={3} lg={3} xl={3}>
              <h5>Title</h5>
            </Col>
            <Col xs={3} sm={3} md={3} lg={3} xl={3}>
              <h5>Due Date</h5>
            </Col>
            <Col xs={3} sm={3} md={3} lg={3} xl={3}>
              <h5>Alloted To</h5>
            </Col>
            <Col xs={3} sm={3} md={3} lg={3} xl={3}>
              <h5>Posted At</h5>
            </Col>
          </Row>
        </CardHeader>
        {loader ? (
          <div style={{ marginTop: "35px", textAlign: "center" }}>
            <CircularProgress />
          </div>
        ) : (
          <CardBody style={{ padding: "0px" }}>
            {items.length > 0 ? (
              items.filter(searchingForName(searchQuery)).map((item, index) => {
                return (
                  <Row className="taskRow" key={index} id={`toggler${index}`}>
                    <Col className="taskCol" xs={3} sm={3} md={3} lg={3} xl={3}>
                      <p>{item.title}</p>
                    </Col>
                    <Col className="taskCol" xs={3} sm={3} md={3} lg={3} xl={3}>
                      <p>
                        {moment(item.DueTime.toDate()).format("MMM/DD/YYYY")}
                      </p>
                    </Col>
                    <Col className="taskCol" xs={3} sm={3} md={3} lg={3} xl={3}>
                      <p>{item.AllotedTo}</p>
                    </Col>
                    <Col className="taskCol" xs={3} sm={3} md={3} lg={3} xl={3}>
                      <p>
                        {" "}
                        {moment(item.PostedTime).format("MMM/DD/YYYY hh:mm")}
                      </p>
                    </Col>

                    <Col sm={12} md={12} lg={12} xl={12}>
                      <Divider />
                      <UncontrolledCollapse
                        className="with-shadow"
                        toggler={`#toggler${index}`}
                      >
                        {item.image !== undefined && (
                          <div style={{ padding: 10 }}>
                            <img
                              src={item.image}
                              style={{ height: "auto", width: 100 }}
                            />
                          </div>
                        )}
                        <div>
                          <h5>Description :</h5>
                          <p style={{ marginLeft: "10px" }}>
                            {item.Description}
                          </p>
                        </div>
                        <Row style={{ marginTop: 5 }}>
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
                        <Row>
                          <Col sm={6} md={4} xl={4}>
                            {item.TaskPurpose}
                          </Col>
                          <Col sm={6} md={4} xl={4}>
                            {item.recurringTask ? "Yes" : "No"}
                          </Col>
                          <Col sm={6} md={4} xl={4}>
                            {item.isTaskNote ? "Yes" : "No"}
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
                                color="primary"
                                onClick={() => {
                                  setCompletionModal(true);
                                  setTaskDetail(item);
                                }}
                              >
                                Mark as Complete
                              </Button>

                              <Button
                                color="primary"
                                onClick={() => {
                                  setTaskDetail(item);
                                  setUpdateDialogOpen(true);
                                }}
                              >
                                Edit
                              </Button>

                              <Button
                                color="secondary"
                                onClick={() => {
                                  setDelId(item.id);
                                  setOpen(true);
                                  setTaskTitle(item.title);
                                }}
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
                <h3>No Found any Employee Task</h3>
              </div>
            )}
          </CardBody>
        )}
      </Card>

      {/* Delete Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <span style={{ color: "black" }}>
            Do you want to delete this task?
          </span>
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
              onClick={handleDeleteTask}
              variant="contained"
              color="secondary"
              autoFocus
            >
              Agree
            </Button>
          )}
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
          <UpdateForm handleClose={handleUpdateDialogClose} item={taskDetail} />
        </DialogContent>
      </Dialog>

      {/* Completing Dialog */}

      <Dialog
        open={completionModal}
        onClose={handleCompleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
        maxWidth={"sm"}
      >
        <DialogTitle id="alert-dialog-title">
          <span style={{ color: "black" }}>Description / Add note </span>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <textarea
              rows="5"
              placeholder="Task Completion Note"
              name="completionNote"
              onChange={onChangeHandler}
              className="completionBox"
            />
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

          {completeLoader ? (
            <Button disabled variant="contained" color="secondary" autoFocus>
              <PulseLoader color={"#123abc"} size={10} />
            </Button>
          ) : (
            <Button
              onClick={completeTask}
              variant="contained"
              color="primary"
              autoFocus
            >
              Complete
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Col>
  );
}

export default reduxForm({
  form: "ee_task_detail", // a unique identifier for this form
})(EmployeeTasks);
