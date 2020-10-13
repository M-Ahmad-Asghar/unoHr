import React, { Component } from "react";
import { connect } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import { translate } from "react-i18next";
import PropTypes from "prop-types";
import BasicTable from "./components/BasicTable";
// import { getOwnTask } from "../../../redux/actions/EmployeeTaskActions";
// import { getEmployees } from "../../../redux/actions/employerActions";
// import { getTask } from "../../../redux/actions/TasksActions";

// import { getCompletedTask } from "../../../../redux/actions/TasksActions";
import {
  getEmployeStatus,
  getWeekStatus,
} from "../../../../redux/actions/attendanceAction";
import moment from "moment";
import { getTask } from "../../../../redux/actions/EmployeeTaskActions";
import SearchBar from "../../../employeer/MainTask/SearchBar";

class CompletedTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: "true",
      DueDate: "",
      loader: true,
      dataLength: true,
      data: [],
      searchQuery: "",
      filterDate: new Date(),
    };
  }

  componentDidMount() {
    // this.props.getEmployeStatus(this.props.user.employeeid, this.props.user.timeMode);
    // this.props.getWeekStatus(this.props.user.employeeid);
    this.props.getTask(this.props.user.employeruid, this.props.user.employeeid);
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.loader === "false") {
      this.setState({
        loader: false,
        data: nextProps.items,
      });
    }
  };

  filterMessages = (query) => {
    this.setState({
      searchQuery: query,
    });
  };
  handleDate = (date) => {
    this.setState({
      filterDate: date,
      searchQuery: moment(date).format("MMM/DD/YYYY"),
    });
  };
  render() {
    const { data ,filterDate} = this.state;
    const { t } = this.props;
    return (
      <Container>
        <Row>
          <SearchBar
            title="List of Active Tasks"
            filter={this.filterMessages}
            placeholder="Search by Title, Date"
            date={filterDate}
            filterDate={this.handleDate}
            calendar={true}
          />
        </Row>
        <Row>
          <BasicTable searchQuery={this.state.searchQuery} />
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  employee: state.employeeUserReducer.currentEmp,
  currentEmp: state.employeeUserReducer.currentEmp,
  items: state.employeeTaskReducer.AllTask,
  user: state.employeeUserReducer.currentEmp,
  loader: state.employeeTaskReducer.loader,
});

export default translate("common")(
  connect(mapStateToProps, {
    getTask,
    getEmployeStatus,
    getWeekStatus,
  })(CompletedTask)
);
