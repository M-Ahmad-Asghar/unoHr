import React, { useState, useEffect, Fragment } from "react";
import { Card, CardBody, Col, Row, CardHeader } from "reactstrap";
import Divider from "@material-ui/core/Divider";
import moment from "moment";
import "react-intl-tel-input/dist/main.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { getEmpDocs } from "../../../../redux/actions/paperWorkActions";
import { UncontrolledCollapse } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    width: "95%",
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    padding: 30,
  },
});

function Paperworks() {
  const [loader, setLoader] = useState(true);
  const [documents, setDocuments] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.employeeUserReducer.currentEmp);
  const stateDocuments = useSelector(
    (state) => state.paperWorkReducer.paperDocs
  );
  const loading = useSelector((state) => state.paperWorkReducer.loading);
  const getDocStatus = useSelector(
    (state) => state.paperWorkReducer.getDocStatus
  );

  useEffect(() => {
    dispatch(getEmpDocs(user.employeeid));
    setDocuments(stateDocuments);
    setLoader(false);
  }, []);

  useEffect(() => {
    if (stateDocuments) {
      setDocuments(stateDocuments);
      setLoader(false);
    }
  }, [stateDocuments]);

  const docClickHandler = (item) => {
    history.push({
      pathname: "/home/employee/paperworkForms",
      state: { item },
    });
  };

  return (
    <div style={{ marginTop: -25 }}>
      <Paper
        align="center"
        elevation={5}
        style={{ padding: 8, marginBottom: 15 }}
      >
        <Typography variant="h6">Paper Works</Typography>
      </Paper>

      <Col
        md={12}
        lg={12}
        xl={12}
        style={{ backgroundColor: "white", paddingTop: 20, borderRadius: 5 }}
      >
        <Card>
          {/* <CardHeader>
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
            </CardHeader> */}

          {loader ? (
            <div style={{ marginTop: "35px", textAlign: "center" }}>
              <CircularProgress />
            </div>
          ) : documents ? (
            <CardBody style={{ padding: "0px" }}>
              {documents.length > 0 ? (
                documents.map((item, index) => {
                  return (
                    <Fragment>
                      <Row
                        className="taskRow"
                        key={index}
                        id={`toggler${index}`}
                        // onClick={() => this.docClickHandler(item)}
                      >
                        <Col
                          className="taskCol"
                          xs={6}
                          sm={6}
                          md={6}
                          lg={6}
                          xl={6}
                        >
                          <p>{item.doc_title}</p>
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
                      <UncontrolledCollapse toggler={`#toggler${index}`}>
                        <Card>
                          <CardBody>
                            {/* employeeid: "71f41a80-3403-11e9-a86c-75b225a623e7"
employeruid */}
                            <iframe
                              src={
                                item.forward !== undefined &&
                                item.forward != "none"
                                  ? item.doc_url +
                                    "/?employeeid=" +
                                    user.employeeid +
                                    "&employer=" +
                                    user.employeruid
                                  : item.doc_url +
                                    "/?employeeid=" +
                                    user.employeeid
                              }
                              style={{ width: "100%", height: 500 }}
                              frameborder="0"
                              webkitAllowFullScreen
                              mozallowfullscreen
                              allowFullScreen
                            />
                          </CardBody>
                        </Card>
                      </UncontrolledCollapse>
                    </Fragment>
                  );
                })
              ) : (
                <div style={{ textAlign: "center", padding: 30 }}>
                  <h3>Could Not Find any Paperworks.</h3>
                </div>
              )}
            </CardBody>
          ) : (
            <Typography component="p">No Paperworks found!</Typography>
          )}
        </Card>
      </Col>
    </div>
  );
}

export default withStyles(styles)(Paperworks);
