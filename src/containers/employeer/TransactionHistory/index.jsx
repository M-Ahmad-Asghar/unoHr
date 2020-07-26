import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import { translate } from "react-i18next";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import BasicTable from "./components/BasicTable";
import SearchBar from "../MainTask/SearchBar";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from 'react-redux';
import SelectEmployee from "./components/SelectEmployee";

class BasicTables extends Component {
  
  state = {
    searchQuery: '',
    loader: false,
    url: '',
    transactions: [],
    employee: {},
    isEmployee: true
  }

  changeView = (employee) => {
    this.setState(prevState => ({
        isEmployee: !prevState.isEmployee,
        employee
      })
    )
  }

  filterMessages=(query)=>{
    this.setState({
      searchQuery : query,
    })
  }
  
  render() {
    let { isEmployee } = this.state;

    return(
      <Container>
        <Row>
          { isEmployee ?
            <SearchBar title='Select Employee' filter={this.filterMessages} placeholder='Search by Name/Location/Email' />
          :
            <SearchBar title='All Transactions' filter={this.filterMessages} placeholder='Search by Date' />  
          }
          
        </Row>
        <Row>
          {
              isEmployee ?
                <SelectEmployee changeView={this.changeView} searchQuery={this.state.searchQuery} />
              :
                <BasicTable searchQuery={this.state.searchQuery} employee={this.state.employee} />
          }
        </Row>
      </Container>
    );
  }
}

BasicTables.propTypes = {
  t: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.userReducer.user
});

export default connect(
  mapStateToProps
)(translate("common")(BasicTables));