import React, { useState, useEffect } from "react";
// import { connect } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import { translate } from "react-i18next";
import PropTypes from "prop-types";
import BasicTable from "./components/BasicTable";
import SearchBar from "../../../employeer/MainTask/SearchBar";
// import { getOwnTask } from "../../../../redux/actions/EmployeeTaskActions";
import moment from "moment";

function OwnTask({ t }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDate, setFilterDate] = useState(new Date());

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
          title="List of Own Tasks"
          filter={filterMessages}
          placeholder="Search by Title, Date"
          date={filterDate}
          filterDate={handleDate}
          calendar={true}
        />
      </Row>
      <Row style={{ margin: "0px 10px" }}>
        <BasicTable searchQuery={searchQuery} />
      </Row>
    </Container>
  );
}

export default translate("common")(OwnTask);
