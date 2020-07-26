import React from "react";
import { Card, CardBody, Col, Row, Container } from "reactstrap";
import { getPrivacyPolicy } from '../../../redux/actions/dbActions';
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from 'react-redux';

class Policy extends React.Component {
  state = {
    loader: true,
    privacyPolicy: {},
    policyText: ''
  };

  componentDidMount() {
    this.props.getPrivacyPolicy();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.getPrivacyStatus === "done") {
      this.setState({
        policyText: nextProps.privacyPolicy.policyText,
        privacyPolicy: nextProps.privacyPolicy,
        loader: false
      })
    }

    if (nextProps.getPrivacyStatus === "done") {
      this.setState({
        loader: false
      })
    }
  }

  render() {
    const { loader, policyText } = this.state;

    return (
      <Container>
        <Row>
          <Col md={12} lg={12} xl={12}>
            <Card>
              <CardBody>
                <h3>Privacy Policy</h3>
                {
                  loader ?
                    <div style={{ marginTop: "35px", textAlign: "center" }}>
                      <CircularProgress />
                    </div>
                  :
                    <p>
                      {policyText === '' ?
                        'No Terms & Conditions found!'
                      :
                        policyText
                      }
                    </p>
                }
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => (
    {
        loader: state.dbReducers.loader,
        privacyPolicy: state.dbReducers.privacyPolicy,
        getPrivacyStatus: state.dbReducers.getPrivacyStatus,
    }
)

export default connect(mapStateToProps, {
        getPrivacyPolicy
    }
  )(Policy);