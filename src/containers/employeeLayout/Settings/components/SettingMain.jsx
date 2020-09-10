import React from "react";
import { Card, CardBody, Col, Button, Row } from "reactstrap";
import MessageTextOutlineIcon from "mdi-react/MessageTextOutlineIcon";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
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
import Backup from "@material-ui/icons/Backup";
import Payment from "@material-ui/icons/Payment";

import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDollarSign,
  faGripLinesVertical
} from "@fortawesome/free-solid-svg-icons";
import { getStartPayStubs } from "../../../../redux/actions/paystubsActions";
import { compose } from "recompose";
import { BeatLoader } from "react-spinners";

import Axios from "axios";
import EndPoint from "../../../../EndPoint";
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Zoom from '@material-ui/core/Zoom';
import HelpIcon from "../../../../assets/help.png";
import "../styles/style.css";
library.add(faDollarSign);

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    textAlign: "center"
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
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      token: "",
      checked: ["notif"],
      currency: "USD",
      loader: false
    };
  }

  componentWillMount() {
    try {
      let val = localStorage.getItem("token");
      console.log("val", val);

      if (val) {
        this.props.getStartPayStubs(this.props.user.employeeid);
        this.setState({ login: true, token: val });
      } else {
        this.setState({ login: false });
      }
    } catch (error) {
      console.log("er", error);
    }
  }

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
  };
  backupHandler = () => {
    console.log("paystubs", this.props.paystubs);
    this.setState({ loader: true });
    let token = this.state.token;
    let newtoken = token.slice(14, token.length);
    var n = newtoken.indexOf("&");
    newtoken = newtoken.slice(0, n);
    console.log("t", newtoken);

    if(this.props.paystubs.length > 0) {

    Axios.post(EndPoint + "/backup/savetodropbox", {
      data: this.props.paystubs,
      token: newtoken
    })
      .then(res => {
        this.setState({ loader: false });
        toast.success("Successfully Backup your data");
      })
      .catch(err => {
        console.log("err", err);
        this.setState({ loader: false });
        toast.error("Error occur, try again later");
      });
    } else {
      toast.err("No data found for backup!")
    }
    // Axios.post('',)
  };
  render() {
    const { classes } = this.props;
    return (
      <Col md={12} lg={12} xl={12}>
        <Card>
          <CardBody>
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

                {/* //development */}
                  {/* <a
                    style={{ fontWeight: "bold", marginLeft: 50 }}
                    href="https://www.dropbox.com/oauth2/authorize?response_type=token&client_id=335e2580zjoxj1u&redirect_uri=http://localhost:3000/"
                  >
                    For Backup - Login With Dropbox
                  </a> */}
                   {/* For production */}
                  <a
                    style={{ fontWeight: "bold", marginLeft: 50 }}
                    href="https://www.dropbox.com/oauth2/authorize?response_type=token&client_id=335e2580zjoxj1u&redirect_uri=https://promising-saga-232017.firebaseapp.com/"
                  >
                    For Backup - Login With Dropbox
                  </a>
                  {/* For production */}
                </ListItem>
              )}

              <ListItem>
                <ListItemIcon>
                  <Notification />
                </ListItemIcon>
                <ListItemText primary="Notifications" />
                <ListItemSecondaryAction style={{marginRight: 28}}>
                  <Switch
                    onChange={this.handleToggle("notif")}
                    checked={this.state.checked.indexOf("notif") !== -1}
                  />
                </ListItemSecondaryAction>
                <Tooltip TransitionComponent={Zoom} title="Turn on/off notifications">
                  <IconButton className="helpButton">
                    <img className="helpImage" src={HelpIcon} alt="help"/>
                  </IconButton>
                </Tooltip>
              </ListItem>            
            </List>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

const mapStateToProps = state => ({
  user: state.employeeUserReducer.currentEmp,
  paystubs: state.payStubsReducer.paystubs
});

export default compose(
  connect(
    mapStateToProps,
    {
      getStartPayStubs
    }
  ),
  withStyles(styles)
)(SettingMain);
