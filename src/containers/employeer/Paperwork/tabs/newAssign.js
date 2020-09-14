import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { UncontrolledCollapse, Button, CardBody, Card } from "reactstrap";
import { getSystemDocuments } from "../../../../redux/actions/paperWorkActions";
import { connect } from "react-redux";
import moment from "moment";
import { Row, Col } from "reactstrap";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
// import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  // KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import "date-fns";
import { addPaperWork } from "../../../../redux/actions/paperWorkActions";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: "100%",
  },
}));

function NestedList(props) {
  const classes = useStyles();
  const [selectEmployee, setSelectEmployee] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date("2014-08-18T21:11:54")
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleChange = (event) => {
    setSelectEmployee(event.target.value);
  };

  useEffect(() => {
    props.getSystemDocuments();
  }, []);

  const assignDoc = (item) => {
    if (selectEmployee !== "") {
      let data;
      data = {
        doc_title: item.title,
        doc_url: item.url,
        doc_id: item.id,
        due_date: selectedDate,
      };
      if (item.forward === undefined) {
        data = {
          ...data,
          name: selectEmployee.name,
          emp_id: selectEmployee.employeeid,
        };
      } else {
        data = {
          ...data,
          name: selectEmployee.name,
          emp_id: selectEmployee.employeeid,
          forward: item.forward,
        };
      }
      addPaperWork(data)
        .then((res) => {
          // setLoading(false);
          toast.success("Successfully assign task");
        })
        .catch((err) => {
          // setLoading(false);
        });
    } else {
      toast.error("Select Employee");
    }
  };

  // console.log("=======>documents are here====>", props.employees);

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      {props.documents.length &&
        props.documents.map((item, i) => {
          return (
            <>
              {" "}
              <ListItem button id={`toggler${i}`}>
                <ListItemText primary={item.title} />
                <ListItemText primary={moment(item.created_at).format("ll")} />
              </ListItem>
              <Divider />
              <UncontrolledCollapse toggler={`#toggler${i}`}>
                <Card>
                  <CardBody>
                    <iframe
                      src={item.url}
                      style={{ width: "100%", height: 500 }}
                      frameborder="0"
                      webkitAllowFullScreen
                      mozallowfullscreen
                      allowFullScreen
                    />
                  </CardBody>
                  <Row>
                    <Col lg={6}>
                      <FormControl className={classes.formControl}>
                        <InputLabel id="demo-controlled-open-select-label">
                          select employee
                        </InputLabel>
                        <Select
                          labelId="demo-controlled-open-select-label"
                          id="demo-controlled-open-select"
                          value={selectEmployee}
                          onChange={handleChange}
                        >
                          {/* <MenuItem value="">
                            <em>None</em>
                          </MenuItem> */}
                          {props.employees.length &&
                            props.employees.map((i) => {
                              return <MenuItem value={i}>{i.name}</MenuItem>;
                            })}
                        </Select>
                      </FormControl>
                    </Col>
                    <Col lg={6}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        {/* <Grid container justify="space-around"> */}
                        <KeyboardDatePicker
                          style={{ width: "100%" }}
                          disableToolbar
                          variant="inline"
                          format="MM/dd/yyyy"
                          margin="normal"
                          id="date-picker-inline"
                          label="Date picker inline"
                          value={selectedDate}
                          onChange={handleDateChange}
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                        />
                        {/* </Grid> */}
                      </MuiPickersUtilsProvider>
                    </Col>
                    <Col>
                      <Button onClick={() => assignDoc(item)}>Assign</Button>
                    </Col>
                  </Row>
                </Card>
              </UncontrolledCollapse>
            </>
          );
        })}
    </List>
  );
}

const mapStateToProps = (state) => ({
  documents: state.paperWorkReducer.verifieddocuments,
  employees: state.employerReducer.employees,
});

export default connect(
  mapStateToProps,
  { getSystemDocuments }
)(NestedList);
