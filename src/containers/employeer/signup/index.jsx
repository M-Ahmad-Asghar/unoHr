import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';

// import showResults from '../../Form/Show';
import Wizard from './components/WizardForm';

const WizardForm = ({ t }) => (
  <div className="account">
    <div className="account__wrapper">
      <div className="account__card">
        <Container>
          <Row>
            <Col md={12}>
              <h3 className="page-title">{t('Employeer SignUp Form')}</h3>
              {/* <h3 className="page-subhead subhead">Please Fill Out All Fields Carefully</h3> */}
            </Col>
          </Row>
          <Wizard />
        </Container>
      </div>
    </div>
  </div>
);

WizardForm.propTypes = {
  t: PropTypes.func.isRequired,
};

export default translate('common')(WizardForm);
