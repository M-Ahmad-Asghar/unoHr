import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import AddForm from './components/AddForm';

const BasicForm = ({ t }) => (
  <Container>
    <Row>
      <Col md={12}>
        <h3 className="page-title">{t('Add New Task')}</h3>
      </Col>
    </Row>
    <Row>
      {/* <Tabs /> */}
      <AddForm />
    </Row>
  </Container>
);

BasicForm.propTypes = {
  t: PropTypes.func.isRequired,
};

export default translate('common')(BasicForm);
