import React from "react";
import { Card, CardBody, Col } from "reactstrap";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";

const styles = (theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  textField: {
    margin: "0px 8px",
    // marginLeft: theme.spacing.unit,
    // marginRight: theme.spacing.unit,
    width: "100%",
  },
  menu: {
    width: "100%",
  },
});

function SettingMain({ classes }) {
  return (
    <Col md={12} lg={12} xl={12}>
      <Card>
        <CardBody> loader ...</CardBody>
      </Card>
    </Col>
  );
}

export default withRouter(withStyles(styles))(SettingMain);
