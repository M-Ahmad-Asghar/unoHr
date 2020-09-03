import React, { Component } from "react";
import DownIcon from "mdi-react/ChevronDownIcon";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Collapse } from "reactstrap";
import TopbarMenuLink from "./TopbarMenuLink";
import { startLogout } from "../../../redux/actions/userActions";
const Ava = `${process.env.PUBLIC_URL}/img/ava.png`;

class TopbarProfile extends Component {
  constructor() {
    super();
    this.state = {
      collapse: false
    };
  }

  logOut = () => {
    console.log("clicked");

    this.props.startLogout();
  };

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.LogoutDone);

    if (nextProps.LogoutDone == "done") {
      this.props.history.push("/");
    }
  }

  toggle = () => {
    this.setState({ collapse: !this.state.collapse });
  };

  render() {
    const { user } = this.props;
    return (
      <div className="topbar__profile">
        <button
          className="topbar__avatar"
          onClick={this.toggle}
          style={{ display: "flex", alignItems: "center" }}
        >
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
              path="/home/employeer/profile"
            />

            <div className="topbar__link" onClick={this.logOut}>
              <span className={`topbar__link-icon lnr lnr-exit`} />
              <p className="topbar__link-title">Log Out</p>
            </div>
          </div>
        </Collapse>
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
)(withRouter(TopbarProfile));
