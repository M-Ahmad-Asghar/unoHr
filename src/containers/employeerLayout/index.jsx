/* eslint-disable no-return-assign */
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classNames from "classnames";
import NotificationSystem from "rc-notification";
import Topbar from "./topbar/Topbar";
// import TopbarWithNavigation from "./topbar_with_navigation/TopbarWithNavigation";
import Sidebar from "./sidebar/Sidebar";
import Customizer from "./customizer/Customizer";
import { BasicNotification } from "../../shared/components/Notification";
import {
  changeMobileSidebarVisibility,
  changeSidebarVisibility
} from "../../redux/actions/sidebarActions";
import {
  changeThemeToDark,
  changeThemeToLight
} from "../../redux/actions/themeActions";
import {
  changeBorderRadius,
  toggleBoxShadow,
  toggleTopNavigation
} from "../../redux/actions/customizerActions";
import {
  CustomizerProps,
  SidebarProps,
  ThemeProps
} from "../../shared/prop-types/ReducerProps";

import { getEmployees } from "../../redux/actions/employerActions";

let notification = null;

// const showNotification = () => {
//   notification.notice({
//     content: (
//       <BasicNotification
//         title="👋 Welcome to the EasyDev!"
//         message="You have successfully registered in the EasyDev. Now you can start to explore the dashboard
//                 interface with a bunch of components and applications. Enjoy!"
//       />
//     ),
//     duration: 5,
//     closable: true,
//     style: { top: 0, left: "calc(100vw - 100%)" },
//     className: "right-up"
//   });
// };

class Layout extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    sidebar: SidebarProps.isRequired,
    customizer: CustomizerProps.isRequired,
    theme: ThemeProps.isRequired
  };

  componentDidMount() {
    if (this.props.user.uid !== undefined) {
      this.props.dispatch(getEmployees(this.props.user.uid));
    }
  }

  changeSidebarVisibility = () => {
    this.props.dispatch(changeSidebarVisibility());
  };

  changeMobileSidebarVisibility = () => {
    this.props.dispatch(changeMobileSidebarVisibility());
  };

  changeToDark = () => {
    this.props.dispatch(changeThemeToDark());
  };

  changeToLight = () => {
    this.props.dispatch(changeThemeToLight());
  };

  toggleTopNavigation = () => {
    this.props.dispatch(toggleTopNavigation());
  };

  changeBorderRadius = () => {
    this.props.dispatch(changeBorderRadius());
  };

  toggleBoxShadow = () => {
    this.props.dispatch(toggleBoxShadow());
  };

  render() {
    const { customizer, sidebar, theme } = this.props;
    const layoutClass = classNames({
      layout: true,
      "layout--collapse": sidebar.collapse,
      "layout--top-navigation": customizer.topNavigation
    });

    return (
      <div className={layoutClass}>
        <Customizer
          customizer={customizer}
          sidebar={sidebar}
          theme={theme}
          changeSidebarVisibility={this.changeSidebarVisibility}
          toggleTopNavigation={this.toggleTopNavigation}
          changeToDark={this.changeToDark}
          changeToLight={this.changeToLight}
          changeBorderRadius={this.changeBorderRadius}
          toggleBoxShadow={this.toggleBoxShadow}
        />

        <Topbar
          changeMobileSidebarVisibility={this.changeMobileSidebarVisibility}
          changeSidebarVisibility={this.changeSidebarVisibility}
        />

        <Sidebar
          sidebar={sidebar}
          changeToDark={this.changeToDark}
          changeToLight={this.changeToLight}
          changeMobileSidebarVisibility={this.changeMobileSidebarVisibility}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  items: state.TaskReducer.AllTask,
  user: state.userReducer.user,
  loader: state.TaskReducer.loader,
  customizer: state.customizer,
  sidebar: state.sidebar,
  theme: state.theme
});

export default withRouter(connect(mapStateToProps)(Layout));
