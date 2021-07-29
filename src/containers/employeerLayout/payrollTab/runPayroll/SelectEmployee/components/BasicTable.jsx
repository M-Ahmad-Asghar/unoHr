import React from "react";
import { Card, CardBody, Col, Badge, Table } from "reactstrap";
import { translate } from "react-i18next";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
class BasicTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedItems: [],
    };
  }

  empPayroll = (id, name) => {
    // let param = id + `?${name}`;
    // console.log("=========param===========================");
    // console.log(param);
    // console.log('==============""======================');
    this.props.history.push({
      pathname: "/home/employeer/selectpayperiod",
      search: id,
    });
  };

  searchingForName = (searchQuery) => {
    return function(employeeTask) {
      return (
        employeeTask.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        !searchQuery
      );
    };
  };

  render() {
    const { employees, searchQuery } = this.props;
    console.log("emp", employees);

    return (
      <Col md={12} lg={12} xl={12}>
        <Card>
          <CardBody>
            <Table responsive hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Employee Name</th>
                  <th>Location</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {employees.length > 0 ? (
                  employees
                    .filter(this.searchingForName(searchQuery))
                    .map((emp, index) => {
                      let id = emp.employeeid;
                      console.log("Current employee in paystub", emp);
                      let name = emp.name;
                      return (
                        <tr
                          key={index}
                          onClick={() => this.empPayroll(id, name)}
                        >
                          <td>{index + 1}</td>
                          <td>{emp.name}</td>
                          <td>{emp.stateName}</td>

                          <td>
                            <Badge color="success">{emp.status}</Badge>
                          </td>
                        </tr>
                      );
                    })
                ) : (
                  <div>No employee found!</div>
                )}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

BasicTable.propTypes = {
  t: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  employees: state.employerReducer.employees,
});

export default withRouter(
  connect(mapStateToProps, null)(translate("common")(BasicTable))
);
