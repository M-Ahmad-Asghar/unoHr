import React, { useState, useEffect } from "react";
import { Card, CardBody, Col, Button, ButtonToolbar } from "reactstrap";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { translate } from "react-i18next";
import PropTypes from "prop-types";
import renderSelectField from "../../../../shared/components/form/Select";
import renderDatePickerField from "../../../../shared/components/form/DatePicker";
import CalendarBlankIcon from "mdi-react/CalendarBlankIcon";

import moment from "moment";
import { updateTask } from "../../../../redux/actions/TasksActions";

import { PulseLoader } from "react-spinners";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import DateFnsUtils from "@date-io/date-fns";

import {
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker,
} from "material-ui-pickers";
import { toast } from "react-toastify";
import { FastForwardIcon } from "mdi-react";
import { useSelector, useDispatch } from "react-redux";

function UpdateForm(props) {
  const dispatch = useDispatch();
  const propTypes = {
    t: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
  };
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [AllotedTo, setAllotedTo] = useState("");
  const [DueTime, setDueTime] = useState("");
  const [uid, setUid] = useState("");
  const [TaskPurpose, setTaskPurpose] = useState("");
  const [PostedTime, setPostedTime] = useState("");
  const [updateLoader, setUpdateLoader] = useState(false);
  const [taskState, setTaskState] = useEffect("normal");

  const user = useSelector((state) => state.userReducer.user);
  const employees = useSelector((state) => state.employerReducer.employees);
  const taskAddStatus = useSelector((state) => state.TaskReducer.taskAddStatus);
  const loading = useSelector((state) => state.TaskReducer.loading);
  const updateTaskStatus = useSelector(
    (state) => state.TaskReducer.updateTaskStatus
  );

  const handleChange = (event) => {
    setAllotedTo(event.target.value);
  };

  const onValueChange = (obj) => {
    setAllotedTo(obj.value);
  };
  const taskPurposeHandler = (obj) => {
    setTaskPurpose(obj.value);
  };

  const addTask = (e) => {
    e.preventDefault();
    if (title == "" && Description == "") {
      toast.error("Type the title of the task and description");
    } else {
      setUpdateLoader(true);

      let fields = AllotedTo.split(",");
      let data = {
        id: id,
        title: title,
        Description: Description,
        taskState: taskState,
        AllotedTo: fields[0],
        DueTime: DueTime,
        PostedTime: PostedTime,
        TaskPurpose: TaskPurpose,
        uid: uid,
        employeeid: fields[1],
      };

      dispatch(updateTask(data));
    }
  };
  const handleDateChange = (date) => {
    setDueTime(new Date(date));
  };
  function getDate(date) {
    let newData = date;
    try {
      newData = newData.toDate();
    } catch {}
    console.log("newData==", newData);
    return newData;
  }

  useEffect(() => {
    let data = props.item;
    setId(data.id);
    setTitle(data.title);
    setDescription(data.Description);
    setAllotedTo(data.AllotedTo + "," + data.employeeid);
    setDueTime(data.DueTime);
    setUid(data.uid);
    setTaskPurpose(data.TaskPurpose);
    setPostedTime(data.PostedTime);
    setTaskState(data.taskState);
  }, []);

  useEffect(() => {
    if (updateTaskStatus == "done") {
      setUpdateLoader(false);
    } else if (updateTaskStatus == "error") {
      setUpdateLoader(false);
    }
  }, [updateTaskStatus]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    if (name == "title") {
      setTitle(value);
    }
    if (name == "Description") {
      setDescription(value);
    }
  };

  return (
    <Col md={12} lg={12}>
      <Card>
        <CardBody>
          <form className="form form--horizontal" onSubmit={addTask}>
            <div className="form__form-group">
              <span className="form__form-group-label">Title </span>
              <div className="form__form-group-field selectEmply">
                <TextField
                  name="title"
                  type="text"
                  value={title}
                  placeholder="Enter The Title"
                  onChange={onChangeHandler}
                />
              </div>
            </div>
            <div className="form__form-group">
              <span className="form__form-group-label">Description</span>
              <div className="form__form-group-field selectEmply">
                <TextField
                  name="Description"
                  type="text"
                  value={Description}
                  placeholder="Enter the detail"
                  onChange={onChangeHandler}
                />
              </div>
            </div>

            <div className="form__form-group">
              <span className="form__form-group-label">Task Alloted To </span>
              <div className="form__form-group-field selectEmplyUpdate selectPurpose">
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
                          value={emply.name + "," + emply.employeeid}
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

            <div className="form__form-group">
              <span className="form__form-group-label">Due Date</span>
              <div className="form__form-group-field selectEmply">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DatePicker
                    margin="normal"
                    value={new Date()}
                    onChange={handleDateChange}
                    formatDate={(date) => moment(date).format("DD-MM-YYYY")}
                  />
                </MuiPickersUtilsProvider>
              </div>
            </div>

            <ButtonToolbar className="form__button-toolbar">
              {updateLoader ? (
                <Button color="success" disabled>
                  <PulseLoader color={"#123abc"} size={12} />
                </Button>
              ) : (
                <Button color="success" type="submit">
                  Update
                </Button>
              )}
            </ButtonToolbar>
          </form>
        </CardBody>
      </Card>
    </Col>
  );
}

export default withRouter(UpdateForm);
