import React, { Component } from "react";
import PropTypes from "prop-types";
import SidebarLink from "./SidebarLink";
import SidebarCategory from "./SidebarCategory";
import { NavLink, Link } from "react-router-dom";
import { startLogout } from "../../../redux/actions/userActions";
import { connect } from "react-redux";
class SidebarContent extends Component {
  static propTypes = {
    changeToDark: PropTypes.func.isRequired,
    changeToLight: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired
  };

  logOut = () => {
    this.props.startLogout();
  };

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.LogoutDone);

    // if (nextProps.LogoutDone == "done") {
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
            route="/home/employeer/dashboard"
            onClick={this.hideSidebar}
            icon="address-book"
          />
        </ul>

        <ul className="sidebar__block">
          <SidebarCategory title="Manage Tasks" icon="tasks">
            <SidebarLink
              title="Daily Tasks"
              route="/home/employeer/dailyTask"
              onClick={this.hideSidebar}
              icon="address-book"
            />
            <SidebarLink
              title="Assigned"
              route="/home/employeer/employeeTask"
              onClick={this.hideSidebar}
              icon="address-book"
            />
            {/* <SidebarLink
              title="Complete Tasks"
              route="/home/employeer/completeTask"
              onClick={this.hideSidebar}
              icon="tasks"
            /> */}
            <SidebarLink
              title="My Tasks"
              route="/home/employeer/ownTask"
              onClick={this.hideSidebar}
              icon="address-book"
            />
            <SidebarLink
              title="Reporting"
              route="/home/employeer/ownTask"
              onClick={this.hideSidebar}
              icon="address-book"
            />
            <SidebarLink
              title="Add New Task"
              route="/home/employeer/addTask"
              onClick={this.hideSidebar}
              icon="plus-circle"
            />
          </SidebarCategory>
        </ul>
        <ul className="sidebar__block">
          <SidebarLink
            title="Reward Employee"
            route="/home/employeer/reward-employee"
            onClick={this.hideSidebar}
            icon="address-book"
          />
        </ul>
        <ul className="sidebar__block">
          <SidebarLink
            title="Reporting"
            route="/home/employeer/reporting"
            onClick={this.hideSidebar}
            icon="address-book"
          />
        </ul>
        <ul className="sidebar__block">
          <SidebarCategory title="Manage Payroll" icon="dollar-sign">
            <SidebarLink
              title="Run Payroll"
              route="/home/employeer/select"
              onClick={this.hideSidebar}
              icon="sync-alt"
            />
            <SidebarLink
              title="Time Sheets"
              route="/home/employeer/selectemployee"
              onClick={this.hideSidebar}
              icon="clock"
            />
            <SidebarLink
              title="Paystubs"
              route="/home/employeer/selectempforpaystub"
              onClick={this.hideSidebar}
              icon="file-pdf"
            />
          </SidebarCategory>
        </ul>
        <ul className="sidebar__block">
          <SidebarCategory title="Manage Employees" icon="address-card">
            <SidebarLink
              title="Add New Employee"
              route="/home/employeer/employeeCreation"
              onClick={this.hideSidebar}
              icon="plus-circle"
            />
            <SidebarLink
              title="View All Employees"
              route="/home/employeer/employeeView"
              onClick={this.hideSidebar}
              icon="address-card"
            />
          </SidebarCategory>
        </ul>

        <ul className="sidebar__block">
          <SidebarCategory title="Paper Work" icon="file">
            <SidebarLink
              title="Paperworks"
              route="/home/employeer/paperWork"
              onClick={this.hideSidebar}
              icon="file"
            />
            <SidebarLink
              title="Documents"
              route="/home/employeer/pdfRecords"
              onClick={this.hideSidebar}
              icon="book-open"
            />
            <SidebarLink
              title="Background Check"
              route="/home/employeer/employeeBackgroundCheck"
              onClick={this.hideSidebar}
              icon="user-clock"
            />
            <SidebarLink
              title="Direct Deposit"
              route="/home/employeer/directdeposit"
              onClick={this.hideSidebar}
              icon="hand-holding-usd"
            />
            <SidebarLink
              title="Transaction History"
              route="/home/employeer/transactionhistory"
              onClick={this.hideSidebar}
              icon="exchange-alt"
            />
            <SidebarLink
              title="WC Insurance"
              icon="address-book"
              route="/home/employeer/statecontacts"
              onClick={this.hideSidebar}
            />
          </SidebarCategory>
        </ul>

        <ul className="sidebar__block">
          <SidebarCategory title="Settings" icon="cog">
            <SidebarLink
              title="Profile Settings"
              route="/home/employeer/settings"
              onClick={this.hideSidebar}
              icon="sliders-h"
            />

            <SidebarLink
              title="Terms Of Service"
              route="/home/employeer/termsandconditions"
              onClick={this.hideSidebar}
              icon="book-open"
            />
            <SidebarLink
              title="Privacy Policy"
              route="/home/employeer/privacypolicy"
              onClick={this.hideSidebar}
              icon="user-lock"
            />
          </SidebarCategory>
        </ul>
        <ul className="sidebar__block">
          <SidebarCategory title="Schedule" icon="clock">
            <SidebarLink
              title="View Schedule"
              route="/home/employeer/schadule"
              onClick={this.hideSidebar}
              icon="address-card"
            />
            <SidebarLink
              title="Create Shift"
              route="/home/employeer/addschadule"
              onClick={this.hideSidebar}
              icon="plus-circle"
            />
            <SidebarLink
              title="Assign Schadule"
              route="/home/employeer/assignschadule"
              onClick={this.hideSidebar}
              icon="tasks"
            />
            <SidebarLink
              title="inbox"
              route="/home/employeer/inbox"
              onClick={this.hideSidebar}
              icon="address-book"
            />

            {/* add link here */}
          </SidebarCategory>
        </ul>

        {/* <ul className="sidebar__block">
          <SidebarLink
            title="State Contact"
            icon="address-book"
            route="/home/employeer/statecontacts"
            onClick={this.hideSidebar}
          />
        </ul> */}

        <ul className="sidebar__block">
          <SidebarLink
            title="Log Out"
            icon="sign-out-alt"
            route="#"
            onClick={this.logOut}
          />
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    LogoutDone: state.userReducer.LogoutDone,
    user: state.userReducer.user
  };
};

export default connect(
  mapStateToProps,
  { startLogout }
)(SidebarContent);
