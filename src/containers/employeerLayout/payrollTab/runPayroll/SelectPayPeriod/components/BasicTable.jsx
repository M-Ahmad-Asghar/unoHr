import React, { Fragment } from "react";
import { Card, CardBody, Col, Badge, Table } from "reactstrap";
import { translate } from "react-i18next";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withRouter } from "react-router-dom";
import moment from "moment";
import Loading from "react-fullscreen-loading";

import {
  getPayPariod,
  createPayStub,
} from "../../../../../../redux/actions/employerActions";

class BasicTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: true,
      payperiod: [],
      empName: "",
      modalVisible: false,
      payStbLoader: false,
    };
  }

  componentDidMount = () => {
    let param = this.props.location.search;
    let id = param.split("?")[1];

    this.props.getPayPariod(id);
    // this.setState({
    //   empName: empId.empName
    // });
  };

  componentWillReceiveProps(nextProps) {
    console.log("==========nextProps==========================");
    console.log(nextProps.payPeriod);
    console.log("====================================");
    this.setState({
      payPeriod: nextProps.payPeriod,
    });
    if (nextProps.payStubStatus === "done") {
      this.setState({
        payStbLoader: false,
      });
    } else if (nextProps.payStubStatus === "error") {
      this.setState({
        payStbLoader: false,
      });
    }

    if (nextProps.payPeriodStatus === "done") {
      this.setState({
        loader: false,
      });
    } else if (nextProps.payPeriodStatus === "error") {
      this.setState({
        loader: false,
      });
    }
  }

  createPaystub = (pay) => {
    let param = this.props.location.search;
    let id = param.split("?")[1];
    let employees = this.props.employees.filter((e) => e.employeeid === id);
    console.log("employs", employees);

    let employeeFS = "";
    if (employees[0].fundingSource) employeeFS = employees[0].fundingSource;
    let employerFS = "";
    if (this.props.user.fundingSource)
      employerFS = this.props.user.fundingSource;
    let paymentMethod = "";
    if (employees[0].paymentMethod) paymentMethod = employees[0].paymentMethod;

    if (employees[0].paymentMethod === "manual") {
      // this.setState({
      //   payStbLoader: true
      // });
      let employeeName = this.props.empName;
      let objForPayStub = { ...pay, employeeName, paymentMethod };
      console.log("payObj in", objForPayStub);

      this.props.history.push({
        pathname: "/home/employeer/editpayroll",
        state: objForPayStub,
      });
      // this.props.createPayStub(objForPayStub);
    } else if (employees[0].paymentMethod === "direct deposit") {
      if (employerFS === "") {
        toast.error("You don't  have any funding source. Please add one.");
      } else if (employeeFS === "") {
        toast.error(
          "This Employee does not have any funding source. Please add one."
        );
      } else {
        // this.setState({
        //   payStbLoader: true
        // });
        let employeeName = this.props.empName;
        let objForPayStub = {
          ...pay,
          employeeName,
          employerFundingSource: employerFS,
          employeeFundingSource: employeeFS,
          paymentMethod,
        };

        this.props.history.push({
          pathname: "/home/employeer/editpayroll",
          state: objForPayStub,
        });
        // this.props.createPayStub(objForPayStub);
      }
    } else {
      toast.error("This employee does not have any payment method!");
    }
  };

  searchingForName = (searchQuery) => {
    return function(pay) {
      console.log("PAYING", pay);
      return (
        moment(pay.recordFrom)
          .format("MMM/DD/YYYY")
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        moment(pay.recordTo)
          .format("MMM/DD/YYYY")
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        pay.totalTime
          .toString()
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        pay.grossPay
          .toString()
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        !searchQuery
      );
    };
  };

  render() {
    const { payPeriod, searchQuery } = this.props;
    const { payStbLoader } = this.state;
    return (
      <Col md={12} lg={12} xl={12}>
        <Card>
          <CardBody>
            <Table responsive hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Record From</th>
                  <th>Record To</th>
                  <th>Total Time</th>
                  <th>Gross Pay</th>
                </tr>
              </thead>
              <tbody style={{ textAlign: "center" }}>
                {this.state.loader ? (
                  <tr>
                    <td />
                    <td />

                    <td style={{ justifyContent: "center", marginTop: "35px" }}>
                      <div style={{ marginTop: "35px" }}>
                        <CircularProgress />
                      </div>
                    </td>

                    <td />
                    <td />
                  </tr>
                ) : payPeriod.length > 0 ? (
                  payPeriod
                    .filter(this.searchingForName(searchQuery))
                    .map((pay, index) => {
                      let sec = pay.totalTime * 1000;

                      let hh = Number(Math.floor(sec / 1000 / 60 / 60));

                      sec -= hh * 1000 * 60 * 60;
                      let mm = Number(Math.floor(sec / 1000 / 60));

                      sec -= mm * 1000 * 60;
                      let ss = Number(Math.floor(sec / 1000));

                      sec -= ss * 1000;
                      let dutyTime = hh + ":" + mm + ":" + ss;

                      return (
                        <tr
                          key={index}
                          style={{ textAlign: "left" }}
                          onClick={() => this.createPaystub(pay)}
                        >
                          <td>{index + 1}</td>
                          <td>
                            {" "}
                            {moment(pay.recordFrom).format("MMM/DD/YYYY")}
                          </td>
                          <td>{moment(pay.recordTo).format("MMM/DD/YYYY")}</td>

                          <td>{dutyTime}</td>
                          <td>$ {pay.grossPay}</td>
                        </tr>
                      );
                    })
                ) : (
                  <h4>No Pay Period due for This Employee</h4>
                )}
              </tbody>
            </Table>
          </CardBody>
        </Card>
        <Loading
          loading={payStbLoader}
          background="rgba(0,0,0,0.5)"
          loaderColor="#3498db"
        />
      </Col>
    );
  }
}

BasicTable.propTypes = {
  t: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  empName: state.userReducer.user.name,
  user: state.userReducer.user,
  employees: state.employerReducer.employees,
  payPeriod: state.employerReducer.payPeriod,
  payPeriodStatus: state.employerReducer.payPeriodStatus,
  payStubStatus: state.employerReducer.payStubStatus,
});

export default withRouter(
  connect(mapStateToProps, { getPayPariod, createPayStub })(
    translate("common")(BasicTable)
  )
);
