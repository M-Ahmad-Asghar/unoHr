import React, { PureComponent } from 'react';
import { Card, CardBody, Col } from 'reactstrap';

export default class BTC extends PureComponent {
  

  render() {

    return (
      <Col md={12} xl={3} lg={6} xs={12}>
        <Card>
          <CardBody className="dashboard__card-widget">
            <div style={{textAlign: 'center', margin: 8}}>
              <img src={this.props.ic} style={{height: 50, width: 50}}/>
            </div>
            <div>
              <h5>{this.props.name}</h5>
            </div>
            <div style={{margin: 5}}>
              <h2>{this.props.number}</h2>
            </div>
          </CardBody>
        </Card>
      </Col>
    );
  }
}