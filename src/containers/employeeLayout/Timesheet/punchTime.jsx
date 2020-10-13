import React, { Fragment } from "react";
import {
  Col,
  Card,
  Table,
  Container,
  Button,
  ButtonToolbar,
  Row,
  UncontrolledCollapse,
  CardBody,
  Input,
  CardHeader,
  Collapse,
} from "reactstrap";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";

import moment from "moment";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { ScaleLoader } from "react-spinners";
import {
  employeCheckIn,
  submitRecord,
  employeCheckOut,
  breakStart,
  breakEnd,
  defaultValue,
} from "../../../redux/actions/attendanceAction";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import { styles } from "./style";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";
import ManualTime from "./manualTime";
class TimeSheet extends React.Component {
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
      curTime: new Date(),
      weekTotal: "",
      submitLoader: false,
      submitDisable: false,
      weekStatus: {},
      lunchBtn: false,
      breakBtn: false,
      showFacilities: false,
      breakLoader: false,
      lunchBreakLoader: false,
      breakData: {},
      lunchBreak: {},
      breakStatus: false,
      lunchBreakStatus: false,
    };
  }

  componentWillReceiveProps(nextProps) {
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
    if (
      nextProps.status == "checkIn"
      //  && this.state.checkIn == false
    ) {
      this.setState({
        checkInLoader: false,
        checkIn: true,
        checkOut: false,
      });
    } else if (
      nextProps.status == "checkOut"
      //  && this.state.checkOut == false
    ) {
      this.setState({
        checkOutLoader: false,
        checkIn: false,
        checkOut: true,
      });
    }

    // calculate total
    let dataArry = nextProps.employeeDay;
    let total = 0;
    if (this.props.employee.timeMode === "Punch") {
      for (let i = 0; i < dataArry.length; i++) {
        if (dataArry[i].status == "checkOut") {
          total += Number(dataArry[i].dayPay);
        }
      }
    } else {
      for (let i = 0; i < dataArry.length; i++) {
        total += Number(dataArry[i].dayPay);
      }
    }

    this.setState({
      weekTotal: total.toFixed(2),
    });

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
  componentDidMount = () => {
    this.setState({
      lunchBtn: !this.props.employee.lunchFacility,
      breakBtn: !this.props.employee.breakFacility,
    });
    if (
      this.props.employee.lunchFacility ||
      this.props.employee.breakFacility
    ) {
      this.setState({
        showFacilities: true,
      });
    }

    this.setState({
      weekStatus: this.props.weekStatus,
    });

    let dataArry = this.props.employeeDay;

    setInterval(() => {
      this.setState({
        curTime: new Date(),
      });
    }, 1440000);

    if (this.props.employeeDay.length >= 1) {
      this.setState({
        employeDay: this.props.employeeDay,
      });
      if (this.props.empOldWeekStatus) {
        this.setState({
          checkIn: true,
          checkOut: true,
        });
      } else if (this.props.employeeCheckIn !== undefined) {
        if (this.props.employeeCheckIn.status == "checkIn") {
          this.setState({
            checkIn: true,
            checkOut: false,
          });
        }
      }
    }

    let total = 0;
    if (this.props.employee.timeMode === "Punch") {
      for (let i = 0; i < dataArry.length; i++) {
        if (dataArry[i].status == "checkOut") {
          total += Number(dataArry[i].dayPay);
        }
      }
    } else {
      for (let i = 0; i < dataArry.length; i++) {
        total += Number(dataArry[i].dayPay);
      }
    }

    this.setState({
      weekTotal: total.toFixed(2),
    });

    // manage breaks

    if (
      this.props.employeeCheckIn !== undefined &&
      this.props.employeeCheckIn.dayBreaks !== undefined
    ) {
      let breakData = this.props.employeeCheckIn.dayBreaks.filter(
        (item) => item.breakType === "break"
      );
      let lunchBreak = this.props.employeeCheckIn.dayBreaks.filter(
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
  };

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

  submitWeek = () => {
    this.props.history.push("/home/employee/reviewtimeline");
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

  days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  render() {
    const { classes, employee } = this.props;
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
      <Container>
        <Row>
          <Col md={12} lg={12}>
            <Card>
              <div className="invoice">
                {employee.timeMode === "Punch" ? (
                  <Fragment>
                    <div className="invoice__head">
                      <div className="invoice__head-left">
                        <h3>
                          {moment(this.state.curTime).format("MMM/DD/YYYY")}
                        </h3>
                      </div>
                      <div className="invoice__head-right">
                        <ButtonToolbar className="invoice__toolbar">
                          {this.state.checkInLoader ? (
                            <Button disabled={true} color="primary">
                              <ScaleLoader
                                sizeUnit={"12px"}
                                size={100}
                                color={"#123abc"}
                                height="15"
                              />
                            </Button>
                          ) : (
                            <Button
                              disabled={this.state.checkIn}
                              color="primary"
                              onClick={this.checkInHandler}
                            >
                              Clock-in
                            </Button>
                          )}
                          {this.state.checkOutLoader ? (
                            <Button color="primary" disabled={true}>
                              <ScaleLoader
                                sizeUnit={"12px"}
                                size={100}
                                color={"#123abc"}
                                height="15"
                              />
                            </Button>
                          ) : (
                            <Button
                              color="primary"
                              onClick={this.checkoutHandler}
                              disabled={
                                this.state.checkOut ||
                                lunchBreakStatus ||
                                breakStatus
                              }
                            >
                              Clock-out
                            </Button>
                          )}
                        </ButtonToolbar>
                      </div>
                    </div>
                    {showFacilities && this.state.checkIn && (
                      <div
                        style={{ marginBottom: "15px" }}
                        className="invoice__head-right"
                      >
                        <ButtonToolbar className="invoice__toolbar">
                          {breakLoader ? (
                            <Button disabled={true} color="primary">
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
                              outline
                              color="link"
                              onClick={
                                breakStatus
                                  ? () => this.endBreak("break")
                                  : () => this.startBreak("break")
                              }
                              className="fac-button"
                            >
                              {breakStatus ? "End Break" : "Start Break"}
                            </Button>
                          )}
                          {lunchBreakLoader ? (
                            <Button color="primary" disabled={true}>
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
                              disabled={lunchBtn ? true : breakStatus}
                              outline
                              color="link"
                              className="fac-button"
                            >
                              {lunchBreakStatus ? "End Lunch" : "Start Lunch"}
                            </Button>
                          )}
                        </ButtonToolbar>
                      </div>
                    )}

                    <Table className="table--bordered" responsive>
                      <thead>
                        <tr>
                          <th>Day</th>
                          <th>Check-in Time</th>
                          <th>Check-out Time</th>
                          <th>Total Time</th>
                          <th>Day Pay</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.employeDay.length >= 1 ? (
                          this.state.employeDay.map((day, index) => {
                            return (
                              <tr key={index}>
                                <td> {this.days[day.day]}</td>

                                <td>
                                  {day.checkInTime.seconds
                                    ? moment(day.checkInTime.toDate()).format(
                                        "hh:mm"
                                      )
                                    : moment(day.checkInTime).format("hh:mm")}
                                </td>

                                <td>
                                  {day.status == "checkOut" ? (
                                    day.checkOutTime.seconds ? (
                                      moment(day.checkOutTime.toDate()).format(
                                        "hh:mm"
                                      )
                                    ) : (
                                      moment(day.checkOutTime).format("hh:mm")
                                    )
                                  ) : (
                                    <p />
                                  )}
                                </td>
                                <td>{day.dutyTime}</td>
                                <td>$ {day.dayPay}</td>
                              </tr>
                            );
                          })
                        ) : (
                          <h4>There is no record for this week</h4>
                        )}
                      </tbody>
                    </Table>
                  </Fragment>
                ) : (
                  <ManualTime />
                )}

                <div className="invoice__total">
                  <p className="invoice__grand-total">
                    {" "}
                    Total Weekly: $ {this.state.weekTotal}
                  </p>

                  <div className={classes.submitDiv}>
                    {this.props.empOldWeekStatus && (
                      <p>You need to submit your previous records</p>
                    )}

                    <ButtonToolbar className="invoice__toolbar">
                      {this.state.submitLoader ? <CircularProgress /> : <p />}

                      <Button
                        color="primary"
                        onClick={this.submitWeek}
                        disabled={this.state.submitDisable}
                      >
                        {" "}
                        Review $ Submit
                      </Button>
                    </ButtonToolbar>
                  </div>
                  {/* ) : (
    
                      <div />
                    )} */}
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

TimeSheet.propTypes = {
  classes: PropTypes.object.isRequired,
};

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
)(withStyles(styles)(withRouter(TimeSheet)));
