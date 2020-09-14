import React from "react";
import { Card, CardBody, Row, Col } from "reactstrap";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
// import ListItemAvatar from "@material-ui/core/ListItemAvatar";
// import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import moment from "moment";

function Reporting(props) {
  // console.log("all logs are here===========>", props.logs);
  return (
    <Card>
      <CardBody>
        <List>
          {props.logs.length
            ? props.logs.map((i) => {
                return (
                  <>
                    <ListItem alignItems="flex-start">
                      {/* <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar> */}
                      <ListItemText
                        primary={i.title}
                        secondary={
                          <Row style={{ marginTop: 5 }}>
                            <Col>
                              <Typography
                                component="span"
                                variant="body2"
                                style={{ display: "inline" }}
                                // className={classes.inline}
                                color="textPrimary"
                              >
                                Completed By:{" "}
                              </Typography>
                              {i.completedBy}
                            </Col>
                            <Col>
                              <Typography
                                component="span"
                                variant="body2"
                                style={{ display: "inline" }}
                                // className={classes.inline}
                                color="textPrimary"
                              >
                                Completed At:{" "}
                              </Typography>
                              {moment(i.taskCompleted).format(
                                "DD/MM/YYYY hh:mm"
                              )}
                            </Col>
                          </Row>
                        }
                      />
                    </ListItem>
                    <Divider
                      variant="inset"
                      component="li"
                      style={{ marginLeft: 0 }}
                    />
                  </>
                );
              })
            : ""}
        </List>
      </CardBody>
    </Card>
  );
}

const mapStateToProps = (state) => {
  return {
    logs: state.TaskReducer.logs,
  };
};

export default connect(
  mapStateToProps,
  null
)(Reporting);
