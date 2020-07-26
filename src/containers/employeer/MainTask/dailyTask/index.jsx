import React, { Component } from "react";
import { connect } from "react-redux";
import { Col, Container, Row, Input, Card, Form, FormGroup } from "reactstrap";
import { translate } from "react-i18next";
import BasicTable from "./components/BasicTable";
import { getEmployees } from "../../../../redux/actions/employerActions";
import { getTask } from "../../../../redux/actions/TasksActions";
import AppBar from "./components/appBar";
import moment from "moment";
const backStyleSearchBox = {
  width: "97%",
  padding: "8px",
  margin: "0px 0px 20px 15px",
  backgroundColor: "#ffffff",
  borderRadius: "4px"
};

class EmployeeTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: "true",
      DueDate: "",
      loader: true,
      dataLength: true,
      data: [],
      searchQuery: ""
    };
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.loader === "false") {
      this.setState({
        loader: false,
        data: nextProps.items
      });
    }
  };

  onSearchChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  filterMessages = query => {
    this.setState({
      searchQuery: query
    });
  };

  render() {
    const { data } = this.state;
    const { t } = this.props;

    console.log(data);
    return (
      <Container>
        <Row>
          <AppBar title={moment().format("dddd")} />
        </Row>
        <Row>
          <BasicTable searchQuery={this.state.searchQuery} />
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  items: state.TaskReducer.AllTask,
  user: state.userReducer.user,
  loader: state.TaskReducer.loader
});

export default translate("common")(
  connect(
    mapStateToProps,
    {
      getTask,
      getEmployees
    }
  )(EmployeeTask)
);
