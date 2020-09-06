import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Col, Row, Button } from "reactstrap";
class Contact extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <Row className="contactRow" id="contact">
        <Col sm={12} md={8}>
          <div>
            <h2 className="title">
              <span>Contact </span>Information
            </h2>
          </div>
          <div>
            <Row>
              <Col sm={12} md={6}>
                <div className="md-fgrup-margin">
                  <input
                    type="text"
                    className="form-control-lan"
                    placeholder="your name"
                    required="required"
                  />
                </div>
              </Col>
              <Col sm={12} md={6}>
                <div className="md-fgrup-margin">
                  <input
                    type="number"
                    className="form-control-lan"
                    placeholder="phone"
                    required="required"
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col sm={12}>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control-lan"
                    id="exampleFormControlInput1"
                    placeholder="email address"
                    required="required"
                  />
                </div>
              </Col>
              <Col sm={12}>
                <div className="form-group">
                  <textarea
                    className="form-control-lan"
                    id="exampleFormControlTextarea1"
                    rows="4"
                    placeholder="message"
                    required="required"
                  />
                </div>
              </Col>
              <Col sm={12}>
                <div className="form-button">
                  <Button outline color="#eee" className="contactBtn">
                    Send
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
        <Col sm={12} md={4}>
          <div className="contact-right">
            <p>Email: support@unohr.com</p>
            <p>Phone: 415-555-1212</p>
            <p>Address: 717 K Street STE207 Sacramento, CA 95814</p>
          </div>
        </Col>
      </Row>
    );
  }
}

Contact.propTypes = {};

function mapStateToProps(state, ownProps) {
  return {};
}

export default connect(mapStateToProps)(Contact);
