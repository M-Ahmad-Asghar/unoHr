import React from "react";
import { Col, Container, Row } from "reactstrap";
import { translate } from "react-i18next";
import PropTypes from "prop-types";
import BasicTable from "./components/BasicTable";

const BasicTables = ({ t }) => (
  <Container>
    {/* <Row>
      <Col md={12}>
        <h3 className="page-title">Week at a glance</h3>
      </Col>
    </Row> */}
    <Row>
      <BasicTable />
    </Row>
  </Container>
);

BasicTables.propTypes = {
  t: PropTypes.func.isRequired
};

export default translate("common")(BasicTables);
