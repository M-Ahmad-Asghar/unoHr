import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import BasicTable from './components/BasicTable';
import SearchBar from '../MainTask/SearchBar';

class BasicTables extends Component {

  state = {
    searchQuery: ''
  }

  filterMessages=(query)=>{
    this.setState({
      searchQuery : query,
    })
  }

  render() {
    return(
      <Container>
        <Row>
          <SearchBar title='View Of All Employees' filter={this.filterMessages} placeholder='Search by Id, Email, Cell, Status' />
        </Row>
        <Row>
          <BasicTable searchQuery={this.state.searchQuery} />
        </Row>
      </Container>
    );
  }
}

BasicTables.propTypes = {
  t: PropTypes.func.isRequired,
};



export default translate('common')(BasicTables);
