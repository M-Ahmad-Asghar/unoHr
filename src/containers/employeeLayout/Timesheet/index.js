import React, { Component } from "react";
import { connect } from "react-redux";
import PunchTime from "./punchTime";
import moment from "moment";
import Typography from "@material-ui/core/Typography";
import { Paper } from "@material-ui/core";

class TimeSheet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      currentWeekStatus: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.weekStatus !== undefined) {
      let today = new Date();
      let startDate = today;
      let stopDate = today;

      startDate.setDate(startDate.getDate() - ((startDate.getDay() + 6) % 7));
      startDate = moment(startDate).format("MM/DD/YYYY");
      console.log("startDate", startDate);
      stopDate.setDate(stopDate.getDate() + ((0 + 7 - stopDate.getDay()) % 7));
      stopDate = moment(stopDate).format("MM/DD/YYYY");
      console.log(stopDate);
      let checkingDate = moment(nextProps.weekStatus.submitDate).format(
        "MM/DD/YYYY"
      );

      let result = checkingDate >= startDate && checkingDate <= stopDate;
      this.setState({
        loading: false,
        currentWeekStatus: result
      });
    }
  }

  componentDidMount() {
    console.log("weekStatus", this.props.weekStatus);
    if (this.props.weekStatus !== undefined) {
      let today = new Date();
      let startDate = today;
      let stopDate = today;

      startDate.setDate(startDate.getDate() - ((startDate.getDay() + 6) % 7));
      startDate = moment(startDate).format("MM/DD/YYYY");
      console.log("startDate", startDate);
      stopDate.setDate(stopDate.getDate() + ((0 + 7 - stopDate.getDay()) % 7));
      stopDate = moment(stopDate).format("MM/DD/YYYY");
      console.log(stopDate);
      let checkingDate = moment(this.props.weekStatus.submitDate).format(
        "MM/DD/YYYY"
      );
      console.log(
        "new logic",
        checkingDate >= startDate && checkingDate <= stopDate
      );

      let result = checkingDate >= startDate && checkingDate <= stopDate;
      this.setState({
        loading: false,
        currentWeekStatus: result
      });
    } else {
      this.setState({
        loading: false,
        currentWeekStatus: false
      });
    }
  }

  render() {
    const { loading, currentWeekStatus } = this.state;
    return (
      <div>
        {loading ? (
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
        ) : currentWeekStatus ? (
          <Paper style={{ padding: 30 }} align="center" elevation={5}>
            <Typography component="p">
              You have been submitted attendence for this week!
            </Typography>
          </Paper>
        ) : (
          <PunchTime />
        )}
      </div>
    );
  }
}

const mapStateToProp = state => ({
  employee: state.employeeUserReducer.currentEmp,
  currentEmp: state.employeeUserReducer.currentEmp,
  done: state.attendanceReducer.done,
  submitStatus: state.attendanceReducer.submitStatus,
  employeeDay: state.attendanceReducer.employeeDay,
  employeeCheckIn: state.attendanceReducer.employeeCheckIn,
  empOldWeekStatus: state.attendanceReducer.empOldWeekStatus,
  status: state.attendanceReducer.status,
  weekStatus: state.attendanceReducer.weekStatus
});

export default connect(mapStateToProp)(TimeSheet);
