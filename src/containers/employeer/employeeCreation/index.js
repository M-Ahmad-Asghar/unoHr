import React, { Fragment } from "react";
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

class AddEmpSteps extends React.Component {
  state = {
    activeStep: 0,
    empBasicData: {},
    selectDoc: [],
    sendLoader: false,
  };

  getEmpData = (data) => {
    this.setState({
      empBasicData: data,
    });
  };

  getDocs = (docs) => {
    let documents = docs.filter((doc) => doc.selected);
    this.setState({
      selectDoc: documents,
    });
  };

  addEmployee = () => {
    let empBasicData = this.state.empBasicData;

    let data = {
      ...empBasicData,
      documents: this.state.selectDoc,
    };
    this.props.addNewEmployee(data);
    this.setState({
      sendLoader: true,
    });
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      sendLoader: false,
    });
    if (nextProps.addEmpStatus === "done") {
      this.props.history.push("/home/employeer/employeeView");
    } else if (nextProps.addEmpStatus === "error") {
      this.setState({
        activeStep: 0,
      });
    }
  }

  getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <EmpForm handleNext={this.handleNext} getEmpData={this.getEmpData} />
        );
      case 1:
        return (
          <SelectDoc
            getDocs={this.getDocs}
            data={this.state.empBasicData}
            // stateName={this.state.empBasicData.stateName}
          />
        );

      default:
        return "Unknown stepIndex";
    }
  };

  handleNext = () => {
    this.setState((state) => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState((state) => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };
  componentDidMount() {
    this.props.getSystemDocs();
  }
  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep, sendLoader } = this.state;

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
                {this.getStepContent(activeStep)}
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
                    onClick={this.addEmployee}
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
}

AddEmpSteps.propTypes = {
  classes: PropTypes.object,
};
const mapStateToProps = (state) => {
  return {
    employeruid: state.userReducer.user.uid,
    loader: state.employerReducer.loader,
    successDone: state.employer.successDone,
    addEmpStatus: state.employerReducer.addEmpStatus,
  };
};

export default connect(mapStateToProps, { getSystemDocs, addNewEmployee })(
  withStyles(styles)(AddEmpSteps)
);
