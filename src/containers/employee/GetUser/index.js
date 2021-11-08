import React, { useEffect } from "react";
// import { connect } from "react-redux";
import { startGetCurrentUserEmployee } from "../../../redux/actions/employeeUserActions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const GettingUser = () => {
  let dispatch = useDispatch();
  let history = useHistory();

  const { user } = useSelector((state) => ({
    user: state.employeeUserReducer.currentEmp,
  }));

  useEffect(() => {
    dispatch(startGetCurrentUserEmployee());
  }, []);

  useEffect(() => {
    console.log("here is your curren user========>", user);
    if (user.uid) {
      history.push("/home/employee/dashboard");
    } else {
      history.push("/employee/login");
    }
  }, [user]);

  return (
    <div className="load">
      <div className="load__icon-wrap">
        <svg className="load__icon">
          <path fill="#3f51b5" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
        </svg>
      </div>
    </div>
  );
};

// class GettingUser extends React.Component {
//   componentWillMount() {
//     this.props.startGetCurrentUserEmployee();
//   }

//   componentWillReceiveProps(nextProps) {
//     console.log("nextProps from getuser", nextProps.user);

//     console.log("nextProps from err", nextProps.err);
//     if (nextProps.user.uid) {
//       this.props.history.push("/home/employee/dashboard");
//     } else {
//       this.props.history.push("/employee/login");
//     }
//   }

//   render() {
//     return (
//       <div className="load">
//         <div className="load__icon-wrap">
//           <svg className="load__icon">
//             <path
//               fill="#3f51b5"
//               d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"
//             />
//           </svg>
//         </div>
//       </div>
//     );
//   }
// }

// function mapStateToProps(state) {
//     console.log('state from props',state);

//     return {
//         user: state.employeeUserReducer.currentEmp,
//         err:state.employeeUserReducer.getUserErr
//     };
// }

// export default connect(mapStateToProps,{startGetCurrentUserEmployee})(GettingUser);

export default GettingUser;
