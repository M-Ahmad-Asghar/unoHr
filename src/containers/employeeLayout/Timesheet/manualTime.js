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
import renderTimePickerField from "../../../shared/components/form/TimePicker";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import {
  employeCheckIn,
  submitRecord,
  updateAttnd,
  recordAttendence,
  setDefault
} from "../../../redux/actions/attendanceAction";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";

class ManualTime extends Component {
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
      days: []
    };
  }

  setOpen = ({ open }) => {
    this.setState({ open });
  };

  markAttendence(startTime, EndTime, day) {
    let CheckInTime = this.state[startTime];
    let CheckOutTime = this.state[EndTime];

    if (
      CheckOutTime.getTime === undefined ||
      CheckInTime.getTime === undefined
    ) {
      toast.error("Invalid Starting/Ending Time");
    } else {
      this.setState({
        loader: this.dayNames[day]
      });
     

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
    

      let hourlyPayRate = Number(this.props.currentEmp.HourlyRate);

   

      let hrPay = hh * hourlyPayRate;
      let minPay = mm * (hourlyPayRate / 60);
      let ssPay = ss * (hourlyPayRate / 3600);

      let income = hrPay + minPay + ssPay;

      let dayPay = income.toFixed(2);

      if (this.state.days.includes(day)) {
        let preAttd = this.props.employeeDay.filter(item => item.day === day);

        let checkOutData = {
          checkOutTime: CheckOutTime,
          checkInTime: CheckInTime,
          checkOutLocation: "Desktop",
          checkInLoc: "Desktop",
          dutyTime: dutyTime,
          dayPay: dayPay,
          day: day,
          employeeUid: this.props.currentEmp.employeeid,
          employerUid: this.props.currentEmp.employeruid,
          type: "Manual",
          status: "checkOut",
          id: preAttd[0].id
        };
       
        this.props.updateAttnd(checkOutData);
      } else {
        let checkOutData = {
          checkOutTime: CheckOutTime,
          checkInTime: CheckInTime,
          checkOutLocation: "Desktop",
          checkInLoc: "Desktop",
          dutyTime: dutyTime,
          status: "checkOut",
          dayPay: dayPay,
          day: day,
          employeeUid: this.props.currentEmp.employeeid,
          employerUid: this.props.currentEmp.employeruid,
          type: "Manual"
        };
     
        this.props.recordAttendence(checkOutData);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.submitDayStatus === "done" ||
      nextProps.submitDayStatus === "error"
    ) {
      this.setState({
        loader: ""
      });
      this.props.setDefault();
    }
    let obj = {};
    let earnObj = {};
    let days = [];
    nextProps.employeeDay.forEach(element => {
      let getKey = this.dayNames[element.day];
      obj = { ...obj, [getKey]: element.dutyTime };
      earnObj = { ...earnObj, [getKey]: element.dayPay };
      days.push(element.day);
    });
    this.setState({
      totalTime: { ...this.state.totalTime, ...obj },
      dayEarn: { ...this.state.dayEarn, ...earnObj },
      days
    });
  }

  componentDidMount() {
   
    let obj = {};
    let earnObj = {};
    let days = [];
    this.props.employeeDay.forEach(element => {
      let getKey = this.dayNames[element.day];
     

      obj = { ...obj, [getKey]: element.dutyTime };
      earnObj = { ...earnObj, [getKey]: element.dayPay };
      days.push(element.day);
    });
    this.setState({
      totalTime: { ...this.state.totalTime, ...obj },
      dayEarn: { ...this.state.dayEarn, ...earnObj },
      days
    });
  }
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
                  Submit
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
                  Submit
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
                  Submit
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
                  Submit
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
                  Submit
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
                  Submit
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
                  Submit
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
  mapStateToProp,
  { recordAttendence, setDefault, updateAttnd }
)(
  reduxForm({
    form: "time_picker_form" // a unique identifier for this form
  })(ManualTime)
);
