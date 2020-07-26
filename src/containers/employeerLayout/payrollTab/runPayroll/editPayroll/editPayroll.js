import React, { Component, Fragment } from "react";
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
  Collapse
} from "reactstrap";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import renderTimePickerField from "../../../../../shared/components/form/TimePicker";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
// import {
//   updateAttnd,
//   recordAttendence,
//   setDefault
// } from "../../../redux/actions/attendanceAction";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";

class EditPayroll extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mondayClp: false,
      tuesdayClp: false,
      wednesdayClp: false,
      thursdayClp: false,
      fridayClp: false,
      seturdayClp: false,
      sundayClp: false,
      mondayStartTime: {},
      mondayEndTime: {},
      tuesdayStartTime: {},
      tuesdayEndTime: {},
      wednesdayStartTime: {},
      wednesdayEndTime: {},
      thursdayStartTime: {},
      thursdayEndTime: {},
      fridayStartTime: {},
      fridayEndTime: {},
      saturdayStartTime: {},
      saturdayEndTime: {},
      sundayStartTime: {},
      sundayEndTime: {},
      open: false,
      loader: "",
      totalTime: {
        monday: "hh:mm:ss",
        tuesday: "hh:mm:ss",
        wednesday: "hh:mm:ss",
        thursday: "hh:mm:ss",
        friday: "hh:mm:ss",
        saturday: "hh:mm:ss",
        sunday: "hh:mm:ss"
      },
      dayEarn: {
        monday: "0.00",
        tuesday: "0.00",
        wednesday: "0.00",
        thursday: "0.00",
        friday: "0.00",
        saturday: "0.00",
        sunday: "0.00"
      },
      days: [],
      weekData: [],
      payPeriod: {}
    };
  }

  markAttendence(startTime, EndTime, day) {
    let CheckInTime = this.state[startTime];
    let CheckOutTime = this.state[EndTime];

    if (
      CheckOutTime.getTime === undefined ||
      CheckInTime.getTime === undefined
    ) {
      toast.error("Invalid Starting/Ending Time");
    } else {
      // this.setState({
      //   loader: this.dayNames[day]
      // });
      console.log("CheckInTime", CheckInTime);

      if (CheckOutTime < CheckInTime) {
        CheckOutTime.setDate(CheckOutTime.getDate() + 1);
      }
      let diffString = CheckOutTime - CheckInTime;

      let diff = Number(diffString);

      let msec = diff;

      let hh = Number(Math.floor(msec / 1000 / 60 / 60));

      msec -= hh * 1000 * 60 * 60;
      let mm = Number(Math.floor(msec / 1000 / 60));

      msec -= mm * 1000 * 60;
      let ss = Number(Math.floor(msec / 1000));

      msec -= ss * 1000;

      let dutyTime = hh + ":" + mm + ":" + ss;
      console.log("==============dutyTime======================", dutyTime);
      console.log(typeof dutyTime);

      let hourlyPayRate = Number(this.state.payPeriod.payRate);

      console.log("hRate", hourlyPayRate);

      let hrPay = hh * hourlyPayRate;
      let minPay = mm * (hourlyPayRate / 60);
      let ssPay = ss * (hourlyPayRate / 3600);

      let income = hrPay + minPay + ssPay;

      let dayPay = income.toFixed(2);

      let checkOutData = {
        checkOutTime: CheckOutTime,
        checkInTime: CheckInTime,
        checkOutLocation: "Desktop",
        dutyTime: dutyTime,
        dayPay: dayPay,
        day: day,
        employeeUid: this.props.currentEmp.employeeid,
        employerUid: this.props.currentEmp.employeruid,
        type: "Manual"
      };
      console.log("fData", this.state.weekData);

      let remainingPayPeriods = this.state.weekData.filter(
        item => item.day !== day
      );
      remainingPayPeriods.push(checkOutData);
      console.log("new Week", remainingPayPeriods);

      let obj = {};
      let earnObj = {};
      let getKey = this.dayNames[day];
      console.log("getKey", getKey);

      obj = { ...obj, [getKey]: dutyTime };
      earnObj = { ...earnObj, [getKey]: dayPay };
      this.props.updateTotalTime(remainingPayPeriods);
      this.setState({
        totalTime: { ...this.state.totalTime, ...obj },
        dayEarn: { ...this.state.dayEarn, ...earnObj },
        weekData: remainingPayPeriods
      });
    }
  }

  componentDidMount = () => {
    let weekData = this.props.weekData;
    let payPeriod = this.props.payPeriod;
    console.log("weeD", weekData);

    let totalTime = {
      monday: "0:0:0",
      tuesday: "0:0:0",
      wednesday: "0:0:0",
      thursday: "0:0:0",
      friday: "0:0:0",
      saturday: "0:0:0",
      sunday: "0:0:0"
    };
    let dayEarn = {
      monday: "0.00",
      tuesday: "0.00",
      wednesday: "0.00",
      thursday: "0.00",
      friday: "0.00",
      saturday: "0.00",
      sunday: "0.00"
    };
    weekData.forEach(element => {
      switch (element.day) {
        case 1:
          totalTime.monday = this.calculateTotalTIime(
            totalTime.monday,
            element.dutyTime
          );
          dayEarn.monday = Number(dayEarn.monday) + Number(element.dayPay);
          break;
        case 2:
          totalTime.tuesday = this.calculateTotalTIime(
            totalTime.tuesday,
            element.dutyTime
          );
          dayEarn.tuesday = Number(dayEarn.tuesday) + Number(element.dayPay);
          break;
        case 3:
          totalTime.wednesday = this.calculateTotalTIime(
            totalTime.wednesday,
            element.dutyTime
          );
          dayEarn.wednesday =
            Number(dayEarn.wednesday) + Number(element.dayPay);
          break;
        case 4:
          totalTime.thursday = this.calculateTotalTIime(
            totalTime.thursday,
            element.dutyTime
          );
          dayEarn.thursday = Number(dayEarn.thursday) + Number(element.dayPay);
          break;
        case 5:
          totalTime.friday = this.calculateTotalTIime(
            totalTime.friday,
            element.dutyTime
          );
          dayEarn.friday = Number(dayEarn.friday) + Number(element.dayPay);
          break;
        case 6:
          totalTime.saturday = this.calculateTotalTIime(
            totalTime.saturday,
            element.dutyTime
          );
          dayEarn.saturday = Number(dayEarn.saturday) + Number(element.dayPay);
          break;
        case 0:
          totalTime.sunday = this.calculateTotalTIime(
            totalTime.sunday,
            element.dutyTime
          );
          dayEarn.sunday = Number(dayEarn.sunday) + Number(element.dayPay);
          break;

        default:
          break;
      }
    });

    this.setState({
      totalTime,
      dayEarn,
      weekData,
      payPeriod
    });
  };

  calculateTotalTIime = (totaltimes, singletime) => {
    let totalTimeSec;
    let totalTimeSecFortotaltimes;
    let totalTimeSecForsingletime;

    let time = totaltimes;
    console.log("totaltimes", totaltimes);
    console.log("singletime", singletime);

    let hr = Number(time.split(":")[0]);
    let min = Number(time.split(":")[1]);
    let sc = Number(time.split(":")[2]);
    let hrToSec = hr * 3600;
    let minToSec = min * 60;
    totalTimeSecFortotaltimes = hrToSec + minToSec + sc;

    let time1 = singletime;
    let hr1 = Number(time1.split(":")[0]);
    let min1 = Number(time1.split(":")[1]);
    let sc1 = Number(time1.split(":")[2]);
    let hrToSec1 = hr1 * 3600;
    let minToSec1 = min1 * 60;
    totalTimeSecForsingletime = hrToSec1 + minToSec1 + sc1;
    totalTimeSec = totalTimeSecForsingletime + totalTimeSecFortotaltimes;

    let sec = totalTimeSec;
    let hh = Math.floor(sec / 60 / 60);
    sec -= hh * 60 * 60;
    let mm = Math.floor(sec / 60);
    sec -= mm * 60;
    let ss = Math.floor(sec);
    sec -= ss;
    let totalTime = hh + ":" + mm + ":" + ss;
    return totalTime;
  };
  dayNames = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday"
  ];

  render() {
    const {
      mondayClp,
      tuesdayClp,
      wednesdayClp,
      thursdayClp,
      fridayClp,
      seturdayClp,
      sundayClp,
      loader,
      totalTime,
      dayEarn
    } = this.state;
    const { empOldWeekStatus } = this.props;

    return (
      <Fragment>
        <CardHeader>
          <Row>
            <Col xs={4} sm={4} md={4} lg={4} xl={4}>
              <h5>
                <strong> Day </strong>
              </h5>
            </Col>
            <Col xs={4} sm={4} md={4} lg={4} xl={4}>
              <h5>
                <strong> Total Time </strong>{" "}
              </h5>
            </Col>

            <Col xs={4} sm={4} md={4} lg={4} xl={4}>
              <h5>
                <strong> Total Earned </strong>{" "}
              </h5>
            </Col>
          </Row>
        </CardHeader>
        {/* monday manual attendence */}
        <Row
          className="taskRow"
          onClick={() =>
            this.setState({
              mondayClp: !mondayClp
            })
          }
        >
          <Col className="taskCol" xs={4} sm={4} md={4} lg={4} xl={4}>
            <p>Monday</p>
          </Col>
          <Col className="taskCol" xs={4} sm={4} md={4} lg={4} xl={4}>
            <p>{totalTime.monday}</p>
          </Col>

          <Col className="taskCol" xs={4} sm={4} md={4} lg={4} xl={4}>
            <p>$ {dayEarn.monday}</p>
          </Col>

          <Col sm={12} md={12} lg={12} xl={12} />
        </Row>
        <Divider />
        <Collapse isOpen={mondayClp}>
          <Row style={{ backgroundColor: "#f2f4f7" }} className="taskRow">
            <Col
              sm={12}
              md={12}
              lg={5}
              style={{
                textAlign: "center",
                marginTop: "15px"
              }}
            >
              <span>Starting Time</span>
              <Field
                name="new"
                onChange={e => {
                  this.setState({
                    mondayStartTime: e._d
                  });
                }}
                margin="normal"
                component={renderTimePickerField}
                timeMode
                disabled={empOldWeekStatus}
              />
            </Col>
            <Col
              sm={12}
              md={12}
              lg={5}
              style={{
                textAlign: "center",
                marginTop: "15px"
              }}
            >
              <span>Ending Time</span>
              <Field
                name="new"
                onChange={e => {
                  this.setState({
                    mondayEndTime: e._d
                  });
                  console.log("time for", e);
                }}
                margin="normal"
                component={renderTimePickerField}
                timeMode
                disabled={empOldWeekStatus}
              />
            </Col>
            <Col
              sm={12}
              md={12}
              lg={2}
              style={{
                textAlign: "center",
                marginTop: "15px"
              }}
            >
              {loader === "monday" ? (
                <Button
                  disabled
                  variant="outlined"
                  style={{ marginTop: "19px" }}
                  color="primary"
                >
                  <BeatLoader color={"#123abc"} />
                </Button>
              ) : (
                <Button
                  style={{
                    marginTop: "19px",
                    height: "33px",
                    paddingTop: "5px",
                    paddingBottom: "5px"
                  }}
                  disabled={empOldWeekStatus}
                  color="primary"
                  onClick={() =>
                    this.markAttendence("mondayStartTime", "mondayEndTime", 1)
                  }
                >
                  Update
                </Button>
              )}
            </Col>
          </Row>
        </Collapse>
        <Divider />
        {/* end monday manual attendence */}

        {/* tuesday manual attendence */}
        <Row
          className="taskRow"
          onClick={() =>
            this.setState({
              tuesdayClp: !tuesdayClp
            })
          }
        >
          <Col className="taskCol" xs={4} sm={4} md={4} lg={4} xl={4}>
            <p>Tuesday</p>
          </Col>
          <Col className="taskCol" xs={4} sm={4} md={4} lg={4} xl={4}>
            <p>{totalTime.tuesday}</p>
          </Col>

          <Col className="taskCol" xs={4} sm={4} md={4} lg={4} xl={4}>
            <p>$ {dayEarn.tuesday}</p>
          </Col>

          <Col sm={12} md={12} lg={12} xl={12} />
        </Row>
        <Divider />
        <Collapse isOpen={tuesdayClp}>
          <Row style={{ backgroundColor: "#f2f4f7" }} className="taskRow">
            <Col
              sm={12}
              md={12}
              lg={5}
              style={{
                textAlign: "center",
                marginTop: "15px"
              }}
            >
              <span>Starting Time</span>
              <Field
                name="new"
                onChange={e => {
                  this.setState({
                    tuesdayStartTime: e._d
                  });
                }}
                margin="normal"
                component={renderTimePickerField}
                timeMode
                disabled={empOldWeekStatus}
              />
            </Col>
            <Col
              sm={12}
              md={12}
              lg={5}
              style={{
                textAlign: "center",
                marginTop: "15px"
              }}
            >
              <span>Ending Time</span>
              <Field
                name="new"
                onChange={e => {
                  this.setState({
                    tuesdayEndTime: e._d
                  });
                  console.log("time for", e);
                }}
                margin="normal"
                component={renderTimePickerField}
                timeMode
                disabled={empOldWeekStatus}
              />
            </Col>
            <Col
              sm={12}
              md={12}
              lg={2}
              style={{
                textAlign: "center",
                marginTop: "15px"
              }}
            >
              {loader === "tuesday" ? (
                <Button
                  disabled
                  style={{ marginTop: "19px" }}
                  variant="outlined"
                  color="primary"
                >
                  <BeatLoader color={"#123abc"} />
                </Button>
              ) : (
                <Button
                  style={{
                    marginTop: "19px",
                    height: "33px",
                    paddingTop: "5px",
                    paddingBottom: "5px"
                  }}
                  disabled={empOldWeekStatus}
                  color="primary"
                  onClick={() =>
                    this.markAttendence("tuesdayStartTime", "tuesdayEndTime", 2)
                  }
                >
                  Update
                </Button>
              )}
            </Col>
          </Row>
        </Collapse>
        <Divider />
        {/* end monday manual attendence */}
        {/* monday manual attendence */}
        <Row
          className="taskRow"
          onClick={() =>
            this.setState({
              wednesdayClp: !wednesdayClp
            })
          }
        >
          <Col className="taskCol" xs={4} sm={4} md={4} lg={4} xl={4}>
            <p>Wednesday</p>
          </Col>
          <Col className="taskCol" xs={4} sm={4} md={4} lg={4} xl={4}>
            <p>{totalTime.wednesday}</p>
          </Col>

          <Col className="taskCol" xs={4} sm={4} md={4} lg={4} xl={4}>
            <p>$ {dayEarn.wednesday}</p>
          </Col>

          <Col sm={12} md={12} lg={12} xl={12} />
        </Row>
        <Divider />
        <Collapse isOpen={wednesdayClp}>
          <Row style={{ backgroundColor: "#f2f4f7" }} className="taskRow">
            <Col
              sm={12}
              md={12}
              lg={5}
              style={{
                textAlign: "center",
                marginTop: "15px"
              }}
            >
              <span>Starting Time</span>
              <Field
                name="new"
                onChange={e => {
                  this.setState({
                    wednesdayStartTime: e._d
                  });
                }}
                margin="normal"
                component={renderTimePickerField}
                timeMode
                disabled={empOldWeekStatus}
              />
            </Col>
            <Col
              sm={12}
              md={12}
              lg={5}
              style={{
                textAlign: "center",
                marginTop: "15px"
              }}
            >
              <span>Ending Time</span>
              <Field
                name="new"
                onChange={e => {
                  this.setState({
                    wednesdayEndTime: e._d
                  });
                  console.log("time for", e);
                }}
                margin="normal"
                component={renderTimePickerField}
                timeMode
                disabled={empOldWeekStatus}
              />
            </Col>
            <Col
              sm={12}
              md={12}
              lg={2}
              style={{
                textAlign: "center",
                marginTop: "15px"
              }}
            >
              {loader === "wednesday" ? (
                <Button
                  disabled
                  style={{ marginTop: "19px" }}
                  variant="outlined"
                  color="primary"
                >
                  <BeatLoader color={"#123abc"} />
                </Button>
              ) : (
                <Button
                  style={{
                    marginTop: "19px",
                    height: "33px",
                    paddingTop: "5px",
                    paddingBottom: "5px"
                  }}
                  disabled={empOldWeekStatus}
                  color="primary"
                  onClick={() =>
                    this.markAttendence(
                      "wednesdayStartTime",
                      "wednesdayEndTime",
                      3
                    )
                  }
                >
                  Update
                </Button>
              )}
            </Col>
          </Row>
        </Collapse>
        <Divider />
        {/* end monday manual attendence */}
        {/* monday manual attendence */}
        <Row
          className="taskRow"
          onClick={() =>
            this.setState({
              thursdayClp: !thursdayClp
            })
          }
        >
          <Col className="taskCol" xs={4} sm={4} md={4} lg={4} xl={4}>
            <p>Thursday</p>
          </Col>
          <Col className="taskCol" xs={4} sm={4} md={4} lg={4} xl={4}>
            <p>{totalTime.thursday}</p>
          </Col>

          <Col className="taskCol" xs={4} sm={4} md={4} lg={4} xl={4}>
            <p>$ {dayEarn.thursday}</p>
          </Col>

          <Col sm={12} md={12} lg={12} xl={12} />
        </Row>
        <Divider />
        <Collapse isOpen={thursdayClp}>
          <Row style={{ backgroundColor: "#f2f4f7" }} className="taskRow">
            <Col
              sm={12}
              md={12}
              lg={5}
              style={{
                textAlign: "center",
                marginTop: "15px"
              }}
            >
              <span>Starting Time</span>
              <Field
                name="new"
                onChange={e => {
                  this.setState({
                    thursdayStartTime: e._d
                  });
                  console.log("startTime", e._d);
                }}
                margin="normal"
                component={renderTimePickerField}
                timeMode
                disabled={empOldWeekStatus}
              />
            </Col>
            <Col
              sm={12}
              md={12}
              lg={5}
              style={{
                textAlign: "center",
                marginTop: "15px"
              }}
            >
              <span>Ending Time</span>
              <Field
                name="new"
                onChange={e => {
                  this.setState({
                    thursdayEndTime: e._d
                  });
                  console.log("end", e);
                }}
                margin="normal"
                component={renderTimePickerField}
                timeMode
                disabled={empOldWeekStatus}
              />
            </Col>
            <Col
              sm={12}
              md={12}
              lg={2}
              style={{
                textAlign: "center",
                marginTop: "15px"
              }}
            >
              {loader === "thursday" ? (
                <Button
                  disabled
                  style={{ marginTop: "19px" }}
                  variant="outlined"
                  color="primary"
                >
                  <BeatLoader color={"#123abc"} />
                </Button>
              ) : (
                <Button
                  style={{
                    marginTop: "19px",
                    height: "33px",
                    paddingTop: "5px",
                    paddingBottom: "5px"
                  }}
                  disabled={empOldWeekStatus}
                  color="primary"
                  onClick={() =>
                    this.markAttendence(
                      "thursdayStartTime",
                      "thursdayEndTime",
                      4
                    )
                  }
                >
                  Update
                </Button>
              )}
            </Col>
          </Row>
        </Collapse>
        <Divider />
        {/* end monday manual attendence */}
        {/* monday manual attendence */}
        <Row
          className="taskRow"
          onClick={() =>
            this.setState({
              fridayClp: !fridayClp
            })
          }
        >
          <Col className="taskCol" xs={4} sm={4} md={4} lg={4} xl={4}>
            <p>Friday</p>
          </Col>
          <Col className="taskCol" xs={4} sm={4} md={4} lg={4} xl={4}>
            <p>{totalTime.friday}</p>
          </Col>

          <Col className="taskCol" xs={4} sm={4} md={4} lg={4} xl={4}>
            <p>$ {dayEarn.friday}</p>
          </Col>

          <Col sm={12} md={12} lg={12} xl={12} />
        </Row>
        <Divider />
        <Collapse isOpen={fridayClp}>
          <Row style={{ backgroundColor: "#f2f4f7" }} className="taskRow">
            <Col
              sm={12}
              md={12}
              lg={5}
              style={{
                textAlign: "center",
                marginTop: "15px"
              }}
            >
              <span>Starting Time</span>
              <Field
                name="new"
                onChange={e => {
                  this.setState({
                    fridayStartTime: e._d
                  });
                }}
                margin="normal"
                component={renderTimePickerField}
                timeMode
                disabled={empOldWeekStatus}
              />
            </Col>
            <Col
              sm={12}
              md={12}
              lg={5}
              style={{
                textAlign: "center",
                marginTop: "15px"
              }}
            >
              <span>Ending Time</span>
              <Field
                name="new"
                onChange={e => {
                  this.setState({
                    fridayEndTime: e._d
                  });
                  console.log("time for", e);
                }}
                margin="normal"
                component={renderTimePickerField}
                timeMode
                disabled={empOldWeekStatus}
              />
            </Col>
            <Col
              sm={12}
              md={12}
              lg={2}
              style={{
                textAlign: "center",
                marginTop: "15px"
              }}
            >
              {loader === "friday" ? (
                <Button
                  disabled
                  style={{ marginTop: "19px" }}
                  variant="outlined"
                  color="primary"
                >
                  <BeatLoader color={"#123abc"} />
                </Button>
              ) : (
                <Button
                  style={{
                    marginTop: "19px",
                    height: "33px",
                    paddingTop: "5px",
                    paddingBottom: "5px"
                  }}
                  disabled={empOldWeekStatus}
                  color="primary"
                  onClick={() =>
                    this.markAttendence("fridayStartTime", "fridayEndTime", 5)
                  }
                >
                  Update
                </Button>
              )}
            </Col>
          </Row>
        </Collapse>
        <Divider />
        {/* end monday manual attendence */}
        {/* monday manual attendence */}
        <Row
          className="taskRow"
          onClick={() =>
            this.setState({
              seturdayClp: !seturdayClp
            })
          }
        >
          <Col className="taskCol" xs={4} sm={4} md={4} lg={4} xl={4}>
            <p>Saturday</p>
          </Col>
          <Col className="taskCol" xs={4} sm={4} md={4} lg={4} xl={4}>
            <p>{totalTime.saturday}</p>
          </Col>

          <Col className="taskCol" xs={4} sm={4} md={4} lg={4} xl={4}>
            <p>$ {dayEarn.saturday}</p>
          </Col>

          <Col sm={12} md={12} lg={12} xl={12} />
        </Row>
        <Divider />
        <Collapse isOpen={seturdayClp}>
          <Row style={{ backgroundColor: "#f2f4f7" }} className="taskRow">
            <Col
              sm={12}
              md={12}
              lg={5}
              style={{
                textAlign: "center",
                marginTop: "15px"
              }}
            >
              <span>Starting Time</span>
              <Field
                name="new"
                onChange={e => {
                  this.setState({
                    saturdayStartTime: e._d
                  });
                }}
                margin="normal"
                component={renderTimePickerField}
                timeMode
                disabled={empOldWeekStatus}
              />
            </Col>
            <Col
              sm={12}
              md={12}
              lg={5}
              style={{
                textAlign: "center",
                marginTop: "15px"
              }}
            >
              <span>Ending Time</span>
              <Field
                name="new"
                onChange={e => {
                  this.setState({
                    saturdayEndTime: e._d
                  });
                  console.log("time for", e);
                }}
                margin="normal"
                component={renderTimePickerField}
                timeMode
                disabled={empOldWeekStatus}
              />
            </Col>
            <Col
              sm={12}
              md={12}
              lg={2}
              style={{
                textAlign: "center",
                marginTop: "15px"
              }}
            >
              {loader === "saturday" ? (
                <Button
                  disabled
                  style={{ marginTop: "19px" }}
                  variant="outlined"
                  color="primary"
                >
                  <BeatLoader color={"#123abc"} />
                </Button>
              ) : (
                <Button
                  style={{
                    marginTop: "19px",
                    height: "33px",
                    paddingTop: "5px",
                    paddingBottom: "5px"
                  }}
                  disabled={empOldWeekStatus}
                  color="primary"
                  onClick={() =>
                    this.markAttendence(
                      "saturdayStartTime",
                      "saturdayEndTime",
                      6
                    )
                  }
                >
                  Update
                </Button>
              )}
            </Col>
          </Row>
        </Collapse>
        <Divider />
        {/* end monday manual attendence */}
        {/* monday manual attendence */}
        <Row
          className="taskRow"
          onClick={() =>
            this.setState({
              sundayClp: !sundayClp
            })
          }
        >
          <Col className="taskCol" xs={4} sm={4} md={4} lg={4} xl={4}>
            <p>Sunday</p>
          </Col>
          <Col className="taskCol" xs={4} sm={4} md={4} lg={4} xl={4}>
            <p>{totalTime.sunday}</p>
          </Col>

          <Col className="taskCol" xs={4} sm={4} md={4} lg={4} xl={4}>
            <p>$ {dayEarn.sunday}</p>
          </Col>

          <Col sm={12} md={12} lg={12} xl={12} />
        </Row>
        <Divider />
        <Collapse isOpen={sundayClp}>
          <Row style={{ backgroundColor: "#f2f4f7" }} className="taskRow">
            <Col
              sm={12}
              md={12}
              lg={5}
              style={{
                textAlign: "center",
                marginTop: "15px"
              }}
            >
              <span>Starting Time</span>
              <Field
                name="new"
                onChange={e => {
                  this.setState({
                    sundayStartTime: e._d
                  });
                }}
                margin="normal"
                component={renderTimePickerField}
                timeMode
                disabled={empOldWeekStatus}
              />
            </Col>
            <Col
              sm={12}
              md={12}
              lg={5}
              style={{
                textAlign: "center",
                marginTop: "15px"
              }}
            >
              <span>Ending Time</span>
              <Field
                name="new"
                onChange={e => {
                  this.setState({
                    sundayEndTime: e._d
                  });
                  console.log("time for", e);
                }}
                margin="normal"
                component={renderTimePickerField}
                timeMode
                disabled={empOldWeekStatus}
              />
            </Col>
            <Col
              sm={12}
              md={12}
              lg={2}
              style={{
                textAlign: "center",
                marginTop: "15px"
              }}
            >
              {loader === "sunday" ? (
                <Button
                  disabled
                  style={{ marginTop: "19px" }}
                  variant="outlined"
                  color="primary"
                >
                  <BeatLoader color={"#123abc"} />
                </Button>
              ) : (
                <Button
                  style={{
                    marginTop: "19px",
                    height: "33px",
                    paddingTop: "5px",
                    paddingBottom: "5px"
                  }}
                  disabled={empOldWeekStatus}
                  color="primary"
                  onClick={() =>
                    this.markAttendence("sundayStartTime", "sundayEndTime", 0)
                  }
                >
                  Update
                </Button>
              )}
            </Col>
          </Row>
        </Collapse>

        <Divider />
        {/* end monday manual attendence */}
      </Fragment>
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
  submitDayStatus: state.attendanceReducer.submitDayStatus
});

export default connect(
  mapStateToProp
  // { recordAttendence, setDefault, updateAttnd }
)(
  reduxForm({
    form: "time_picker_form" // a unique identifier for this form
  })(EditPayroll)
);
