import React, { PureComponent } from "react";
import { Card, CardBody, Col } from "reactstrap";

export default function Clock(props) {
  return (
    <Col md={12} xl={6} lg={12} xs={12}>
      <Card>
        <CardBody className="dashboard__card-widget">
          <div style={{ textAlign: "center", margin: 8 }}>
            <img src={props.ic} style={{ height: 50, width: 50 }} />
          </div>
          <div>
            <h5>{props.name}</h5>
          </div>
          <div style={{ margin: 5 }}>
            <h3>{props.statement}</h3>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
}
