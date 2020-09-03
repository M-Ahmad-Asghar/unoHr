import React from "react";
import { Card, CardBody, CardTitle, Row, Col } from "reactstrap";
// import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
// import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import ReviewModel from "./reviewmodel";

const RewardEmployee = () => {
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
                <MenuItem value="Naveed rajout">Naveed Rajput</MenuItem>
                <MenuItem value="asif">Asif</MenuItem>
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
            <ReviewModel />
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default RewardEmployee;
