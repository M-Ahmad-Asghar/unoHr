import React, { useState, useEffect } from "react";
import Panel from "../../../../shared/components/Panel";
import { Typography } from "@material-ui/core";
import moment from "moment";

export default function TimeComp() {
  const [greet, setGreet] = useState("Good Morning");
  const [curTime, setCurTime] = useState(new Date());

  useEffect(() => {
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

    setGreet(greet);

    setInterval(() => {
      setCurTime(new Date());
    }, 10000);
  }, []);

  return (
    <Panel xl={6} lg={6} md={12} xs={12} title="Greetings">
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
