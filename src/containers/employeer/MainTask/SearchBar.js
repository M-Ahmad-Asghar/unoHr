import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import { CalendarToday } from "@material-ui/icons";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "material-ui-pickers";

const styles = (theme) => ({
  root: {
    width: "97%",
    marginLeft: "15px",
    marginBottom: "20px",
    borderRadius: "4px",
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
      color: "#000",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    borderWidth: "1px",
    borderColor: "#000",
    backgroundColor: "#8a8c8e",
    "&:hover": {
      backgroundColor: fade("#8a8c8e", 0.85),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit,
      width: "auto",
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    fontSize: "0.8rem",
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 180,
      "&:focus": {
        width: 200,
      },
    },
  },
});

function Bar(props) {
  const {
    classes,
    title,
    filter,
    placeholder,
    button,
    callBack,
    date,
    filterDate,
    calendar = false,
  } = props;
  return (
    <div className={classes.root}>
      <AppBar style={{ backgroundColor: "#ffffff" }} position="static">
        <Toolbar>
          <Typography
            className={classes.title}
            variant="body2"
            color="secondary"
            noWrap
          >
            {title}
          </Typography>
          {calendar && (
            <>
              <IconButton onClick={() => alert("hi")}>
                <CalendarToday />
              </IconButton>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  margin="normal"
                  value={date}
                  onChange={filterDate}
                />
              </MuiPickersUtilsProvider>
            </>
          )}
          <div className={classes.grow} />
          {button ? (
            <Button
              onClick={callBack}
              style={{
                backgroundColor: "#4056B5",
                color: "white",
                margin: 0,
                textTransform: "none",
              }}
            >
              {placeholder}
            </Button>
          ) : (
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                onChange={(e) => {
                  filter(e.target.value);
                }}
                placeholder={placeholder}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

Bar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Bar);
