import React, { Fragment, useState, useEffect } from "react";
import { Card, CardBody, Col, Button, ButtonToolbar } from "reactstrap";
import { translate } from "react-i18next";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { MuiPickersUtilsProvider, TimePicker } from "material-ui-pickers";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
import {
  addSchadule,
  getSchadules,
} from "../../../../../redux/actions/schaduleAction";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useObjectState } from "../../../../../utils/commonState";
const styles = {
  grid: {
    width: "80%",
  },
};
function BasicTable(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [state, setState] = useObjectState({
    schaduleTime: [
      {
        startSchaduleTime: new Date(),
        endSchaduleTime: new Date(),
      },
      {
        startSchaduleTime: new Date(),
        endSchaduleTime: new Date(),
      },
      {
        startSchaduleTime: new Date(),
        endSchaduleTime: new Date(),
      },
    ],

    loader: false,
    Employee: {},
    shift: 1,
    emp: [],
    startLoader: true,
  });

  const employees = useSelector((state) => state.employerReducer.employees);
  const shaduleAddStatus = useSelector(
    (state) => state.shaduleReducer.shaduleAddStatus
  );
  const loader = useSelector((state) => state.shaduleReducer.loader);
  const user = useSelector((state) => state.userReducer.user);
  const getSchaduleStatus = useSelector(
    (state) => state.shaduleReducer.getSchaduleStatus
  );
  const allSchadule = useSelector((state) => state.shaduleReducer.allSchadule);

  const addShift = () => {
    setState({
      shift: state.shift + 1,
    });
  };

  const handleChange = (event) => {
    setState({ Employee: event.target.value });
  };
  const strtTime = (date, index) => {
    let schaduleTime = state.schaduleTime;
    schaduleTime[index].startSchaduleTime = date;

    setState({
      schaduleTime,
    });
  };
  const endTime = (date, index) => {
    let schaduleTime = state.schaduleTime;
    schaduleTime[index].endSchaduleTime = date;

    setState({
      schaduleTime,
    });
  };
  const assingSchadule = () => {
    if (Object.entries(state.Employee).length !== 0) {
      setState({
        loader: true,
      });
      if (state.shift == 1) {
        let schadule = {
          empName: state.Employee.name,
          employeeid: state.Employee.employeeid,
          employeruid: state.Employee.employeruid,
          shifts: state.shift,
          monday: [
            {
              startTime: state.schaduleTime[0].startSchaduleTime.toString(),
              endTime: state.schaduleTime[0].endSchaduleTime.toString(),
            },
          ],
          tuesday: [
            {
              startTime: state.schaduleTime[0].startSchaduleTime.toString(),
              endTime: state.schaduleTime[0].endSchaduleTime.toString(),
            },
          ],
          wednesday: [
            {
              startTime: state.schaduleTime[0].startSchaduleTime.toString(),
              endTime: state.schaduleTime[0].endSchaduleTime.toString(),
            },
          ],
          thrusday: [
            {
              startTime: state.schaduleTime[0].startSchaduleTime.toString(),
              endTime: state.schaduleTime[0].endSchaduleTime.toString(),
            },
          ],
          friday: [
            {
              startTime: state.schaduleTime[0].startSchaduleTime.toString(),
              endTime: state.schaduleTime[0].endSchaduleTime.toString(),
            },
          ],
          saturday: [
            {
              startTime: state.schaduleTime[0].startSchaduleTime.toString(),
              endTime: state.schaduleTime[0].endSchaduleTime.toString(),
            },
          ],
          sunday: [
            {
              startTime: state.schaduleTime[0].startSchaduleTime.toString(),
              endTime: state.schaduleTime[0].endSchaduleTime.toString(),
            },
          ],
        };
        props.addSchadule(schadule);
      } else if (state.shift == 2) {
        let schadule = {
          empName: state.Employee.name,
          employeeid: state.Employee.employeeid,
          employeruid: state.Employee.employeruid,
          shifts: state.shift,
          monday: [
            {
              startTime: state.schaduleTime[0].startSchaduleTime.toString(),
              endTime: state.schaduleTime[0].endSchaduleTime.toString(),
            },
            {
              startTime: state.schaduleTime[1].startSchaduleTime.toString(),
              endTime: state.schaduleTime[1].endSchaduleTime.toString(),
            },
          ],
          tuesday: [
            {
              startTime: state.schaduleTime[0].startSchaduleTime.toString(),
              endTime: state.schaduleTime[0].endSchaduleTime.toString(),
            },
            {
              startTime: state.schaduleTime[1].startSchaduleTime.toString(),
              endTime: state.schaduleTime[1].endSchaduleTime.toString(),
            },
          ],
          wednesday: [
            {
              startTime: state.schaduleTime[0].startSchaduleTime.toString(),
              endTime: state.schaduleTime[0].endSchaduleTime.toString(),
            },
            {
              startTime: state.schaduleTime[1].startSchaduleTime.toString(),
              endTime: state.schaduleTime[1].endSchaduleTime.toString(),
            },
          ],
          thrusday: [
            {
              startTime: state.schaduleTime[0].startSchaduleTime.toString(),
              endTime: state.schaduleTime[0].endSchaduleTime.toString(),
            },
            {
              startTime: state.schaduleTime[1].startSchaduleTime.toString(),
              endTime: state.schaduleTime[1].endSchaduleTime.toString(),
            },
          ],
          friday: [
            {
              startTime: state.schaduleTime[0].startSchaduleTime.toString(),
              endTime: state.schaduleTime[0].endSchaduleTime.toString(),
            },
            {
              startTime: state.schaduleTime[1].startSchaduleTime.toString(),
              endTime: state.schaduleTime[1].endSchaduleTime.toString(),
            },
          ],
          saturday: [
            {
              startTime: state.schaduleTime[0].startSchaduleTime.toString(),
              endTime: state.schaduleTime[0].endSchaduleTime.toString(),
            },
            {
              startTime: state.schaduleTime[1].startSchaduleTime.toString(),
              endTime: state.schaduleTime[1].endSchaduleTime.toString(),
            },
          ],
          sunday: [
            {
              startTime: state.schaduleTime[0].startSchaduleTime.toString(),
              endTime: state.schaduleTime[0].endSchaduleTime.toString(),
            },
            {
              startTime: state.schaduleTime[1].startSchaduleTime.toString(),
              endTime: state.schaduleTime[1].endSchaduleTime.toString(),
            },
          ],
        };
        props.addSchadule(schadule);
      } else {
        let schadule = {
          empName: state.Employee.name,
          employeeid: state.Employee.employeeid,
          employeruid: state.Employee.employeruid,
          shifts: state.shift,
          monday: [
            {
              startTime: state.schaduleTime[0].startSchaduleTime.toString(),
              endTime: state.schaduleTime[0].endSchaduleTime.toString(),
            },
            {
              startTime: state.schaduleTime[1].startSchaduleTime.toString(),
              endTime: state.schaduleTime[1].endSchaduleTime.toString(),
            },
            {
              startTime: state.schaduleTime[2].startSchaduleTime.toString(),
              endTime: state.schaduleTime[2].endSchaduleTime.toString(),
            },
          ],
          tuesday: [
            {
              startTime: state.schaduleTime[0].startSchaduleTime.toString(),
              endTime: state.schaduleTime[0].endSchaduleTime.toString(),
            },
            {
              startTime: state.schaduleTime[1].startSchaduleTime.toString(),
              endTime: state.schaduleTime[1].endSchaduleTime.toString(),
            },
            {
              startTime: state.schaduleTime[2].startSchaduleTime.toString(),
              endTime: state.schaduleTime[2].endSchaduleTime.toString(),
            },
          ],
          wednesday: [
            {
              startTime: state.schaduleTime[0].startSchaduleTime.toString(),
              endTime: state.schaduleTime[0].endSchaduleTime.toString(),
            },
            {
              startTime: state.schaduleTime[1].startSchaduleTime.toString(),
              endTime: state.schaduleTime[1].endSchaduleTime.toString(),
            },
            {
              startTime: state.schaduleTime[2].startSchaduleTime.toString(),
              endTime: state.schaduleTime[2].endSchaduleTime.toString(),
            },
          ],
          thrusday: [
            {
              startTime: state.schaduleTime[0].startSchaduleTime.toString(),
              endTime: state.schaduleTime[0].endSchaduleTime.toString(),
            },
            {
              startTime: state.schaduleTime[1].startSchaduleTime.toString(),
              endTime: state.schaduleTime[1].endSchaduleTime.toString(),
            },
            {
              startTime: state.schaduleTime[2].startSchaduleTime.toString(),
              endTime: state.schaduleTime[2].endSchaduleTime.toString(),
            },
          ],
          friday: [
            {
              startTime: state.schaduleTime[0].startSchaduleTime.toString(),
              endTime: state.schaduleTime[0].endSchaduleTime.toString(),
            },
            {
              startTime: state.schaduleTime[1].startSchaduleTime.toString(),
              endTime: state.schaduleTime[1].endSchaduleTime.toString(),
            },
            {
              startTime: state.schaduleTime[2].startSchaduleTime.toString(),
              endTime: state.schaduleTime[2].endSchaduleTime.toString(),
            },
          ],
          saturday: [
            {
              startTime: state.schaduleTime[0].startSchaduleTime.toString(),
              endTime: state.schaduleTime[0].endSchaduleTime.toString(),
            },
            {
              startTime: state.schaduleTime[1].startSchaduleTime.toString(),
              endTime: state.schaduleTime[1].endSchaduleTime.toString(),
            },
            {
              startTime: state.schaduleTime[2].startSchaduleTime.toString(),
              endTime: state.schaduleTime[2].endSchaduleTime.toString(),
            },
          ],
          sunday: [
            {
              startTime: state.schaduleTime[0].startSchaduleTime.toString(),
              endTime: state.schaduleTime[0].endSchaduleTime.toString(),
            },
            {
              startTime: state.schaduleTime[1].startSchaduleTime.toString(),
              endTime: state.schaduleTime[1].endSchaduleTime.toString(),
            },
            {
              startTime: state.schaduleTime[2].startSchaduleTime.toString(),
              endTime: state.schaduleTime[2].endSchaduleTime.toString(),
            },
          ],
        };
        dispatch(addSchadule(schadule));
      }
    } else {
      toast.warn("Select An employee First");
    }
  };

  useEffect(() => {
    if (shaduleAddStatus === "done") {
      setState({
        loader: false,
      });
      history.push("/home/employeer/schadule");
    } else if (shaduleAddStatus === "error") {
      setState({
        loader: false,
      });
    }
    if (getSchaduleStatus === "done") {
      let data = [];
      employees.forEach((element) => {
        let flag = true;
        allSchadule.forEach((item) => {
          if (element.employeeid === item.employeeid) {
            flag = false;
          }
        });

        if (flag) {
          data.push(element);
        }
      });

      setState({
        startLoader: false,
        emp: data,
      });
    } else if (getSchaduleStatus === "error") {
      setState({
        startLoader: false,
      });
    }
  }, [shaduleAddStatus, getSchaduleStatus]);

  useEffect(() => {
    dispatch(getSchadules(user.uid));
  });

  const { classes, employees } = props;
  const {
    startSchaduleTime,
    endSchaduleTime,
    loader,
    shift,
    schaduleTime,
    startLoader,
    emp,
  } = state;
  let shiftArry = [];
  for (let index = 0; index < shift; index++) {
    let startSchaduleTime = schaduleTime[index].startSchaduleTime;
    let endSchaduleTime = schaduleTime[index].endSchaduleTime;
    shiftArry.push(
      <div style={{ flexDirection: "row", width: "100%" }}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container className={classes.grid} justify="space-around">
            <TimePicker
              margin="normal"
              label="Time Start"
              value={startSchaduleTime}
              className="timePicker"
              onChange={(date) => strtTime(date, index)}
            />

            <TimePicker
              margin="normal"
              label="Time End"
              value={endSchaduleTime}
              onChange={(date) => endTime(date, index)}
            />
          </Grid>
        </MuiPickersUtilsProvider>
      </div>
    );
  }

  return (
    <Col md={12} lg={12} xl={12}>
      <Card>
        <CardBody>
          {startLoader ? (
            <div style={{ marginTop: "35px", textAlign: "center" }}>
              <CircularProgress />
            </div>
          ) : (
            <Fragment>
              <form className="form form--horizontal">
                <div className="form__form-group">
                  <span className="form__form-group-label">
                    Select Employee{" "}
                  </span>
                  <div className="form__form-group-field selectEmply selectPurpose">
                    <Select
                      value={state.Employee}
                      onChange={handleChange}
                      inputProps={{
                        name: "age",
                        id: "age-simple",
                      }}
                    >
                      {emp.length > 0 ? (
                        emp.map((emply, index) => {
                          return (
                            <MenuItem key={index} value={emply}>
                              {emply.name}
                            </MenuItem>
                          );
                        })
                      ) : (
                        <MenuItem value="">no employee</MenuItem>
                      )}
                    </Select>
                  </div>
                </div>
              </form>
              {shiftArry}

              <ButtonToolbar
                className="form__button-toolbar"
                style={{
                  marginTop: "20px !important",
                  justifyContent: "flex-end",
                  marginRight: "60px",
                }}
              >
                {shift <= 2 && (
                  <Button color="success" onClick={addShift}>
                    Add Shift
                  </Button>
                )}
                {loader ? (
                  <Button color="success" disabled>
                    <PulseLoader color={"#123abc"} size={12} />
                  </Button>
                ) : (
                  <Button color="success" onClick={assingSchadule}>
                    Assign Schedule
                  </Button>
                )}
              </ButtonToolbar>
            </Fragment>
          )}
        </CardBody>
      </Card>
    </Col>
  );
}

BasicTable.propTypes = {
  t: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(BasicTable));
