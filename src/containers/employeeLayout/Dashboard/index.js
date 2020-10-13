import React, { PureComponent } from "react";
import { Container, Row } from "reactstrap";
import moment from "moment";

import { connect } from "react-redux";
import { getTask } from "../../../redux/actions/EmployeeTaskActions";
import { countEmployeePaperWork } from "../../../redux/actions/paperWorkActions";
import {
  getEmployeeAttendance,
  getEmployeStatus,
  getWeekStatus,
} from "../../../redux/actions/attendanceAction";

import Item from "./components/Item";
import ActivityAction from "./components/Activity";
import TimeComp from "./components/Time";
import Activity from "./components/Clock";
import Tasks from "../../../assets/icon/portfolio.png";
import PaperWorks from "../../../assets/icon/checklist.png";
import Clock from "../../../assets/icon/clock.png";

class Dashboard extends PureComponent {
  state = {
    tasks: [],
    selectedTasks: [],
    empAttendances: [],
    papersCount: 0,
    statement: "No activity yet",
    employee: "Naveed",
    curTime: new Date(),
  };

  componentDidMount() {
    this.props.getTask(this.props.user.employeruid, this.props.user.employeeid);
    this.props.countEmployeePaperWork(this.props.user.employeeid);
    this.props.getEmployeeAttendance(this.props.user.employeeid);
    this.props.getEmployeStatus(
      this.props.user.employeeid,
      this.props.user.timeMode
    );
    this.props.getWeekStatus(this.props.user.employeeid);
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.loader === "false") {
      let selectedTasks = [];
      selectedTasks = nextProps.tasks.filter(
        (task) =>
          moment(task.DueTime).format("MMM DD, YYYY") ===
          moment().format("MMM DD, YYYY")
      );
      this.setState({
        loader: false,
        selectedTasks,
        tasks: nextProps.tasks,
      });
    }

    if (nextProps.employeeCountStatus === "done") {
      this.setState({
        loader: false,
        papersCount: nextProps.employeeDocsCount,
      });
    }

    if (nextProps.getEmployeeAttendancesStatus === "done") {
      if (nextProps.employeeAttendances.length > 0) {
        let emp = this.props.user;
        let statement = "";
        let sameEmpAtt = [];
        sameEmpAtt = nextProps.employeeAttendances.filter(
          (att) => att.employeeUid === emp.employeeid
        );
        sameEmpAtt = sameEmpAtt.sort(function(a, b) {
          return (
            new Date(b.checkInTime.toDate()) - new Date(a.checkInTime.toDate())
          );
        });

        if (sameEmpAtt.length > 0) {
          if (sameEmpAtt[0].checkOutTime) {
            statement =
              "Clocked out at " +
              moment(sameEmpAtt[0].checkOutTime.toDate()).format(
                "h:mm A MMM DD, YYYY"
              ) +
              ".";
          } else {
            statement =
              "Clocked in at " +
              moment(sameEmpAtt[0].checkInTime.toDate()).format(
                "h:mm A MMM DD, YYYY"
              ) +
              ".";
          }
        } else {
          statement = "No activity found!";
        }

        this.setState({
          statement,
          empAttendances: nextProps.employeeAttendances,
        });
      }
    }
  };

  render() {
    let { tasks, empAttendances, papersCount, statement } = this.state;

    return (
      <Container className="dashboard">
        <Row>
          <Item ic={Tasks} name="TASKS" number={tasks.length} />
          <Item ic={PaperWorks} name="PAPERWORKS" number={papersCount} />
          <Activity ic={Clock} name="CLOCK" statement={statement} />
        </Row>
        <Row>
          <TimeComp />
          {this.props.user.timeMode === "Punch" && <ActivityAction />}
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tasks: state.employeeTaskReducer.AllTask,
    user: state.employeeUserReducer.currentEmp,
    loader: state.employeeTaskReducer.loader,
    employeeDocsCount: state.paperWorkReducer.employeeDocsCount,
    employeeCountStatus: state.paperWorkReducer.employeeCountStatus,
    employeeAttendances: state.attendanceReducer.employeeAttendances,
    getEmployeeAttendancesStatus:
      state.attendanceReducer.getEmployeeAttendancesStatus,
  };
};

export default connect(
  mapStateToProps,
  {
    getTask,
    countEmployeePaperWork,
    getEmployeeAttendance,
    getEmployeStatus,
    getWeekStatus,
  }
)(Dashboard);
