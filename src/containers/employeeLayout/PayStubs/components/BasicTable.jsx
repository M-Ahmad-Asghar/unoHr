import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Col,
  Badge,
  Table,
  CardHeader,
  Row,
  UncontrolledCollapse,
  ButtonToolbar,
  Button,
} from "reactstrap";
import { translate } from "react-i18next";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Popup from "reactjs-popup";
import { withRouter } from "react-router-dom";
import moment from "moment";
import {
  getStartPayStubs,
  getCheckPayStubs,
} from "../../../../redux/actions/paystubsActions";
import Divider from "@material-ui/core/Divider";
import PdfViewer from "../../../employeerLayout/PdfViewer";
import { useDispatch, useSelector } from "react-redux";

function BasicTable({ searchQuery }) {
  const [loader, setLoader] = useState(true);
  const [employeeId, setEmployeeId] = useState("");
  const dispatch = useDispatch();

  const user = useSelector((state) => state.employeeUserReducer.currentEmp);
  const paystubs = useSelector((state) => state.payStubsReducer.paystubs);
  const checkPayStubs = useSelector(
    (state) => state.payStubsReducer.checkPayStubs
  );

  useEffect(() => {
    dispatch(getCheckPayStubs(user.checkEmployeeId));
    dispatch(getStartPayStubs(user.employeeid));
  }, []);

  useEffect(() => {
    if (checkPayStubs.length > 0) {
      setLoader(false);
    }
  }, [checkPayStubs]);

  // viewPayStub = () => {};

  const searchingForName = (searchQuery) => {
    return function(item) {
      return (
        moment(item.recordFrom)
          .format("MMM/DD/YYYY")
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        moment(item.recordTo)
          .format("MMM/DD/YYYY")
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        !searchQuery
      );
    };
  };

  return (
    <Col md={12} lg={12} xl={12}>
      <Card>
        <CardHeader>
          <Row>
            <Col xs={3} sm={3} md={3} lg={3} xl={3}>
              <h5>
                <strong> # </strong>{" "}
              </h5>
            </Col>
            <Col xs={2} sm={3} md={3} lg={3} xl={3}>
              <h5>
                <strong> Record From </strong>{" "}
              </h5>
            </Col>

            <Col xs={3} sm={3} md={3} lg={3} xl={3}>
              <h5>
                <strong> Record To </strong>{" "}
              </h5>
            </Col>

            <Col xs={3} sm={3} md={3} lg={3} xl={3}>
              <h5>
                <strong> View PDF</strong>{" "}
              </h5>
            </Col>
          </Row>
        </CardHeader>
        {loader ? (
          <div style={{ marginTop: "35px", textAlign: "center" }}>
            <CircularProgress />
          </div>
        ) : (
          <CardBody style={{ padding: "0px" }}>
            {checkPayStubs.length ? (
              checkPayStubs.map((item, index) => {
                let id = ++index;
                return (
                  <Row className="taskRow" key={index} id={`toggler${index}`}>
                    <Col className="taskCol" xs={3} sm={3} md={3} lg={3} xl={3}>
                      <p>{index}</p>
                    </Col>
                    <Col className="taskCol" xs={3} sm={3} md={3} lg={3} xl={3}>
                      <p>
                        {" "}
                        {moment(item.period_start).format("L")}
                        {/* {moment(item.recordFrom).format("MMM/DD/YYYY")} */}
                      </p>
                    </Col>
                    <Col className="taskCol" xs={3} sm={3} md={3} lg={3} xl={3}>
                      {moment(item.end).format("L")}
                      {/* <p> {moment(item.recordTo).format("MMM/DD/YYYY")}</p> */}
                    </Col>

                    <Col className="taskCol" xs={3} sm={3} md={3} lg={3} xl={3}>
                      <Popup
                        modal
                        trigger={(open) => (
                          <FontAwesomeIcon
                            icon="file-pdf"
                            color="#70bbfd"
                            // onClick={() => alert()}
                            style={{
                              cursor: "pointer",
                              fontSize: 20,
                              marginLeft: 40,
                            }}
                          />
                        )}
                        position="right center"
                        closeOnDocumentClick
                      >
                        <PdfViewer
                          data={item.filename}
                          employeeId={user.checkEmployeeId}
                          payrollId={item.payroll}
                        />
                      </Popup>
                    </Col>

                    <Col sm={12} md={12} lg={12} xl={12}>
                      <Divider />
                      {/* <UncontrolledCollapse
                        className="with-shadow"
                        toggler={`#toggler${index}`}
                      >
                        <Row>
                          <Col
                            sm={12}
                            md={12}
                            lg={12}
                            xl={12}
                            style={{
                              textAlign: "center",
                              marginTop: "15px",
                            }}
                          >
                            <PdfViewer
                              data={item.filename}
                              employeeId={"emp_7aGGjb0zuOGUhMD0kq8j"}
                              payrollId={item.payroll}
                            />
                          </Col>
                        </Row>
                      </UncontrolledCollapse> */}
                    </Col>
                    <Divider />
                  </Row>
                );
              })
            ) : (
              <div style={{ textAlign: "center", padding: 20 }}>
                <h3>No Recorded Paystub yet!</h3>
              </div>
            )}
          </CardBody>
        )}
      </Card>
    </Col>
  );
}

BasicTable.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withRouter(translate("common")(BasicTable));
