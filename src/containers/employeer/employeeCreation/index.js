import React, { useEffect, useState,Fragment } from "react";
import PropTypes from "prop-types";
import { Col, Container, Row } from "reactstrap";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import EmpForm from "./components/HorizontalForm";
import SelectDoc from "./selectDoc";
import {
  getSystemDocs,
  addNewEmployee,
} from "../../../redux/actions/employerActions";
import { connect } from "react-redux";
import { PulseLoader } from "react-spinners";
import {useSelector, useDispatch} from 'react-redux'
const styles = (theme) => ({
  root: {
    width: "90%",
  },
  backButton: {
    marginRight: theme.spacing.unit,
    marginLeft: "30px",
    width: "10%",
  },
  button: {
    width: "14%",
    marginLeft: "30px",
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  stepDetail: {
    marginTop: "25px",
    paddingLeft: "0px",
    paddingRight: "0px",
    marginBottom: "25px",
  },
});

function getSteps() {
  return ["Employee Basic Information", "Select Documents"];
}

// function

function AddEmpSteps ({ classes } ) {

  const  [activeStep, setActiveStep] = useState(0)
  const  [selectDoc, setSelectDoc] = useState([])
  const  [sendLoader, setSendLoader] = useState(false)
  const  [empBasicData, setEmpBasicData] = useState('false')



  const employeruid = useSelector(state=>state.userReducer.user.uid)
  const stateLoader = useSelector(state=>state.employerReducer.loader)
  const successDone = useSelector(state=>state.employer.successDone)
  const addEmpStatus = useSelector(state=>state.employerReducer.addEmpStatus)


  
const dispatch = useDispatch()

  const getEmpData = (data) => {
    setEmpBasicData(data)
 
  };

const  getDocs = (docs) => {
    let documents = docs.filter((doc) => doc.selected);
    setSelectDoc(document)
 
  };

const   addEmployee = () => {
    let empBasicData = empBasicData;

    let data = {
      ...empBasicData,
      documents: selectDoc,
    };
    dispatch(addNewEmployee(data))
    setSendLoader(true)

  };


  useEffect(()=>{
    setSendLoader(true)

    if (addEmpStatus === "done") {
      this.props.history.push("/home/employeer/employeeView");
    } else if (addEmpStatus === "error") {
      setActiveStep(0)
   
    }

  },[addEmpStatus])


  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <EmpForm handleNext={handleNext} getEmpData={getEmpData} />
        );
      case 1:
        return (
          <SelectDoc
            getDocs={getDocs}
            data={empBasicData}
            // stateName={this.state.empBasicData.stateName}
          />
        );

      default:
        return "Unknown stepIndex";
    }
  };

  const handleNext = () => {
    setActiveStep(activeStep+1)

  };

 const  handleBack = () => {
   setActiveStep(activeStep -1 )
  
  };

 const  handleReset = () => {
   setActiveStep(0)
 
  };

  useEffect(()=>{
    dispatch(getSystemDocs)
  },[])

  
    
    const steps = getSteps();
  

    return (
      <Container>
        <Row>
          <Col md={12}>
            <h3 className="page-title">Add a New Employee</h3>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Col>

          <Col md={12} className={classes.stepDetail}>
            <Fragment>
              <Typography className={classes.instructions}>
                {getStepContent(activeStep)}
              </Typography>
              {activeStep == 1 &&
                (sendLoader ? (
                  <Button
                    color="primary"
                    disabled={true}
                    className={classes.button}
                  >
                    <PulseLoader color={"#123abc"} size={15} />
                  </Button>
                ) : (
                  <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    onClick={addEmployee}
                  >
                    Add Employee
                  </Button>
                ))}
            </Fragment>
          </Col>
        </Row>
      </Container>
    );
  
}

AddEmpSteps.propTypes = {
  classes: PropTypes.object,
};


export default (withStyles(styles)(AddEmpSteps));
