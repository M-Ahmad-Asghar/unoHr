import React from "react";
import {
  Col,
  Card,
  Table,
  Container,
  Button,
  ButtonToolbar,
  Row
} from "reactstrap";
import { toast } from "react-toastify";
import moment from "moment";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import { submitRecord } from "../../../redux/actions/attendanceAction";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import { styles } from "./style";

class ReviewTimeLine extends React.Component {
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
      Monday: {
        totaltime: "nill",
        totalPay: "nill"
      },
      Tuesday: {
        totaltime: "nill",
        totalPay: "nill"
      },
      Wednesday: {
        totaltime: "nill",
        totalPay: "nill"
      },
      Thursday: {
        totaltime: "nill",
        totalPay: "nill"
      },
      Friday: {
        totaltime: "nill",
        totalPay: "nill"
      },
      Saturday: {
        totaltime: "nill",
        totalPay: "nill"
      },
      Sunday: {
        totaltime: "nill",
        totalPay: "nill"
      },
      submitDisable: false
    };
  }

  componentDidMount = () => {
    let dataArry = this.props.employeeDay;
    console.log("data in re", dataArry);

    let Monday = {
      totaltime: "0:0:0",
      totalPay: 0
    };
    let Tuesday = {
      totaltime: "0:0:0",
      totalPay: 0
    };
    let Wednesday = {
      totaltime: "0:0:0",
      totalPay: 0
    };
    let Thursday = {
      totaltime: "0:0:0",
      totalPay: 0
    };
    let Friday = {
      totaltime: "0:0:0",
      totalPay: 0
    };
    let Saturday = {
      totaltime: "0:0:0",
      totalPay: 0
    };
    let Sunday = {
      totaltime: "0:0:0",
      totalPay: 0
    };

    // let timeArry = this.props.employeeDay.dutyTime;

    if (this.props.employeeDay.length >= 1) {
      this.props.employeeDay.forEach(element => {
        if (element.type === "Punch") {
          if (element.status == "checkOut") {
            switch (element.day) {
              case 1:
                Monday.totaltime = this.calculateTotalTIime(
                  Monday.totaltime,
                  element.dutyTime
                );
                Monday.totalPay =
                  Number(Monday.totalPay) + Number(element.dayPay);
                break;
              case 2:
                Tuesday.totaltime = this.calculateTotalTIime(
                  Tuesday.totaltime,
                  element.dutyTime
                );
                Tuesday.totalPay =
                  Number(Tuesday.totalPay) + Number(element.dayPay);
                break;
              case 3:
                Wednesday.totaltime = this.calculateTotalTIime(
                  Wednesday.totaltime,
                  element.dutyTime
                );
                Wednesday.totalPay =
                  Number(Wednesday.totalPay) + Number(element.dayPay);
                break;
              case 4:
                Thursday.totaltime = this.calculateTotalTIime(
                  Thursday.totaltime,
                  element.dutyTime
                );
                Thursday.totalPay =
                  Number(Thursday.totalPay) + Number(element.dayPay);
                break;
              case 5:
                Friday.totaltime = this.calculateTotalTIime(
                  Friday.totaltime,
                  element.dutyTime
                );
                Friday.totalPay =
                  Number(Friday.totalPay) + Number(element.dayPay);
                break;
              case 6:
                Saturday.totaltime = this.calculateTotalTIime(
                  Saturday.totaltime,
                  element.dutyTime
                );
                Saturday.totalPay =
                  Number(Saturday.totalPay) + Number(element.dayPay);
                break;
              case 0:
                Sunday.totaltime = this.calculateTotalTIime(
                  Sunday.totaltime,
                  element.dutyTime
                );
                Sunday.totalPay =
                  Number(Sunday.totalPay) + Number(element.dayPay);
                break;

              default:
                break;
            }
          }
        } else {
          switch (element.day) {
            case 1:
              Monday.totaltime = this.calculateTotalTIime(
                Monday.totaltime,
                element.dutyTime
              );
              Monday.totalPay =
                Number(Monday.totalPay) + Number(element.dayPay);
              break;
            case 2:
              Tuesday.totaltime = this.calculateTotalTIime(
                Tuesday.totaltime,
                element.dutyTime
              );
              Tuesday.totalPay =
                Number(Tuesday.totalPay) + Number(element.dayPay);
              break;
            case 3:
              Wednesday.totaltime = this.calculateTotalTIime(
                Wednesday.totaltime,
                element.dutyTime
              );
              Wednesday.totalPay =
                Number(Wednesday.totalPay) + Number(element.dayPay);
              break;
            case 4:
              Thursday.totaltime = this.calculateTotalTIime(
                Thursday.totaltime,
                element.dutyTime
              );
              Thursday.totalPay =
                Number(Thursday.totalPay) + Number(element.dayPay);
              break;
            case 5:
              Friday.totaltime = this.calculateTotalTIime(
                Friday.totaltime,
                element.dutyTime
              );
              Friday.totalPay =
                Number(Friday.totalPay) + Number(element.dayPay);
              break;
            case 6:
              Saturday.totaltime = this.calculateTotalTIime(
                Saturday.totaltime,
                element.dutyTime
              );
              Saturday.totalPay =
                Number(Saturday.totalPay) + Number(element.dayPay);
              break;
            case 0:
              Sunday.totaltime = this.calculateTotalTIime(
                Sunday.totaltime,
                element.dutyTime
              );
              Sunday.totalPay =
                Number(Sunday.totalPay) + Number(element.dayPay);
              break;

            default:
              break;
          }
        }
      });

      this.setState({
        employeDay: this.props.employeeDay,
        Monday,
        Tuesday,
        Wednesday,
        Thursday,
        Friday,
        Saturday,
        Sunday
      });
    }

    let total = 0;
    console.log("=====================");
    console.log(dataArry);
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
    // for (var i = 0; i < dataArry.length; i++) {
    //   if (dataArry[i].status == "checkOut") {
    //     total += Number(dataArry[i].dayPay);
    //   }
    // }

    this.setState({
      weekTotal: total.toFixed(2)
    });
  };

  calculateTotalTIime = (totaltimes, singletime) => {
    let totalTimeSec;
    let totalTimeSecFortotaltimes;
    let totalTimeSecForsingletime;

    let time = totaltimes;
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

  componentWillReceiveProps = nextProps => {
    if (nextProps.submitStatus == "done") {
      this.setState({
        submitLoader: false
      });

      toast.success("Successfully Submitted.");

      this.props.history.push("/home/employee/timesheet");
    } else if (nextProps.submitStatus == "error") {
      this.setState({
        submitLoader: false,
        submitDisable: false
      });
      toast.error("Error occured, try again");
    }
  };

  submitWeek = () => {
    this.setState({
      submitLoader: true,
      submitDisable: true
    });

    let dataArry = this.state.employeDay;
    let totalTimeSec = 0;

    for (var i = 0; i < dataArry.length; i++) {
      if (this.props.employee.timeMode === "Punch") {
        if (dataArry[i].status == "checkOut") {
          let time = dataArry[i].dutyTime;
          let hr = Number(time.split(":")[0]);
          let min = Number(time.split(":")[1]);
          let sc = Number(time.split(":")[2]);
          let hrToSec = hr * 3600;
          let minToSec = min * 60;
          totalTimeSec += hrToSec + minToSec + sc;
        }
      } else {
        let time = dataArry[i].dutyTime;
        let hr = Number(time.split(":")[0]);
        let min = Number(time.split(":")[1]);
        let sc = Number(time.split(":")[2]);
        let hrToSec = hr * 3600;
        let minToSec = min * 60;
        totalTimeSec += hrToSec + minToSec + sc;
      }
    }

    let sec = totalTimeSec;
    let hh = Math.floor(sec / 60 / 60);
    sec -= hh * 60 * 60;
    let mm = Math.floor(sec / 60);
    sec -= mm * 60;
    let ss = Math.floor(sec);
    sec -= ss;
    let totalTime = hh + ":" + mm + ":" + ss;

    let checkInDate = [];
    for (var i = 0; i < dataArry.length; i++) {
      let date = dataArry[i].checkInTime;
      checkInDate.push(date.toDate());
    }

    var recordTo = new Date(Math.max.apply(null, checkInDate));
    var recordFrom = new Date(Math.min.apply(null, checkInDate));
    let data = {};
    if (this.props.weekStatus === undefined) {
      data = {
        grossPay: this.state.weekTotal,
        payRate: this.props.currentEmp.HourlyRate,
        totalTime: totalTimeSec,
        recordFrom: recordFrom,
        recordTo: recordTo,
        employeeUid: this.props.currentEmp.employeeid,
        empState: this.props.currentEmp.stateName,
        employerUid: this.props.currentEmp.employeruid,
        weekData: this.state.employeDay,
        submitDate: new Date().toString(),
        docid: false
      };
      console.log("undefined", data);
    } else {
      data = {
        grossPay: this.state.weekTotal,
        payRate: this.props.currentEmp.HourlyRate,
        totalTime: totalTimeSec,
        recordFrom: recordFrom,
        recordTo: recordTo,
        employeeUid: this.props.currentEmp.employeeid,
        empState: this.props.currentEmp.stateName,
        employerUid: this.props.currentEmp.employeruid,
        weekData: this.state.employeDay,
        docid: this.props.weekStatus.id,
        submitDate: new Date().toString()
      };
      console.log("not undfind", data);
    }

    this.props.submitRecord(data);
  };

  days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  render() {
    const { classes } = this.props;
    return (
      <Container>
        <Row>
          <Col md={12} lg={12}>
            <Card>
              <div className="invoice">
                <div className="invoice__head">
                  <div className="invoice__head-left">
                    <h3>Review and Submit</h3>
                  </div>
                </div>
                <Table className="table--bordered" responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Day</th>
                      <th>Total Time</th>
                      <th>Earned</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Monday</td>
                      <td>{this.state.Monday.totaltime}</td>
                      <td>$ {this.state.Monday.totalPay}</td>
                    </tr>

                    <tr>
                      <td>2</td>
                      <td>Tuesday</td>
                      <td> {this.state.Tuesday.totaltime}</td>
                      <td>$ {this.state.Tuesday.totalPay}</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Wednesday</td>
                      <td>{this.state.Wednesday.totaltime}</td>
                      <td>$ {this.state.Wednesday.totalPay}</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>Thrusday</td>
                      <td> {this.state.Thursday.totaltime}</td>
                      <td>$ {this.state.Thursday.totalPay}</td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>Friday</td>
                      <td>{this.state.Friday.totaltime}</td>
                      <td>$ {this.state.Friday.totalPay}</td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td>Seturday</td>
                      <td>{this.state.Saturday.totaltime}</td>
                      <td>$ {this.state.Saturday.totalPay}</td>
                    </tr>
                    <tr>
                      <td>7</td>
                      <td>Sunday</td>
                      <td> {this.state.Sunday.totaltime}</td>
                      <td>$ {this.state.Sunday.totalPay}</td>
                    </tr>
                  </tbody>
                </Table>
                <div className="invoice__total">
                  <p className="invoice__grand-total">
                    {" "}
                    Total Weekly: $ {this.state.weekTotal}
                  </p>
                  <ButtonToolbar className="invoice__toolbar">
                    {this.state.submitLoader ? <CircularProgress /> : <p />}

                    <Button
                      color="primary"
                      onClick={this.submitWeek}
                      disabled={this.state.submitDisable}
                    >
                      {" "}
                      Submit
                    </Button>
                  </ButtonToolbar>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

ReviewTimeLine.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProp = state => ({
  employee: state.employeeUserReducer.currentEmp,
  currentEmp: state.employeeUserReducer.currentEmp,
  done: state.attendanceReducer.done,
  submitStatus: state.attendanceReducer.submitStatus,
  employeeDay: state.attendanceReducer.employeeDay,
  employeeCheckIn: state.attendanceReducer.employeeCheckIn,
  empOldWeekStatus: state.attendanceReducer.empOldWeekStatus,
  weekStatus: state.attendanceReducer.weekStatus
});

export default connect(
  mapStateToProp,
  { submitRecord }
)(withStyles(styles)(ReviewTimeLine));
