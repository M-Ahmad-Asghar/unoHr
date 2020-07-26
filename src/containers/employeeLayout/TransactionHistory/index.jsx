import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import { translate } from "react-i18next";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import BasicTable from "./components/BasicTable";
import SearchBar from "../../employeer/MainTask/SearchBar";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from 'react-redux';
import { getCustomerTransactions, getRecieveOnlyUserURL } from '../../../redux/actions/directDepositAction';

class BasicTables extends Component {
  
  state = {
    searchQuery: '',
    loader: true,
    url: '',
    transactions: []
  }

  componentWillMount() {
    this.props.getRecieveOnlyUserURL(this.props.user.docid);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.getRecieveOnlyUserURLStatus === 'done') {
      if(nextProps.recieveOnlyUserURL){
        let url = nextProps.recieveOnlyUserURL;
        this.props.getCustomerTransactions({ dwolla_Customer: url });
      } else {
        toast.error("No dwolla's account found!")
        this.props.getRecieveOnlyUserURL(this.props.user.docid);
      }
    }

    if(nextProps.getRecieveOnlyUserURLStatus === 'error') {
      toast.error('Error occoured, refresh page!');
      this.props.getRecieveOnlyUserURL(this.props.user.docid);
    }

    if(nextProps.getTransactionsDetailsStatus === 'done') {
      if(nextProps.transactionsDetails){
        this.setState({
          transactions: nextProps.transactionsDetails._embedded.transfers,
          loader: false
        })
      } else {
        toast.error('No transaction history found!')
      }
    }
  }

  filterMessages=(query)=>{
    this.setState({
      searchQuery : query,
    })
  }
  
  render() {
    let { loader, transactions } = this.state;

    return(
      <Container>
        <Row>
          <SearchBar title='All Transactions' filter={this.filterMessages} placeholder='Search by Date' />
        </Row>
        <Row>
          {
            loader ? 
              <div style={{width: '100%', marginLeft: 'auto', marginRight: 'auto', marginTop: "35px", textAlign: "center" }}>
                <CircularProgress />
              </div>
            :
              <BasicTable searchQuery={this.state.searchQuery} transactions={transactions} />
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
  user: state.employeeUserReducer.currentEmp,
  paystubs: state.payStubsReducer.paystubs,
  recieveOnlyUserURL: state.directDepositReducer.recieveOnlyUserURL,
  getRecieveOnlyUserURLStatus: state.directDepositReducer.getRecieveOnlyUserURLStatus,
  transactionsDetails: state.directDepositReducer.transactionsDetails,
  getTransactionsDetailsStatus: state.directDepositReducer.getTransactionsDetailsStatus
});

export default connect(
  mapStateToProps,
  {
    getCustomerTransactions, getRecieveOnlyUserURL
  }
)(translate("common")(BasicTables));
