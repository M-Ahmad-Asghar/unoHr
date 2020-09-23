import React, { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import PropTypes from "prop-types";
import { Button, ButtonToolbar } from "reactstrap";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { isObject } from "util";
import "../style.css";
import { BeatLoader, PulseLoader } from "react-spinners";
import { compose } from "recompose";
import { connect } from "react-redux";
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Zoom from '@material-ui/core/Zoom';
import HelpIcon from "../../../../assets/help.png";

class CheckoutForm extends Component {
  static propTypes = {
    // stripe: PropTypes.func.isRequired,
    onCheckoutToken: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      msg: "Invalid Card information!",
      err: false,
      loader: false,
      dialogLoader: false
    };
    this.submit = this.submit.bind(this);
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSubmitDialog = () => {
    this.setState({ dialogLoader: true });
    this.props.handleSubmit();
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ dialogLoader: false });

    // if (nextProps.done == "move") {
    //   this.props.history.push("/employeer/login");
    // }
  }

  async submit() {
    this.setState({ loader: true });
    const { token } = await this.props.stripe.createToken({ name: "Name" });
    console.log("token in here===============>", token);
    if (isObject(token)) {
      console.log("tocken", token);
      this.props.onCheckoutToken(token.id);
      this.setState({
        open: true,
        msg: "Your Card is Successfully Authenticated!",
        err: false,
        loader: false
      });
    } else {
      this.setState({
        // open: true,
        msg: "Invalid Card information!",
        err: true,
        loader: false
      });
    }
  }
  CheckoutForm
  render() {
    const { handleSubmit, previousPage } = this.props;
    const { open, err, msg } = this.state;
    return (
      <div>
        <div className="checkout">
          <p style={{ margin: 20,marginLeft:0 }}>Would you like to complete the purchase?</p>
          <CardElement/>
          {err ? <span className="card_error">{msg}</span> : <span />}
        </div>
        <Tooltip TransitionComponent={Zoom} title="Enter your credit/debit card number">
          <IconButton className="helpButton" id="helpButtonCard">
            <img className="helpImage" src={HelpIcon} alt="help"/>
          </IconButton>
        </Tooltip>

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
          {this.state.loader ? (
            <Button color="success" type="button" disabled={true}>
              <BeatLoader color={"#123abc"} />
            </Button>
          ) : (
            <Button color="success" type="button" onClick={this.submit}>
              Sign up
            </Button>
          )}
        </ButtonToolbar>
        {/* Dialog */}

        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <form
            className="form form--horizontal wizard__form"
            // onSubmit={handleSubmit}
          >
            {/* <DialogTitle id="alert-dialog-title" style={{ textAlign: "center", display: "block" }}>
            {"Authentication!"}
          </DialogTitle> */}
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {/* <strong>Task Name: </strong> */}
                <span>{msg}</span>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={this.handleClose}
                variant="contained"
                color="default"
              >
                Cancel
              </Button>
              {this.state.dialogLoader ? (
                <Button variant="contained" color="success" disabled={true}>
                  <PulseLoader color={"#123abc"} size={15} />
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="success"
                  onClick={this.handleSubmitDialog}
                >
                  Submit
                </Button>
              )}

              {/* <Button onClick={this.handleClose} outline color="success">
                  Cencel
                </Button>
                <Button onClick={this.handleClose} type="submit" color="success">
                  Submit
                </Button> */}
            </DialogActions>
          </form>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log('state from checkout',state.employer);
  
  return {
    isLoading: state.employer.isLoading,
    done: state.employer.done
  };
};

export default compose(
  connect(mapStateToProps),
  injectStripe
)(CheckoutForm);
