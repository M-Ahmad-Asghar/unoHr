import React, { Component } from "react";
import { Card, CardBody, Col, Button, ButtonToolbar } from "reactstrap";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { PulseLoader } from "react-spinners";

import { contactEmp } from "../../../../../redux/actions/empSchedule";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";

import { toast } from "react-toastify";

class ContactForm extends Component {
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
      Description: ""
    };
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.contactStatus === "done"){
      this.setState({
        loader: false,
      })
      this.props.history.push("/home/employee/schedule")
    }else if(nextProps.contactStatus === "error"){
      this.setState({
        loader: false,
      })
    }
  }

  onChangeHandler = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  sendText = e => {
    e.preventDefault();

    if (this.state.title == "" && this.state.Description == "") {
      toast.error("Type the title of the task and description");
    } else {
      this.setState({
        loader: true
      });
      let data = {
        title: this.state.title,
        Description: this.state.Description,
        PostedTime: new Date().toString(),
        employeeid: this.props.user.employeeid,
        employeruid: this.props.user.employeruid,
        employeeName: this.props.user.name,
        purpose: "schedule change"
      };
      this.props.contactEmp(data);
    }
  };

  render() {
    const { loader } = this.state;
    return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody>
            <form className="form form--horizontal" onSubmit={this.AddTask}>
              <div className="form__form-group">
                <span className="form__form-group-label">Title</span>
                <div className="form__form-group-field">
                  <FormControl variant="outlined" style={{ width: "100%" }}>
                    <OutlinedInput
                      style={{ width: "100%" }}
                      id="component-outlined"
                      value={this.state.name}
                      onChange={this.onChangeHandler}
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
                      onChange={this.onChangeHandler}
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
                  <Button color="success" type="button" onClick={this.sendText}>
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
}

const mapStateToProps = state => ({
  user: state.employeeUserReducer.currentEmp,
  contactStatus: state.empScheduleReducer.contactStatus,
  loader: state.empScheduleReducer.loader
});

export default connect(
  mapStateToProps,
  { contactEmp }
)(withRouter(ContactForm));
