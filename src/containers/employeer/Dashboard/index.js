import React, { PureComponent } from "react";
import { Container, Row } from "reactstrap";
import moment from "moment";

import { connect } from "react-redux";
import { getEmployees } from "../../../redux/actions/employerActions";
import { getTask, getLogs } from "../../../redux/actions/TasksActions";
import { countEmployerPaperWork } from "../../../redux/actions/paperWorkActions";
import { countEmployerShifts } from "../../../redux/actions/shiftAction";
import { getEmployerPayStubs } from "../../../redux/actions/paystubsActions";
import { getAttendance } from "../../../redux/actions/attendanceAction";

import Item from "./components/Item";
import Payroll from "./components/Payroll";
import TimeComp from "./components/Time";
import Activities from "./components/Clock";
import Tasks from "../../../assets/icon/portfolio.png";
import Employees from "../../../assets/icon/employee.png";
import Shifts from "../../../assets/icon/rotation.png";
import PaperWorks from "../../../assets/icon/checklist.png";

class Dashboard extends PureComponent {
  state = {
    tasks: [],
    employees: [],
    empAttendances: [],
    selectedTasks: [],
    employerPaystubs: [],
    statements: [],
    loader: true,
    papersCount: 0,
    shiftsCount: 0,
    employee: "Naveed",
    status: "active",
    arrowDown: true,
    greet: "Good Morning",
  };

  componentWillMount() {
    this.props.getEmployees(this.props.user.uid);
    this.props.getTask(this.props.user.uid);
    this.props.getLogs(this.props.user.uid);
    this.props.countEmployerPaperWork(this.props.user.uid);
    this.props.countEmployerShifts(this.props.user.uid);
    this.props.getEmployerPayStubs(this.props.user.uid);
    this.props.getAttendance(this.props.user.uid);

    var myDate = new Date();
    var hrs = myDate.getHours();

    var greet;

    if (hrs < 12) {
      greet = "Good Morning";
    } else if (hrs >= 12 && hrs <= 17) {
      greet = "Good Afternoon";
    } else if (hrs >= 17 && hrs <= 24) {
      greet = "Good Evening";
    }

    this.setState({
      greet,
    });
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.done === "move") {
      this.setState({
        loader: false,
        employees: nextProps.employees,
      });
    }

    if (nextProps.loader === "false") {
      let selectedTasks = [];
      selectedTasks = nextProps.AllTask.filter(
        (task) =>
          moment(task.DueTime).format("MMM DD, YYYY") ===
          moment().format("MMM DD, YYYY")
      );
      this.setState({
        loader: false,
        selectedTasks,
        tasks: nextProps.AllTask,
      });
    }

    if (nextProps.countStatus === "done") {
      this.setState({
        loader: false,
        papersCount: nextProps.count,
      });
    }

    if (nextProps.employerShiftCountStatus === "done") {
      this.setState({
        loader: false,
        shiftsCount: nextProps.employerShiftCount,
      });
    }

    if (nextProps.employerPaystubsStatus === "done") {
      this.setState({
        employerPaystubs: nextProps.employerPaystubs,
      });
    }

    if (nextProps.getEmpAttendancesStatus === "done") {
      if (nextProps.empAttendances.length > 0) {
        let employees = this.state.employees;
        let statements = [];
        employees.map((emp) => {
          let sameEmpAtt = [];
          sameEmpAtt = nextProps.empAttendances.filter(
            (att) => att.employeeUid === emp.employeeid
          );
          sameEmpAtt = sameEmpAtt.sort(function(a, b) {
            return (
              new Date(b.checkInTime.toDate()) -
              new Date(a.checkInTime.toDate())
            );
          });
          let statement = "";
          if (sameEmpAtt.length > 0) {
            if (sameEmpAtt[0].checkOutTime) {
              statement = "";
              statement =
                "Clocked out at " +
                moment(sameEmpAtt[0].checkOutTime.toDate()).format(
                  "h:mm A MMM DD, YYYY"
                ) +
                ".";
            } else {
              statement = "";
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
          statements.push({
            name: emp.name,
            statement,
          });
        });
        this.setState({
          statements,
          empAttendances: nextProps.empAttendances,
        });
      }
    }
  };

  render() {
    let {
      tasks,
      employees,
      shiftsCount,
      papersCount,
      employerPaystubs,
      statements,
    } = this.state;

    return (
      <Container className="dashboard">
        <Row>
          <Item ic={Tasks} name="TASKS" number={tasks.length} />
          <Item ic={Employees} name="EMPLOYEES" number={employees.length} />
          <Item ic={Shifts} name="SHIFTS" number={shiftsCount} />
          <Item ic={PaperWorks} name="PAPERWORKS" number={papersCount} />
        </Row>
        <Row>
          <TimeComp />
          <Payroll data={employerPaystubs} />
          <Activities data={statements} />
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    user: store.userReducer.user,
    done: store.employerReducer.done,
    loader: store.TaskReducer.loader,
    attendanceLoader: store.attendanceReducer.loader,
    AllTask: store.TaskReducer.AllTask,
    count: store.paperWorkReducer.docsCount,
    employees: store.employerReducer.employees,
    countStatus: store.paperWorkReducer.countStatus,
    employerShiftCount: store.shiftReducer.employerShiftCount,
    employerShiftCountStatus: store.shiftReducer.employerShiftCountStatus,
    employerPaystubs: store.payStubsReducer.employerPaystubs,
    employerPaystubsStatus: store.payStubsReducer.employerPaystubsStatus,
    empAttendances: store.attendanceReducer.empAttendances,
    getEmpAttendancesStatus: store.attendanceReducer.getEmpAttendancesStatus,
  };
};

export default connect(
  mapStateToProps,
  {
    getTask,
    getEmployees,
    countEmployerShifts,
    countEmployerPaperWork,
    getEmployerPayStubs,
    getAttendance,
    getLogs
  }
)(Dashboard);
