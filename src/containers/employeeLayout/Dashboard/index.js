import React, { useEffect } from "react";
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
import { useObjectState } from "./components/useActivity";
import { useDispatch, useSelector } from "react-redux";

function Dashboard() {
  const [state, setState] = useObjectState({
    tasks: [],
    selectedTasks: [],
    empAttendances: [],
    papersCount: 0,
    statement: "No activity yet",
    employee: "Naveed",
    curTime: new Date(),
  });

  const dispatch = useDispatch();

  const tasks = useSelector((state) => state.employeeTaskReducer.AllTask);
  const user = useSelector((state) => state.employeeUserReducer.currentEmp);
  const stateLoader = useSelector((state) => state.employeeTaskReducer.loader);
  const employeeDocsCount = useSelector(
    (state) => state.paperWorkReducer.employeeDocsCount
  );
  const employeeCountStatus = useSelector(
    (state) => state.paperWorkReducer.employeeCountStatus
  );
  const employeeAttendances = useSelector(
    (state) => state.attendanceReducer.employeeAttendances
  );
  const getEmployeeAttendancesStatus = useSelector(
    (state) => state.attendanceReducer.getEmployeeAttendancesStatus
  );

  useEffect(() => {
    dispatch(getTask(user.employeruid, user.employeeid));
    dispatch(countEmployeePaperWork(user.employeeid));
    dispatch(getEmployeeAttendance(user.employeeid));
    dispatch(getEmployeStatus(user.employeeid, user.timeMode));
    dispatch(getWeekStatus(user.employeeid));
  }, []);

  useEffect(() => {
    if (stateLoader === "false") {
      let selectedTasks = [];
      selectedTasks = tasks.filter(
        (task) =>
          moment(task.DueTime).format("MMM DD, YYYY") ===
          moment().format("MMM DD, YYYY")
      );
      setState({
        loader: false,
        selectedTasks,
        tasks: tasks,
      });
    }

    if (employeeCountStatus === "done") {
      setState({
        loader: false,
        papersCount: employeeDocsCount,
      });
    }

    if (getEmployeeAttendancesStatus === "done") {
      if (employeeAttendances.length > 0) {
        let emp = user;
        let statement = "";
        let sameEmpAtt = [];
        sameEmpAtt = employeeAttendances.filter(
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

        setState({
          statement,
          empAttendances: employeeAttendances,
        });
      }
    }
  }, [stateLoader, employeeCountStatus, getEmployeeAttendancesStatus]);

  return (
    <Container className="dashboard">
      <Row>
        <Item ic={Tasks} name="TASKS" number={tasks.length} />
        <Item ic={PaperWorks} name="PAPERWORKS" number={state.papersCount} />
        <Activity ic={Clock} name="CLOCK" statement={state.statement} />
      </Row>
      <Row>
        <TimeComp />
        {user.timeMode === "Punch" && <ActivityAction />}
      </Row>
    </Container>
  );
}

export default Dashboard;
