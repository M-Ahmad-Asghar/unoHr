import React from "react";
import { Card, CardBody, Col, Badge, Table } from "reactstrap";
import { translate } from "react-i18next";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
class BasicTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedItems: []
    };
  }

  dummyData = [
    {
      HourlyRate: "55",
      WeekHr: "25",
      cell: "+923034766669",
      chosenDate: "Wed Feb 06 2019 00:00:00 GMT+0500 (PKT)",
      city: "ssdsz",
      createdAt: "Tue Feb 19 2019 10:01:41 GMT+0500 (PKT)",
      duties: "klkl44",
      email: "rana.naveed812@gmail.com",
      employeeid: "71f41a80-3403-11e9-a86c-75b225a623e7",
      employeruid: "IOGtaKpP7lT56soMtZgdyrShiQq1",
      name: "Naveed rajput",
      password: "naveedrana",
      state: "szdf",
      status: "active",

      street: "sdf",
      zip: "xvcsd"
    },
    {
      HourlyRate: "55",
      WeekHr: "25",
      cell: "+923034766669",
      chosenDate: "Wed Feb 06 2019 00:00:00 GMT+0500 (PKT)",
      city: "ssdsz",
      createdAt: "Tue Feb 19 2019 10:01:41 GMT+0500 (PKT)",
      duties: "klkl44",
      email: "rana.naveed812@gmail.com",
      employeeid: "71f41a80-3403-25252-a86c-75b225a623e7",
      employeruid: "IOGtaKpP7lT56soMtZgdyrShiQq1",
      name: "Naveed rajput",
      password: "naveedrana",
      state: "szdf",
      status: "active",

      street: "sdf",
      zip: "xvcsd"
    }
  ];
  selectedEmp = id => {
    this.props.history.push({
      pathname: "/home/employeer/selectpaystub",
      search: id
    });
  };

  searchingForName = searchQuery => {
    return function(employeeTask) {
      console.log("searchQuery: ", searchQuery ,employeeTask.name, employeeTask.state, employeeTask.status);
      return (
        employeeTask.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) || 
          !searchQuery
      );
    };
  };

  render() {
    const { employees, searchQuery } = this.props;
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
                  <th>Phone</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {employees.length > 0 ? (
                  employees.filter(this.searchingForName(searchQuery)).map((emp, index) => {
                    let id = emp.employeeid;
                    return (
                      <tr key={index} onClick={() => this.selectedEmp(id)}>
                        {/* <Link to=""> */}
                        <td>{index + 1}</td>
                        <td>{emp.name}</td>
                        <td>{emp.state}</td>
                        <td>{emp.cell}</td>

                        <td>
                          <Badge color="success">{emp.status}</Badge>
                        </td>
                        {/* </Link> */}
                      </tr>
                    );
                  })
                ) : (
                  <h3>There is no Employee</h3>
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
  t: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  employees: state.employerReducer.employees
});

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(translate("common")(BasicTable))
);
