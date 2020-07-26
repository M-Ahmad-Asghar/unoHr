import React, { Component } from 'react';
import { Card, CardBody, Col, Button, ButtonToolbar } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';

const Ava = `${process.env.PUBLIC_URL}/img/12.png`;

class HorizontalForm extends Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = {
      showPassword: false,
    };
  }

  showPassword = (e) => {
    e.preventDefault();
    this.setState({
      showPassword: !this.state.showPassword,
    });
  };

  render() {
    const { handleSubmit, reset, t } = this.props;

    return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody>
            <div className="card__title">
              {/* <h5 className="bold-text">{t('My Profile')}</h5> */}
              {/* <h5 className="subhead">Labels are left from fields</h5> */}
            </div>
            <form className="form form--horizontal" onSubmit={handleSubmit}>
              <div className="profile__avatar" style={{ marginLeft: 'auto', marginRight: 'auto', marginBottom: 40 }} >
                <img src={Ava} alt="avatar" />
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">First Name</span>
                <div className="form__form-group-field">
                  <Field
                    name="first_name"
                    component="input"
                    type="text"
                    placeholder="Enter First Name "
                    value="Fayyaz"
                  />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">Last Name</span>
                <div className="form__form-group-field">
                  <Field
                    name="last_name"
                    component="input"
                    type="text"
                    value="Ghulam Muhammad"
                  />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">Email</span>
                <div className="form__form-group-field">
                  <Field
                    name="email"
                    component="input"
                    type="text"
                    value="fayyazjee11@gmail.com"
                  />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">Mobile #</span>
                <div className="form__form-group-field">
                  <Field
                    name="mobile_no"
                    component="input"
                    type="text"
                    value="03247636236"
                  />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">Street</span>
                <div className="form__form-group-field">
                  <Field
                    name="street"
                    component="input"
                    type="text"
                    placeholder="Streeet No 8"
                  />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">City</span>
                <div className="form__form-group-field">
                  <Field
                    name="city"
                    component="input"
                    type="text"
                    value="Faisalabad"
                  />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">State</span>
                <div className="form__form-group-field">
                  <Field
                    name="state"
                    component="input"
                    type="text"
                    value="Punjab"
                  />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">Zip Code</span>
                <div className="form__form-group-field">
                  <Field
                    name="zip_code"
                    component="input"
                    type="text"
                    value="18000"
                  />
                </div>
              </div>
              <ButtonToolbar className="form__button-toolbar">
                <Button color="primary" type="submit">Submit</Button>
                <Button type="button" onClick={reset}>
                  Cancel
                </Button>
              </ButtonToolbar>
            </form>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

export default reduxForm({
  form: 'horizontal_form', // a unique identifier for this form
})(translate('common')(HorizontalForm));
