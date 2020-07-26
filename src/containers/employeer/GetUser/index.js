import React from "react";
import { connect } from "react-redux";
import { startGetCurrentUser } from "../../../redux/actions/userActions";

class GettingUser extends React.Component {
  componentWillMount() {
    this.props.startGetCurrentUser();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.uid) {
      this.props.history.push("/home/employeer/dashboard");
    } else {
      this.props.history.push("/employeer/login");
    }
  }

  render() {
    return (
      <div className="load">
        <div className="load__icon-wrap">
          <svg className="load__icon">
            <path
              fill="#3f51b5"
              d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"
            />
          </svg>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log("state from props", state);

  return {
    user: state.userReducer.user,
    getuserErr: state.userReducer.getuserErr
  };
}

export default connect(
  mapStateToProps,
  { startGetCurrentUser }
)(GettingUser);
