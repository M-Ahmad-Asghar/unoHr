import React from "react";
import { Card, CardBody, Col, Badge, Table } from "reactstrap";
import { translate } from "react-i18next";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class BasicTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {} ;
  }

  render() {
      let { wcState } = this.props;

    return (
      <Col md={12} lg={12} xl={12}>
        <Card>
          <CardBody>
            <Table responsive hover>
              <tbody>
                    <tr>
                        <th>State Name</th>
                        <td>{wcState.state}</td>
                    </tr>
                    <tr>
                        <th>Full Time</th>
                        <td>{wcState.fullTime !== '' ? wcState.fullTime : 'N/A'}</td>
                    </tr>
                    <tr>
                        <th>Part Time</th>
                        <td>{wcState.partTime !== '' ? wcState.partTime : 'N/A'}</td>
                    </tr>
                    <tr>
                        <th>Voluntary Coverage</th>
                        <td>{wcState.volutaryCoverage !== '' ? wcState.volutaryCoverage : 'N/A'}</td>
                    </tr>
                    <tr>
                        <th>Additional</th>
                        <td>{wcState.additional !== '' ? wcState.additional : 'N/A'}</td>
                    </tr>
                    <tr>
                        <th>Endorsement</th>
                        <td>{wcState.endorsement !== '' ? wcState.endorsement : 'N/A'}</td>
                    </tr>
                    <tr>
                        <th>Comments</th>
                        <td>{wcState.comments !== '' ? wcState.comments : 'N/A'}</td>
                    </tr>
                    <tr>
                        <th>State Contact</th>
                        <td>{wcState.stateContact}</td>
                    </tr>
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

BasicTable.propTypes = {
  t: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  employees: state.employerReducer.allEmployees
});

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(translate("common")(BasicTable))
);