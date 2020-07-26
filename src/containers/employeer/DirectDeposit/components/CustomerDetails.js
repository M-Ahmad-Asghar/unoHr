import React from "react";
import {
  Card,
  CardBody,
  Col,
  Badge,
  CardHeader,
  Row,
} from "reactstrap";
import { translate } from "react-i18next";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from "moment";

class BasicTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false
    };
  }

  componentDidMount = () => {
    // this.props.getStartPayStubs(this.props.user.employeeid);
  };

  componentWillReceiveProps = nextProps => {
    this.setState({ loader: false });
  };

  render() {
      let data = this.props.data;

    return (
      <Col style={{margin: 'auto'}} md={8} lg={8} xl={8}>
        <Card>
          <CardHeader>
            <Row>
              <Col style={{textAlign: 'center'}}>
                <h5>
                  <strong> Account Details </strong>
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
              <Row style={{marginLeft:30}} key="acc_id" id="acc_id">
                <Col
                  className="taskCol"
                >
                  <FontAwesomeIcon icon="hashtag" />
                  <strong style={{marginLeft: 5, color: '#808080'}}>Account Id</strong>
                </Col>
                <Col
                  className="taskCol"
                >
                  <p>{data.id}</p>
                </Col>
              </Row>
              <Row style={{marginLeft:30}} key="date" id="date">
                <Col
                  className="taskCol"
                >
                  <FontAwesomeIcon icon="calendar-day" />
                  <strong style={{marginLeft: 5, color: '#808080'}}>Opening Date</strong>
                </Col>
                <Col
                  className="taskCol"
                >
                  <p>{moment(data.created).format("MMM/DD/YYYY")}</p>
                </Col>
              </Row>
              <Row style={{marginLeft:30}} key="status" id="status">
                <Col
                  className="taskCol"
                >
                  <FontAwesomeIcon icon="hourglass-half" />
                  <strong style={{marginLeft: 5, color: '#808080'}}>Account Status</strong>
                </Col>
                <Col
                  className="taskCol"
                >
                  { data.status === 'verified' ? 
                      <Badge style={{padding:8, borderRadius: 18}} color="success">{data.status}</Badge>
                    :
                      <Badge style={{padding:8, borderRadius: 18}} color="primary">{data.status}</Badge>  
                  }
                </Col>
              </Row>
              <Row style={{marginLeft:30}} key="type" id="type">
                <Col
                  className="taskCol"
                >
                  <FontAwesomeIcon icon="users" />
                  <strong style={{marginLeft: 5, color: '#808080'}}>Account Type</strong>
                </Col>
                <Col
                  className="taskCol"
                >
                  <p>{data.type}</p>
                </Col>
              </Row>
              <Row style={{marginLeft:30}} key="name" id="name">
                <Col
                  className="taskCol"
                >
                  <FontAwesomeIcon icon="address-card" />
                  <strong style={{marginLeft: 5, color: '#808080'}}>Name</strong>
                </Col>
                <Col
                  className="taskCol"
                >
                  <p>{data.firstName + " " + data.lastName}</p>
                </Col>
              </Row>
              <Row style={{marginLeft:30}} key="email" id="email">
                <Col
                  className="taskCol"
                >
                  <FontAwesomeIcon icon="at" />
                  <strong style={{marginLeft: 5, color: '#808080'}}>Email</strong>
                </Col>
                <Col
                  className="taskCol"
                >
                  <p>{data.email}</p>
                </Col>
              </Row>
              <Row style={{marginLeft:30}} key="state" id="state">
                <Col
                  className="taskCol"
                >
                  <FontAwesomeIcon icon="flag-usa" />
                  <strong style={{marginLeft: 5, color: '#808080'}}>State</strong>
                </Col>
                <Col
                  className="taskCol"
                >
                  { data.state }
                </Col>
              </Row>
              <Row style={{marginLeft:30}} key="city" id="city">
                <Col
                  className="taskCol"
                >
                  <FontAwesomeIcon icon="city" />
                  <strong style={{marginLeft: 5, color: '#808080'}}>City</strong>
                </Col>
                <Col
                  className="taskCol"
                >
                  <p>{data.city}</p>
                </Col>
              </Row>
              <Row style={{marginLeft:30}} key="zip" id="zip">
                <Col
                  className="taskCol"
                >
                  <FontAwesomeIcon icon="envelope" />
                  <strong style={{marginLeft: 5, color: '#808080'}}>Postal Code</strong>
                </Col>
                <Col
                  className="taskCol"
                >
                  <p>{data.postalCode}</p>
                </Col>
              </Row>
              <Row style={{marginLeft:30}} key="address" id="address">
                <Col
                  className="taskCol"
                >
                  <FontAwesomeIcon icon="map-marked-alt" />
                  <strong style={{marginLeft: 5, color: '#808080'}}>Address</strong>
                </Col>
                <Col
                  className="taskCol"
                >
                  <p>{data.address1}</p>
                </Col>
              </Row>
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
  user: state.employeeUserReducer.currentEmp
});

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(translate("common")(BasicTable))
);