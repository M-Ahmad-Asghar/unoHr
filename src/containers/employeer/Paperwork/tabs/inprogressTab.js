import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { getEmpDocs } from "../../../../redux/actions/paperWorkActions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { UncontrolledCollapse, Button, CardBody, Card } from "reactstrap";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

function NestedList(props) {
  const classes = useStyles();

  useEffect(() => {
    props.getEmpDocs(props.user.uid);
  }, [props.user]);

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      {props.documents.length &&
        props.documents.map((i, index) => {
          return (
            <>
              <ListItem button id={`toggler${index}`}>
                <ListItemText primary={i.doc_title} />
              </ListItem>
              <Divider />
              <UncontrolledCollapse toggler={`#toggler${index}`}>
                <Card>
                  <CardBody>
                    <iframe
                      src={i.doc_url}
                      style={{ width: "100%", height: 500 }}
                      frameborder="0"
                      webkitAllowFullScreen
                      mozallowfullscreen
                      allowFullScreen
                    />
                  </CardBody>
                </Card>
              </UncontrolledCollapse>
            </>
          );
        })}
    </List>
  );
}

const mapStateToProps = (state) => ({
  user: state.userReducer.user,
  documents: state.paperWorkReducer.paperDocs,
  // loader: state.paperWorkReducer.paperLoader,
});

export default connect(
  mapStateToProps,
  { getEmpDocs }
)(withRouter(NestedList));
