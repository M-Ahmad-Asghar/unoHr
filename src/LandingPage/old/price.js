import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Container,
  Col,
  Row,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from "reactstrap";
import priceBg from "../assets/price-bg.png";
class Price extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <Row className="priceRow" id="price">
        <Col sm={12} md={4} style={{ marginBottom: "30px" }}>
          <Card style={{ backgroundColor: "#fff" }}>
            <CardBody>
              <CardTitle>
                <div
                  className="price-type"
                  style={{ backgroundImage: `url(${priceBg})` }}
                >
                  <h2>BASIC</h2>
                </div>
              </CardTitle>
              <CardSubtitle style={{ textAlign: "center", padding: "15px" }}>
                ONLY THE BASIC FEATURES
              </CardSubtitle>
              <CardText style={{ textAlign: "center" }}>
                <div className="mrp">
                  <div className="price-devide" />
                  <h2>$39</h2>
                  <h6 className="price-year">PER MONTH</h6>
                  <div className="price-devide" />
                </div>
                <div className="priceFeature">
                  <p>1 Active Employee</p>
                  <p>Task Manager</p>
                  <p>Time Tracking</p>
                  <p>OnBoarding</p>
                  <p>Mobile (IOS + Android)</p>
                </div>
              </CardText>
              <div style={{ textAlign: "center" }}>
                <Button outline color="#3f51b5" className="priceBtn">
                  Select Plan
                </Button>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col sm={12} md={4} style={{ marginBottom: "30px" }}>
          <Card style={{ backgroundColor: "#fff" }}>
            <CardBody>
              <CardTitle>
                <div
                  className="price-type"
                  style={{ backgroundImage: `url(${priceBg})` }}
                >
                  <h2>STANDARD</h2>
                </div>
              </CardTitle>
              <CardSubtitle style={{ textAlign: "center", padding: "15px" }}>
                TAKE IT TO THE NEXT LEVEL
              </CardSubtitle>
              <CardText style={{ textAlign: "center" }}>
                <div className="mrp">
                  <div className="price-devide" />
                  <h2>$59</h2>
                  <h6 className="price-year">PER MONTH</h6>
                  <div className="price-devide" />
                </div>
                <div className="priceFeature">
                  <p>5 Active Employee</p>
                  <p>Task Manager</p>
                  <p>Time Tracking</p>
                  <p>OnBoarding</p>
                  <p>Mobile (IOS + Android)</p>
                </div>
              </CardText>
              <div style={{ textAlign: "center" }}>
                <Button outline color="#3f51b5" className="priceBtn">
                  Select Plan
                </Button>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col sm={12} md={4} style={{ marginBottom: "30px" }}>
          <Card style={{ backgroundColor: "#fff" }}>
            <CardBody>
              <CardTitle>
                <div
                  className="price-type"
                  style={{ backgroundImage: `url(${priceBg})` }}
                >
                  <h2>CUSTOM</h2>
                </div>
              </CardTitle>
              <CardSubtitle style={{ textAlign: "center", padding: "15px" }}>
                BIGGEST PLAN
              </CardSubtitle>
              <CardText style={{ textAlign: "center" }}>
                <div className="mrp">
                  <div className="price-devide" />
                  <h2>CALL</h2>
                  <h6 className="price-year">PER MONTH</h6>
                  <div className="price-devide" />
                </div>
                <div className="priceFeature">
                  <p>CUSTOM Active Employee</p>
                  <p>Task Manager</p>
                  <p>Time Tracking</p>
                  <p>OnBoarding</p>
                  <p>Mobile (IOS + Android)</p>
                </div>
              </CardText>
              <div style={{ textAlign: "center" }}>
                <Button outline color="#3f51b5" className="priceBtn">
                  Select Plan
                </Button>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col sm={12}>
          <p>
            No Contract | No Sign-up Fee | No Direct Deposit Fee | No Filing
            Fees | Additional employee $10 per month | Background checks extra $
          </p>
        </Col>
      </Row>
    );
  }
}

Price.propTypes = {};

function mapStateToProps(state, ownProps) {
  return {};
}

export default connect(mapStateToProps)(Price);
