import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import { Col, Row, Card, CardHeader, CardBody } from "reactstrap";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@material-ui/core/Typography";
import { storage } from "../../../boot/firebase";
import { v4 as uuidv4 } from "uuid";
import { SubmitTicketAction } from "../../../redux/actions/userActions";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "100%",
    },
  },
  input: {
    display: "none",
  },
}));

const ContactSupport = () => {
  const classes = useStyles();
  const [topic, settopic] = useState("");
  const [subject, setSubject] = useState("");
  const [detail, setDetail] = useState("");
  const [file, setFile] = useState("");
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();

  const { user, submitTicketStatus } = useSelector((state) => ({
    user: state.userReducer.user,
    submitTicketStatus: state.userReducer.submitTicketStatus,
  }));

  useEffect(()=>{
    if(submitTicketStatus){
      setLoader(true);
    } else {
      setLoader(false);
    }
  },[submitTicketStatus])

  const handleChange = (event) => {
    settopic(event.target.value);
  };

  const fileHandler = (event) => {
    setFile(event.target.files[0]);
  };

  const submitData = async () => {
    if (topic === "") {
      toast.error("please select a topic!");
    } else if (subject === "") {
      toast.error("please enter a subjec!");
    } else if (detail === "") {
      toast.error("describe about the topic!");
    } else {
      setLoader(true);
      if (file) {
        let path = `requestNewForm/${user.uid}/${file.name}`;
        await storage.ref(path).put(file);
        const url = await storage.ref(path).getDownloadURL();

        if (url) {
          let data = {
            topic: topic,
            subject: subject,
            detail: detail,
            attachment: url,
            name: user.firstName + " " + user.lastName,
            email: user.email,
            date: new Date(),
            uid: user.docid,
            ticketId: uuidv4().slice(0, 8),
          };
          dispatch(SubmitTicketAction(data));
        }
      } else {
        let data = {
          topic: topic,
          subject: subject,
          detail: detail,
          attachment: "",
          name: user.firstName + " " + user.lastName,
          email: user.email,
          date: new Date(),
          uid: user.docid,
          ticketId: uuidv4().slice(0, 8),
        };
        dispatch(SubmitTicketAction(data));
      }
    }
  };

  return (
    <div style={{ marginTop: -15, marginRight: 10 }}>
      <Card>
        <CardHeader style={{ backgroundColor: "white" }}>
          <Typography> Create a New Support Ticket</Typography>
        </CardHeader>
        <CardBody>
          <Row>
            <Col sm={12} lg={6}>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">
                  Select a Ticket Topic
                </InputLabel>
                <Select
                  fullWidth
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={topic}
                  onChange={handleChange}
                >
                  <MenuItem value="document require">
                    Document Required
                  </MenuItem>
                  <MenuItem value="bug">Bug</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Col>
            <Col sm={12} lg={6}>
              <form className={classes.root} noValidate autoComplete="off">
                <TextField
                  fullWidth
                  id="standard-basic"
                  label="Subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </form>
            </Col>
            <Col lg={12}>
              <TextField
                // style={{ width: "100%" }}
                fullWidth
                id="standard-multiline-static"
                label="Describe about your topic"
                multiline
                rows={4}
                value={detail}
                onChange={(e) => setDetail(e.target.value)}
              />
            </Col>
            <Col
              lg={12}
              style={{
                textAlign: "center",
              }}
            >
              <input
                // accept="image/*"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
                onChange={fileHandler}
              />
              <label
                htmlFor="contained-button-file"
                style={{
                  padding: 15,
                  display: "flex",
                  flexDirection: "column",
                  marginTop: 15,
                }}
              >
                <Button variant="contained" color="primary" component="span">
                  Upload an Attachment
                </Button>
                <span style={{ color: "red", fontSize: 12, marginTop: 5 }}>
                  {file ? file.name : ""}
                </span>
              </label>
            </Col>
            <Col lg={12} style={{ textAlign: "center" }}>
              <Button
                disabled={loader ? true : false}
                variant="contained"
                color="primary"
                component="span"
                onClick={submitData}
              >
                {loader ? "Loading..." : "Submit Ticket"}
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
};

export default ContactSupport;
