import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import ContactForm from './components/ContactForm';

const Contact = ({ t }) => (
  <Container>
    <Row>
      <Col md={12}>
        <h3 className="page-title">{t('Contact To Employer')}</h3>
      </Col>
    </Row>
    <Row>
      <ContactForm />
    </Row>
  </Container>
);

Contact.propTypes = {
  t: PropTypes.func.isRequired,
};

export default translate('common')(Contact);
