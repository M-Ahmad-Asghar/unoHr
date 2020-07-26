import React from "react";
import { Card, CardBody, Col, Button, Row } from "reactstrap";
import MessageTextOutlineIcon from "mdi-react/MessageTextOutlineIcon";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import Backup from "@material-ui/icons/Backup";
import Select from "@material-ui/core/Select";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import DialogActions from "@material-ui/core/DialogActions";
import { PulseLoader, BeatLoader } from "react-spinners";
import { toast } from "react-toastify";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Switch from "@material-ui/core/Switch";
import Notification from "@material-ui/icons/NotificationImportant";
import Fingerprint from "@material-ui/icons/Fingerprint";
import Timer from "@material-ui/icons/Timer";
import Payment from "@material-ui/icons/Payment";
import PriceTable from "./subscriptions/pricingTable";
import { getEmployerBackup } from "../../../../redux/actions/employeerBackupAction";
import EndPoint from "../../../../EndPoint";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign, faEdit, faUtensils, faMugHot } from "@fortawesome/free-solid-svg-icons";
import { changeSubscriptions } from "../../../../redux/actions/SubscriptionActions";
import { changeDirectDeposit } from "../../../../redux/actions/directDepositAction";
import {
  startGetCurrentUser,
  updateFacilities,
  setDefault
} from "../../../../redux/actions/userActions";
import Axios from "axios";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Zoom from "@material-ui/core/Zoom";
import HelpIcon from "../../../../assets/help.png";
import "../styles/style.css";
library.add(faDollarSign, faUtensils, faMugHot);
library.add(faEdit);

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  textField: {
    margin: "0px 8px",
    // marginLeft: theme.spacing.unit,
    // marginRight: theme.spacing.unit,
    width: "100%"
  },
  menu: {
    width: "100%"
  }
});

const currencies = [
  {
    value: "USD",
    label: "$(USD)"
  },
  {
    value: "EUR",
    label: "€(EUR)"
  },
  {
    value: "BTC",
    label: "฿(BTC)"
  },
  {
    value: "JPY",
    label: "¥(JPY)"
  }
];

const weeks = [
  {
    value: "Mon",
    label: "Mon"
  },
  {
    value: "Tue",
    label: "Tue"
  },
  {
    value: "Wed",
    label: "Wed"
  },
  {
    value: "Thur",
    label: "Thur"
  },
  {
    value: "Fri",
    label: "Fri"
  },
  {
    value: "Sat",
    label: "Sat"
  },
  {
    value: "Sun",
    label: "Sun"
  }
];

