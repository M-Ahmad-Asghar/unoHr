import React, { Component } from "react";
import { Button, ButtonToolbar } from "reactstrap";
import { Field, reduxForm } from "redux-form";
import CalendarBlankIcon from "mdi-react/CalendarBlankIcon";
import PropTypes from "prop-types";
import renderRadioButtonField from "../../../../shared/components/form/RadioButton";
// import renderSelectField from '../../../../shared/components/form/Select';
import renderDatePickerField from "../../../../shared/components/form/DatePicker";
import MapApi from "../../../../mapApi";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Zoom from "@material-ui/core/Zoom";
import HelpIcon from "../../../../assets/help.png";
import { FormGroup, Label, Input } from "reactstrap";

import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

class WizardFormTwo extends Component {
  componentWillMount() {
    this.props.initialize({ country: "USA" });
  }

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    previousPage: PropTypes.func.isRequired,
    street: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    wcStates: PropTypes.array.isRequired,
    zip: PropTypes.string.isRequired,
    ein: PropTypes.string.isRequired,
    // currentDate: PropTypes.string.isRequired,
    onChangeHandler: PropTypes.func.isRequired,
    onChangeDate: PropTypes.func.isRequired,
    onChangeRadioTax: PropTypes.func.isRequired,
    onChangeRadioReport: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { classes } = this.props;
    const {
      onSubmit,
      previousPage,
      street,
      city,
      state,
      wcStates,
      zip,
      ein,
      country,
      // currentDate,
      onChangeHandler,
      onChangeDate,
      onChangeRadioTax,
      onChangeRadioReport,
      industries,
      districts,
      onChangeText,
      district,
      onChangeAutoComplete
    } = this.props;

