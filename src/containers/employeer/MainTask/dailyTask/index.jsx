import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Col, Container, Row, Input, Card, Form, FormGroup } from "reactstrap";
import { translate } from "react-i18next";
import BasicTable from "./components/BasicTable";
import { getEmployees } from "../../../../redux/actions/employerActions";
import { getTask } from "../../../../redux/actions/TasksActions";
import moment from "moment";
import SearchBar from "../SearchBar";
import { useSelector, useDispatch } from "react-redux";
const backStyleSearchBox = {
  width: "97%",
  padding: "8px",
  margin: "0px 0px 20px 15px",
  backgroundColor: "#ffffff",
  borderRadius: "4px",
};

function EmployeeTask() {
  const [active, setActive] = useState("true");
  const [DueDate, setDueDate] = useState("");
  const [loader, setLoader] = useState(true);
  const [dataLength, setDataLength] = useState(true);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDate, setFilterDate] = useState(new Date());

  const items = useSelector((state) => state.TaskReducer.AllTask);
  const user = useSelector((state) => state.userReducer.user);
  const stateLoader = useSelector((state) => state.TaskReducer.loader);

  useEffect(() => {
    if (stateLoader === "false") {
      setData(items);
      setLoader(false);
    }
  }, [stateLoader]);

  const onSearchChange = (name) => (event) => {
    console.log(name);
    // this.setState({
    //   [name]: event.target.value,
    // });
  };

  const filterMessages = (query) => {
    setSearchQuery(query);
  };

  const handleDate = (date) => {
    setFilterDate(date);
    setSearchQuery(moment(date).format("MMM/DD/YYYY"));
  };

  return (
    <Container>
      <Row>
        <SearchBar
          title="Daily Tasks"
          filter={filterMessages}
          placeholder="Search by Name, Title, Date"
          date={filterDate}
          filterDate={handleDate}
          calendar={true}
        />
      </Row>
      <Row>
        <BasicTable searchQuery={searchQuery} />
      </Row>
    </Container>
  );
}

export default translate("common")(EmployeeTask);
