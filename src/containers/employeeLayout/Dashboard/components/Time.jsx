import React, { Component } from "react";
import Panel from "../../../../shared/components/Panel";
import { Typography } from "@material-ui/core";
import moment from "moment";

class TimeComp extends Component {
  state = {
    greet: "Good Morning",
    curTime: new Date(),
  };

  componentWillMount() {
    var myDate = new Date();
    var hrs = myDate.getHours();
    var greet;

    if (hrs < 12) {
      greet = "Good Morning";
    } else if (hrs >= 12 && hrs <= 17) {
      greet = "Good Afternoon";
    } else if (hrs >= 17 && hrs <= 24) {
      greet = "Good Evening";
    }

    this.setState({
      greet,
    });
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        curTime: new Date().toLocaleString(),
      });
    }, 10000);
  }

  render() {
    let { greet, curTime } = this.state;

    return (
      <Panel
        xl={6}
        lg={6}
        md={12}
        xs={12}
        title="Greetings"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" align="center">
            {greet}
          </Typography>
          <Typography style={{ marginTop: 20 }} variant="h5" align="center">
            {moment(curTime).format("hh:mm A")}
          </Typography>
          <Typography align="center">
            {moment().format("DD MMM, YYYY")}
          </Typography>
        </div>
      </Panel>
    );
  }
}

export default TimeComp;
