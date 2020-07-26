import React, { Component } from "react";
import { Card, CardBody, Col, Button, ButtonToolbar } from "reactstrap";
import { Field, reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { translate } from "react-i18next";
import PropTypes from "prop-types";
import { ScaleLoader } from "react-spinners";
import renderSelectField from "../../../../../shared/components/form/Select";
import renderDatePickerField from "../../../../../shared/components/form/DatePicker";
import CalendarBlankIcon from "mdi-react/CalendarBlankIcon";
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Zoom from '@material-ui/core/Zoom';
import HelpIcon from "../../../../../assets/help.png";
import "../styles/style.css";

import { addEmpOwnTask } from "../../../../../redux/actions/EmployeeTaskActions";

import { ConsoleLineIcon } from "mdi-react";
import { toast } from "react-toastify";

class AddForm extends Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = {
      loader: false,
      title: "",
      Description: "",
      AllotedTo: "",
      DueTime: new Date(),
      employees: []
    };
  }

  onChangeHandler = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  setDate = newDate => {
    this.setState({ DueTime: newDate });
  };

  AddTask = e => {
    e.preventDefault();

    if (this.state.title == "" && this.state.Description == "") {
      toast.error("Type the title of the task and description");
    } else {
      let date = {
        title: this.state.title,
        Description: this.state.Description,
        AllotedTo: this.state.AllotedTo,
        DueTime: this.state.DueTime.toString(),
        PostedTime: new Date().toString(),
        employeeid: this.props.user.employeeid
      };
      this.props.addEmpOwnTask(date);
      toast.success('Own task Added Successfully!');
      this.props.history.push('/home/employee/owntask')
    }
  };

  render() {
    return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody>
            <form className="form form--horizontal" onSubmit={this.AddTask}>
              <div className="form__form-group">
                <span className="form__form-group-label">Title</span>
                <div className="form__form-group-field">
                  <Field
                    name="title"
                    component="input"
                    type="text"
                    placeholder="Enter The Title "
                    onChange={this.onChangeHandler}
                  />
                  <Tooltip TransitionComponent={Zoom} title="Enter the title of task">
                    <IconButton className="helpButton">
                      <img className="helpImage" src={HelpIcon} alt="help"/>
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">Description</span>
                <div className="form__form-group-field">
                  <Field
                    name="Description"
                    component="input"
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

              <div className="form__form-group">
                <span className="form__form-group-label">Due Date</span>
                <div className="form__form-group-field">
                  <Field
                    name="default_date"
                    component={renderDatePickerField}
                    onChange={this.setDate}
                  />
                  <div className="form__form-group-icon">
                    <CalendarBlankIcon />
                  </div>
                  <Tooltip TransitionComponent={Zoom} title="Select due date for task">
                    <IconButton className="helpButton">
                      <img className="helpImage" src={HelpIcon} alt="help"/>
                    </IconButton>
                  </Tooltip>
                </div>
              </div>

              <ButtonToolbar className="form__button-toolbar">
                <Button color="success" type="submit">
                  Create
                  {/* <ScaleLoader
                            sizeUnit={"12px"}
                            size={100}
                            color={"#123abc"}
                            height="15"
                          /> */}
                </Button>
              </ButtonToolbar>
            </form>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

const mapStateToProps = state => ({
  user: state.employeeUserReducer.currentEmp
});

export default reduxForm({
  form: "horizontal_form" // a unique identifier for this form
})(
  translate("common")(
    connect(
      mapStateToProps,
      { addEmpOwnTask }
    )(withRouter(AddForm))
  )
);