    return (
      <form className="form form--horizontal wizard__form" onSubmit={onSubmit}>
        <h3 className="wizard__title">What’s your address</h3>

        {/* <div className="form__form-group">
          <span className="form__form-group-label">Street</span>
          <div className="form__form-group-field">
            <Field
              name="street"
              component="input"
              type="text"
              value={street}
              onChange={onChangeHandler}
              placeholder="Street Address"
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
              value={city}
              onChange={onChangeHandler}
              placeholder="City name"
            />
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">Country</span>
          <div className="form__form-group-field">
            <Field
              name="country"
              component="input"
              type="text"
              value={country}
              onChange={onChangeHandler}
              // placeholder="Country"
            />
          </div>
    </div> */}
        <div className="form__form-group">
          <span className="form__form-group-label">State</span>
          <div className="form__form-group-field">
            <FormGroup>
              <Input
                onChange={onChangeHandler}
                placeholder="Select your state"
                type="select"
                name="state"
                style={{ height: 44, width: 177 }}
              >
                {wcStates.length > 0 ? (
                  wcStates.map((item, index) => (
                    <option value={item.state} key={index}>
                      {item.state}
                    </option>
                  ))
                ) : (
                  <option value="">No state found</option>
                )}
              </Input>
            </FormGroup>
            <Tooltip TransitionComponent={Zoom} title="Select your state">
              <IconButton className="helpButton">
                <img className="helpImage" src={HelpIcon} alt="help" />
              </IconButton>
            </Tooltip>
          </div>
        </div>

        <div className="form__form-group">
          <span className="form__form-group-label">Industry</span>
          <div className="form__form-group-field">
            <FormGroup>
              <Input
                onChange={onChangeHandler}
                placeholder="Select your industry"
                type="select"
                name="industry"
                style={{ height: 44, width: 177 }}
              >
                {industries.length > 0 ? (
                  industries.map((item, index) => (
                    <option value={item.name} key={index}>
                      {item.name}
                    </option>
                  ))
                ) : (
                  <option value="">No industry found</option>
                )}
              </Input>
            </FormGroup>
            <Tooltip TransitionComponent={Zoom} title="Select your industry">
              <IconButton className="helpButton">
                <img className="helpImage" src={HelpIcon} alt="help" />
              </IconButton>
            </Tooltip>
          </div>
        </div>

        <div className="form__form-group">
          <span className="form__form-group-label">District</span>
          <div className="form__form-group-field">
            <Autocomplete
              id="combo-box"
              options={districts}
              getOptionLabel={(option) =>
                option.zipCode !== undefined &&
                `${option.zipCode} - ${option.county}`
              }
              style={{ width: "100%" }}
              value={district}
              onChange={onChangeAutoComplete}
              renderOption={(option) => (
                <>
                  <p style={{fontSize:10}}>
                    Zip: {option.zipCode}, County: {option.county} City: (
                    {option.city})
                  </p>
                </>
              )}
              renderInput={(params) => {
                return (
                  <TextField
                    {...params}
                    label={"Search District"}
                    size="small"
                    onChange={onChangeText}
                  />
                );
              }}
            />
            <Tooltip TransitionComponent={Zoom} title="Select your industry">
              <IconButton className="helpButton">
                <img className="helpImage" src={HelpIcon} alt="help" />
              </IconButton>
            </Tooltip>
          </div>
        </div>

        {/** 
        <div className="form__form-group">
          <span className="form__form-group-label">ZIP Code</span>
          <div className="form__form-group-field">
            <Field
              name="zip"
              component="input"
              type="text"
              value={zip}
              onChange={onChangeHandler}
              placeholder="Enter the Zip Code"
            />
          </div>
        </div> */}

        <div className="form__form-group">
          <span className="form__form-group-label">Locations</span>
          <div className="form__form-group-field">
            <MapApi getAddress={this.props.getAddress} />
            <Tooltip
              TransitionComponent={Zoom}
              title="Enter your bussiness location"
            >
              <IconButton className="helpButton">
                <img className="helpImage" src={HelpIcon} alt="help" />
              </IconButton>
            </Tooltip>
            {/* <Field
              name="ein"
              component="input"
              type="text"
              value={ein}
              onChange={onChangeHandler}
              placeholder="Employer EIN Number"
            /> */}
          </div>
        </div>

        <div className="form__form-group">
          <span className="form__form-group-label">EIN</span>
          <div className="form__form-group-field">
            <Field
              name="ein"
              component="input"
              type="text"
              value={ein}
              onChange={onChangeHandler}
              placeholder="Employer EIN Number"
            />
            <Tooltip
              TransitionComponent={Zoom}
              title="Enter your Employer Identification Number"
            >
              <IconButton className="helpButton">
                <img className="helpImage" src={HelpIcon} alt="help" />
              </IconButton>
            </Tooltip>
          </div>
        </div>
        <h6 style={{ color: "purple", marginBottom: "3px" }}>
          If No, we will apply EIN for you
        </h6>
        <div className="form__form-group">
          <span className="form__form-group-label">File Joint tax return</span>
          <div className="form__form-group-field">
            <Field
              name="tax"
              component={renderRadioButtonField}
              label="Yes"
              radioValue="Yes"
              onChange={onChangeRadioTax}
              defaultChecked
            />
            <Field
              name="tax"
              component={renderRadioButtonField}
              label="No"
              radioValue="No"
              onChange={onChangeRadioTax}
            />
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">
            Date First Paid to Employees
          </span>
          <div className="form__form-group-field">
            <Field
              name="date"
              component={renderDatePickerField}
              onChange={onChangeDate}
            />
            <div className="form__form-group-icon">
              <CalendarBlankIcon />
            </div>
            <Tooltip
              TransitionComponent={Zoom}
              title="Enter the date on which you paid your employees first time"
            >
              <IconButton className="helpButton">
                <img className="helpImage" src={HelpIcon} alt="help" />
              </IconButton>
            </Tooltip>
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">
            Need to report wages prior quarters
          </span>
          <div className="form__form-group-field">
            <Field
              name="report"
              component={renderRadioButtonField}
              label="Yes"
              radioValue="Yes"
              onChange={onChangeRadioReport}
              defaultChecked
            />
            <Field
              name="report"
              component={renderRadioButtonField}
              label="No"
              radioValue="No"
              onChange={onChangeRadioReport}
            />
          </div>
        </div>
        <ButtonToolbar className="form__button-toolbar wizard__toolbar">
          <Button
            color="success"
            outline
            type="button"
            className="previous"
            onClick={previousPage}
          >
            Back
          </Button>
          <Button color="success" type="submit" className="next">
            Next
          </Button>
        </ButtonToolbar>
      </form>
    );
  }
}

export default reduxForm({
  form: "wizard", //                 <------ same form name
  destroyOnUnmount: false, //        <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(WizardFormTwo);
