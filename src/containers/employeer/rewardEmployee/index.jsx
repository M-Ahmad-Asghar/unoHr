import React from "react";
import { Card, CardBody, CardTitle, Row, Col } from "reactstrap";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import ReviewModel from "./reviewmodel";
import { connect } from "react-redux";
import { sendGiftReward } from "../../../redux/actions/rewardAction";

const RewardEmployee = (props) => {
  const [dollars, setDollars] = React.useState(5);
  const [sendGiftTo, setSendGiftTo] = React.useState("");
  const [comment, setComment] = React.useState("");

  const handleChange = (event) => {
    setDollars(event.target.value);
  };

  return (
    <Card>
      <CardBody>
        <CardTitle>Send Gift</CardTitle>
        <Row>
          <Col>
            <FormControl variant="outlined" style={{ width: "100%" }}>
              <InputLabel id="demo-simple-select-outlined-label">
                USD
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={dollars}
                onChange={handleChange}
                label="USD"
              >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
              </Select>
            </FormControl>
          </Col>
          <Col>
            <FormControl variant="outlined" style={{ width: "100%" }}>
              <InputLabel id="demo-simple-select-outlined-label">
                Send Gift To
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={sendGiftTo}
                onChange={(e) => setSendGiftTo(e.target.value)}
                label="Send Gift To"
              >
                {props.employees.length
                  ? props.employees.map((emp) => {
                      return (
                        <MenuItem
                          value={
                            emp.name + "," + emp.employeeid + "," + emp.email
                          }
                        >
                          {emp.name}
                        </MenuItem>
                      );
                    })
                  : null}
              </Select>
            </FormControl>
          </Col>
        </Row>
        <Row style={{ marginTop: 40 }}>
          <Col>
            <TextField
              style={{ width: "100%" }}
              id="outlined-multiline-static"
              label="Comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              multiline
              rows={4}
              defaultValue="Default Value"
              variant="outlined"
            />
          </Col>
        </Row>
        <Row style={{ marginTop: 30, textAlign: "center" }}>
          <Col>
            <ReviewModel
              sendGiftTo={sendGiftTo}
              empArray={sendGiftTo.split(",")}
              dollars={dollars}
              comment={comment}
              stripeCustomer={props.user.stripeCustomer}
              uid={props.user.uid}
              sendGiftReward={props.sendGiftReward}
            />
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    employees: state.employerReducer.employees,
    user: state.userReducer.user,
  };
};

export default connect(
  mapStateToProps,
  { sendGiftReward }
)(RewardEmployee);
