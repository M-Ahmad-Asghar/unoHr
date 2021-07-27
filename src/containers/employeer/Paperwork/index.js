import React, { useState, useEffect, Fragment } from "react";
import { Card, CardBody, Col, Row, CardHeader } from "reactstrap";
import Divider from "@material-ui/core/Divider";
import moment from "moment";
import "react-intl-tel-input/dist/main.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import PaperWorkTab from "./tabs";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
const styles = (theme) => ({
  root: {
    flexGrow: 1,
    width: "95%",
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    padding: 30,
  },
});

function Paperworks() {
  const [loader, setLoader] = useState(true);
  const [docs, setDocs] = useState([]);

  const history = useHistory();

  const user = useSelector((state) => state.userReducer.user);
  const loading = useSelector((state) => state.paperWorkReducer.loading);
  const documents = useSelector((state) => state.paperWorkReducer.employerDocs);
  const getDocStatus = useSelector(
    (state) => state.paperWorkReducer.getDocStatus
  );

  useEffect(() => {
    setDocs(documents);
    setLoader(false);
  }, []);

  useEffect(() => {
    if (documents) {
      setDocs(documents);
      setLoader(false);
    }
  }, [documents]);

  const docClickHandler = (item, id, empId, docs) => {
    history.push({
      pathname: "/home/employeer/paperWrokForms",
      state: { item, id, empId, docs },
    });
  };

  return (
    <div style={{ marginTop: -15 }}>
      <Paper
        align="center"
        elevation={5}
        style={{ padding: 8, marginBottom: 15 }}
      >
        <Typography variant="h6">Paper Works</Typography>
      </Paper>

      <Col
        md={12}
        lg={12}
        xl={12}
        style={{ backgroundColor: "white", paddingTop: 20, borderRadius: 5 }}
      >
        <Card>
          <PaperWorkTab />
        </Card>
      </Col>
    </div>
  );
}

export default withStyles(styles)(Paperworks);
