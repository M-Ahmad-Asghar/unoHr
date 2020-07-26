import React from "react";
import { Col, Container, Row } from "reactstrap";
import { translate } from "react-i18next";
import PropTypes from "prop-types";
import Calender from "./components/Calender";
import { connect } from 'react-redux';
import { getShifts } from '../../../../redux/actions/shiftAction';

const BasicTables = ({ t }) => (
  <Container>
    <Row>
      <Col md={12}>
        <h3 className="page-title">Create new Shift</h3>
      </Col>
    </Row>
    <Row>
      <Calender />
    </Row>
  </Container>
);

BasicTables.propTypes = {
  t: PropTypes.func.isRequired
};

export default connect(null, { getShifts })(translate("common")(BasicTables));