class SettingMain extends React.Component {
  state = {
    checked: ["notif"],
    currency: "USD",
    open: false,
    openDialog: false,
    subscription: this.props.user.subscription,
    // storeSubscription: this.props.user.subscription,
    subscriptionLoader: false,
    changeInSubscription: true,
    login: false,
    token: "",
    isDirectDeposit: false,
    breakFacility: false,
    lunchFacility: false,
    breakLoader: false,
    lunchLoader: false
  };

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
    alert("handleChange");
  };

  handleRequestClose = () => {
    this.setState({ openDialog: false });
  };

  // for change subscription
  handleChangeInSubscription = e => {
    console.log("========e.target.value============================");
    console.log(e.target.value);
    console.log("====================================");
    this.setState({
      subscription: e.target.value,
      changeInSubscription: false
    });
  };

  componentWillReceiveProps(nextProps) {
    console.log("employeeeees", nextProps.employees);

    if (nextProps.employees.length > 0) {
      this.setState({
        breakFacility: nextProps.employees[0].breakFacility,
        lunchFacility: nextProps.employees[0].lunchFacility
      });
    }
    if (nextProps.changeSubStatus == "done") {
      this.setState({
        subscriptionLoader: false,
        // subscription: this.state.storeSubscription,
        changeInSubscription: true
      });
      this.handleRequestClose();
    } else if (nextProps.changeSubStatus == "error") {
      this.setState({
        subscriptionLoader: false,
        subscription: this.props.user.subscription
      });
      this.handleRequestClose();
    }
    let is = this.props.user.isDirectDeposit;
    if (nextProps.changeDirectDepositStatus === "done") {
      this.setState({
        loader: false
      });
      this.props.startGetCurrentUser();
    } else if (nextProps.changeDirectDepositStatus === "error") {
      this.setState({
        loader: false,
        isDirectDeposit: is
      });
    }
    if (
      nextProps.updateFacilityStatus === "done" ||
      nextProps.updateFacilityStatus === "error"
    ) {
      this.setState({
        breakLoader: false,
        lunchLoader: false
      });
      this.props.setDefault()
    }
  }

  componentWillMount() {
    if (this.props.user.isDirectDeposit) {
      this.setState({
        isDirectDeposit: this.props.user.isDirectDeposit
      });
    } else {
      this.setState({
        isDirectDeposit: false
      });
    }

    try {
      let val = localStorage.getItem("token");
      console.log("val", val);

      if (val) {
        this.props.getEmployerBackup(this.props.user.uid);

        console.log("================ At CWM ====================");
        console.log("Token: ", val);
        console.log("====================================");

        this.setState({ login: true, token: val });
      } else {
        this.setState({ login: false });
      }
    } catch (error) {
      console.log("er", error);
    }

    // manageFacilities
    if (this.props.employees.length > 0) {
      this.setState({
        breakFacility: this.props.employees[0].breakFacility,
        lunchFacility: this.props.employees[0].lunchFacility
      });
    }
  }

  backupHandler = () => {
    console.log("paystubs", this.props.paystubs);
    this.setState({ loader: true });
    let token = this.state.token;
    let newtoken = token.slice(14, token.length);
    var n = newtoken.indexOf("&");
    newtoken = newtoken.slice(0, n);
    console.log("t", newtoken);

    console.log("========PAYSTUBS==========");
    console.log(this.props.paystubs);

    if (this.props.paystubs.length > 0) {
      Axios.post(EndPoint + "/backup/employer/savetodropbox", {
        data: this.props.paystubs,
        token: newtoken
      })
        .then(res => {
          console.log("res from servr", res);
          this.setState({ loader: false });
          toast.success("Successfully Backup your data");
        })
        .catch(err => {
          console.log("err", err);
          this.setState({ loader: false });
          toast.error("Error occur, try again later");
        });
    } else {
      toast.error("No data found for backup!");
    }
  };

  onChnageSubscription = () => {
    let data = {
      subscriptionid: this.props.user.stripesubscription,
      stripeCustomerId: this.props.user.stripeCustomer,
      typeOfSubscription: this.state.subscription,
      docid: this.props.user.docid
    };
    console.log("==============data======================");
    console.log(this.props.user);
    console.log("====================================", data);
    this.props.changeSubscriptions(data);
    this.setState({
      subscriptionLoader: true
    });
  };

  handleDepositToggle = () => {
    let is = this.state.isDirectDeposit;
    this.setState({
      loader: true,
      isDirectDeposit: !is
    });

    let data = {};
    if (is) {
      data = {
        id: this.props.user.docid,
        emloyeruid: this.props.user.uid,
        paymentMethod: "manual"
      };
    } else {
      data = {
        id: this.props.user.docid,
        emloyeruid: this.props.user.uid,
        paymentMethod: "direct deposit"
      };
    }

    this.props.changeDirectDeposit(data);
  };

  changeFacilities = type => {
    console.log("=============changeFacilities=======", type);
    console.log(this.props.employees);
    console.log("====================================");
    if (type === "break") {
      let data = {
        breakFacility: !this.state.breakFacility
      };

      this.props.updateFacilities(this.props.employees, data);
      this.setState({
        breakLoader: true
      });
    } else {
      let data = {
        lunchFacility: !this.state.lunchFacility
      };
      this.props.updateFacilities(this.props.employees, data);
      this.setState({
        lunchLoader: true
      });
    }
  };

  render() {
    console.log(this.props.user);

    const { classes } = this.props;
    const {
      subscriptionLoader,
      subscription,
      changeInSubscription,
      breakFacility,
      lunchFacility,
      breakLoader,
      lunchLoader
    } = this.state;
    console.log("breakFacility", breakFacility);

    return (
      <Col md={12} lg={12} xl={12}>
        <Card>
          <CardBody>
            {/* <h3>Account Settings</h3> */}

            <List
              subheader={<ListSubheader>Account Settings</ListSubheader>}
              className={classes.root}
            >
              {this.state.login ? (
                <ListItem align="center">
                  <ListItemIcon>
                    <Backup />
                  </ListItemIcon>
                  {this.state.loader ? (
                    <BeatLoader />
                  ) : (
                    <a
                      style={{
                        fontWeight: "bold",
                        cursor: "pointer",
                        color: "blue"
                      }}
                      onClick={this.backupHandler}
                    >
                      Backup Now
                    </a>
                  )}
                </ListItem>
              ) : (
                <ListItem style={{ textAlign: "center" }}>
                  {/* for development */}
                  {/* <a
                    style={{ fontWeight: "bold", marginLeft: 50 }}
                    href="https://www.dropbox.com/oauth2/authorize?response_type=token&client_id=335e2580zjoxj1u&redirect_uri=http://localhost:3000/"
                  >
                    For Backup - Login With Dropbox
                  </a> */}
                  {/* for production */}
                  <a
                    style={{ fontWeight: "bold", marginLeft: 50 }}
                    href="https://www.dropbox.com/oauth2/authorize?response_type=token&client_id=335e2580zjoxj1u&redirect_uri=https://promising-saga-232017.firebaseapp.com/"
                  >
                    For Backup - Login With Dropbox
                  </a>
                </ListItem>
              )}

              <ListItem>
                <ListItemIcon>
                  <FontAwesomeIcon icon="hand-holding-usd" size="lg" />
                </ListItemIcon>
                <ListItemText primary="Direct Deposit" />
                <ListItemSecondaryAction style={{ marginRight: 28 }}>
                  {this.state.loader ? (
                    <PulseLoader size={12} color={"#123abc"} />
                  ) : (
                    <Switch
                      onChange={this.handleDepositToggle}
                      checked={this.state.isDirectDeposit}
                    />
                  )}
                </ListItemSecondaryAction>
                <Tooltip
                  TransitionComponent={Zoom}
                  title="Turn on/off direct deposit"
                >
                  <IconButton className="helpButton">
                    <img className="helpImage" src={HelpIcon} alt="help" />
                  </IconButton>
                </Tooltip>
              </ListItem>






              {/* Break Facility */}
              <ListItem>
                <ListItemIcon>
                  <FontAwesomeIcon icon="mug-hot" size="lg" />
                </ListItemIcon>
                <ListItemText primary="Enable Employee Breaks" />
                <ListItemSecondaryAction style={{ marginRight: 28 }}>
                  {breakLoader ? (
                    <PulseLoader size={12} color={"#123abc"} />
                  ) : (
                    <Switch
                      onChange={() => {
                        this.changeFacilities("break");
                      }}
                      checked={breakFacility}
                    />
                  )}
                </ListItemSecondaryAction>
                <Tooltip
                  TransitionComponent={Zoom}
                  title="By turning on, Employees can take breaks in his/her duty times"
                >
                  <IconButton className="helpButton">
                    <img className="helpImage" src={HelpIcon} alt="help" />
                  </IconButton>
                </Tooltip>
              </ListItem>






              
              {/* lunch facility */}
              <ListItem>
                <ListItemIcon>
                  <FontAwesomeIcon icon="utensils" size="lg" />
                </ListItemIcon>
                <ListItemText primary="Enable Employee Lunch" />
                <ListItemSecondaryAction style={{ marginRight: 28 }}>
                  {lunchLoader ? (
                    <PulseLoader size={12} color={"#123abc"} />
                  ) : (
                    <Switch
                      onChange={() => {
                        this.changeFacilities("lunchFacility");
                      }}
                      checked={lunchFacility}
                    />
                  )}
                </ListItemSecondaryAction>
                <Tooltip
                  TransitionComponent={Zoom}
                  title="By turning on, Employees can take lunch breaks in his/her duty times. Lunch break time will be deducted from employee's total day time"
                >
                  <IconButton className="helpButton">
                    <img className="helpImage" src={HelpIcon} alt="help" />
                  </IconButton>
                </Tooltip>
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <Notification />
                </ListItemIcon>
                <ListItemText primary="Notifications" />
                <ListItemSecondaryAction style={{ marginRight: 28 }}>
                  <Switch
                    onChange={this.handleToggle("notif")}
                    checked={this.state.checked.indexOf("notif") !== -1}
                  />
                </ListItemSecondaryAction>
                <Tooltip
                  TransitionComponent={Zoom}
                  title="Turn on/off notifications"
                >
                  <IconButton className="helpButton">
                    <img className="helpImage" src={HelpIcon} alt="help" />
                  </IconButton>
                </Tooltip>
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  {/* <FontAwesomeIcon icon="dollar-sign" size="lg" /> */}
                  <Payment />
                </ListItemIcon>
                <TextField
                  id="standard-select-currency"
                  select
                  label="Currency"
                  className={classes.textField}
                  value={this.state.currency}
                  onChange={this.handleChange("currency")}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu
                    }
                  }}
                >
                  {currencies.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <Tooltip
                  TransitionComponent={Zoom}
                  title="Select your currency"
                >
                  <IconButton className="helpButton">
                    <img className="helpImage" src={HelpIcon} alt="help" />
                  </IconButton>
                </Tooltip>
              </ListItem>

              <ListItem
                style={{ cursor: "pointer" }}
                onClick={() => {
                  this.setState({ openDialog: true });
                }}
              >
                <ListItemIcon>
                  <FontAwesomeIcon icon="dollar-sign" size="lg" />
                </ListItemIcon>
                <ListItemText inset primary="Subscription" />
                <ListItemText inset secondary={this.state.subscription} />
                <FontAwesomeIcon
                  icon="edit"
                  size="lg"
                  style={{ marginRight: 8 }}
                />
                <Tooltip
                  TransitionComponent={Zoom}
                  title="Select your subscription"
                >
                  <IconButton className="helpButton">
                    <img className="helpImage" src={HelpIcon} alt="help" />
                  </IconButton>
                </Tooltip>
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <Timer />
                </ListItemIcon>
                <TextField
                  id="standard-select-currency"
                  select
                  label="Pay Period Starts"
                  className={classes.textField}
                  value={this.state.currency}
                  onChange={this.handleChange("currency")}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu
                    }
                  }}
                >
                  {weeks.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <Tooltip
                  TransitionComponent={Zoom}
                  title="Select a date when your pay period starts"
                >
                  <IconButton className="helpButton">
                    <img className="helpImage" src={HelpIcon} alt="help" />
                  </IconButton>
                </Tooltip>
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <Fingerprint />
                </ListItemIcon>
                <ListItemText primary="Fingerprint lock" />
                <ListItemSecondaryAction style={{ marginRight: 28 }}>
                  <Switch
                    onChange={this.handleToggle("bluetooth")}
                    checked={this.state.checked.indexOf("bluetooth") !== -1}
                  />
                </ListItemSecondaryAction>
                <Tooltip
                  TransitionComponent={Zoom}
                  title="Turn on/off fingerprint authentication"
                >
                  <IconButton className="helpButton">
                    <img className="helpImage" src={HelpIcon} alt="help" />
                  </IconButton>
                </Tooltip>
              </ListItem>
            </List>
          </CardBody>
        </Card>

        <Dialog
          // maxWidth="100px"
          open={this.state.openDialog}
          TransitionComponent={Slide}
          onClose={this.handleRequestClose}
          fullWidth
        >
          <DialogTitle align="center">
            <div>Select Subscription</div>
            <FormControl
              align="center"
              fullWidth
              style={{ width: "50%", marginTop: "25px" }}
            >
              <Select
                value={subscription}
                onChange={e => this.handleChangeInSubscription(e)}
                displayEmpty
                style={{ paddingLeft: "10px" }}
                name="Subscription"
              >
                <MenuItem
                  value="Basic"
                  disabled={this.props.user.subscription === "Basic"}
                >
                  Basic - $39
                </MenuItem>
                <MenuItem
                  value="Standard"
                  disabled={this.props.user.subscription === "Standard"}
                >
                  Standard - $99
                </MenuItem>
              </Select>
            </FormControl>
          </DialogTitle>
          <DialogContent align="center">
            <PriceTable price={this.state.subscription} />
          </DialogContent>
          <DialogActions align="center">
            {subscriptionLoader ? (
              <Button
                disabled={true}
                variant="contained"
                style={{ margin: "auto" }}
                color="primary"
              >
                <PulseLoader size={12} color={"#123abc"} />
              </Button>
            ) : (
              <Button
                disabled={changeInSubscription}
                onClick={this.onChnageSubscription}
                variant="contained"
                style={{ margin: "auto" }}
                color="primary"
              >
                Change Subscription
              </Button>
            )}
          </DialogActions>
        </Dialog>
      </Col>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userReducer.user,
  userLoader: state.userReducer.loader,
  updateFacilityStatus: state.userReducer.updateFacilityStatus,
  loader: state.Subscription.loader,
  changeSubStatus: state.Subscription.changeSubStatus,
  paystubs: state.employeerBackupReducer.paystubs,
  changeDirectDepositStatus:
    state.directDepositReducer.changeDirectDepositStatus,
  cLoader: state.directDepositReducer.loader,
  employees: state.employerReducer.employees,
  empLoader: state.employerReducer.loader
});

export default connect(
  mapStateToProps,
  {
    changeSubscriptions,
    getEmployerBackup,
    changeDirectDeposit,
    startGetCurrentUser,
    updateFacilities,
    setDefault
  }
)(withStyles(styles)(SettingMain));
