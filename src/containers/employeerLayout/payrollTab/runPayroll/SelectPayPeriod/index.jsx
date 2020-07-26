import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import BasicTable from './components/BasicTable';
import SearchBar from '../../../../employeer/MainTask/SearchBar';

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
    const { t } = this.props;
    return(
      <Container>
        <Row>
          <SearchBar title='Select Pay Period for the Employee' filter={this.filterMessages} placeholder='Search by Date, Time, Pay' />
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
