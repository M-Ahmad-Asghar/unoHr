import React, { useState, useEffect } from "react";

import { Col, Container, Row } from "reactstrap";
import { translate } from "react-i18next";
import PropTypes from "prop-types";
import BasicTable from "./components/BasicTable";
import SearchBar from "../SearchBar";
// import { getOwnTask } from "../../../redux/actions/EmployeeTaskActions";
// import { getEmployees } from "../../../redux/actions/employerActions";
// import { getTask } from "../../../redux/actions/TasksActions";
import { useSelector } from "react-redux";

function CompletedTask() {
  const [active, setActive] = useState("true");
  const [DueDate, setDueDate] = useState("");
  const [loader, setLoder] = useState(true);
  const [dataLength, setDataLength] = useState(true);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const items = useSelector((state) => state.TaskReducer.CompletedTask);
  const user = useSelector((state) => state.userReducer.user);
  const stateLoader = useSelector((state) => state.TaskReducer.loader);

  const filterMessages = (query) => {
    setSearchQuery(query);
  };

  return (
    <Container>
      <Row>
        <SearchBar
          title="List of Completed Tasks"
          filter={filterMessages}
          placeholder="Search by Name, Title, Date"
        />
      </Row>
      <Row>
        <BasicTable searchQuery={searchQuery} />
      </Row>
    </Container>
  );
}

export default translate("common")(CompletedTask);
