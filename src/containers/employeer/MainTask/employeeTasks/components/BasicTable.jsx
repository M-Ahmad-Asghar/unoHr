import React, { useEffect } from "react";
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
import { useObjectState } from "../../../../../utils/commonState";
import { useDispatch, useSelector } from "react-redux";

// import Collapse from "../../../../../shared/components/Collapse";

import {
  deleteTask,
  getTask,
  completedTask,
} from "../../../../../redux/actions/TasksActions";
import { getEmployees } from "../../../../../redux/actions/employerActions";

import UpdateForm from "../../employeeTasks/UpdateTask";

function EmployeeTasks(props) {
  const [state, setState] = useObjectState({
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
    loader: true,
    PostedTime: "",
    TaskPurpose: "",
    taskCompleted: "",
    id: "",
    uid: "",
    SelectForAllot: "",
    collapse: false,
    deleteLoader: false,
    completeLoader: false,
  });
  const mapStateToProps = (state) => ({
    items: state.TaskReducer.AllTask,
    user: state.userReducer.user,
    loader: state.TaskReducer.loader,
    taskDeleteStatus: state.TaskReducer.taskDeleteStatus,
    loading: state.TaskReducer.loading,
    completionStatus: state.TaskReducer.completionStatus,
  });
  const {
    items,
    user,
    loader: sLoader,
    taskDeleteStatus,
    loading,
    completionStatus,
  } = useSelector(mapStateToProps);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTask(user.uid));
  }, []);

  const onChangeHandler = (e) => {
    setState({ completionNote: e.target.value });
  };

  const CompleteTask = () => {
    // setState({ completionModal: false });

    if (state.completionNote !== "") {
      setState({
        completeLoader: true,
      });
      let data = {
        id: state.taskDetail.id,
        title: state.taskDetail.title,
        Description: state.taskDetail.Description,
        AllotedTo: state.taskDetail.AllotedTo,
        DueTime: "Completed",
        completionNote: state.completionNote,
        PostedTime: state.taskDetail.PostedTime,
        taskCompleted: new Date().toString(),
        TaskPurpose: state.taskDetail.TaskPurpose,
        uid: state.taskDetail.uid,
      };
      dispatch(completedTask(data));
      // toast.success("Task completed successfully");
      // console.log("Task completed successfully");
      // setState({ completionNote: "" });
    } else {
      toast.error("Failed to complete this task, please write description");
    }
  };

  const handleModelState = () => {
    setState({ completionModal: false });
  };

  useEffect(() => {
    if (sLoader == "false") {
      setState({
        loader: false,
      });
    }
    if (taskDeleteStatus === "done") {
      console.log("taskDeleteStatus", taskDeleteStatus);
      setState({
        deleteLoader: false,
        open: false,
      });
    } else if (taskDeleteStatus == "error") {
      setState({
        deleteLoader: false,
        open: false,
      });
    }
    if (completionStatus == "done") {
      setState({
        completeLoader: false,
        completionModal: false,
      });
    } else if (completionStatus == "error") {
      setState({
        completeLoader: false,
      });
    }
  }, [sLoader, taskDeleteStatus, completionStatus]);

  const removeTask = () => {
    // setState({ deleteLoader: true });
    // console.log("check del id:", state.delId);
    dispatch(deleteTask(state.delId));
    setState({
      deleteLoader: false,
      open: false,
    });

    // toast.success("Own Task Delete Successfully!");
  };

  const handleClickOpen = () => {
    setState({ open: true });
  };

  const handleClose = () => {
    setState({ open: false, deleteLoader: false });
  };

  const handleUpdateDialogOpen = (data) => {
    setState({ updateDialogOpen: true });
  };

  const handleUpdateDialogClose = () => {
    setState({ updateDialogOpen: false });
  };

  const searchingForName = (searchQuery) => {
    return function(employeeTask) {
      console.log("e", employeeTask);
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
    setState({ completionModal: false });
  };

  const { searchQuery } = props;
  const { loader, deleteLoader, completeLoader } = state;

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
                        {moment(item.DueTime.toDate() || "").format(
                          "MMM/DD/YYYY"
                        )}
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
                                onClick={() =>
                                  setState({
                                    completionModal: true,
                                    taskDetail: item,
                                  })
                                }
                              >
                                Mark as Complete
                              </Button>

                              <Button
                                color="primary"
                                onClick={() =>
                                  setState({
                                    taskDetail: item,
                                    updateDialogOpen: true,
                                  })
                                }
                              >
                                Edit
                              </Button>

                              <Button
                                color="secondary"
                                onClick={() =>
                                  setState({
                                    delId: item.id,
                                    open: true,
                                    taskTitle: item.title,
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
                <h3>No Found any Employee Task</h3>
              </div>
            )}
          </CardBody>
        )}
      </Card>

      {/* Delete Dialog */}
      <Dialog
        open={state.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle style={{ color: "black" }} id="alert-dialog-title">
          <span style={{ color: "black" }}>
            Do you want to delete this task?
          </span>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <strong>Task Name: </strong>
            <span>{state.taskTitle}</span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="default">
            Cancel
          </Button>
          {deleteLoader ? (
            <Button disabled variant="contained" color="secondary" autoFocus>
              <PulseLoader color={"#123abc"} size={10} />
            </Button>
          ) : (
            <Button
              onClick={removeTask}
              variant="contained"
              color="secondary"
              autoFocus
            >
              Delete
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Update Dialog */}
      <Dialog
        open={state.updateDialogOpen}
        onClose={handleUpdateDialogClose}
        scroll={state.scroll}
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
          <UpdateForm
            handleClose={handleUpdateDialogClose}
            item={state.taskDetail}
          />
        </DialogContent>
      </Dialog>

      {/* Completing Dialog */}

      <Dialog
        open={state.completionModal}
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
              onClick={CompleteTask}
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
