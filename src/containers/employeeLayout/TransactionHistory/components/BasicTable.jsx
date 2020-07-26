import React from "react";
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
  Button
} from "reactstrap";
import { translate } from "react-i18next";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withRouter } from "react-router-dom";
import moment from "moment";
import { getStartPayStubs } from "../../../../redux/actions/paystubsActions";
import Divider from "@material-ui/core/Divider";
import PdfViewer from "../../../employeerLayout/PdfViewer";

class BasicTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: true
    };
  }

  componentDidMount = () => {
    this.props.getStartPayStubs(this.props.user.employeeid);
  };

  componentWillReceiveProps = nextProps => {
    this.setState({ loader: false });
  };
  viewPayStub = () => {};

  searchingForName = searchQuery => {
    return function(item) {
      return (
          moment(item.created).format("MMM/DD/YYYY").toLowerCase().includes(searchQuery.toLowerCase()) || 
          !searchQuery
      );
    };
  };

  render() {
    const { transactions, searchQuery } = this.props;

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
              <Col xs={3} sm={3} md={3} lg={3} xl={3}>
                <h5>
                  <strong> Amount </strong>{" "}
                </h5>
              </Col>

              <Col xs={3} sm={3} md={3} lg={3} xl={3}>
                <h5>
                  <strong> Created At </strong>{" "}
                </h5>
              </Col>

            <Col xs={3} sm={3} md={3} lg={3} xl={3}>
              <h5>
                <strong> Status </strong>{" "}
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
              {transactions.length >= 1 > 0 ? (
                transactions.filter(this.searchingForName(searchQuery)).map((item, index) => {
                  let id = ++index;
                  return (
                    <Row className="taskRow" key={index} id={`toggler${index}`}>
                      <Col
                        className="taskCol"
                        xs={3}
                        sm={3}
                        md={3}
                        lg={3}
                        xl={3}
                      >
                        <p>{index}</p>
                      </Col>
                      <Col
                        className="taskCol"
                        xs={3}
                        sm={3}
                        md={3}
                        lg={3}
                        xl={3}
                      >
                        <p> { item.amount.value + " " + item.amount.currency + " $" }</p>
                      </Col>
                      <Col
                        className="taskCol"
                        xs={3}
                        sm={3}
                        md={3}
                        lg={3}
                        xl={3}
                      >
                        <p> {moment(item.created).format("MMM/DD/YYYY")}</p>
                      </Col>
                      <Col
                        className="taskCol"
                        xs={3}
                        sm={3}
                        md={3}
                        lg={3}
                        xl={3}
                      >
                        { item.status === 'pending' ? 
                          <Badge style={{padding:8, borderRadius: 18}} color="primary">{item.status}</Badge>
                          // <p> <span style={{padding: 5, color: 'white', backgroundColor: 'blue', borderRadius: 10}}>{ item.status }</span> </p>
                        :
                        <Badge style={{padding:8, borderRadius: 18}} color="success">{item.status}</Badge>
                          // <p> <span style={{padding: 5, color: 'white', backgroundColor: 'green', borderRadius: 10}}>{ item.status }</span> </p>
                        }
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
                              {/* <PdfViewer data={item.id} /> */}
                              <p style={{width: '100%', textAlign: 'left'}}> <b>ID: </b> { item.id }</p>
                              <p style={{width: '100%', textAlign: 'left'}}> <b>Note: </b> { item.metadata.note }</p>
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
                  <h3>No Recorded Transaction yet!</h3>
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
