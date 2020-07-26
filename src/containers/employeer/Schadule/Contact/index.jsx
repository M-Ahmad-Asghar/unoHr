import React from "react";
import { Col, Container, Row } from "reactstrap";
import SettingMain from "./components/contacts";

const Calendar = () => (
  <Container>
    <div className="profile">
      <Row style={{justifyContent: "center",backgroundColor:"#f2f4f7"}}>
        <Col sm="12" xs="12" md="12" lg="12" xl="10">
            <SettingMain />
        </Col>
      </Row>
    </div>
  </Container>
);

export default Calendar;
