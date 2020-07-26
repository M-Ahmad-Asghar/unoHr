import React from "react";
import { Card, CardBody, Col, Badge, Table } from "reactstrap";
import { translate } from "react-i18next";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import moment from 'moment';

import {
  UncontrolledCollapse,
  ButtonToolbar
} from "reactstrap";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";
import CircularProgress from "@material-ui/core/CircularProgress";
import { PulseLoader } from "react-spinners";
import './styles.css';
import { updateEmployee } from '../../../../redux/actions/employeeActions';

class BasicTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedItems: [],
      loader: false,
      updateDialogOpen: false,
      scroll: "body",
      isEmpVisible: false,
      employee: {},
      nameAlias: '',
      name: '',
      value: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.updateEmpStatus === 'done') {
      let name = this.state.name;
      let value = this.state.value;
      if (name !== '' && value !== '') {
        let employee = this.state.employee;
        employee[name] = value;
        this.setState({
          employee
        })
      }
      this.setState({
        loader: false,
        updateDialogOpen: false,
      })
    }

    if (nextProps.updateEmpStatus === 'error') {
      this.setState({
        loader: false,
        updateDialogOpen: false
      })
    }
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

  handleUpdateDialogOpen = () => {
    this.setState({ updateDialogOpen: true });
  };

  handleUpdateDialogClose = () => {
    this.setState({ updateDialogOpen: false });
  };

  editValue = (name, value, emp) => {
      let nameAlias = '';

      switch (name) {
          case 'HourlyRate':
              nameAlias= 'Hourly Rate';
              break;

          case 'WeekHr':
              nameAlias = 'Week Hours';
              break;

          case 'duties':
              nameAlias = 'Duties';
              break;

          case 'address':
              nameAlias = 'Address';
              break;
      
          default:
              nameAlias = name;
              break;
      }
      this.setState({
          employee: emp,
          name,
          value,
          nameAlias,
          updateDialogOpen: true
      })
  }

  updateEmployee = () => {
      let name = this.state.name;
      let value = this.state.value;

      if(value === '') {
          toast.error("Empty field not allowed!");
      } else {
          this.setState({
              loader: true
          })
          let obj = {
              'docid': this.state.employee.id,
              'name': name,
              'value': value
          }

          this.props.updateEmployee(obj);
      }
  }

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  render() {
    const { employees, searchQuery } = this.props;
    const { loader } = this.state;

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
                      <React.Fragment>
                        <tr key={index} onClick={()=>this.setState({ isEmpVisible: !this.state.isEmpVisible })}>
                          <td>{index + 1}</td>
                          <td>{emp.name}</td>
                          <td>{emp.employeeid}</td>
                          <td>{emp.email}</td>
                          <td>{emp.stateName}</td>
                          <td>{emp.cell}</td>
                          <td>
                            {emp.status == 'active' ?
                              <Badge color="success">{emp.status}</Badge>
                              :
                              <Badge color="secondary">{emp.status}</Badge>
                            }
                          </td>
                        </tr>
                          {/*/ ========================= // **/}
                        <tr style={{ width: '100%' }}>
                          <td />
                          <td />
                          <td />
                          <td>
                            {this.state.isEmpVisible ?
                              <div style={{ display: 'flex', flexDirection: 'column' }} onClick={()=>this.setState({ isEmpVisible: !this.state.isEmpVisible })} >
                                <div style={{ display: 'flex', marginBottom: 15 }}>
                                  <b style={{ marginLeft: '0vw' }}>Time Mode:</b>
                                </div>
                                <div style={{ display: 'flex', marginBottom: 15 }}>
                                  <b style={{ marginLeft: '0vw' }}>Payment Method:</b>
                                </div>
                                <div style={{ display: 'flex', marginBottom: 15 }}>
                                  <b style={{ marginLeft: '0vw' }}>Created At:</b>
                                </div>
                                <div style={{ display: 'flex', marginBottom: 15 }}>
                                  <b style={{ marginLeft: '0vw' }}>Hourly Rate:</b>
                                </div>
                                <div style={{ display: 'flex', marginBottom: 15 }}>
                                  <b style={{ marginLeft: '0vw' }}>Week Hours:</b>
                                </div>
                                <div style={{ display: 'flex', marginBottom: 15 }}>
                                  <b style={{ marginLeft: '0vw' }}>Duties:</b>
                                </div>
                                <div style={{ display: 'flex', marginBottom: 15 }}>
                                  <b style={{ marginLeft: '0vw' }}>Address:</b>
                                </div>
                              </div>
                              :
                              ''
                            }
                          </td>
                          <td>
                          {this.state.isEmpVisible ?
                              <div style={{ display: 'flex', flexDirection: 'column' }} onClick={()=>this.setState({ isEmpVisible: !this.state.isEmpVisible })} >
                                <div style={{ display: 'flex', marginBottom: 15 }}>
                                  <span style={{ marginLeft: 10 }}>
                                    {emp.timeMode}
                                  </span>
                                </div>
                                <div style={{ display: 'flex', marginBottom: 15 }}>
                                  <span style={{ marginLeft: 10 }}>
                                    {emp.paymentMethod.charAt(0).toUpperCase() + emp.paymentMethod.slice(1)}
                                  </span>
                                </div>
                                <div style={{ display: 'flex', marginBottom: 15 }}>
                                  <span style={{ marginLeft: 10 }}>
                                    {moment(emp.createdAt).format('DD MMM, YYYY')}
                                  </span>
                                </div>
                                <div style={{ display: 'flex', marginBottom: 15 }}>
                                  <span style={{ marginLeft: 10 }}>
                                    {emp.HourlyRate}
                                  </span>
                                </div>
                                <div style={{ display: 'flex', marginBottom: 15 }}>
                                  <span style={{ marginLeft: 10 }}>
                                    {emp.WeekHr}
                                  </span>
                                </div>
                                <div style={{ display: 'flex', marginBottom: 15 }}>
                                  <span style={{ marginLeft: 10 }}>
                                    {emp.duties}
                                  </span>
                                </div>
                                <div style={{ display: 'flex', marginBottom: 15 }}>
                                  <span style={{ marginLeft: 10 }}>
                                    {emp.address}
                                  </span>
                                </div>
                              </div>
                              :
                              ''
                            }
                          </td>
                          <td>
                          {this.state.isEmpVisible ?
                              <div style={{ display: 'flex', flexDirection: 'column' }} onClick={()=>this.setState({ isEmpVisible: !this.state.isEmpVisible })} >
                                <div style={{ display: 'flex' }} className="buttonsGroup">
                                  <Button
                                    color="primary"
                                  >
                                  </Button>
                                </div>
                                <div style={{ display: 'flex' }}>
                                  <Button
                                    color="primary"
                                  >
                                  </Button>
                                </div>
                                <div style={{ display: 'flex' }}>
                                  <Button
                                    color="primary"
                                  >
                                  </Button>
                                </div>
                                <div style={{ display: 'flex' }}>
                                  <Button
                                    color="primary"
                                    onClick={() => this.editValue("HourlyRate", emp.HourlyRate, emp)}
                                  >
                                    Edit
                                  </Button>
                                </div>
                                <div style={{ display: 'flex' }}>
                                  <Button
                                    color="primary"
                                    onClick={() => this.editValue("WeekHr", emp.WeekHr, emp)}
                                  >
                                    Edit
                                  </Button>
                                </div>
                                <div style={{ display: 'flex' }}>
                                  <Button
                                    color="primary"
                                    onClick={() => this.editValue("duties", emp.duties, emp)}
                                  >
                                    Edit
                                  </Button>
                                </div>
                                <div style={{ display: 'flex' }}>
                                  <Button
                                    color="primary"
                                    onClick={() => this.editValue("address", emp.address, emp)}
                                  >
                                    Edit
                                  </Button>
                                </div>
                              </div>
                              :
                              ''
                            }
                          </td>
                          <td />
                        </tr>
                      </React.Fragment>
                    );
                  })
                ) : (
                  <h3>There is no Employee Yet</h3>
                )}
              </tbody>
                  
                    {/* Update Dialog */}
                    { loader ?
                      <Dialog
                        open={this.state.updateDialogOpen}
                        onClose={this.handleUpdateDialogClose}
                        scroll={this.state.scroll}
                        aria-labelledby="scroll-dialog-title"
                        style={{ padding: 25, marginTop: '30vh' }}
                      >
                        <DialogContent style={{ padding: 25, flex: 1, alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                          <CircularProgress />
                        </DialogContent>
                      </Dialog>
                    :
                      <Dialog
                        open={this.state.updateDialogOpen}
                        onClose={this.handleUpdateDialogClose}
                        scroll={this.state.scroll}
                        aria-labelledby="scroll-dialog-title"
                        style={{ padding: 0 }}
                      >
                        <DialogTitle
                          id="scroll-dialog-title"
                          style={{
                            textAlign: "center",
                            borderBottom: "1px solid lightgrey "
                          }}
                        >
                          Update Task
                            </DialogTitle>
                        <DialogContent style={{ padding: 25, flex: 1, alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                          <p style={{ marginBottom: 10 }}><b>{this.state.nameAlias}</b></p>
                          <input onChange={this.handleChange} placeholder={this.state.nameAlias} value={this.state.value} style={{ padding: 5, marginBottom: 15 }} />
                          <Button
                            color="primary"
                            style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
                            onClick={() => this.updateEmployee()}
                          >
                            UPDATE
                              </Button>
                        </DialogContent>
                      </Dialog>
                    }

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
  updateEmpStatus: state.employeeReducer.updateEmployeeStatus,
  loader: state.employeeReducer.loader
});

export default withRouter(
  connect(
    mapStateToProps,
    {
      updateEmployee
    }
  )(translate("common")(BasicTable))
);
