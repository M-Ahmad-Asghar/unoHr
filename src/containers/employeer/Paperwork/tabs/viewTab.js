import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { getAllSubmissions } from "../../../../redux/actions/paperWorkActions";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

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

export default function NestedList() {
  const classes = useStyles();
  const [loader, setLoader] = useState(true);
  const dispatch = useDispatch();

  const { user, status, myAllSubmissions } = useSelector((state) => ({
    user: state.userReducer.user,
    status: state.paperWorkReducer.submissionStatus,
    myAllSubmissions: state.paperWorkReducer.myAllSubmissions,
  }));

  useEffect(() => {
    dispatch(getAllSubmissions(user.uid));
  }, []);

  useEffect(() => {
    console.log("status is===", status);
    if (status === "done") {
      setLoader(false);
    }
  }, [status]);

  console.log("===============>", myAllSubmissions);

  return loader ? (
    <div style={{ textAlign: "center" }}>Loading...</div>
  ) : myAllSubmissions.length ? (
    myAllSubmissions.map((i) => {
      return (
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          className={classes.root}
        >
          <ListItem button onClick={() => window.open(i.downloadUrl, "_blank")}>
            <ListItemText primary={i.doc_title} />
            <ListItemText
              primary={moment(
                new Date(
                  i.created_at.seconds * 1000 +
                    i.created_at.nanoseconds / 1000000
                )
              ).format("ll")}
            />
          </ListItem>
          <Divider />
        </List>
      );
    })
  ) : (
    <div>No Submission Found!</div>
  );
}
