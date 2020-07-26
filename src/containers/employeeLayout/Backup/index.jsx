import React from "react";
import { Col, Container, Row } from "reactstrap";
import BackupMain from "./components";


const Calendar = () => (
  <Container>
    <div className="profile">
      <Row style={{justifyContent: "center"}}>
        <Col md={12} lg={12} xl={8}>
          <Row>
            <BackupMain />
          </Row>
        </Col>
      </Row>
    </div>
  </Container>
);

export default Calendar;
