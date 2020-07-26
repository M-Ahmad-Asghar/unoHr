import React, { Component } from "react";
// import { connect } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import { translate } from "react-i18next";
import PropTypes from "prop-types";
import BasicTable from "./components/BasicTable";
import SearchBar from "../../../employeer/MainTask/SearchBar";
// import { getOwnTask } from "../../../../redux/actions/EmployeeTaskActions";


class OwnTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // loader: false,
      // data: []
      searchQuery: ''
    };
  }

  filterMessages=(query)=>{
    this.setState({
      searchQuery : query,
    })
  }

  render() {
    const { data } = this.state;
    const { t } = this.props;
    return (
      <Container>
        <Row>
          <SearchBar title='List of Own Tasks' filter={this.filterMessages} placeholder='Search by Title, Date' />
        </Row>
        <Row style={{margin: '0px 10px'}}>
          <BasicTable searchQuery={this.state.searchQuery} />
        </Row>
      </Container>
    );
  }
}

export default translate("common")(OwnTask);
