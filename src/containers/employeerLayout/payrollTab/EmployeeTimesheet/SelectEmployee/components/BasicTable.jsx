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

 
  handlerLink = (id, timeMode, docId) => {
    console.log("====================================");
    console.log(id);
    console.log('==============""======================');
    this.props.history.push({
      pathname: "/home/employeer/timesheet",
      id: id,
      state: timeMode,
      docId: docId
    });
  };

  searchingForName = searchQuery => {
    let days = this.days;
    return function(employeeTask) {
      return (
        employeeTask.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
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
                    let timeMode = emp.timeMode;
                    let docId = emp.id
                    return (
                      <tr key={index} onClick={() => this.handlerLink(id, timeMode, docId)}>
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
