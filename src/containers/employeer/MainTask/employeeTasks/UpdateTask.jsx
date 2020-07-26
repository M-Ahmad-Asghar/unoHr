import React, { Component } from "react";
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
  DatePicker
} from "material-ui-pickers";
import { toast } from "react-toastify";
import { FastForwardIcon } from "mdi-react";
class UpdateForm extends Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = {
      employees: [],

      id: "",
      title: "",
      Description: "",
      AllotedTo: "",
      DueTime: "",
      uid: "",
      TaskPurpose: "",
      PostedTime: "",
      updateLoader: false
    };
  }
  handleChange = event => {
    this.setState({ AllotedTo: event.target.value });
  };

  onValueChange(obj) {
    // console.log('alloted task obj is: ', obj)
    this.setState({
      AllotedTo: obj.value
    });
  }
  TaskPurposeHandler(obj) {
    this.setState({
      TaskPurpose: obj.value
    });
  }

  AddTask = e => {
    e.preventDefault();
    if (this.state.title == "" && this.state.Description == "") {
      toast.error("Type the title of the task and description");
    } else {
      this.setState({
        updateLoader: true
      });
      let fields = this.state.AllotedTo.split(",");
      let data = {
        id: this.state.id,
        title: this.state.title,
        Description: this.state.Description,
        AllotedTo: fields[0],
        DueTime: this.state.DueTime.toString(),
        PostedTime: this.state.PostedTime,
        TaskPurpose: this.state.TaskPurpose,
        uid: this.state.uid,
        employeeid: fields[1]
      };
      console.log("===========data=========================");
      console.log(data);
      console.log("====================================");
      this.props.updateTask(data);
    }
  };
  handleDateChange = date => {
    this.setState({ DueTime: date });
  };
  componentDidMount() {
    let data = this.props.item;
    console.log("=============from update did mount========");
    console.log(data);
    console.log("====================================");
    this.setState({
      id: data.id,
      title: data.title,
      Description: data.Description,
      AllotedTo: data.AllotedTo + "," + data.employeeid,
      DueTime: data.DueTime,
      uid: data.uid,
      TaskPurpose: data.TaskPurpose,
      PostedTime: data.PostedTime
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.updateTaskStatus == "done") {
      this.setState({
        updateLoader: false
      });
      // this.props.handleClose();
      // this.props.history.push("/home/employeer/employeeTask");
    } else if (nextProps.updateTaskStatus == "error") {
      this.setState({
        updateLoader: false
      });
    }
  }

  onChangeHandler = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { employees } = this.props;
    const { title, Description, AllotedTo, DueTime, updateLoader } = this.state;
    console.log("====================================", title);
    console.log(Description);
    console.log("====================================", AllotedTo);
    return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody>
            <form className="form form--horizontal" onSubmit={this.AddTask}>
              <div className="form__form-group">
                <span className="form__form-group-label">Title</span>
                <div className="form__form-group-field selectEmply">
                  <TextField
                    name="title"
                    type="text"
                    value={this.state.title}
                    placeholder="Enter The Title"
                    onChange={this.onChangeHandler}
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
                    onChange={this.onChangeHandler}
                  />
                </div>
              </div>

              <div className="form__form-group">
                <span className="form__form-group-label">Task Alloted To </span>
                <div className="form__form-group-field selectEmplyUpdate selectPurpose">
                  <Select
                    value={AllotedTo}
                    onChange={this.handleChange}
                    inputProps={{
                      name: "age",
                      id: "age-simple"
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
                      value={DueTime}
                      onChange={this.handleDateChange}
                      formatDate={date => moment(date).format("DD-MM-YYYY")}
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
}
const mapStateToProps = state => ({
  user: state.userReducer.user,
  employees: state.employerReducer.employees,
  taskAddStatus: state.TaskReducer.taskAddStatus,
  loading: state.TaskReducer.loading,
  updateTaskStatus: state.TaskReducer.updateTaskStatus
});

export default connect(
  mapStateToProps,
  { updateTask }
)(withRouter(UpdateForm));
