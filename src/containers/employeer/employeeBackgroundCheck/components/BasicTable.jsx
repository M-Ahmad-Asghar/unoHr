import React from "react";
import { Spinner, Button, Card, CardBody, Col, Badge, Table } from "reactstrap";
import { translate } from "react-i18next";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { requestBackgroundCheck } from "../../../../redux/actions/employerActions";

class BasicTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedItems: [],
      loader: ""
    };
  }

  clickHandler = emp => {
    this.setState({
      loader: emp.id
    });
    this.props.requestBackgroundCheck(emp);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      loader: ""
    });
  }

  searchingForName = searchQuery => {
    return function(employee) {
      return (
        employee.status
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) || 
        employee.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.employeeid.toLowerCase().includes(searchQuery.toLowerCase()) || 
        employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||  
        employee.cell.toLowerCase().includes(searchQuery.toLowerCase()) || 
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
                  <th>ID</th>
                  <th>Email</th>
                  <th>Location</th>
                  <th>Phone</th>
                  <th>Status</th>
                  <th>Background Check</th>
                </tr>
              </thead>
              <tbody>
                {employees.length > 0 ? (
                  employees.filter(this.searchingForName(searchQuery)).map((emp, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{emp.name}</td>
                        <td>{emp.employeeid}</td>
                        <td>{emp.email}</td>
                        <td>{emp.stateName}</td>
                        <td>{emp.cell}</td>
                        <td>
                          {emp.bgCheckStatus == 'approved' ?
                            <Badge color="success" style={{marginTop: 4}}>{emp.bgCheckStatus}</Badge>
                          : 
                            <Badge color="secondary" style={{marginTop: 4}}>{emp.bgCheckStatus}</Badge>
                          }
                        </td>
                        <td>
                          {
                            emp.bgCheckStatus
                            ? 
                              <Button color="secondary" size="sm" style={{marginBottom: 0}} disabled>Requested</Button>
                            :
                              <Button color="primary"  size="sm" style={{width: 110, marginBottom: 0}} onClick={() => this.clickHandler(emp)}>
                                {
                                  this.state.loader == emp.id
                                  ?
                                    <Spinner size="sm" color="secondary" />
                                  :
                                    'Request'
                                }
                              </Button>
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

BasicTable.propTypes = {
  t: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  employees: state.employerReducer.allEmployees,
  loader: state.employerReducer.loader,
  requestBackgroundCheckStatus: state.employerReducer.requestBackgroundCheckStatus
});

export default withRouter(
  connect(
    mapStateToProps,
    {
      requestBackgroundCheck
    }
  )(translate("common")(BasicTable))
);
