import React, { useState, useEffect } from "react";
import { Card, CardBody, Col, Button, ButtonToolbar } from "reactstrap";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { PulseLoader } from "react-spinners";

import { contactEmp } from "../../../../../redux/actions/empSchedule";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";

import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function ContactForm(props) {
  const propTypes = {
    t: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
  };
  const [loader, setLoader] = useState(false);
  const [title, setTitle] = useState("");
  const [Description, setDescription] = useState("false");

  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.employeeUserReducer.currentEmp);
  const contactStatus = useSelector(
    (state) => state.empScheduleReducer.contactStatus
  );
  const stateLoader = useSelector((state) => state.empScheduleReducer.loader);

  useEffect(() => {
    if (contactStatus === "done") {
      setLoader(false);
      history.push("/home/employee/schedule");
    } else if (contactStatus === "error") {
      setLoader(false);
    }
  }, [contactStatus]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    if (name === "title") {
      setTitle(value);
    } else {
      setDescription(value);
    }
  };

  const sendText = (e) => {
    e.preventDefault();

    if (title == "" && Description == "") {
      toast.error("Type the title of the task and description");
    } else {
      setLoader(true);

      let data = {
        title: title,
        Description: Description,
        PostedTime: new Date().toString(),
        employeeid: user.employeeid,
        employeruid: user.employeruid,
        employeeName: user.name,
        purpose: "schedule change",
      };
      dispatch(contactEmp(data));
    }
  };

  return (
    <Col md={12} lg={12}>
      <Card>
        <CardBody>
          <form className="form form--horizontal" onSubmit={props.AddTask}>
            <div className="form__form-group">
              <span className="form__form-group-label">Title</span>
              <div className="form__form-group-field">
                <FormControl variant="outlined" style={{ width: "100%" }}>
                  <OutlinedInput
                    style={{ width: "100%" }}
                    id="component-outlined"
                    value={title}
                    onChange={onChangeHandler}
                    name="title"
                  />
                </FormControl>
              </div>
            </div>
            <div className="form__form-group">
              <span className="form__form-group-label">Description</span>
              <div className="form__form-group-field textBox">
                <FormControl variant="outlined" style={{ width: "100%" }}>
                  <OutlinedInput
                    multiline
                    rowsMax="4"
                    id="component-outlined"
                    onChange={onChangeHandler}
                    name="Description"
                  />
                </FormControl>
              </div>
            </div>
            <ButtonToolbar className="form__button-toolbar">
              {loader ? (
                <Button color="success" disabled>
                  <PulseLoader color={"#123abc"} size={12} />
                </Button>
              ) : (
                <Button color="success" type="button" onClick={sendText}>
                  Send
                </Button>
              )}
            </ButtonToolbar>
          </form>
        </CardBody>
      </Card>
    </Col>
  );
}

export default withRouter(ContactForm);
