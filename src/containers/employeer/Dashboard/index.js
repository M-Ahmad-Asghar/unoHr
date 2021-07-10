import React, { PureComponent, useState, useEffect } from "react";
import { Container, Row } from "reactstrap";
import moment from "moment";

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

import { useDispatch, useSelector } from "react-redux";

function Dashboard(props) {
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [empAttendances, setEmpAttendances] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [employerPaystubs, setEmployerPaystubs] = useState([]);
  const [statements, setStatements] = useState([]);
  const [loader, setLoader] = useState(true);
  const [papersCount, setPapersCount] = useState([]);
  const [shiftsCount, setShiftsCount] = useState(0);
  const [employee, setEmployee] = useState("Naveed");
  const [status, setStatus] = useState("active");
  const [arrowDown, setArrowDown] = useState(true);
  const [greet, setGreet] = useState("Good Morning");
  ////Redux Dispatch///
  const dispatch = useDispatch();

  const user = useSelector((state) => state.userReducer.user);
  const done = useSelector((state) => state.employerReducer.done);
  const stateLoader = useSelector((state) => state.TaskReducer.loader);
  const attendanceLoader = useSelector(
    (state) => state.attendanceReducer.loader
  );
  const AllTask = useSelector((state) => state.TaskReducer.AllTask);
  const count = useSelector((state) => state.TaskReducer.AllTask);
  const stateEmployees = useSelector(
    (state) => state.employerReducer.employees
  );
  const countStatus = useSelector(
    (state) => state.paperWorkReducer.countStatus
  );
  const employerShiftCount = useSelector(
    (state) => state.shiftReducer.employerShiftCount
  );
  const employerShiftCountStatus = useSelector(
    (state) => state.shiftReducer.employerShiftCountStatus
  );
  const stateEmployerPaystubs = useSelector(
    (state) => state.payStubsReducer.employerPaystubs
  );
  const employerPaystubsStatus = useSelector(
    (state) => state.payStubsReducer.employerPaystubsStatus
  );
  const stateEmpAttendances = useSelector(
    (state) => state.attendanceReducer.empAttendances
  );
  const getEmpAttendancesStatus = useSelector(
    (state) => state.attendanceReducer.getEmpAttendancesStatus
  );

  useEffect(() => {
    dispatch(getEmployees(user.uid));
    dispatch(getTask(user.uid));
    dispatch(getLogs(user.uid));
    dispatch(countEmployerPaperWork(user.uid));
    dispatch(countEmployerShifts(user.uid));
    dispatch(getEmployerPayStubs(user.uid));
    dispatch(getAttendance(user.uid));
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
    setGreet(greet);
  }, []);

  useEffect(() => {
    if (done === "move") {
      setLoader(false);
      setEmployee(stateEmployees);
    }

    if (stateLoader === "false") {
      let selectedTasks = [];
      selectedTasks = AllTask.filter(
        (task) =>
          moment(task.DueTime).format("MMM DD, YYYY") ===
          moment().format("MMM DD, YYYY")
      );
      setLoader(false);
      setSelectedTasks(selectedTasks);
      setTasks(AllTask);
    }

    if (countStatus === "done") {
      setLoader(false);
      setPapersCount(count);
    }

    if (employerShiftCountStatus === "done") {
      setLoader(false);
      setShiftsCount(employerShiftCount);
    }

    if (employerPaystubsStatus === "done") {
      setEmployerPaystubs(stateEmployerPaystubs);
    }

    if (getEmpAttendancesStatus === "done") {
      if (empAttendances.length > 0) {
        // let employees = employees;
        // let statements = [];
        employees.map((emp) => {
          let sameEmpAtt = [];
          sameEmpAtt = empAttendances.filter(
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
          setStatements(
            statements.push({
              name: emp.name,
              statement,
            })
          );
        });
        setStatements(statements);
        setEmpAttendances(stateEmpAttendances);
      }
    }
  }, [
    done,
    stateEmployees,
    stateLoader,
    countStatus,
    employerShiftCountStatus,
    employerPaystubsStatus,
    getEmpAttendancesStatus,
  ]);

  // let {
  //   tasks,
  //   employees,
  //   shiftsCount,
  //   papersCount,
  //   employerPaystubs,
  //   statements,
  // } = this.state;

  return (
    <Container className="dashboard">
      <Row>
        <Item ic={Tasks} name="TASKS" number={tasks.length} />
        <Item ic={Employees} name="EMPLOYEES" number={stateEmployees.length} />
        <Item ic={Shifts} name="SHIFTS" number={shiftsCount} />
        <Item ic={PaperWorks} name="PAPERWORKS" number={papersCount.length} />
      </Row>
      <Row>
        <TimeComp />
        <Payroll data={employerPaystubs} />
        <Activities data={statements} />
      </Row>
    </Container>
  );
}

export default Dashboard;
