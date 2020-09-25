import React, { useEffect, useState } from "react";
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
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    props.getEmpDocs(props.user.uid);
  }, [props.user]);

  useEffect(() => {
    if (props.status === "done") {
      setLoader(false);
    }
  }, [props.status]);

  // console.log("===================================================>", props.documents);

  return loader ? (
    <div className="load" style={{ width: "100%" }}>
      <div className="load__icon-wrap">
        <svg className="load__icon">
          <path fill="#3f51b5" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
        </svg>
      </div>
    </div>
  ) : (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      {props.documents.length ? (
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
                      src={i.doc_url + "/?employerid=" + i.emp_id}
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
        })
      ) : (
        <div>No Document Found</div>
      )}
    </List>
  );
}

const mapStateToProps = (state) => ({
  user: state.userReducer.user,
  documents: state.paperWorkReducer.paperDocs,
  status: state.paperWorkReducer.docStatus,
  // loader: state.paperWorkReducer.paperLoader,
});

export default connect(
  mapStateToProps,
  { getEmpDocs }
)(withRouter(NestedList));
