import React from "react";
import { Col, Container, Row } from "reactstrap";
import SettingMain from "./components/SettingMain";


const Calendar = () => (
  <Container>
    <div className="profile">
      <Row style={{justifyContent: "center"}}>
        <Col md={12} lg={12} xl={8}>
          <Row>
            <SettingMain />
          </Row>
        </Col>
        {/* <Col md={12} lg={12} xl={8}>
          <ProfileActivities />
        </Col> */}
      </Row>
    </div>
  </Container>
);

export default Calendar;
