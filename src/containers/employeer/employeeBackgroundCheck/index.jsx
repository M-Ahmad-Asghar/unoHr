import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import BasicTable from './components/BasicTable';
import SearchBar from '../MainTask/SearchBar';

function BasicTables ()  {
  const [ searchQuery, setsearchQuery] = useState('')



  const filterMessages=(query)=>{
    setsearchQuery(query)

  }

  
    return(
      <Container>
        <Row>
          <SearchBar title='View Of All Employees' filter={filterMessages} placeholder='Search by Id, Email, Cell, Status' />
        </Row>
        <Row>
          <BasicTable searchQuery={searchQuery} />
        </Row>
      </Container>
    );
  
}

BasicTables.propTypes = {
  t: PropTypes.func.isRequired,
};



export default translate('common')(BasicTables);
