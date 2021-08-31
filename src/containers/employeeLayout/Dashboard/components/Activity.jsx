import React, { useEffect } from "react";
import Panel from "../../../../shared/components/Panel";
import { Typography } from "@material-ui/core";
import moment from "moment";
import { Button } from "reactstrap";
import { Paper } from "@material-ui/core";
import { connect } from "react-redux";
import { ScaleLoader } from "react-spinners";
import {
  employeCheckIn,
  submitRecord,
  employeCheckOut,
  breakStart,
  breakEnd,
  defaultValue,
} from "../../../../redux/actions/attendanceAction";
import { useObjectState } from "./useActivity";
import { useDispatch, useSelector } from "react-redux";
function Activity() {
  const [state, setState] = useObjectState({
    initialPosition: '{"coords": "data"}',
    locationShower: "null",
    checkIn: false,
    checkOut: true,
    employee: {},
    checkInLoader: false,
    checkingDays: new Date(),
    checkOutLoader: false,
    status: "",
    employeDay: [],
    weekTotal: "",
    submitLoader: false,
    submitDisable: false,
    weekStatus: {},
    lunchBtn: false,
    breakBtn: false,
    showFacilities: false,
    breakLoader: false,
    lunchBreakLoader: false,
    breakData: [],
    lunchBreak: [],
    breakStatus: false,
    lunchBreakStatus: false,
    loading: true,
    currentWeekStatus: false,
    // end of time setup
  });

  const dispatch = useDispatch();

  const employee = useSelector((state) => state.employeeUserReducer.currentEmp);
  const currentEmp = useSelector(
    (state) => state.employeeUserReducer.currentEmp
  );
  const done = useSelector((state) => state.attendanceReducer.done);
  const submitStatus = useSelector(
    (state) => state.attendanceReducer.submitStatus
  );
  const employeeDay = useSelector(
    (state) => state.attendanceReducer.employeeDay
  );
  const employeeCheckIn = useSelector(
    (state) => state.attendanceReducer.employeeCheckIn
  );
  const empOldWeekStatus = useSelector(
    (state) => state.attendanceReducer.empOldWeekStatus
  );
  const status = useSelector((state) => state.attendanceReducer.status);
  const weekStatus = useSelector((state) => state.attendanceReducer.weekStatus);
  const startBreakStatus = useSelector(
    (state) => state.attendanceReducer.startBreakStatus
  );
  const breakData = useSelector((state) => state.attendanceReducer.breakData);

  useEffect(() => {
    if (employee.lunchFacility || employee.breakFacility) {
      // console.log("facility", props.employee.breakFacility);
      setState({
        showFacilities: true,
      });
    }

    // manage employee's checkIn status and week status
    setState({
      weekStatus: weekStatus,
    });

    setState({
      employeDay: employeeDay,
    });

    if (employeeCheckIn !== undefined) {
      if (employeeCheckIn.status == "checkIn") {
        setState({
          checkIn: true,
          checkOut: false,
        });
      }
    }
    if (status == "checkIn") {
      setState({
        checkInLoader: false,
        checkIn: true,
        checkOut: false,
      });
    } else if (status == "checkOut") {
      setState({
        checkOutLoader: false,
        checkIn: false,
        checkOut: true,
      });
    }

    // week status includes whethe the employee submit the current week record or not

    if (weekStatus !== undefined) {
      let today = new Date();
      let startDate = today;
      let stopDate = today;

      startDate.setDate(startDate.getDate() - ((startDate.getDay() + 6) % 7));
      startDate = moment(startDate).format("MM/DD/YYYY");
      // console.log("startDate", startDate);
      stopDate.setDate(stopDate.getDate() + ((0 + 7 - stopDate.getDay()) % 7));
      stopDate = moment(stopDate).format("MM/DD/YYYY");
      // console.log(stopDate);
      let checkingDate = moment(weekStatus.submitDate).format("MM/DD/YYYY");

      let result = checkingDate >= startDate && checkingDate <= stopDate;

      setState({
        loading: false,
        currentWeekStatus: result,
      });
    } else {
      setState({
        loading: false,
        currentWeekStatus: false,
      });
    }

    // manage breaks
    if (startBreakStatus === "done" || startBreakStatus === "error") {
      setState({
        breakLoader: false,
        lunchBreakLoader: false,
      });
      dispatch(defaultValue());
    }
    if (
      employeeCheckIn !== undefined &&
      employeeCheckIn.dayBreaks !== undefined
    ) {
      let breakData = employeeCheckIn.dayBreaks.filter(
        (item) => item.breakType === "break"
      );
      let lunchBreak = employeeCheckIn.dayBreaks.filter(
        (item) => item.breakType === "lunchBreak"
      );

      let startBreak = breakData.filter(
        (item) => item.breakStatus === "breakStart"
      );

      let breakStatus = startBreak.length > 0 ? true : false;

      let lunchBreakStart = lunchBreak.filter(
        (item) => item.breakStatus === "lunchBreakStart"
      );

      let lunchBreakStatus = lunchBreakStart.length > 0 ? true : false;

      setState({
        breakData,
        lunchBreak,
        breakStatus,
        lunchBreakStatus,
      });
    }
  }, [startBreakStatus, employee, employeeCheckIn, weekStatus, status]);

  // function to handle checkIn requests
  const checkInHandler = () => {
    setState({
      checkInLoader: true,
    });

    let date = new Date();
    let checkInData = {
      checkInTime: date,
      day: date.getDay(),
      status: "checkIn",
      checkInLoc: "Desktop",
      employeeUid: currentEmp.employeeid,
      employerUid: currentEmp.employeruid,
      type: "Punch",
    };
    dispatch(employeCheckIn(checkInData));
  };

  // to handle checkout requests
  const checkoutHandler = () => {
    setState({
      checkOutLoader: true,
    });
    let CheckOutTime = new Date();
    let CheckInTime;

    if (employeeCheckIn.checkInTime.seconds) {
      CheckInTime = new Date(employeeCheckIn.checkInTime.toDate());
    } else {
      CheckInTime = new Date(employeeCheckIn.checkInTime);
    }

    if (CheckOutTime < CheckInTime) {
      CheckOutTime.setDate(CheckOutTime.getDate() + 1);
    }
    let diffString = CheckOutTime - CheckInTime;

    let diff = Number(diffString);

    // calculate to lunch break

    let lunchBreak = [];
    let totalBreakTime = 0;
    if (employeeCheckIn.dayBreaks !== undefined) {
      lunchBreak = employeeCheckIn.dayBreaks.filter(
        (item) => item.breakType === "lunchBreak"
      );
      for (let i = 0; i < lunchBreak.length; i++) {
        totalBreakTime += Number(lunchBreak[i].breakDuration);
      }
    }

    let grossTime = diff - totalBreakTime;
    let msec = grossTime;

    let hh = Number(Math.floor(msec / 1000 / 60 / 60));

    msec -= hh * 1000 * 60 * 60;
    let mm = Number(Math.floor(msec / 1000 / 60));

    msec -= mm * 1000 * 60;
    let ss = Number(Math.floor(msec / 1000));

    msec -= ss * 1000;

    let dutyTime = hh + ":" + mm + ":" + ss;

    let hourlyPayRate = Number(currentEmp.HourlyRate);

    let hrPay = hh * hourlyPayRate;
    let minPay = mm * (hourlyPayRate / 60);
    let ssPay = ss * (hourlyPayRate / 3600);

    let income = hrPay + minPay + ssPay;

    let dayPay = income.toFixed(2);

    let checkOutData = {
      checkOutTime: CheckOutTime,
      lunchBreakTime: totalBreakTime,
      id: employeeCheckIn.id,
      status: "checkOut",
      checkOutLocation: "Desktop",
      dutyTime: dutyTime,
      dayPay: dayPay,
    };

    dispatch(employeCheckOut(checkOutData));
  };

  const startBreak = (type) => {
    let date = new Date();

    let breakData = {
      breakStart: date.toString(),
      breakStatus: type === "break" ? "breakStart" : "lunchBreakStart",
      breakType: type,
      id: employeeCheckIn.id,
    };

    dispatch(breakStart(breakData));
    if (type === "break") {
      setState({
        breakLoader: true,
      });
    } else {
      setState({
        lunchBreakLoader: true,
      });
    }
  };

  const endBreak = (type) => {
    let startObj;
    let breakStartTime;
    let array = [];
    let otherTypeArray = [];
    if (type === "break") {
      startObj = state.breakData.filter(
        (item) => item.breakStatus === "breakStart"
      );
      breakStartTime = new Date(startObj[0].breakStart);
      array = state.breakData.filter(
        (item) => item.breakStatus !== "breakStart"
      );
      otherTypeArray = state.lunchBreak;
      setState({
        breakLoader: true,
      });
    } else {
      startObj = state.lunchBreak.filter(
        (item) => item.breakStatus === "lunchBreakStart"
      );
      breakStartTime = new Date(startObj[0].breakStart);
      array = state.lunchBreak.filter(
        (item) => item.breakStatus !== "lunchBreakStart"
      );
      otherTypeArray = state.breakData;
      setState({
        lunchBreakLoader: true,
      });
    }
    let endBreak = new Date();
    if (endBreak < breakStartTime) {
      endBreak.setDate(endBreak.getDate() + 1);
    }
    let diffString = endBreak - breakStartTime;

    let diff = Number(diffString);

    let breakTime = diff;

    let dayBreaks = {
      dayBreaks: [
        ...array,
        ...otherTypeArray,
        {
          breakStart: startObj[0].breakStart,
          breakEnd: endBreak.toString(),
          breakStatus: type === "break" ? "breakEnd" : "lunchBreakEnd",
          breakDuration: breakTime,
          breakType: type,
        },
      ],
    };

    let id = employeeCheckIn.id;
    dispatch(breakEnd(dayBreaks, id));
  };

  return state.currentWeekStatus ? (
    <Panel
      xl={6}
      lg={6}
      md={12}
      xs={12}
      title="Activity"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Typography component="p">
        You have been submitted attendance for this week!
      </Typography>
    </Panel>
  ) : (
    <Panel
      xl={6}
      lg={6}
      md={12}
      xs={12}
      title="Activity"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          {state.checkInLoader ? (
            <Button disabled={true} style={{ width: 140 }} color="primary">
              <ScaleLoader
                sizeUnit={"12px"}
                size={100}
                color={"#123abc"}
                height="15"
              />
            </Button>
          ) : (
            <Button
              onClick={checkInHandler}
              disabled={state.checkIn}
              color="primary"
              style={{ width: 140 }}
            >
              Clock-in
            </Button>
          )}
          {state.checkOutLoader ? (
            <Button color="primary" style={{ width: 140 }} disabled={true}>
              <ScaleLoader
                sizeUnit={"12px"}
                size={100}
                color={"#123abc"}
                height="15"
              />
            </Button>
          ) : (
            <Button
              onClick={checkoutHandler}
              disabled={
                state.checkOut || state.lunchBreakStatus || state.breakStatus
              }
              style={{ width: 140 }}
              color="primary"
            >
              Clock-out
            </Button>
          )}
        </div>
        {state.showFacilities && state.checkIn && (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            {state.breakLoader ? (
              <Button style={{ width: 140 }} disabled={true} color="primary">
                <ScaleLoader
                  sizeUnit={"12px"}
                  size={100}
                  color={"#123abc"}
                  height="15"
                  outline
                />
              </Button>
            ) : (
              <Button
                disabled={state.breakBtn ? true : state.lunchBreakStatus}
                onClick={
                  state.breakStatus
                    ? () => endBreak("break")
                    : () => startBreak("break")
                }
                color="primary"
                style={{ width: 140 }}
              >
                {state.breakStatus ? "End Break" : "Start Break"}
              </Button>
            )}

            {state.unchBreakLoader ? (
              <Button color="primary" style={{ width: 140 }} disabled={true}>
                <ScaleLoader
                  sizeUnit={"12px"}
                  size={100}
                  color={"#123abc"}
                  height="15"
                  outline
                />
              </Button>
            ) : (
              <Button
                onClick={
                  state.lunchBreakStatus
                    ? () => endBreak("lunchBreak")
                    : () => startBreak("lunchBreak")
                }
                color="primary"
                disabled={state.lunchBtn ? true : state.breakStatus}
                style={{ width: 140 }}
              >
                {state.lunchBreakStatus ? "End Lunch" : "Start Lunch"}
              </Button>
            )}
          </div>
        )}

        {/* <div
            style={{
              display: "flex",I
              flexDirection: "row",
              justifyContent: "space-around"
            }}
          >
            <Button color="primary" style={{ width: 140 }}>
              Start Lunch
            </Button>
          </div> */}
      </div>
    </Panel>
  );
}

export default Activity;
