import React, { useEffect, useState } from "react";
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
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Zoom from "@material-ui/core/Zoom";
import HelpIcon from "../../../../../assets/help.png";
import "../styles/style.css";
import { useHistory } from "react-router-dom";

import { addEmpOwnTask } from "../../../../../redux/actions/EmployeeTaskActions";

import { ConsoleLineIcon } from "mdi-react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

function AddForm() {
  const propTypes = {
    t: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
  };
  const [loader, setLoader] = useState(false);
  const [title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [AllotedTo, setAllotedTo] = useState("");
  const [DueTime, setDueTime] = useState("");
  const [employees, setEmployees] = useState("");

  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.employeeUserReducer.currentEmp);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    if (name === "title") {
      setTitle(value);
    } else {
      setDescription(value);
    }
  };

  const setDate = (newDate) => {
    setDueTime(newDate);
  };

  const AddTask = (e) => {
    e.preventDefault();

    if (title == "" && Description == "") {
      toast.error("Type the title of the task and description");
    } else {
      let date = {
        title: title,
        Description: Description,
        AllotedTo: AllotedTo,
        DueTime: DueTime.toString(),
        PostedTime: new Date().toString(),
        employeeid: user.employeeid,
      };
      dispatch(addEmpOwnTask(date));

      toast.success("Own task Added Successfully!");
      history.push("/home/employee/owntask");
    }
  };

  return (
    <Col md={12} lg={12}>
      <Card>
        <CardBody>
          <form className="form form--horizontal" onSubmit={AddTask}>
            <div className="form__form-group">
              <span className="form__form-group-label">Title</span>
              <div className="form__form-group-field">
                <Field
                  name="title"
                  component="input"
                  type="text"
                  placeholder="Enter The Title "
                  onChange={onChangeHandler}
                />
                <Tooltip
                  TransitionComponent={Zoom}
                  title="Enter the title of task"
                >
                  <IconButton className="helpButton">
                    <img className="helpImage" src={HelpIcon} alt="help" />
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

            <div className="form__form-group">
              <span className="form__form-group-label">Due Date</span>
              <div className="form__form-group-field">
                <Field
                  id='clndrPicker'
                  name="default_date"
                  component={renderDatePickerField}
                  onChange={setDate}
                />
                <div className="form__form-group-icon">
                  <CalendarBlankIcon className='calender_icon' />
                </div>
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

export default reduxForm({
  form: "horizontal_form", // a unique identifier for this form
})(translate("common")(withRouter(AddForm)));
