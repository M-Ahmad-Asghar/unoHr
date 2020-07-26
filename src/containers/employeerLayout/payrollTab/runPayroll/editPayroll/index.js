import React, { Fragment } from "react";
import { Col, Card, Container, Button, ButtonToolbar, Row } from "reactstrap";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import { createPayStub } from "../../../../../redux/actions/employerActions";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import { styles } from "./style";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";
import EditTime from "./editPayroll";
class TimeSheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employee: {},

      weekTotal: "",
      submitLoader: false,
      submitDisable: false,
      weekStatus: {},
      weekData: [],
      payPeriod: {},
      loader: true
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log("sta", nextProps.payStubStatus);

    if (nextProps.payStubStatus === "done") {
      this.setState({
        submitDisable: false,
        submitLoader: false
      });
      this.props.history.push({
        pathname: "/home/employeer/selectpayperiod",
        search: this.state.payPeriod.employeeUid
      });
    } else if (nextProps.payStubStatus === "error") {
      this.setState({
        submitDisable: false,
        submitLoader: false
      });
    }
  }

  updateTotalTime = weekData => {
    let total = 0;
    for (let i = 0; i < weekData.length; i++) {
      total += Number(weekData[i].dayPay);
    }
    let totalTimeSec = 0;

    for (var i = 0; i < weekData.length; i++) {
      let time = weekData[i].dutyTime;
      let hr = Number(time.split(":")[0]);
      let min = Number(time.split(":")[1]);
      let sc = Number(time.split(":")[2]);
      let hrToSec = hr * 3600;
      let minToSec = min * 60;
      totalTimeSec += hrToSec + minToSec + sc;
    }

    let newPayPeriod = {
      ...this.state.payPeriod,
      weekData: weekData,
      totalTime: totalTimeSec,
      grossPay: total
    };

    console.log(newPayPeriod);

    this.setState({
      weekTotal: total.toFixed(2),
      payPeriod: newPayPeriod
    });
  };
  componentDidMount = () => {
    let param = this.props.location.state;
    console.log("pa", param);
    this.setState({
      payPeriod: param,
      weekData: param.weekData,
      loader: false
    });
    let total = 0;
    for (let i = 0; i < param.weekData.length; i++) {
      total += Number(param.weekData[i].dayPay);
    }

    this.setState({
      weekTotal: total.toFixed(2)
    });
  };

  runPayroll = () => {
    this.setState({
      submitLoader: true,
      submitDisable: true
    });
    console.log("pay", this.state.payPeriod);

    this.props.createPayStub(this.state.payPeriod);
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
    const { weekData, loader, payPeriod } = this.state;

    return (
      <Container>
        <Row>
          <Col md={12} lg={12}>
            <Card>
              <div className="invoice">
                {!loader && (
                  <EditTime
                    weekData={weekData}
                    payPeriod={payPeriod}
                    updateTotalTime={this.updateTotalTime}
                  />
                )}

                <div className="invoice__total">
                  <p className="invoice__grand-total">
                    {" "}
                    Total Weekly: $ {this.state.weekTotal}
                  </p>

                  <div className={classes.submitDiv}>
                    <ButtonToolbar className="invoice__toolbar">
                      {this.state.submitLoader ? <CircularProgress /> : <p />}

                      <Button
                        color="primary"
                        onClick={this.runPayroll}
                        disabled={this.state.submitDisable}
                      >
                        {" "}
                        Run Payroll
                      </Button>
                    </ButtonToolbar>
                  </div>
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
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  payStubStatus: state.employerReducer.payStubStatus,
  loader: state.employerReducer.loader
});

export default connect(
  mapStateToProps,
  { createPayStub }
)(withStyles(styles)(withRouter(TimeSheet)));
