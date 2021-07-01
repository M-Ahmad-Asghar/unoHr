import React, { useState, useEffect } from "react";
import { Card, CardBody, Col, Button, ButtonToolbar } from "reactstrap";
import { Field, reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import {
  addTask,
  addOwnTask,
  addEmpTask,
} from "../../../../../redux/actions/TasksActions";
import { PulseLoader } from "react-spinners";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import DateFnsUtils from "@date-io/date-fns";
import { Input, Switch, FormControlLabel } from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker,
} from "material-ui-pickers";
import moment from "moment";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Zoom from "@material-ui/core/Zoom";
import HelpIcon from "../../../../../assets/help.png";
import "../styles/style.css";
import { storage } from "../../../../../boot/firebase";
import {useDispatch,useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'

const styles = (theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    margin: theme.spacing.unit,
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

function AddForm ()  {
  const  propTypes = {
    t: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
  };
  const [title, setTitle] = useState("")
  const [Description, setDescription] = useState("")
  const [AllotedTo, setAllotedTo] = useState("")
  const [TaskPurpose, setTaskPurpose] = useState("My Own")
  const [taskState, setTaskState] = useState("normal")
  const [DueTime, setDueTime] = useState(new Date())

  const [loader, setLoader] = useState(false)
  const [recurringTask, setRecurringTask] = useState(false)
  const [isTaskNote, setIsTaskNote] = useState(false)
  const [image, setimage] = useState('')

const dispatch = useDispatch()
const history = useHistory()


  const stateUser = useSelector(state=>state.userReducer.user)
  const employees = useSelector(state=>state.employerReducer.employees)
  const stateTaskAddStatus = useSelector(state=>state.TaskReducer.taskAddStatus)
  const stateLoading = useSelector(state=>state.TaskReducer.loading)


 const handleChange = (e) => {
    setAllotedTo(e.target.value)

  };

 const TaskPurposeHandler =(e) => {
    setTaskPurpose(e.target.value)

  }
  const TaskStateHandler =(e)=> {
    setTaskState(e.target.value)
  
  }





useEffect(()=>{
  if (stateTaskAddStatus == "done") {
    toast.success("Task add successfully");
    history.push("/home/employeer/employeeTask");
   setLoader(true)
  } else if (stateTaskAddStatus == "done own") {
    toast.success("Task add successfully");

  history.push("/home/employeer/ownTask");
setLoader(false)
  }
},[stateTaskAddStatus])



 const onChangeHandler = (e) => {
   const {name, value} =  e.target
    e.preventDefault();
    
  if(name == "title"){
    setTitle(value)
  }
  if(name == "Description"){
    setDescription(value)
  }
  };
  const handleSwitch = (e) => {
    const { name, checked } = e.target;
console.log(toNamespacedPath)
  };

  const handleDateChange = (date) => {
   setDueTime(date)
  };

  // Image select
 const  imageSelect = (e) => {
    let fullPath = e.target.files[0];

    if (fullPath != null) {
      const type = fullPath.type;
      const ext = type.split("/");
      if (ext[0] == "image") {
        setImage(fullPath)
      } else {
        toast.error("Select only images");
      }
    }
  };

 const  addNewTask = (e) => {
    e.preventDefault();

    if (title == "" || Description == "") {
      toast.error("Type the title of the task and description");
    } else if (
      TaskPurpose == "Employee" &&
      AllotedTo == ""
    ) {
      toast.error("Allote this task to someone or change to my own task");
    } else {
     setLoader(true)
      if (TaskPurpose == "Employee") {
       addEmpolyeeTask();
      } else {
        let date = {
          title: title,
          Description: Description,
          AllotedTo: "My Own",
          DueTime: DueTime.toString(),
          PostedTime: new Date().toString(),
          TaskPurpose: TaskPurpose,
          taskState: taskState,
          uid: stateUser.uid,
          isTaskNote: isTaskNote,
          recurringTask: recurringTask,
        };
        dispatch(addOwnTask(date))
      }
    }
  };
 const  addEmpolyeeTask = async () => {
   // let { AllotedTo, employees, recurringTask, image } = this.state;
    let empObj = {};
    // ////////////////////////////////////////
    if (AllotedTo === "Common") {
      let employeeContacts = [];
      employees.forEach((item) => {
        employeeContacts.push(item.cell);
      });
      empObj = {
        cell: employeeContacts,
        AllotedTo: AllotedTo,
      };
    } else {
      let fields = AllotedTo.split(",");

      empObj = {
        AllotedTo: fields[0],
        employeeid: fields[1],
        cell: fields[2],
      };
    }
    if (recurringTask) {
      toast.error("Recurring Task");
    }
     else {
      if (image === "") {
        let data = {
          title: title,
          Description: Description,
          DueTime: DueTime.toString(),
          PostedTime: new Date().toString(),
          TaskPurpose: TaskPurpose,
          taskState: taskState,
          uid: stateUser.uid,
          isTaskNote: isTaskNote,
          recurringTask: recurringTask,
          ...empObj,
        };
        dispatch(addEmpTask(data))
      } else {
        const imagePath = `taskImages/${stateUser.uid}/${image.name}`;
        await storage.ref(imagePath).put(image);
        const url = await storage.ref(imagePath).getDownloadURL();

        let data = {
          title: title,
          Description: Description,
          DueTime: DueTime.toString(),
          PostedTime: new Date().toString(),
          TaskPurpose: TaskPurpose,
          taskState: taskState,
          uid: stateUser.uid,
          isTaskNote: isTaskNote,
          recurringTask: recurringTask,
          image: url,
          ...empObj,
        };
        dispatch(addEmpTask(data))
      }
    }
  };


    return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody>
            <form className="form form--horizontal" onSubmit={addNewTask}>
              <div className="form__form-group">
                <span className="form__form-group-label">Title</span>
                <div className="form__form-group-field selectEmply">
                  <TextField
                    name="title"
                    type="text"
                    placeholder="Enter The Title "
                    onChange={onChangeHandler}
                  />
                  <Tooltip
                    TransitionComponent={Zoom}
                    title="Enter the task title"
                  >
                    <IconButton className="helpButton">
                      <img className="helpImage" src={HelpIcon} alt="help" />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">Description</span>
                <div className="form__form-group-field selectEmply">
                  <TextField
                    name="Description"
                    type="text"
                    placeholder="Enter the detail"
                    onChange={onChangeHandler}
                  />
                  <Tooltip
                    TransitionComponent={Zoom}
                    title="Enter the task description"
                  >
                    <IconButton className="helpButton">
                      <img className="helpImage" src={HelpIcon} alt="help" />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>

              {/* task for */}
              <div className="form__form-group">
                <span className="form__form-group-label">Task For </span>
                <div className="form__form-group-field selectEmply selectPurpose">
                  <Select
                    value={TaskPurpose}
                    onChange={TaskPurposeHandler}
                    inputProps={{
                      name: "age",
                      id: "age-simple",
                      // className: "selectInput"
                    }}
                  >
                    <MenuItem value="Employee">Employee</MenuItem>
                    <MenuItem value="My Own">My Own</MenuItem>
                  </Select>
                  <Tooltip
                    TransitionComponent={Zoom}
                    title="Select the person to asign the task"
                  >
                    <IconButton className="helpButton">
                      <img className="helpImage" src={HelpIcon} alt="help" />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
              {/* end task for div */}

              {TaskPurpose == "Employee" ? (
                <div className="form__form-group">
                  <span className="form__form-group-label">
                    Task Alloted To{" "}
                  </span>
                  <div className="form__form-group-field selectEmply selectPurpose">
                    <Select
                      value={AllotedTo}
                      onChange={handleChange}
                      inputProps={{
                        name: "age",
                        id: "age-simple",
                      }}
                    >
                      {employees.length > 0 ? (
                        employees.map((emply, index) => {
                          return (
                            <MenuItem
                              key={index}
                              value={
                                emply.name +
                                "," +
                                emply.employeeid +
                                "," +
                                emply.cell
                              }
                            >
                              {emply.name}
                            </MenuItem>
                          );
                        })
                      ) : (
                        <MenuItem value="">no employee</MenuItem>
                      )}
                    </Select>
                  </div>
                </div>
              ) : (
                <div />
              )}

              <div className="form__form-group">
                <span className="form__form-group-label">Task State</span>
                <div className="form__form-group-field selectEmply selectPurpose">
                  <Select
                    value={taskState}
                    onChange={TaskStateHandler}
                    inputProps={{
                      name: "age",
                      id: "age-simple",
                      // className: "selectInput"
                    }}
                  >
                    <MenuItem value="normal">Normal</MenuItem>
                    <MenuItem value="major">Major</MenuItem>
                    <MenuItem value="critical">Critical</MenuItem>
                  </Select>
                  <Tooltip TransitionComponent={Zoom} title="Select task state">
                    <IconButton className="helpButton">
                      <img className="helpImage" src={HelpIcon} alt="help" />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>

              <div className="form__form-group">
                <span className="form__form-group-label">Due Date</span>
                <div className="form__form-group-field selectEmply">
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                      margin="normal"
                      value={DueTime}
                      onChange={handleDateChange}
                      formatDate={(date) => moment(date).format("DD-MM-YYYY")}
                    />
                  </MuiPickersUtilsProvider>
                  <Tooltip
                    TransitionComponent={Zoom}
                    title="Select due date for task"
                  >
                    <IconButton className="helpButton">
                      <img className="helpImage" src={HelpIcon} alt="help" />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
              {TaskPurpose !== "My Own" && (
                <>
                  <div className="form__form-group">
                    <span className="form__form-group-label">Image</span>
                    <div className="form__form-group-field selectEmply">
                      <input
                        name="title"
                        type="file"
                        accept="image/*"
                        onChange={imageSelect}
                      />
                      <Tooltip TransitionComponent={Zoom} title="Upload Image">
                        <IconButton className="helpButton">
                          <img
                            className="helpImage"
                            src={HelpIcon}
                            alt="help"
                          />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </div>
                </>
              )}
              <div className="form__form-group">
                {/*
                <FormControlLabel
                label="Task Never End"
                control={
                  <Switch
                  checked={recurringTask}
                  onChange={this.handleSwitch}
                  name="recurringTask"
                  color="primary"
                  />
                }
                />
              */}
                <FormControlLabel
                  label="Task Completion Note"
                  control={
                    <Switch
                      checked={isTaskNote}
                      onChange={handleSwitch}
                      name="isTaskNote"
                      color="primary"
                    />
                  }
                />
              </div>
              <ButtonToolbar className="form__button-toolbar">
                {loader ? (
                  <Button color="success" disabled>
                    <PulseLoader color={"#123abc"} size={12} />
                  </Button>
                ) : (
                  <Button color="success" type="submit">
                    Create
                  </Button>
                )}
              </ButtonToolbar>
            </form>
          </CardBody>
        </Card>
      </Col>
    );
  
}

AddForm.propTypes = {
  classes: PropTypes.object.isRequired,
};



export default (withRouter(withStyles(styles)(AddForm)));
