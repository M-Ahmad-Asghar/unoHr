import React, { Component } from "react";
import { Card, CardBody, Col, Button, ButtonToolbar } from "reactstrap";
import { Field, reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { translate } from "react-i18next";
import PropTypes from "prop-types";
import renderSelectField from "../../../../shared/components/form/Select";
import renderDatePickerField from "../../../../shared/components/form/DatePicker";
import CalendarBlankIcon from "mdi-react/CalendarBlankIcon";

import moment from "moment";
import { updateTask } from "../../../../redux/actions/TasksActions";

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
      PostedTime: ""
    };
  }

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
  setDate = newDate => {
    this.setState({ DueTime: newDate });
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
      AllotedTo: data.AllotedTo,
      DueTime: data.DueTime,
      uid: data.uid,
      TaskPurpose: data.TaskPurpose,
      PostedTime: data.PostedTime
    });
  }

  //   componentWillReceiveProps = nextProps => {
  //     console.log("emp", this.props.employees);
  //     this.setState({ employees: this.props.nextProps });
  //   };

  onChangeHandler = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  AddTask = e => {
    e.preventDefault();

    if (this.state.title == "" && this.state.Description == "") {
      console.log("Type the title of the task and description");
    } else if (this.state.AllotedTo == "") {
      this.setState({
        AllotedTo: "not yet alloted"
      });
    } else {
      let data = {
        id: this.state.id,
        title: this.state.title,
        Description: this.state.Description,
        AllotedTo: this.state.AllotedTo,
        DueTime: this.state.DueTime.toString(),
        PostedTime: this.state.PostedTime,
        TaskPurpose: this.state.TaskPurpose,
        uid: this.state.uid
      };

      // console.log("====================================");
      // console.log(data);
      // console.log("====================================");
      this.props.updateTask(data);

      console.log("Task updated successfully");
    }
    this.props.history.push("/employeer/employeeTask");
  };

  render() {
    const { handleSubmit, reset, t } = this.props;
    const { employees, title, Description, AllotedTo, DueTime } = this.state;

    return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody>
            <form className="form form--horizontal" onSubmit={this.AddTask}>
              <div className="form__form-group">
                <span className="form__form-group-label">Title</span>
                <div className="form__form-group-field">
                  <input
                    name="title"
                    type="text"
                    placeholder="Enter The Title "
                    value={title}
                    onChange={this.onChangeHandler}
                    style={{ color: "black" }}
                  />
                  {/* <Field
                    name="title"
                    component="input"
                    type="text"
                    placeholder="Enter The Title "
                    value={title}
                    onChange={this.onChangeHandler}
                  /> */}
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">Description</span>
                <div className="form__form-group-field">
                  <input
                    name="Description"
                    // component="input"
                    type="text"
                    value={Description}
                    placeholder="Enter the detail"
                    onChange={this.onChangeHandler}
                    style={{ color: "black" }}
                  />
                  {/* <Field
                    name="Description"
                    component="input"
                    type="text"
                    value={Description}
                    placeholder="Enter the detail"
                    onChange={this.onChangeHandler}
                  /> */}
                </div>
              </div>

              <div className="form__form-group">
                <span className="form__form-group-label">Task Alloted To </span>
                <div className="form__form-group-field">
                  <Field
                    name="AllotedTo"
                    component={renderSelectField}
                    type="text"
                    placeholder={AllotedTo}
                    onChange={this.onValueChange.bind(this)}
                    options={[
                      { value: "Arslan", label: "Arslan" },
                      { value: "Asif", label: "Asif" },
                      { value: "Ali", label: "Ali" }
                    ]}
                  />
                </div>
              </div>

              <div className="form__form-group">
                <span className="form__form-group-label">Due Date</span>
                <div className="form__form-group-field">
                  <Field
                    name="default_date"
                    component={renderDatePickerField}
                    selected={DueTime}
                    minimumDate={new Date(2018, 1, 1)}
                    maximumDate={new Date(2050, 12, 31)}
                    dateFormat="en"
                    onChange={this.onDateChange}
                    value={moment(DueTime).format("MMM/DD/YYYY")}
                  />
                  <div className="form__form-group-icon">
                    <CalendarBlankIcon />
                  </div>
                </div>
              </div>

              <ButtonToolbar className="form__button-toolbar">
                <Button color="success" type="submit">
                  Update
                </Button>
                <Button type="button" onClick={reset}>
                  Reset
                </Button>
              </ButtonToolbar>
            </form>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

export default reduxForm({
  form: "horizontal_form" // a unique identifier for this form
})(
  translate("common")(
    connect(
      null,
      { updateTask }
    )(withRouter(UpdateForm))
  )
);
