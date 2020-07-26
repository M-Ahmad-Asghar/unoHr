import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import LetterAvatar from "./avatar";
import { Divider } from "@material-ui/core";
import moment from "moment";
import { connect } from "react-redux";
import {deleteMsg} from "../../../../../redux/actions/schaduleAction";
import No_Message from "./noMessage";

const styles = theme => ({
  text: {
    paddingTop: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    fontSize: "1.5rem"
  },
  paper: {
    // paddingBottom: 0
  },
  list: {
    marginBottom: theme.spacing.unit * 2,
    paddingTop: "0px",
    paddingBottom:"0px"
  },
  subHeader: {
    backgroundColor: theme.palette.background.paper
  },
  appBar: {
    top: "auto",
    bottom: 0
  },
  toolbar: {
    alignItems: "center",
    justifyContent: "space-between"
  },
  fabButton: {
    position: "absolute",
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: "0 auto"
  },
  time: {
    fontSize: "0.7rem"
  },
  delete: {
    position: "absolute",
    top: "0",
    right: "0",

    paddingRight: "15px",
    paddingTop: "5px",
    color: "red",
    cursor: "pointer",
    fontSize:"1.1rem"
  },
  message: {
    // maxHeight: "200px",
    overflow: "auto",
    justifyContent: "center",
    marginTop: '10px'
    // backgroundColor: "red",
    

    
  }
});




function Inbox(props) {
  const { classes, messages,deleteMsg } = props;
  console.log(props);
  return (
    <React.Fragment>
      <Divider />
      <Paper square className={classes.paper}>
        <List className={classes.list}>
        {messages.length < 1 ? <No_Message /> : 
          messages.map(
            ({ id, title, Description, employeeName, PostedTime }) => (
              <Fragment key={id}>
                <ListItem style={{alignItems: "flex-start"}} >
                  <LetterAvatar name={employeeName}  />
                  <ListItemText
                  // disableTypography = {false}
                  secondaryTypographyProps ={{ width: "100%",
                  overflow: "scroll"}}
                    className={classes.message}
                    primary={title}
                    secondary={Description}
                  />
                  <span
                    title="delete this message"
                    id={id}
                    onClick={() =>deleteMsg(id)
                    }
                    className={classes.delete}
                  >
                    X
                  </span>
                </ListItem>
                <ListItem>
                  <ListItemText
                    className={classes.time}
                    secondary={
                      <React.Fragment>
                        <Typography component="span"  align="right" className={classes.time}>
                          Sent At:{" "}
                          {moment(PostedTime).format("hh:mm A MM/DD/YYYY")}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider />
              </Fragment>
            )
          )}
        </List>
      </Paper>
    </React.Fragment>
  );
}

Inbox.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps (state){
      return{
          deleteStatus:state.shaduleReducer.msgDeleteStatus
      }
}

export default connect(mapStateToProps,{deleteMsg})(withStyles(styles)(Inbox));
