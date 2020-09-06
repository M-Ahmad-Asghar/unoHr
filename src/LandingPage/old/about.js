import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Container, Col, Row } from "reactstrap";
import icon1 from "../assets/icon1.png";
import icon2 from "../assets/icon2.png";
import icon3 from "../assets/icon3.png";
import icon4 from "../assets/icon4.png";

class About extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <Row className="aboutRow" id="about">
        <Col sm={12} md={7}>
          <div>
            <h2 className="title">
              WHY <span>UNOHR ?</span>
            </h2>
          </div>
          <div>
            <p className="caption-about">
              unoHR is a simple and easy to use household employee management
              application that can be entirely run on mobile phones and tablets.
              Features include Onboarding, Task Management, Timesheets and Tax
              filings.
            </p>
          </div>
          <Row style={{ marginTop: "20px" }}>
            <Col sm={1}>
              <div className="icon-hover">
                <img src={icon1} alt="easy-to-customized" />
              </div>
            </Col>
            <Col sm={11} md={5}>
              <div className="about-text">
                <h3>Task Manager</h3>
              </div>
            </Col>
            <Col sm={1}>
              <div className="icon-hover">
                <img src={icon2} alt="easy-to-customized" />
              </div>
            </Col>
            <Col sm={11} md={5}>
              <div className="about-text">
                <h3>Direct Deposits/Checks</h3>
              </div>
            </Col>
          </Row>
          <Row style={{ marginTop: "20px" }}>
            <Col sm={1}>
              <div className="icon-hover">
                <img src={icon3} alt="easy-to-customized" />
              </div>
            </Col>
            <Col sm={11} md={5}>
              <div className="about-text">
                <h3>Time Manager</h3>
              </div>
            </Col>
            <Col sm={1}>
              <div className="icon-hover">
                <img src={icon4} alt="easy-to-customized" />
              </div>
            </Col>
            <Col sm={11} md={5}>
              <div className="about-text">
                <h3>Alerts & Notifications</h3>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

About.propTypes = {};

function mapStateToProps(state, ownProps) {
  return {};
}

export default connect(mapStateToProps)(About);
