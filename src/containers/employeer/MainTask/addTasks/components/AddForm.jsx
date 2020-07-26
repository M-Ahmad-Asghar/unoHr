import React, { Component } from "react";
import { Card, CardBody, Col, Button, ButtonToolbar } from "reactstrap";
import { Field, reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { addTask, addOwnTask } from "../../../../../redux/actions/TasksActions";
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
import moment from "moment";
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Zoom from '@material-ui/core/Zoom';
import HelpIcon from "../../../../../assets/help.png";
import "../styles/style.css";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit,
    width: "100%"
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
});

class AddForm extends Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = {
      title: "",
      Description: "",
      AllotedTo: "",
      TaskPurpose: "My Own",
      DueTime: new Date(),
      employees: [],
      loader: false
    };
  }

  handleChange = event => {
    this.setState({ AllotedTo: event.target.value });
  };

  TaskPurposeHandler(event) {
    this.setState({
      TaskPurpose: event.target.value
    });
  }

  componentDidMount() {
    let empolyeesList = this.props.employees;

    this.setState({ employees: empolyeesList });
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.taskAddStatus == "done") {
      toast.success("Task add successfully");
      this.props.history.push("/home/employeer/employeeTask");
      this.setState({
        loader: false
      });
    } else if (nextProps.taskAddStatus == "done own") {
      toast.success("Task add successfully");

      this.props.history.push("/home/employeer/ownTask");
      this.setState({
        loader: false
      });
    }
  };

  onChangeHandler = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleDateChange = date => {
    this.setState({ DueTime: date });
  };

  addNewTask = e => {
    e.preventDefault();

    if (this.state.title == "" || this.state.Description == "") {
      toast.error("Type the title of the task and description");
    } else if (
      this.state.TaskPurpose == "Employee" &&
      this.state.AllotedTo == ""
    ) {
      toast.error("Allote this task to someone or change to my own task");
    } else {
      this.setState({
        loader: true
      });
      if (this.state.TaskPurpose == "Employee") {
        let fields = this.state.AllotedTo.split(",");

        let data = {
          title: this.state.title,
          Description: this.state.Description,
          AllotedTo: fields[0],
          DueTime: this.state.DueTime.toString(),
          PostedTime: new Date().toString(),
          TaskPurpose: this.state.TaskPurpose,
          uid: this.props.user.uid,
          employeeid: fields[1]
        };

        this.props.addTask(data);
      } else {
        let date = {
          title: this.state.title,
          Description: this.state.Description,
          AllotedTo: "My Own",
          DueTime: this.state.DueTime.toString(),
          PostedTime: new Date().toString(),
          TaskPurpose: this.state.TaskPurpose,
          uid: this.props.user.uid
        };
        this.props.addOwnTask(date);
     
      }
    }
  };

  render() {
    const { handleSubmit, reset, t, classes } = this.props;
    const { employees, loader, DueTime } = this.state;

    return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody>
            <form className="form form--horizontal" onSubmit={this.addNewTask}>
              <div className="form__form-group">
                <span className="form__form-group-label">Title</span>
                <div className="form__form-group-field selectEmply">
                  <TextField
                    name="title"
                    type="text"
                    placeholder="Enter The Title "
                    onChange={this.onChangeHandler}
                  />
                  <Tooltip TransitionComponent={Zoom} title="Enter the task title">
                    <IconButton className="helpButton">
                      <img className="helpImage" src={HelpIcon} alt="help"/>
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
                    onChange={this.onChangeHandler}
                  />
                  <Tooltip TransitionComponent={Zoom} title="Enter the task description">
                    <IconButton className="helpButton">
                      <img className="helpImage" src={HelpIcon} alt="help"/>
                    </IconButton>
                  </Tooltip>
                </div>
              </div>

              {/* task for */}
              <div className="form__form-group">
                <span className="form__form-group-label">Task For </span>
                <div className="form__form-group-field selectEmply selectPurpose">
                  <Select
                    value={this.state.TaskPurpose}
                    onChange={this.TaskPurposeHandler.bind(this)}
                    inputProps={{
                      name: "age",
                      id: "age-simple"
                      // className: "selectInput"
                    }}
                  >
                    <MenuItem value="Employee">Employee</MenuItem>
                    <MenuItem value="My Own">My Own</MenuItem>
                  </Select>
                  <Tooltip TransitionComponent={Zoom} title="Select the person to asign the task">
                    <IconButton className="helpButton">
                      <img className="helpImage" src={HelpIcon} alt="help"/>
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
              {/* end task for div */}

              {this.state.TaskPurpose == "Employee" ? (
                <div className="form__form-group">
                  <span className="form__form-group-label">
                    Task Alloted To{" "}
                  </span>
                  <div className="form__form-group-field selectEmply selectPurpose">
                    <Select
                      value={this.state.AllotedTo}
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
              ) : (
                <div />
              )}

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
                  <Tooltip TransitionComponent={Zoom} title="Select due date for task">
                    <IconButton className="helpButton">
                      <img className="helpImage" src={HelpIcon} alt="help"/>
                    </IconButton>
                  </Tooltip>
                </div>
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
}

AddForm.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.userReducer.user,
  employees: state.employerReducer.employees,
  taskAddStatus: state.TaskReducer.taskAddStatus,
  loading: state.TaskReducer.loading
});

export default connect(
  mapStateToProps,
  { addTask, addOwnTask }
)(withRouter(withStyles(styles)(AddForm)));
