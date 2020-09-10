import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Container, Col, Row } from "reactstrap";
import icon1 from "../assets/icon/1.png";
import icon2 from "../assets/icon/2.png";
import icon3 from "../assets/icon/3.png";
import icon4 from "../assets/icon/4.png";
import icon5 from "../assets/icon/5.png";
import icon6 from "../assets/icon/6.png";

class Features extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <Row className="featureRow" id="features">
        {/* <Col md={4} /> */}
        <Col sm={12} md={12}>
          <Row>
            <Col sm={12}>
              <div>
                <h2 className="title">
                  Features of <span>UNOHR</span>
                </h2>
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm={6} md={6}>
              <li>
                <Row>
                  <Col sm={1}>
                    <div className="feature-icon">
                      <img src={icon1} alt="icon" />
                    </div>
                  </Col>
                  <Col sm={11} md={11}>
                    <div className="feature-subtitle">
                      <h3>Paperless On-Boarding</h3>
                    </div>
                  </Col>
                </Row>
                <div>
                  <p>
                    Setup your account with full profile. Register tax accounts
                    with the IRS and State. Process Form I-9. Employee(s)
                    on-boarding with checklist.{" "}
                  </p>
                </div>
              </li>
            </Col>
            <Col sm={6} md={6}>
              <li>
                <Row>
                  <Col sm={1}>
                    <div className="feature-icon">
                      <img src={icon2} alt="icon" />
                    </div>
                  </Col>
                  <Col sm={11} md={11}>
                    <div className="feature-subtitle">
                      <h3>Tax Paperwork</h3>
                    </div>
                  </Col>
                </Row>

                <div>
                  <p>
                    Year-end preparation and distribution of W-2 for each
                    employee. Prepare and file W-3 and state paperwork. Prepare
                    Schedule H.{" "}
                  </p>
                </div>
              </li>
            </Col>
            <Col sm={6} md={6}>
              <li>
                <Row>
                  <Col sm={1}>
                    <div className="feature-icon">
                      <img src={icon3} alt="icon" />
                    </div>
                  </Col>
                  <Col sm={11} md={11}>
                    <div className="feature-subtitle">
                      <h3>Records</h3>
                    </div>
                  </Col>
                </Row>

                <div>
                  <p>
                    Electronic records for all employees including payroll and
                    tax records are archived for easy access.{" "}
                  </p>
                </div>
              </li>
            </Col>

            <Col sm={6} md={6}>
              <li>
                <Row>
                  <Col sm={1}>
                    <div className="feature-icon">
                      <img src={icon4} alt="icon" />
                    </div>
                  </Col>
                  <Col sm={11} md={11}>
                    <div className="feature-subtitle">
                      <h3>Payroll Management</h3>
                    </div>
                  </Col>
                </Row>

                <div>
                  <p>
                    Generate payroll calculations & statements for employee and
                    employer. Prepare and file monthly/quarterly taxes.{" "}
                  </p>
                </div>
              </li>
            </Col>

            <Col sm={6} md={6}>
              <li>
                <Row>
                  <Col sm={1}>
                    <div className="feature-icon">
                      <img src={icon5} alt="icon" />
                    </div>
                  </Col>
                  <Col sm={11} md={11}>
                    <div className="feature-subtitle">
                      <h3>Time Tracking</h3>
                    </div>
                  </Col>
                </Row>

                <div>
                  <p>
                    Track and approve employee time for payroll. Employee daily
                    check-in and check-out, weekly review and submit for
                    payroll.{" "}
                  </p>
                </div>
              </li>
            </Col>

            <Col sm={6} md={6}>
              <li>
                <Row>
                  <Col sm={1}>
                    <div className="feature-icon">
                      <img src={icon6} alt="icon" />
                    </div>
                  </Col>
                  <Col sm={11} md={11}>
                    <div className="feature-subtitle">
                      <h3>Tasks, Alerts & Notifications</h3>
                    </div>
                  </Col>
                </Row>

                <div>
                  <p>
                    Manage daily tasks to employees. Engage with employees with
                    Tasks, SMS & email reminders to complete tasks.{" "}
                  </p>
                </div>
              </li>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

Features.propTypes = {};

function mapStateToProps(state, ownProps) {
  return {};
}

export default connect(mapStateToProps)(Features);
