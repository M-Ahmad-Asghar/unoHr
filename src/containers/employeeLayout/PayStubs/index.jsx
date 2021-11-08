import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import { translate } from "react-i18next";
import PropTypes from "prop-types";
import BasicTable from "./components/BasicTable";
import SearchBar from "../../employeer/MainTask/SearchBar";

function BasicTables() {
  const [searchQuery, setSearchQuery] = useState("");

  const filterMessages = (query) => {
    setSearchQuery(query);

  };

  return (
    <Container>
      <Row>
        <SearchBar
          title="Select Paystub"
          filter={filterMessages}
          placeholder="Search by Date"
        />
      </Row>
      <Row>
        {console.log(searchQuery, 'searchQuery')}
        <BasicTable searchQuery={searchQuery} />
      </Row>
    </Container>
  );
}

BasicTables.propTypes = {
  t: PropTypes.func.isRequired,
};

export default translate("common")(BasicTables);
