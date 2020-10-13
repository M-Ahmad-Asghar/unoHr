import React, { Component } from "react";
import Panel from "../../../../shared/components/Panel";
import { Typography } from "@material-ui/core";
import moment from "moment";
import { Button } from "reactstrap";
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
class Activity extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
    };
  }

  componentWillReceiveProps(nextProps) {
    // check whether break facilities is given by the employer to employee
    if (
      this.props.employee.lunchFacility ||
      this.props.employee.breakFacility
    ) {
      // console.log("facility", this.props.employee.breakFacility);
      this.setState({
        showFacilities: true,
      });
    }

    // manage employee's checkIn status and week status
    this.setState({
      weekStatus: nextProps.weekStatus,
    });

    this.setState({
      employeDay: nextProps.employeeDay,
    });

    if (nextProps.employeeCheckIn !== undefined) {
      if (nextProps.employeeCheckIn.status == "checkIn") {
        this.setState({
          checkIn: true,
          checkOut: false,
        });
      }
    }
    if (nextProps.status == "checkIn") {
      this.setState({
        checkInLoader: false,
        checkIn: true,
        checkOut: false,
      });
    } else if (nextProps.status == "checkOut") {
      this.setState({
        checkOutLoader: false,
        checkIn: false,
        checkOut: true,
      });
    }

    // week status includes whethe the employee submit the current week record or not

    if (nextProps.weekStatus !== undefined) {
      let today = new Date();
      let startDate = today;
      let stopDate = today;

      startDate.setDate(startDate.getDate() - ((startDate.getDay() + 6) % 7));
      startDate = moment(startDate).format("MM/DD/YYYY");
      // console.log("startDate", startDate);
      stopDate.setDate(stopDate.getDate() + ((0 + 7 - stopDate.getDay()) % 7));
      stopDate = moment(stopDate).format("MM/DD/YYYY");
      // console.log(stopDate);
      let checkingDate = moment(nextProps.weekStatus.submitDate).format(
        "MM/DD/YYYY"
      );

      let result = checkingDate >= startDate && checkingDate <= stopDate;

      this.setState({
        loading: false,
        currentWeekStatus: result,
      });
    } else {
      this.setState({
        loading: false,
        currentWeekStatus: false,
      });
    }

    // manage breaks
    if (
      nextProps.startBreakStatus === "done" ||
      nextProps.startBreakStatus === "error"
    ) {
      this.setState({
        breakLoader: false,
        lunchBreakLoader: false,
      });
      this.props.defaultValue();
    }
    if (
      nextProps.employeeCheckIn !== undefined &&
      nextProps.employeeCheckIn.dayBreaks !== undefined
    ) {
      let breakData = nextProps.employeeCheckIn.dayBreaks.filter(
        (item) => item.breakType === "break"
      );
      let lunchBreak = nextProps.employeeCheckIn.dayBreaks.filter(
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

      this.setState({
        breakData,
        lunchBreak,
        breakStatus,
        lunchBreakStatus,
      });
    }
  }

  // function to handle checkIn requests
  checkInHandler = () => {
    this.setState({
      checkInLoader: true,
    });

    let date = new Date();
    let checkInData = {
      checkInTime: date,
      day: date.getDay(),
      status: "checkIn",
      checkInLoc: "Desktop",
      employeeUid: this.props.currentEmp.employeeid,
      employerUid: this.props.currentEmp.employeruid,
      type: "Punch",
    };
    this.props.employeCheckIn(checkInData);
  };

  // to handle checkout requests
  checkoutHandler = () => {
    this.setState({
      checkOutLoader: true,
    });
    let CheckOutTime = new Date();
    let CheckInTime;

    if (this.props.employeeCheckIn.checkInTime.seconds) {
      CheckInTime = new Date(this.props.employeeCheckIn.checkInTime.toDate());
    } else {
      CheckInTime = new Date(this.props.employeeCheckIn.checkInTime);
    }

    if (CheckOutTime < CheckInTime) {
      CheckOutTime.setDate(CheckOutTime.getDate() + 1);
    }
    let diffString = CheckOutTime - CheckInTime;

    let diff = Number(diffString);

    // calculate to lunch break

    let lunchBreak = [];
    let totalBreakTime = 0;
    if (this.props.employeeCheckIn.dayBreaks !== undefined) {
      lunchBreak = this.props.employeeCheckIn.dayBreaks.filter(
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

    let hourlyPayRate = Number(this.props.currentEmp.HourlyRate);

    let hrPay = hh * hourlyPayRate;
    let minPay = mm * (hourlyPayRate / 60);
    let ssPay = ss * (hourlyPayRate / 3600);

    let income = hrPay + minPay + ssPay;

    let dayPay = income.toFixed(2);

    let checkOutData = {
      checkOutTime: CheckOutTime,
      lunchBreakTime: totalBreakTime,
      id: this.props.employeeCheckIn.id,
      status: "checkOut",
      checkOutLocation: "Desktop",
      dutyTime: dutyTime,
      dayPay: dayPay,
    };

    this.props.employeCheckOut(checkOutData);
  };

  startBreak = (type) => {
    let date = new Date();

    let breakData = {
      breakStart: date.toString(),
      breakStatus: type === "break" ? "breakStart" : "lunchBreakStart",
      breakType: type,
      id: this.props.employeeCheckIn.id,
    };

    this.props.breakStart(breakData);
    if (type === "break") {
      this.setState({
        breakLoader: true,
      });
    } else {
      this.setState({
        lunchBreakLoader: true,
      });
    }
  };

  endBreak = (type) => {
    let startObj;
    let breakStartTime;
    let array = [];
    let otherTypeArray = [];
    if (type === "break") {
      startObj = this.state.breakData.filter(
        (item) => item.breakStatus === "breakStart"
      );
      breakStartTime = new Date(startObj[0].breakStart);
      array = this.state.breakData.filter(
        (item) => item.breakStatus !== "breakStart"
      );
      otherTypeArray = this.state.lunchBreak;
      this.setState({
        breakLoader: true,
      });
    } else {
      startObj = this.state.lunchBreak.filter(
        (item) => item.breakStatus === "lunchBreakStart"
      );
      breakStartTime = new Date(startObj[0].breakStart);
      array = this.state.lunchBreak.filter(
        (item) => item.breakStatus !== "lunchBreakStart"
      );
      otherTypeArray = this.state.breakData;
      this.setState({
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

    let id = this.props.employeeCheckIn.id;
    this.props.breakEnd(dayBreaks, id);
  };
  render() {
    const {
      breakBtn,
      lunchBtn,
      showFacilities,
      breakLoader,
      breakData,
      lunchBreak,
      breakStatus,
      lunchBreakStatus,
      lunchBreakLoader,
    } = this.state;
    return (
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
            {this.state.checkInLoader ? (
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
                onClick={this.checkInHandler}
                disabled={this.state.checkIn}
                color="primary"
                style={{ width: 140 }}
              >
                Clock-in
              </Button>
            )}
            {this.state.checkOutLoader ? (
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
                onClick={this.checkoutHandler}
                disabled={
                  this.state.checkOut || lunchBreakStatus || breakStatus
                }
                style={{ width: 140 }}
                color="primary"
              >
                Clock-out
              </Button>
            )}
          </div>
          {showFacilities && this.state.checkIn && (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              {breakLoader ? (
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
                  disabled={breakBtn ? true : lunchBreakStatus}
                  onClick={
                    breakStatus
                      ? () => this.endBreak("break")
                      : () => this.startBreak("break")
                  }
                  color="primary"
                  style={{ width: 140 }}
                >
                  {breakStatus ? "End Break" : "Start Break"}
                </Button>
              )}

              {lunchBreakLoader ? (
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
                    lunchBreakStatus
                      ? () => this.endBreak("lunchBreak")
                      : () => this.startBreak("lunchBreak")
                  }
                  color="primary"
                  disabled={lunchBtn ? true : breakStatus}
                  style={{ width: 140 }}
                >
                  {lunchBreakStatus ? "End Lunch" : "Start Lunch"}
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
}

const mapStateToProp = (state) => ({
  employee: state.employeeUserReducer.currentEmp,
  currentEmp: state.employeeUserReducer.currentEmp,
  done: state.attendanceReducer.done,
  submitStatus: state.attendanceReducer.submitStatus,
  employeeDay: state.attendanceReducer.employeeDay,
  employeeCheckIn: state.attendanceReducer.employeeCheckIn,
  empOldWeekStatus: state.attendanceReducer.empOldWeekStatus,
  status: state.attendanceReducer.status,
  weekStatus: state.attendanceReducer.weekStatus,
  startBreakStatus: state.attendanceReducer.startBreakStatus,
  breakData: state.attendanceReducer.breakData,
});

export default connect(
  mapStateToProp,
  {
    employeCheckIn,
    employeCheckOut,
    submitRecord,
    breakStart,
    breakEnd,
    defaultValue,
  }
)(Activity);
