import React, { Fragment } from "react";
import {
  Col,
  Card,
  Table,
  Container,
  Button,
  ButtonToolbar,
  Row
} from "reactstrap";
import moment from "moment";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import { BeatLoader } from "react-spinners";

import {
  getEmployeStatus,
  changeTime,
  changeTimeMode
} from "../../../../redux/actions/employerActions";

import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import { styles } from "./style";
import SearchBar from "../../../employeer/MainTask/SearchBar";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserEdit } from "@fortawesome/free-solid-svg-icons";

import TextField from "@material-ui/core/TextField";

library.add(faUserEdit);

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
      totalTime: "",
      submitLoader: false,
      loader: true,
      searchQuery: "",
      timeMode: "",
      changeTimeMode: false,
      timeModeLoader: false,
      empDocId: "",
      dbTimeMode: "",
      empId: ""
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log("===========nextProps.employeeDay========================");
    console.log(nextProps.employeeDay);
    console.log("====================================");

    if (nextProps.emplDayDone == "done") {
      this.setState({
        loader: false
      });
    } else if (nextProps.emplDayDone == "error") {
      this.setState({
        loader: false
      });
    }

    this.setState({
      employeDay: nextProps.employeeDay
    });

    // calculate total
    let dataArry = nextProps.employeeDay;
    let total = 0;
    let totalTimeSec = 0;
    for (var i = 0; i < dataArry.length; i++) {
      if (dataArry[i].status == "checkOut") {
        total += Number(dataArry[i].dayPay);
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

    this.setState({
      weekTotal: total.toFixed(2),
      totalTime: totalTime
    });

    // change time mode handlers from employer reducer
    if (nextProps.changeTimeModeStatus === "done") {
      this.setState({
        dbTimeMode: this.state.timeMode,
        timeModeLoader: false,
        changeTimeMode: false
      });
    } else {
      this.setState({
        timeModeLoader: false
      });
    }
  }

  componentDidMount = () => {
    this.props.getEmployeStatus(this.props.location.id);
    this.setState({
      timeMode: this.props.location.state,
      dbTimeMode: this.props.location.state,
      empDocId: this.props.location.docId,
      empId: this.props.location.id
    });
    setInterval(() => {
      this.setState({
        curTime: new Date()
      });
    }, 1440000);
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

  filterMessages = query => {
    this.setState({
      searchQuery: query
    });
  };

  searchingForName = searchQuery => {
    let days = this.days;
    return function(employeeTask) {
      return (
        days[employeeTask.day]
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        employeeTask.checkInLoc
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        !searchQuery
      );
    };
  };

  timeModeChange = () => {
    let data = {
      empDocId: this.state.empDocId,
      timeMode: this.state.timeMode,
      empId: this.state.empId
    };
    console.log("data for cahan", data);
    let checkInObj = this.state.employeDay.filter(
      item => item.status === "checkIn"
    );

    if (checkInObj.length > 0) {
      this.props.changeTimeMode(data);
      console.log("checkinObj");
    } else {
      this.props.changeTime(data);
    }

    this.setState({
      timeModeLoader: true
    });
  };

  render() {
    const { classes } = this.props;
    const {
      searchQuery,
      timeMode,
      changeTimeMode,
      timeModeLoader,
      dbTimeMode
    } = this.state;

    return (
      <Container>
        <Row>
          <Col md={12} lg={12}>
            <Card>
              <div className="invoice">
                {/* <div className="invoice__head">
                  <div className="invoice__head-left">
                    <SearchBar  title={moment(this.state.curTime).format("MMM/DD/YYYY")} filter={this.filterMessages} placeholder='Search by Day, Location' />
                  </div>
                </div> */}
                <Table className="table--bordered" responsive>
                  <thead>
                    <tr>
                      <th>Day</th>
                      <th>Location</th>
                      <th>Check-in Time</th>
                      <th>Check-out Time</th>
                      <th>Total Time</th>
                      <th>Day Pay</th>
                    </tr>
                  </thead>
                  {this.state.loader ? (
                    // <div>
                    <tbody>
                      <tr>
                        <td />
                        <td />
                        <td />
                        <td
                          style={{
                            justifyContent: "center",
                            marginTop: "35px"
                          }}
                        >
                          <div style={{ marginTop: "35px" }}>
                            <CircularProgress />
                          </div>
                        </td>

                        <td />
                        <td />
                      </tr>
                    </tbody>
                  ) : // </div>
                  this.state.employeDay.length >= 1 ? (
                    this.state.employeDay
                      .filter(this.searchingForName(searchQuery))
                      .map((day, index) => {
                        return (
                          <tbody>
                            <tr key={index}>
                              <td> {this.days[day.day]}</td>

                              <td>{day.checkInLoc.split(",")[0]}</td>

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
                          </tbody>
                        );
                      })
                  ) : (
                    <h4>There is no record for this week</h4>
                  )}
                </Table>
                <div className="invoice__total">
                  <p className="invoice__grand-total">
                    Total Weekly: $ {this.state.weekTotal}
                  </p>
                </div>

                <div
                  className="invoice__total"
                  style={{cursor: "pointer"}}
                  onClick={() =>
                    this.setState({
                      changeTimeMode: !this.state.changeTimeMode
                    })
                  }
                >
                  <span style={{ marginRight: "25px" }}>
                    Time Mode: {timeMode}
                  </span>
                  <FontAwesomeIcon
                    icon="user-edit"
                    size="lg"
                    onClick={() =>
                      this.setState({
                        changeTimeMode: !this.state.changeTimeMode
                      })
                    }
                  />
                </div>
                {changeTimeMode && (
                  <Fragment>
                    <div className="invoice__total">
                      <TextField
                        id="outlined-select-currency"
                        select
                        label="Change Time Mode"
                        style={{ textAlign: "left" }}
                        className={classes.textField}
                        value={timeMode}
                        onChange={e =>
                          this.setState({
                            timeMode: e.target.value
                          })
                        }
                        SelectProps={{
                          MenuProps: {
                            className: classes.menu
                          }
                        }}
                        helperText="Change the time Mode of current employee"
                        margin="normal"
                        variant="outlined"
                      >
                        <MenuItem disabled key={timeMode} value={timeMode}>
                          {timeMode}
                        </MenuItem>
                        <MenuItem
                          key={timeMode === "Punch" ? "Manual" : "Punch"}
                          value={timeMode === "Punch" ? "Manual" : "Punch"}
                        >
                          {timeMode === "Punch" ? "Manual" : "Punch"}
                        </MenuItem>
                      </TextField>

                      <div>
                        {timeModeLoader ? (
                          <Button
                            disabled
                            variant="outlined"
                            style={{ marginTop: "19px", width: "26%" }}
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
                              paddingBottom: "5px",
                              width: "26%"
                            }}
                            disabled={dbTimeMode === timeMode}
                            color="primary"
                            onClick={this.timeModeChange}
                          >
                            Change Time Mode
                          </Button>
                        )}
                      </div>
                    </div>
                  </Fragment>
                )}
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

TimeSheet.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProp = state => ({
  employeeDay: state.employerReducer.employeeDay,
  emplDayDone: state.employerReducer.emplDayDone,
  changeTimeModeStatus: state.employerReducer.changeTimeModeStatus,
  loader: state.employerReducer.loader
});

export default connect(
  mapStateToProp,
  { getEmployeStatus, changeTime, changeTimeMode }
)(withStyles(styles)(TimeSheet));
