import React, { useState, useEffect } from "react";
import { Col, Row, Card, CardHeader, CardBody } from "reactstrap";
import Typography from "@material-ui/core/Typography";
import { useSelector, useDispatch } from "react-redux";
import { getMyTicketsAction } from "../../../redux/actions/userActions";
import { PulseLoader } from "react-spinners";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

const MyTickets = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const [loader, setLoader] = useState(true);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  let dispatch = useDispatch();
  const { user, myTicketsStatus, myAllTickets } = useSelector((state) => ({
    user: state.userReducer.user,
    myTicketsStatus: state.userReducer.myTicketsStatus,
    myAllTickets: state.userReducer.myAllTickets,
  }));

  useEffect(() => {
    console.log("here is the status=====>", myTicketsStatus);
    if (myTicketsStatus === "done") {
      setLoader(false);
    }
  }, [myTicketsStatus]);

  useEffect(() => {
    dispatch(getMyTicketsAction(user.docid));
  }, []);

  return (
    <Card>
      <CardHeader style={{ backgroundColor: "white" }}>
        <Typography> My Tickets</Typography>
      </CardHeader>
      <CardBody>
        {loader ? (
          <div style={{ textAlign: "center" }}>
            <PulseLoader />
          </div>
        ) : myAllTickets.length ? (
          myAllTickets.map((items, index) => {
            return (
              <div className={classes.root}>
                <Accordion
                  style={{ marginBottom: 5 }}
                  // disabled={items.status ? false : true}
                  expanded={expanded === index}
                  onChange={handleChange(index)}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Typography
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                      className={classes.heading}
                    >
                      {items.status ? (
                        <div
                          style={{
                            width: 7,
                            height: 7,
                            backgroundColor: "green",
                            borderRadius: "50%",
                          }}
                        ></div>
                      ) : (
                        <div
                          style={{
                            width: 7,
                            height: 7,
                            backgroundColor: "red",
                            borderRadius: "50%",
                          }}
                        ></div>
                      )}
                      <span style={{ marginLeft: 5 }}> {items.ticketId}</span>
                    </Typography>
                    <Typography className={classes.secondaryHeading}>
                      {moment(
                        new Date(
                          items.date.seconds * 1000 +
                            items.date.nanoseconds / 1000000
                        )
                      ).format("ll")}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <div>
                      <span style={{ fontWeight: "bold" }}>Topic: </span>
                      <span style={{ color: "grey" }}>{items.topic}</span>
                    </div>
                    <div>
                      <span style={{ fontWeight: "bold" }}>Subject: </span>
                      <span style={{ color: "grey" }}>{items.subject}</span>
                    </div>
                    <div>
                      <span style={{ fontWeight: "bold" }}>Detail: </span>
                      <span style={{ color: "grey" }}>{items.detail}</span>
                    </div>
                    {items.attachment && (
                      <div>
                        <span style={{ fontWeight: "bold" }}>Attachment: </span>
                        <span
                          style={{ color: "blue", textDecoration: "underline" }}
                          onClick={() =>
                            window.open(items.attachment, "_blank")
                          }
                        >
                          Click to View
                        </span>
                      </div>
                    )}
                  </AccordionDetails>
                </Accordion>
              </div>
            );
          })
        ) : (
          <div>No Ticket Found!</div>
        )}
      </CardBody>
    </Card>
  );
};

export default MyTickets;
