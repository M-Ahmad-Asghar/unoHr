import React,{useState,useEffect} from "react";
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
import {useDispatch,useSelector} from 'react-redux'

function BasicTable ({ searchQuery } )  {
  const [checkedItems, setCheckedItems] = useState([])
  const [loader, setLoader] = useState(false)
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false)
  const [scroll, setScroll] = useState('body')
  const [isEmpVisible, setIsEmpVisible] = useState(false)
  const [employee, setEmployee] = useState({})
  const [nameAlias, setNameAlias] = useState('')
  const [name, setName] = useState('')
  const [value, setValue] = useState('')

const dispatch = useDispatch()



const employees = useSelector(state=>state.employerReducer.allEmployees)
const updateEmpStatus = useSelector(state=>state.employeeReducer.updateEmployeeStatus)
const stateLoader = useSelector(state=>state.employeeReducer.loader)

useEffect(()=>{
  if (updateEmpStatus === 'done') {
    let name = name;
    let value = value;
    if (name !== '' && value !== '') {
      let employee1 = employee;
      employee1[name] = value;
      setEmployee(employee1)
   
    }
    setLoader(false)
    setUpdateDialogOpen(false)

  }

  if (updateEmpStatus === 'error') {
    setLoader(false)
    setUpdateDialogOpen(false)
  
  }

},[updateEmpStatus])

 

 const  searchingForName = searchQuery => {
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

  const handleUpdateDialogOpen = () => {
    setUpdateDialogOpen(true)
  
  };

 const  handleUpdateDialogClose = () => {
   setUpdateDialogOpen(false)
    
  };

 const  editValue = (name, value, emp) => {
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
      setEmployee(emp)
      setName(name)
      setValue(value)
      setNameAlias(nameAlias)
      setUpdateDialogOpen(true)

  }

  const updateEmployeeData = () => {
    
      

      if(value === '') {
          toast.error("Empty field not allowed!");
      } else {
        setLoader(true)
      
          let obj = {
              'docid': employee.id,
              'name': name,
              'value': value
          }

        dispatch(updateEmployee(obj))
        setLoader(false)
      }
  }

 const  handleChange = (event) => {
   setValue(event.target.value)

  }




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
                  employees.filter(searchingForName(searchQuery)).map((emp, index) => {
                    return (
                      <React.Fragment>
                        <tr key={index} onClick={()=>setIsEmpVisible(!isEmpVisible) }>
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
                            {isEmpVisible ?
                              <div style={{ display: 'flex', flexDirection: 'column' }} onClick={()=>setIsEmpVisible(!isEmpVisible ) }>
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
                          {isEmpVisible ?
                              <div style={{ display: 'flex', flexDirection: 'column' }} onClick={()=>setIsEmpVisible(!isEmpVisible )} >
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
                          {isEmpVisible ?
                              <div style={{ display: 'flex', flexDirection: 'column' }} onClick={()=>setIsEmpVisible(!isEmpVisible )} >
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
                                    onClick={() => editValue("HourlyRate", emp.HourlyRate, emp)}
                                  >
                                    Edit
                                  </Button>
                                </div>
                                <div style={{ display: 'flex' }}>
                                  <Button
                                    color="primary"
                                    onClick={() => editValue("WeekHr", emp.WeekHr, emp)}
                                  >
                                    Edit
                                  </Button>
                                </div>
                                <div style={{ display: 'flex' }}>
                                  <Button
                                    color="primary"
                                    onClick={() => editValue("duties", emp.duties, emp)}
                                  >
                                    Edit
                                  </Button>
                                </div>
                                <div style={{ display: 'flex' }}>
                                  <Button
                                    color="primary"
                                    onClick={() => editValue("address", emp.address, emp)}
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
                        open={updateDialogOpen}
                        onClose={handleUpdateDialogClose}
                        scroll={scroll}
                        aria-labelledby="scroll-dialog-title"
                        style={{ padding: 25, marginTop: '30vh' }}
                      >
                        <DialogContent style={{ padding: 25, flex: 1, alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                          <CircularProgress />
                        </DialogContent>
                      </Dialog>
                    :
                      <Dialog
                        open={updateDialogOpen}
                        onClose={handleUpdateDialogClose}
                        scroll={scroll}
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
                          <p style={{ marginBottom: 10 }}><b>{nameAlias}</b></p>
                          <input onChange={handleChange} placeholder={nameAlias} value={value} style={{ padding: 5, marginBottom: 15 }} />
                          <Button
                            color="primary"
                            style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
                            onClick={updateEmployeeData}
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

BasicTable.propTypes = {
  t: PropTypes.func.isRequired
};



export default withRouter(
(translate("common")(BasicTable))
);
