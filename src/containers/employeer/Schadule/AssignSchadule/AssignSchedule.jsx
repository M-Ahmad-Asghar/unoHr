import React, { useEffect } from "react";
import { Card, CardBody, Container, Col, Button, Row } from "reactstrap";
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
import Person from "@material-ui/icons/PermContactCalendar";
import PriceTable from "../../../employeerLayout/Settings/components/SettingMain";
import { getEmployerBackup } from "../../../../redux/actions/employeerBackupAction";
import EndPoint from "../../../../EndPoint";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign, faEdit } from "@fortawesome/free-solid-svg-icons";
import {
  getShifts,
  assignShift,
  getAssignedShiftsByEmployee,
} from "../../../../redux/actions/shiftAction";
import { changeSubscriptions } from "../../../../redux/actions/SubscriptionActions";
import Axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import { th } from "date-fns/esm/locale";
import { useSelector, useDispatch } from "react-redux";
import { useObjectState } from "../../../../utils/commonState";
library.add(faDollarSign);
library.add(faEdit);

const styles = (theme) => ({
  root: {
    textAlign: "center",
    margin: "auto",
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  textField: {
    margin: "0px 8px",
    width: "100%",
  },
  menu: {
    width: "100%",
  },
});

function SettingMain(props) {
  const dispatch = useDispatch();
  const [state, setState] = useObjectState({
    loader: true,
    allEmployees: [],
    allShifts: [],
    employee: "",
    shift: "",
  });

  const user = useSelector((state) => state.userReducer.user);
  const loader = useSelector((state) => state.shiftReducer.loader);
  const getShiftStatus = useSelector(
    (state) => state.shiftReducer.getShiftStatus
  );
  const getAssignedShiftStatus = useSelector(
    (state) => state.shiftReducer.getAssignedShiftStatus
  );
  const shifts = useSelector((state) => state.shiftReducer.allShifts);
  const employees = useSelector((state) => state.employerReducer.employees);
  const assignedShifts = useSelector(
    (state) => state.shiftReducer.assignedShiftsEmployee
  );

  useEffect(() => {
    dispatch(getShifts(user.uid));
  }, []);

  const handleEmployeeChange = (event) => {
    setState({
      employee: event.target.value,
    });
    dispatch(getAssignedShiftsByEmployee(event.target.value));
  };

  const handleShiftChange = (event) => {
    setState({
      shift: event.target.value,
    });
  };

  const assignSchaduleButton = () => {
    let { employee, shift } = state;
    if (employee == "" || shift == "") {
      toast.error("Select both fields!");
    } else {
      setState({
        loader: true,
      });

      let res = shifts.filter((sh) => sh.name === shift);
      shift = res[0];

      res = assignedShifts.filter((s) => s.shift.name === shift.name);
      if (res.length > 0) {
        toast.error("Shift is already assigned to this user!");
        setState({
          loader: false,
        });
      } else {
        let assignedShift = {
          employeeid: employee,
          shift,
          employerid: user.uid,
        };
        dispatch(assignShift(assignedShift));
        setState({
          loader: false,
        });
      }
    }
  };
  useEffect(() => {
    if (getShiftStatus == "done") {
      setState({
        loader: false,
        allEmployees: employees,
        allShifts: shifts,
      });
    } else if (getShiftStatus == "error") {
      setState({
        loader: false,
      });
    } else if (getAssignedShiftStatus == "done") {
      setState({
        loader: false,
      });
    } else if (getAssignedShiftStatus == "error") {
      setState({
        loader: false,
      });
    }
  }, [, getShiftStatus, getAssignedShiftStatus]);

  const { classes } = props;

  return (
    <Container>
      <Row style={{ justifyContent: "center" }}>
        {state.loader ? (
          <Col md={12} lg={8} xl={8} className="text-center">
            <CircularProgress />
          </Col>
        ) : (
          <Col md={12} lg={8} xl={8} className="text-center">
            <Card className="text-center">
              <CardBody className="text-center">
                <List
                  subheader={<ListSubheader>Assign Schedule</ListSubheader>}
                  className={classes.root}
                >
                  <ListItem>
                    <ListItemIcon>
                      <Person />
                    </ListItemIcon>
                    <TextField
                      id="standard-select-currency"
                      select
                      label="Select Employee"
                      className={classes.textField}
                      value={state.employee}
                      onChange={handleEmployeeChange}
                      SelectProps={{
                        MenuProps: {
                          className: classes.menu,
                        },
                      }}
                    >
                      {state.allEmployees.map((emp) => (
                        <MenuItem key={emp.employeeid} value={emp.employeeid}>
                          {emp.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </ListItem>

                  <ListItem>
                    <ListItemIcon>
                      <Timer />
                    </ListItemIcon>
                    <TextField
                      id="standard-select-currency"
                      select
                      label="Select Shift"
                      className={classes.textField}
                      value={state.shift}
                      onChange={handleShiftChange}
                      SelectProps={{
                        MenuProps: {
                          className: classes.menu,
                        },
                      }}
                    >
                      {state.allShifts.map((shift) => (
                        <MenuItem
                          key={shift.name + shift.employeruid}
                          value={shift.name}
                          style={{
                            backgroundColor: shift.color,
                            color: "white",
                          }}
                        >
                          {shift.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </ListItem>
                </List>
                <Button
                  onClick={assignSchaduleButton}
                  variant="contained"
                  style={{ marginTop: "25px", marginLeft: "20px" }}
                  color="primary"
                >
                  Assign Schedule
                </Button>
              </CardBody>
            </Card>
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default withStyles(styles)(SettingMain);
