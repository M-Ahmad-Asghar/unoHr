import React, { Component, Fragment } from "react";
import {
  Card,
  CardBody,
  Col,
  Row,
  CardHeader
} from "reactstrap";
import Divider from "@material-ui/core/Divider";
import moment from "moment";
import "react-intl-tel-input/dist/main.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: "95%",
    backgroundColor: theme.palette.background.paper
  },
  paper: {
    padding: 30
  }
});

class Paperworks extends Component {
  state = {
    loader: true,
    documents: []
  };

  componentDidMount = () => {
    this.setState({
      documents: this.props.documents,
      loader: false
    })
  };
  
  componentWillReceiveProps(nextProps) {
    if(nextProps.documents){
      this.setState({
        documents: nextProps.documents,
        loader: false
      })
    }
  }
  
  docClickHandler = (item) => {
    this.props.history.push({
      pathname: '/home/employee/paperworkForms',
      state: { item }
    })
  }

  render() {
    const { documents, loader } = this.state;

    return (
      <div style={{ marginTop: -25 }}>

        <Paper align="center" elevation={5} style={{ padding: 8, marginBottom: 15 }}>
          <Typography variant="h6">Paper Works</Typography>
        </Paper>

        <Col
          md={12}
          lg={12}
          xl={12}
          style={{ backgroundColor: "white", paddingTop: 20, borderRadius: 5 }}
        >
          <Card>
            <CardHeader>
              <Row>
                <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                  <h5>
                    <strong> Document Name </strong>{" "}
                  </h5>
                </Col>
                <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                  <h5>
                    <strong> Created At </strong>{" "}
                  </h5>
                </Col>
              </Row>
            </CardHeader>

          {
            loader ? (
              <div style={{ marginTop: "35px", textAlign: "center" }}>
                <CircularProgress />
              </div>
            ) : (
                documents ? 
                  <CardBody style={{ padding: "0px" }}>
                    {documents.length > 0 ? (
                      documents.map(
                        (item, index) => {
                          return (
                            <Fragment>
                              <Row
                                className="taskRow"
                                key={index}
                                id={`toggler${index}`}
                                onClick={() => this.docClickHandler(item)}
                              >
                                <Col
                                  className="taskCol"
                                  xs={6}
                                  sm={6}
                                  md={6}
                                  lg={6}
                                  xl={6}
                                >
                                  <p>{item.doc_name}</p>
                                </Col>
                                <Col
                                  className="taskCol"
                                  xs={6}
                                  sm={6}
                                  md={6}
                                  lg={6}
                                  xl={6}
                                >
                                  <p>
                                    {" "}
                                    {moment(item.createdAt).format(
                                      "MMM/DD/YYYY hh:mm A"
                                    )}
                                  </p>
                                </Col>
                              </Row>
                              
                              <Divider />
                            </Fragment>
                          );
                        }
                      )
                    ) : (
                      <div style={{ textAlign: "center", padding: 30 }}>
                        <h3>Could Not Find any Paperworks.</h3>
                      </div>
                    )}
                  </CardBody>
                :
                  <Typography component="p">No Paperworks found!</Typography>
                )
          }
        </Card>
          
      </Col>
        
    </div>
  )}
}

const mapStateToProps = state => {
  return ({
    user: state.employeeUserReducer.currentEmp,
    documents: state.paperWorkReducer.documents,
    loading: state.paperWorkReducer.loading,
    getDocStatus: state.paperWorkReducer.getDocStatus
  })
  
};

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(Paperworks));