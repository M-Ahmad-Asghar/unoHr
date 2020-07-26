import React, { Component } from "react";
import PropTypes from "prop-types";
import SidebarLink from "./SidebarLink";
import SidebarCategory from "./SidebarCategory";
import { startLogoutEmployee } from "../../../redux/actions/employeeUserActions";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";

class SidebarContent extends Component {
  static propTypes = {
    changeToDark: PropTypes.func.isRequired,
    changeToLight: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired
  };

  logOut = () => {
    // alert('call')
    this.props.startLogoutEmployee();
  };

  componentWillReceiveProps(nextProps) {
    console.log("nextprops", nextProps.LogoutEmp);

    // if (nextProps.LogoutEmp == "donenow") {
    //   this.props.history.push("/");
    // }
  }

  hideSidebar = () => {
    this.props.onClick();
  };

  render() {
    return (
      <div className="sidebar__content">

        <ul className="sidebar__block">
          <SidebarLink
              title="Dashboard"
              route="/home/employee/dashboard"
              onClick={this.hideSidebar}
              icon="address-book"
          />
        </ul>
        <ul className="sidebar__block">
          <SidebarCategory title="Manage Tasks" icon="tasks">
            <SidebarLink
              title="Active Tasks"
              route="/home/employee/activeTask"
              onClick={this.hideSidebar}
              icon="tasks"
            />
            <SidebarLink
              title="Paper Work"
              route="/home/employee/paperWork"
              onClick={this.hideSidebar}
              icon="clipboard-list"
            />
            <SidebarLink
              title="Own Tasks"
              route="/home/employee/ownTask"
              onClick={this.hideSidebar}
              icon="address-book"
            />
            <SidebarLink
              title="Add New Task"
              route="/home/employee/addTask"
              onClick={this.hideSidebar}
              icon="plus-circle"
            />
          </SidebarCategory>
        </ul>
        <ul className="sidebar__block">
          <SidebarLink
            title="Time Sheet"
            route="/home/employee/timesheet"
            onClick={this.hideSidebar}
            icon="clock"
          />
        </ul>
        <ul className="sidebar__block">
          <SidebarLink
            title="Paystubs"
            route="/home/employee/paystubs"
            onClick={this.hideSidebar}
            icon="newspaper"
          />
        </ul>
        {/* {
          this.props.user.paymentMethod === "direct deposit"
            &&
              <ul className="sidebar__block">
                <SidebarCategory title="Payment Account" icon="money-check-alt">
                  <SidebarLink
                    title="Direct Deposit"
                    route="/home/employee/directdepositaccount"
                    onClick={this.hideSidebar}
                    icon="hand-holding-usd"
                  />
                  <SidebarLink
                    title="Transaction History"
                    route="/home/employee/transactionhistory"
                    onClick={this.hideSidebar}
                    icon="exchange-alt"
                  />
                </SidebarCategory>
              </ul>
        } */}
        <ul className="sidebar__block">
          <SidebarLink
            title="Schedule"
            route="/home/employee/schedule"
            onClick={this.hideSidebar}
            icon="clock"
          />
        </ul>
       
        <ul className="sidebar__block">
          <SidebarCategory title="Settings" icon="cog">
            <SidebarLink
              title="Profile Settings"
              route="/home/employee/settings"
              onClick={this.hideSidebar}
              icon="sliders-h"
            />
            <SidebarLink
              title="Terms Of Service"
              route="/home/employee/termsandconditions"
              onClick={this.hideSidebar}
              icon="book-open"
            />
            <SidebarLink
              title="Privacy Policy"
              route="/home/employee/privacypolicy"
              onClick={this.hideSidebar}
              icon="user-lock"
            />
          </SidebarCategory>
        </ul>

        <ul className="sidebar__block">
          <li className="sidebar__link" onClick={this.logOut}>
            <FontAwesomeIcon icon="sign-out-alt" />
            <p className="sidebar__link-title">Log Out</p>
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    LogoutEmp: state.employeeUserReducer.LogoutEmp,
    user: state.employeeUserReducer.currentEmp
  };
};

export default connect(
  mapStateToProps,
  { startLogoutEmployee }
)(SidebarContent);
