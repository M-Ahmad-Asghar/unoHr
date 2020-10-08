import React from "react";
import { Button, ButtonToolbar } from "reactstrap";
import { reduxForm } from "redux-form";
import { Elements, StripeProvider } from "react-stripe-elements";
import PropTypes from "prop-types";
import CheckoutForm from "./CheckoutForm";
import SelectPlan from "./selectPlan";
import { Field } from "redux-form";
import renderSelectField from "../../../../shared/components/form/Select";
import Paper from "@material-ui/core/Paper";
import { toast } from "react-toastify";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Zoom from "@material-ui/core/Zoom";
import HelpIcon from "../../../../assets/help.png";

class WizardFormThree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      onSubmit,
      previousPage,
      onCheckoutToken,
      plan,
      getPlan,
    } = this.props;
    return (
      <div>
        <h3 style={{ textAlign: "center", marginTop: 15 }}>Payment Method</h3>
        <div className="form__form-group">
          <span className="form__form-group-label">Select A Plan</span>
          <div className="form__form-group-field">
            <Paper elevation={3} style={{ width: "100%" }}>
              <Select
                value={plan}
                onChange={getPlan}
                style={{ width: "100%", paddingLeft: "10px" }}
              >
                <MenuItem value="Basic">Basic-$39</MenuItem>
                <MenuItem value="Standard">Standard-$99</MenuItem>
              </Select>
            </Paper>
            <Tooltip TransitionComponent={Zoom} title="Select a payment plan">
              <IconButton className="helpButton">
                <img className="helpImage" src={HelpIcon} alt="help" />
              </IconButton>
            </Tooltip>
          </div>
        </div>
        {/* <SelectPlan getPlan={this.props.getPlan}/> */}

        {/* <StripeProvider apiKey="pk_test_TYooMQauvdEDq54NiTphI7jx"> */}
        {/* {plan !== null && ( */}
        {/*
          <StripeProvider apiKey="pk_test_jLt1a9qu4o5wcP7tWA4fdT9x">
          </StripeProvider>
          <Elements>
          </Elements>
         */}

        <div className="example">
          <CheckoutForm
            onCheckoutToken={onCheckoutToken}
            handleSubmit={onSubmit}
            previousPage={previousPage}
          />
        </div>

        {/* )} */}
      </div>
    );
  }
}

export default reduxForm({
  form: "wizard", //                 <------ same form name
  destroyOnUnmount: false, //        <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(WizardFormThree);
