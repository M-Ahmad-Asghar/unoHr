import React from "react";
import {
  Card,
  CardBody,
  Col,
  CardHeader,
  Row,
  UncontrolledCollapse,
 } from "reactstrap";
import { translate } from "react-i18next";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withRouter } from "react-router-dom";
import moment from 'moment'
import { getStartPayStubs } from "../../../../../../redux/actions/paystubsActions";

import Divider from "@material-ui/core/Divider";
import PdfViewer from "../../../../PdfViewer";

class BasicTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loader: true
    };
    
  }
  componentDidMount = () => {
    let param = this.props.location.search;
    let id = param.split("?")[1];
    this.props.getStartPayStubs(id);
  };

  componentWillReceiveProps = nextProps => {
    this.setState({ loader: false });
  };
  viewPayStub = ()=>{

  }

  searchingForName = searchQuery => {
    return function(employeeTask) {
      return (
        moment(employeeTask.recordFrom).format("MMM/DD/YYYY")
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) || 
          moment(employeeTask.recordTo).format("MMM/DD/YYYY").toLowerCase().includes(searchQuery.toLowerCase()) || !searchQuery
      );
    };
  };

  render() {
    const { payPeriod, searchQuery } = this.props;
    return (
      <Col md={12} lg={12} xl={12}>
        <Card>
          <CardHeader>
            <Row>
              <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                <h5>
                  <strong> # </strong>{" "}
                </h5>
              </Col>
              <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                <h5>
                  <strong> Record From </strong>{" "}
                </h5>
              </Col>

              <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                <h5>
                  <strong> Record To </strong>{" "}
                </h5>
              </Col>
            </Row>
          </CardHeader>
          {this.state.loader ? (
            <div style={{ marginTop: "35px", textAlign: "center" }}>
              <CircularProgress />
            </div>
          ) : (
            <CardBody style={{ padding: "0px" }}>
              {this.props.paystubs.length >= 1 > 0 ? (
                this.props.paystubs.filter(this.searchingForName(searchQuery)).map((item, index) => {    
                  let id = ++index;
                  return (
                    <Row className="taskRow" key={index} id={`toggler${index}`}>
                      <Col
                        className="taskCol"
                        xs={4}
                        sm={4}
                        md={4}
                        lg={4}
                        xl={4}
                      >
                        <p>{index}</p>
                      </Col>
                      <Col
                        className="taskCol"
                        xs={4}
                        sm={4}
                        md={4}
                        lg={4}
                        xl={4}
                      >
                        <p> {moment(item.recordFrom).format("MMM/DD/YYYY")}</p>
                      </Col>
                      <Col
                        className="taskCol"
                        xs={4}
                        sm={4}
                        md={4}
                        lg={4}
                        xl={4}
                      >
                        <p> {moment(item.recordTo).format("MMM/DD/YYYY")}</p>
                      </Col>

                      <Col sm={12} md={12} lg={12} xl={12}>
                        <Divider />
                        <UncontrolledCollapse
                          className="with-shadow"
                          toggler={`#toggler${index}`}
                        >
                          <Row>
                            <Col
                              sm={12}
                              md={12}
                              lg={12}
                              xl={12}
                              style={{ textAlign: "center", marginTop: "15px" }}
                            >
                              <PdfViewer data={item.filename} />
                            </Col>
                          </Row>
                        </UncontrolledCollapse>
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
}

BasicTable.propTypes = {
  t: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.employeeUserReducer.currentEmp,
  paystubs: state.payStubsReducer.paystubs
});

export default withRouter(
  connect(
    mapStateToProps,
    {
      getStartPayStubs
    }
  )(translate("common")(BasicTable))
);
