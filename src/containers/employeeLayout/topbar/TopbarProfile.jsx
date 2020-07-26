import React, { Component } from "react";
import DownIcon from "mdi-react/ChevronDownIcon";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Collapse } from "reactstrap";
import TopbarMenuLink from "./TopbarMenuLink";
import { startLogoutEmployee } from "../../../redux/actions/employeeUserActions";
import { toast } from "react-toastify";
const Ava = `${process.env.PUBLIC_URL}/img/ava.png`;

class TopbarProfile extends Component {
  constructor() {
    super();
    this.state = {
      collapse: false
    };
  }

  logOut = () => {
    this.props.startLogoutEmployee();
  };

  componentWillReceiveProps(nextProps) {
    // if (nextProps.LogoutEmp == "donenow") {
    //   toast.success("Successfully Logedout")
    //   this.props.history.push("/");
    // }
  }

  toggle = () => {
    this.setState({ collapse: !this.state.collapse });
  };

  render() {
    const { user } = this.props;
    return (
      <div className="topbar__profile">
        <button className="topbar__avatar" onClick={this.toggle}>
          <p className="topbar__avatar-name">{user.name}</p>
          <DownIcon className="topbar__icon" />
        </button>
        {this.state.collapse && (
          <button className="topbar__back" onClick={this.toggle} />
        )}
        <Collapse isOpen={this.state.collapse} className="topbar__menu-wrap">
          <div className="topbar__menu">
            <TopbarMenuLink
              title="View Profile"
              icon="user"
              path="/home/employee/profile"
            />

            <div className="topbar__link" onClick={this.logOut}>
              <span className={`topbar__link-icon lnr lnr-exit`} />
              <p className="topbar__link-title">Log out</p>
            </div>
          </div>
        </Collapse>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log("state from props", state);

  return {
    user: state.employeeUserReducer.currentEmp,
    err: state.employeeUserReducer.getUserErr,
    LogoutEmp: state.employeeUserReducer.LogoutEmp
  };
}

export default connect(
  mapStateToProps,
  { startLogoutEmployee }
)(withRouter(TopbarProfile));
