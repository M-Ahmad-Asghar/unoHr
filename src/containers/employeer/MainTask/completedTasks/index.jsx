import React, { Component } from "react";
import { connect } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import { translate } from "react-i18next";
import PropTypes from "prop-types";
import BasicTable from "./components/BasicTable";
import SearchBar from "../SearchBar";
// import { getOwnTask } from "../../../redux/actions/EmployeeTaskActions";
// import { getEmployees } from "../../../redux/actions/employerActions";
// import { getTask } from "../../../redux/actions/TasksActions";


class CompletedTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: "true",
      DueDate: "",
      loader: true,
      dataLength: true,
      data: [],
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
          <SearchBar title="List of Completed Tasks" filter= {this.filterMessages} placeholder="Search by Name, Title, Date" />
        </Row>
        <Row>
          <BasicTable searchQuery ={ this.state.searchQuery } />
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  items: state.TaskReducer.CompletedTask,
  user: state.userReducer.user,
  loader: state.TaskReducer.loader
});

export default translate("common")(
  connect(
    mapStateToProps,
null  )(CompletedTask)
);
