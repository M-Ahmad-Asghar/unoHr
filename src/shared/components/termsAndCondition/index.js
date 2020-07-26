import React from "react";
import { Card, CardBody, Col, Row, Container } from "reactstrap";
import { getTermsConditions } from '../../../redux/actions/dbActions';
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from 'react-redux';

class Terms extends React.Component {
  state = {
    loader: true,
    termsConditions: {},
    conditionsText: ''
  };

  componentDidMount() {
    this.props.getTermsConditions();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.getTermsStatus === "done") {
      this.setState({
        conditionsText: nextProps.termsConditions.conditionsText,
        termsConditions: nextProps.termsConditions,
        loader: false
      })
    }

    if (nextProps.getTermsStatus === "done") {
      this.setState({
        loader: false
      })
    }
  }

  render() {
    const { loader, conditionsText } = this.state;

    return (
      <Container>
        <Row>
          <Col md={12} lg={12} xl={12}>
            <Card>
              <CardBody>
                <h3>Terms of Service</h3>
                {
                  loader ? 
                    <div style={{ marginTop: "35px", textAlign: "center" }}>
                      <CircularProgress />
                    </div>
                :
                    <p>
                      { conditionsText === '' ?
                        'No Terms & Conditions found!'
                      :
                        conditionsText
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
        termsConditions: state.dbReducers.termsConditions,
        getTermsStatus: state.dbReducers.getTermsStatus,
    }
)

export default connect(mapStateToProps, {
        getTermsConditions
    }
    )(Terms);