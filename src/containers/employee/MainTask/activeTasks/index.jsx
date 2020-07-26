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
import { getEmployeStatus, getWeekStatus } from "../../../../redux/actions/attendanceAction";
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
      searchQuery: ''
    };
  }

  componentDidMount() {
    // this.props.getEmployeStatus(this.props.user.employeeid, this.props.user.timeMode);
    // this.props.getWeekStatus(this.props.user.employeeid);
    this.props.getTask(this.props.user.employeruid, this.props.user.employeeid);
    
  }
  
  componentWillReceiveProps = nextProps => {
    console.log('ids: ', nextProps.user)
    console.log('kk ', nextProps);
    if (nextProps.loader === "false") {
      this.setState({
        loader: false,
        data: nextProps.items
      });
    }
  };

  filterMessages=(query)=>{
    this.setState({
      searchQuery : query,
    })
  }

  render() {
    const { data } = this.state;
    const {t } = this.props;
    
    console.log(data);
    return (
      <Container>
        <Row>
          <SearchBar title='List of Active Tasks' filter={this.filterMessages} placeholder='Search by Title, Date'/>
        </Row>
        <Row>
          <BasicTable searchQuery={this.state.searchQuery} />
        </Row>
      </Container>
    );
  }
}


const mapStateToProps = state => ({
  employee: state.employeeUserReducer.currentEmp,
  currentEmp: state.employeeUserReducer.currentEmp,
  items: state.employeeTaskReducer.AllTask,
  user: state.employeeUserReducer.currentEmp,
  loader: state.employeeTaskReducer.loader
});

export default translate("common")(
  connect(
    mapStateToProps,
  {
    getTask,
    getEmployeStatus,
    getWeekStatus,

  }
  )(CompletedTask)
);


