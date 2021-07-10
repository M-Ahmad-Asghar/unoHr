import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Col,
  Badge,
  Table,
  CardHeader,
  Row,
  UncontrolledCollapse,
  ButtonToolbar,
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
  completedTask,
} from "../../../../../redux/actions/TasksActions";
import { getTask } from "../../../../../redux/actions/EmployeeTaskActions";
import {
  getEmployeStatus,
  getWeekStatus,
} from "../../../../../redux/actions/attendanceAction";
import UpdateForm from "../../employeeTasks/UpdateTask";

import { useDispatch, useSelector } from "react-redux";

function EmployeeTasks({ searchQuery }) {
  const [completed, setCompleted] = useState(false);
  const [delId, setDelId] = useState("false");
  const [open, setOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [scroll, setScroll] = useState("body");
  const [taskDetail, setTaskDetail] = useState({});
  const [Tasks, setTasks] = useState([]);
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

  const items = useSelector((state) => state.employeeTaskReducer.AllTask);
  const user = useSelector((state) => state.employeeUserReducer.currentEmp);
  const stateLoader = useSelector((state) => state.employeeTaskReducer.loader);

  useEffect(() => {
    dispatch(getEmployeStatus(user.employeeid, user.timeMode));
    dispatch(getWeekStatus(user.employeeid));
    dispatch(getTask(user.employeruid, user.employeeid));
  }, []);

  useEffect(() => {
    console.log("STATELOADER:", stateLoader);
    setLoader(false);
    if (stateLoader === "false") {
      setTasks(items);
    }
  }, [stateLoader]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setCompletionNote(value);
  };

  const CompleteTask = () => {
    setCompletionModal(false);

    if (completionNote !== "") {
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
      setCompletionNote("");
    } else {
      toast.error("Failed to complete this task, please write description");
    }
  };

  const deleteTask = () => {
    setOpen(false);
    dispatch(deleteTask(delId));
    toast.success("Own Task Delete Successfully!");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(False);
  };

  const handleUpdateDialogOpen = (data) => {
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

  const searchingForName = (searchQuery) => {
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
                  <Row className="taskRow" key={index} id={`toggler${index}`}>
                    <Col className="taskCol" xs={4} sm={4} md={4} lg={4} xl={4}>
                      <p>{item.title}</p>
                    </Col>
                    <Col className="taskCol" xs={4} sm={4} md={4} lg={4} xl={4}>
                      <p>{moment(item.DueTime).format("MMM/DD/YYYY")}</p>
                    </Col>

                    <Col className="taskCol" xs={4} sm={4} md={4} lg={4} xl={4}>
                      <p> {moment(item.PostedTime).format("MMM/DD/YYYY")}</p>
                    </Col>

                    <Col sm={12} md={12} lg={12} xl={12}>
                      <Divider />
                      <UncontrolledCollapse
                        className="with-shadow"
                        toggler={`#toggler${index}`}
                      >
                        <div>
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
                              {item.recurringTask ? "True" : "False"}
                            </Col>
                            <Col sm={6} md={4} xl={4}>
                              {item.isTaskNote ? "True" : "False"}
                            </Col>
                          </Row>
                        </div>

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
                                // disabled={checkIn}
                                color="primary"
                                onClick={() => {
                                  setCompletionModal(true);
                                  setTaskDetail(item);
                                }}
                              >
                                Mark as Complete
                              </Button>

                              {/* <Button
                                  disabled={checkIn}
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
              })
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
            Cencel
          </Button>
          <Button
            onClick={CompleteTask}
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

export default reduxForm({
  form: "ee_task_detail", // a unique identifier for this form
})(EmployeeTasks);
