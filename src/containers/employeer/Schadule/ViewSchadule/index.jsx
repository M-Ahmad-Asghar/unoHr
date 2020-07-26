import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import { translate } from "react-i18next";
import PropTypes from "prop-types";
import AllEmployees from "./components/SelectEmployee";
import ViewSchedule from './components/ViewSchadule';
import DropDown from "./components/DropDown";
import { connect } from 'react-redux';
import { getAssignedShiftsByEmployee } from '../../../../redux/actions/shiftAction';


class BasicTables extends Component {

  state = {
    searchQuery: '',
    empSelected: 'all'
  }

  onValueSlected = (event) => {
    this.setState({
      empSelected: event.target.value
    })
    if(event.target.value != 'all'){
      this.props.getAssignedShiftsByEmployee(event.target.value);
    }
  }

  render() {
    let { empSelected } = this.state;

    return(
      <Container>
        <Row>
          <DropDown employees={this.props.employees} onValueSlected={this.onValueSlected} />
        </Row>
        <Row>
          { empSelected === 'all' ?
            <AllEmployees />  
            :
            <ViewSchedule id={empSelected} />
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
  employees: state.employerReducer.employees,
  user: state.userReducer.user,
  loader: state.shaduleReducer.loader
});

export default connect(mapStateToProps,{getAssignedShiftsByEmployee})(translate("common")(BasicTables));
