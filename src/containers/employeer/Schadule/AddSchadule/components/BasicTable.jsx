import React, { Fragment } from "react";
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
  getSchadules
} from "../../../../../redux/actions/schaduleAction";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = {
  grid: {
    width: "80%"
  }
};
class BasicTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      schaduleTime: [
        {
          startSchaduleTime: new Date(),
          endSchaduleTime: new Date()
        },
        {
          startSchaduleTime: new Date(),
          endSchaduleTime: new Date()
        },
        {
          startSchaduleTime: new Date(),
          endSchaduleTime: new Date()
        }
      ],

      loader: false,
      Employee: {},
      shift: 1,
      emp: [],
      startLoader: true
    };
  }

  addShift = () => {
    this.setState({
      shift: this.state.shift + 1
    });
  };

  handleChange = event => {
    this.setState({ Employee: event.target.value });
  };
  strtTime(date, index) {
    let schaduleTime = this.state.schaduleTime;
    schaduleTime[index].startSchaduleTime = date;

    this.setState({
      schaduleTime
    });
  }
  endTime(date, index) {
    let schaduleTime = this.state.schaduleTime;
    schaduleTime[index].endSchaduleTime = date;

    this.setState({
      schaduleTime
    });
  }
  assingSchadule = () => {
    if (Object.entries(this.state.Employee).length !== 0) {
      this.setState({
        loader: true
      });
      if (this.state.shift == 1) {
        let schadule = {
          empName: this.state.Employee.name,
          employeeid: this.state.Employee.employeeid,
          employeruid: this.state.Employee.employeruid,
          shifts: this.state.shift,
          monday: [
            {
              startTime: this.state.schaduleTime[0].startSchaduleTime.toString(),
              endTime: this.state.schaduleTime[0].endSchaduleTime.toString()
            }
          ],
          tuesday: [
            {
              startTime: this.state.schaduleTime[0].startSchaduleTime.toString(),
              endTime: this.state.schaduleTime[0].endSchaduleTime.toString()
            }
          ],
          wednesday: [
            {
              startTime: this.state.schaduleTime[0].startSchaduleTime.toString(),
              endTime: this.state.schaduleTime[0].endSchaduleTime.toString()
            }
          ],
          thrusday: [
            {
              startTime: this.state.schaduleTime[0].startSchaduleTime.toString(),
              endTime: this.state.schaduleTime[0].endSchaduleTime.toString()
            }
          ],
          friday: [
            {
              startTime: this.state.schaduleTime[0].startSchaduleTime.toString(),
              endTime: this.state.schaduleTime[0].endSchaduleTime.toString()
            }
          ],
          saturday: [
            {
              startTime: this.state.schaduleTime[0].startSchaduleTime.toString(),
              endTime: this.state.schaduleTime[0].endSchaduleTime.toString()
            }
          ],
          sunday: [
            {
              startTime: this.state.schaduleTime[0].startSchaduleTime.toString(),
              endTime: this.state.schaduleTime[0].endSchaduleTime.toString()
            }
          ]
        };
        this.props.addSchadule(schadule);
      } else if (this.state.shift == 2) {
        let schadule = {
          empName: this.state.Employee.name,
          employeeid: this.state.Employee.employeeid,
          employeruid: this.state.Employee.employeruid,
          shifts: this.state.shift,
          monday: [
            {
              startTime: this.state.schaduleTime[0].startSchaduleTime.toString(),
              endTime: this.state.schaduleTime[0].endSchaduleTime.toString()
            },
            {
              startTime: this.state.schaduleTime[1].startSchaduleTime.toString(),
              endTime: this.state.schaduleTime[1].endSchaduleTime.toString()
            }
          ],
          tuesday: [
            {
              startTime: this.state.schaduleTime[0].startSchaduleTime.toString(),
              endTime: this.state.schaduleTime[0].endSchaduleTime.toString()
            },
            {
              startTime: this.state.schaduleTime[1].startSchaduleTime.toString(),
              endTime: this.state.schaduleTime[1].endSchaduleTime.toString()
            }
          ],
          wednesday: [
            {
              startTime: this.state.schaduleTime[0].startSchaduleTime.toString(),
              endTime: this.state.schaduleTime[0].endSchaduleTime.toString()
            },
            {
              startTime: this.state.schaduleTime[1].startSchaduleTime.toString(),
              endTime: this.state.schaduleTime[1].endSchaduleTime.toString()
            }
          ],
          thrusday: [
            {
              startTime: this.state.schaduleTime[0].startSchaduleTime.toString(),
              endTime: this.state.schaduleTime[0].endSchaduleTime.toString()
            },
            {
              startTime: this.state.schaduleTime[1].startSchaduleTime.toString(),
              endTime: this.state.schaduleTime[1].endSchaduleTime.toString()
            }
          ],
          friday: [
            {
              startTime: this.state.schaduleTime[0].startSchaduleTime.toString(),
              endTime: this.state.schaduleTime[0].endSchaduleTime.toString()
            },
            {
              startTime: this.state.schaduleTime[1].startSchaduleTime.toString(),
              endTime: this.state.schaduleTime[1].endSchaduleTime.toString()
            }
          ],
          saturday: [
            {
              startTime: this.state.schaduleTime[0].startSchaduleTime.toString(),
              endTime: this.state.schaduleTime[0].endSchaduleTime.toString()
            },
            {
              startTime: this.state.schaduleTime[1].startSchaduleTime.toString(),
              endTime: this.state.schaduleTime[1].endSchaduleTime.toString()
            }
          ],
          sunday: [
            {
              startTime: this.state.schaduleTime[0].startSchaduleTime.toString(),
              endTime: this.state.schaduleTime[0].endSchaduleTime.toString()
            },
            {
              startTime: this.state.schaduleTime[1].startSchaduleTime.toString(),
              endTime: this.state.schaduleTime[1].endSchaduleTime.toString()
            }
          ]
        };
        this.props.addSchadule(schadule);
      } else {
        let schadule = {
          empName: this.state.Employee.name,
          employeeid: this.state.Employee.employeeid,
          employeruid: this.state.Employee.employeruid,
          shifts: this.state.shift,
          monday: [
            {
              startTime: this.state.schaduleTime[0].startSchaduleTime.toString(),
              endTime: this.state.schaduleTime[0].endSchaduleTime.toString()
            },
            {
              startTime: this.state.schaduleTime[1].startSchaduleTime.toString(),
              endTime: this.state.schaduleTime[1].endSchaduleTime.toString()
            },
            {
              startTime: this.state.schaduleTime[2].startSchaduleTime.toString(),
              endTime: this.state.schaduleTime[2].endSchaduleTime.toString()
            }
          ],
          tuesday: [
            {
              startTime: this.state.schaduleTime[0].startSchaduleTime.toString(),
              endTime: this.state.schaduleTime[0].endSchaduleTime.toString()
            },
            {
              startTime: this.state.schaduleTime[1].startSchaduleTime.toString(),
              endTime: this.state.schaduleTime[1].endSchaduleTime.toString()
            },
            {
              startTime: this.state.schaduleTime[2].startSchaduleTime.toString(),
              endTime: this.state.schaduleTime[2].endSchaduleTime.toString()
            }
          ],
          wednesday: [
            {
              startTime: this.state.schaduleTime[0].startSchaduleTime.toString(),
              endTime: this.state.schaduleTime[0].endSchaduleTime.toString()
            },
            {
              startTime: this.state.schaduleTime[1].startSchaduleTime.toString(),
              endTime: this.state.schaduleTime[1].endSchaduleTime.toString()
            },
            {
              startTime: this.state.schaduleTime[2].startSchaduleTime.toString(),
              endTime: this.state.schaduleTime[2].endSchaduleTime.toString()
            }
          ],
          thrusday: [
            {
              startTime: this.state.schaduleTime[0].startSchaduleTime.toString(),
              endTime: this.state.schaduleTime[0].endSchaduleTime.toString()
            },
            {
              startTime: this.state.schaduleTime[1].startSchaduleTime.toString(),
              endTime: this.state.schaduleTime[1].endSchaduleTime.toString()
            },
            {
              startTime: this.state.schaduleTime[2].startSchaduleTime.toString(),
              endTime: this.state.schaduleTime[2].endSchaduleTime.toString()
            }
          ],
          friday: [
            {
              startTime: this.state.schaduleTime[0].startSchaduleTime.toString(),
              endTime: this.state.schaduleTime[0].endSchaduleTime.toString()
            },
            {
              startTime: this.state.schaduleTime[1].startSchaduleTime.toString(),
              endTime: this.state.schaduleTime[1].endSchaduleTime.toString()
            },
            {
              startTime: this.state.schaduleTime[2].startSchaduleTime.toString(),
              endTime: this.state.schaduleTime[2].endSchaduleTime.toString()
            }
          ],
          saturday: [
            {
              startTime: this.state.schaduleTime[0].startSchaduleTime.toString(),
              endTime: this.state.schaduleTime[0].endSchaduleTime.toString()
            },
            {
              startTime: this.state.schaduleTime[1].startSchaduleTime.toString(),
              endTime: this.state.schaduleTime[1].endSchaduleTime.toString()
            },
            {
              startTime: this.state.schaduleTime[2].startSchaduleTime.toString(),
              endTime: this.state.schaduleTime[2].endSchaduleTime.toString()
            }
          ],
          sunday: [
            {
              startTime: this.state.schaduleTime[0].startSchaduleTime.toString(),
              endTime: this.state.schaduleTime[0].endSchaduleTime.toString()
            },
            {
              startTime: this.state.schaduleTime[1].startSchaduleTime.toString(),
              endTime: this.state.schaduleTime[1].endSchaduleTime.toString()
            },
            {
              startTime: this.state.schaduleTime[2].startSchaduleTime.toString(),
              endTime: this.state.schaduleTime[2].endSchaduleTime.toString()
            }
          ]
        };
        this.props.addSchadule(schadule);
      }
    } else {
      toast.warn("Select An employee First");
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.shaduleAddStatus === "done") {
      this.setState({
        loader: false
      });
      this.props.history.push("/home/employeer/schadule");
    } else if (nextProps.shaduleAddStatus === "error") {
      this.setState({
        loader: false
      });
    }
    if (nextProps.getSchaduleStatus === "done") {
      let data = [];
      nextProps.employees.forEach(element => {
        let flag = true;
        nextProps.allSchadule.forEach(item => {
          if (element.employeeid === item.employeeid) {
            flag = false;
          }
        });

        if (flag) {
          data.push(element);
        }
      });

      this.setState({
        startLoader: false,
        emp: data
      });
    } else if (nextProps.getSchaduleStatus === "error") {
      this.setState({
        startLoader: false
      });
    }
  }

  componentDidMount() {
    this.props.getSchadules(this.props.user.uid);
  }
  render() {
    const { classes, employees } = this.props;
    const {
      startSchaduleTime,
      endSchaduleTime,
      loader,
      shift,
      schaduleTime,
      startLoader,
      emp
    } = this.state;
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
                onChange={date => this.strtTime(date, index)}
              />

              <TimePicker
                margin="normal"
                label="Time End"
                value={endSchaduleTime}
                onChange={date => this.endTime(date, index)}
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
                        value={this.state.Employee}
                        onChange={this.handleChange}
                        inputProps={{
                          name: "age",
                          id: "age-simple"
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
                    marginRight: "60px"
                  }}
                >
                  {shift <= 2 && (
                    <Button color="success" onClick={this.addShift}>
                      Add Shift
                    </Button>
                  )}
                  {loader ? (
                    <Button color="success" disabled>
                      <PulseLoader color={"#123abc"} size={12} />
                    </Button>
                  ) : (
                    <Button color="success" onClick={this.assingSchadule}>
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
}

BasicTable.propTypes = {
  t: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  employees: state.employerReducer.employees,
  shaduleAddStatus: state.shaduleReducer.shaduleAddStatus,
  loader: state.shaduleReducer.loader,
  user: state.userReducer.user,
  getSchaduleStatus: state.shaduleReducer.getSchaduleStatus,
  allSchadule: state.shaduleReducer.allSchadule
});

export default withRouter(
  connect(
    mapStateToProps,
    { addSchadule, getSchadules }
  )(withStyles(styles)(BasicTable))
);
