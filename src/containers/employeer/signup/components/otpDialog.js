import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import blue from "@material-ui/core/colors/blue";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Otp from "./otp";

const styles = {
  avatar: {
    backgroundColor: blue[100],
    color: blue[600]
  },
  card: {
    minWidth: 275,
    padding: "15px 15px"
  },
  title: {
    fontSize: 14,
    color: "#646777"
  },
  heading: {
    color: "red",
    color: "#646777",
    fontSize: "1.3125rem",
    fontWeight: "500",
    // fontFamily: "Roboto", "Helvetica", "Arial", sans-serif;
    lineHeight: "1.16667em"
  },
  pos: {
    marginBottom: 12
  }
};

class OtpDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ValueFromOtp: "",
      verifyButtonDisabled: true
    };
  }

  getValuesInOtp = v => {
    if (v.length === 4) {
      this.setState({
        ValueFromOtp: v,
        verifyButtonDisabled: false
      });
    } else {
      this.setState({
        verifyButtonDisabled: true
      });
    }
  };
  handleListItemClick = value => {
    this.props.onClose(value);
  };

  render() {
    const { classes, onClose, selectedValue, ...other } = this.props;

    return (
      <Dialog
        maxWidth="xs"
        fullWidth={true}
        aria-labelledby="simple-dialog-title"
        {...other}
      >
        <DialogTitle
          disableTypography={true}
          className={classes.heading}
          color="#646777"
          id="simple-dialog-title"
        >
          <p
            style={{
              color: "gray",
              textAlign: "center",
              justifyContent: "center"
            }}
            className={classes.heading}
          >
            Enter Verification Code
          </p>
        </DialogTitle>
        <div>
          <Card className={classes.card}>
            <CardContent
              style={{
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
                fontSize: "1.3rem",
                align: "center"
              }}
            >
              <Otp getValuesInOtp={this.getValuesInOtp} inputs={4} />
              {/* <Typography className={classes.title} color="textSecondary" gutterBottom>
         
        </Typography>
        <Typography variant="h5" component="h2">
         
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          adjective
        </Typography>
        <Typography component="p">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography> */}
            </CardContent>
            <CardActions>
              <Button
                size="small"
                onClick={() => {
                  this.setState({ verifyButtonDisabled: true });
                  this.props.verifyCodeEnteredInOTp(this.state.ValueFromOtp);
                }}
                disabled={this.state.verifyButtonDisabled}
              >
                Verify
              </Button>
              {this.props.resendbutton && <Button
              onClick={()=>this.props.resendPhoneCode()}
              size="small">Resend</Button>}
            </CardActions>
          </Card>
          {/* <Otp /> */}

        </div>
        <span
          onClick={() => this.props.handleclosedialog()}
          style={{
            position: "absolute",
            top: "0",
            right: "0",
            padding: "5px 5px 0 0",
            color: "red",
            cursor: "pointer"
          }}
        >
          X
        </span>
      </Dialog>
    );
  }
}

OtpDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  selectedValue: PropTypes.string
};

export default withStyles(styles)(OtpDialog);
