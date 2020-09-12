import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { UncontrolledCollapse, Button, CardBody, Card } from "reactstrap";
import { getSystemDocuments } from "../../../../redux/actions/paperWorkActions";
import { connect } from "react-redux";
import moment from "moment";

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
    props.getSystemDocuments();
  }, []);

  console.log("=======>documents are here====>", props.documents);

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      {props.documents.length &&
        props.documents.map((item, i) => {
          return (
            <>
              {" "}
              <ListItem button id={`toggler${i}`}>
                <ListItemText primary={item.title} />
                <ListItemText primary={moment(item.created_at).format("ll")} />
              </ListItem>
              <Divider />
              <UncontrolledCollapse toggler={`#toggler${i}`}>
                <Card>
                  <CardBody>
                    <iframe
                      src={item.url}
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
  documents: state.paperWorkReducer.verifieddocuments,
});

export default connect(
  mapStateToProps,
  { getSystemDocuments }
)(NestedList);
