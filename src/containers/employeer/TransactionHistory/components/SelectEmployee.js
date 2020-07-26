import React from "react";
import { Card, CardBody, Col, Badge, Table } from "reactstrap";
import { translate } from "react-i18next";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class SelectEmployee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: []
    };
  }

  componentWillMount() {
      let employees = this.props.employees.filter(e => e.dwolla_Customer);
      if(employees.length > 0) 
        this.setState({
            employees
        })
  }

  searchingForName = searchQuery => {
    return function(employee) {
      return (
        employee.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||  
        employee.stateName.toLowerCase().includes(searchQuery.toLowerCase()) || 
        !searchQuery
      );
    };
  };

  render() {
    const { searchQuery } = this.props;
    let { employees } = this.state;

    return (
      <Col md={12} lg={12} xl={12}>
        <Card>
          <CardBody>
            <Table responsive hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Employee Name</th>
                  <th>ID</th>
                  <th>Email</th>
                  <th>Location</th>
                  <th>Phone</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {employees.length > 0 ? (
                  employees.filter(this.searchingForName(searchQuery)).map((emp, index) => {
                    return (
                      <tr key={index} onClick={() => this.props.changeView(emp)}>
                        <td>{index + 1}</td>
                        <td>{emp.name}</td>
                        <td>{emp.employeeid}</td>
                        <td>{emp.email}</td>
                        <td>{emp.stateName}</td>
                        <td>{emp.cell}</td>
                        <td>
                          {emp.status == 'active' ?
                           <Badge  color="success">{emp.status}</Badge>
                          : 
                          <Badge   color="secondary">{emp.status}</Badge>
                          }
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <h3>There is no Employee Yet</h3>
                )}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

SelectEmployee.propTypes = {
  t: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    user: state.userReducer.user,
    employees: state.employerReducer.allEmployees
});

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(translate("common")(SelectEmployee))
);