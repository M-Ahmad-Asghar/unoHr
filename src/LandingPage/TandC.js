import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Row, Col } from "reactstrap";

class TandC extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <Row className="footerDiv">
        <Col sm={12}>
          <div className="copyright-sectionlan">
            <p>© 2019 Copyright unoHR </p>
          </div>
        </Col>
      </Row>
    );
  }
}

TandC.propTypes = {};

function mapStateToProps(state, ownProps) {
  return {};
}

export default connect(mapStateToProps)(TandC);
