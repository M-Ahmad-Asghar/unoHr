import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import { translate } from "react-i18next";
import { toast } from 'react-toastify';
import PropTypes from "prop-types";
import BasicTable from "./components/BasicTable";
import SearchBar from "../../employeer/MainTask/SearchBar";
import { connect } from 'react-redux';
import { getRecieveOnlyUserURL, getFundingSourceToken, 
  getCustomerDetails, saveRecieveOnlyFundingSource, addFundingSourceForm } from '../../../redux/actions/directDepositAction';
  import CircularProgress from "@material-ui/core/CircularProgress";
  import Button from '@material-ui/core/Button';
  import Dialog from '@material-ui/core/Dialog';
  import DialogActions from '@material-ui/core/DialogActions';
  import DialogContent from '@material-ui/core/DialogContent';
  import DialogContentText from '@material-ui/core/DialogContentText';
  import DialogTitle from '@material-ui/core/DialogTitle';
  import TextField from '@material-ui/core/TextField';

class BasicTables extends Component {
  state = {
    url: '',
    loader: true,
    fsToken: '',
    dwollaDetails: {},
    btnClick: false,
    detailLoader: true,

    open: false,
    formOpen: false,
    routingNumber: '',
    accountNumber: '',
    accountType: '',
    nickName: ''
  }

  componentWillMount() {
    this.props.getRecieveOnlyUserURL(this.props.user.docid);
  }

  componentWillReceiveProps(nextProps) {
      if(nextProps.getRecieveOnlyUserURLStatus === 'done') {
          this.setState({
              url: nextProps.recieveOnlyUser,
              loader: false
          })
          this.props.getCustomerDetails({ dwolla_Customer: nextProps.recieveOnlyUser.dwolla_Customer});
          this.props.getFundingSourceToken({dwolla_Customer: nextProps.recieveOnlyUser.dwolla_Customer})
      }

      if(nextProps.getRecieveOnlyUserURLStatus === 'error') {
          this.setState({
              loader: false
          })
      }

      if(nextProps.getFundingSourceTokenStatus === 'done') {
          this.setState({
              fsToken: nextProps.fundingSourceToken
          })
      }

      if(nextProps.getCustomerDetailsStatus === 'done') {
          this.setState({
              dwollaDetails: nextProps.dwollaDetails,
              detailLoader: false
          })
      }

      if(nextProps.getCustomerDetailsStatus === 'error') {
          this.setState({
              detailLoader: false
          })
      }

      if(nextProps.addFundingSourceFormStatus === 'done') {
          toast.success('Funding source added successfully!')
          this.setState({
              loader: false
          })
      }

      if(nextProps.addFundingSourceFormStatus === 'error') {
          // toast.error('Error sending request. Try again!')
          this.setState({
              loader: false
          })
      }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  isEmpty = (obj) => {
      for(var key in obj) {
          if(obj.hasOwnProperty(key))
              return false;
      }
      return true;
  }
    
  onFormSubmitHandler = () => {
      let { routingNumber, accountNumber, accountType, nickName } = this.state;
      if( routingNumber === '' || accountNumber === '' || accountType === '' || nickName === '' ) {
          toast.error('All fields are required!')
          console.log(routingNumber, accountNumber, accountType, nickName)
      } else {
          let bankAccountType = accountType;
          let nickname = nickName;
          let dwolla_Customer = '';
          if(this.props.user.dwolla_Customer) {
            dwolla_Customer = this.props.user.dwolla_Customer;

            let data = {
              routingNumber,
              accountNumber,
              bankAccountType,
              nickname,
              dwolla_Customer,
              emp: 'employers',
              docid: this.props.user.docid
            }

            this.setState({ formOpen: false, loader: true });
            this.props.addFundingSourceForm(data);
          } else {
            toast.error("First create dwolla's account!")
          }
      }
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  handleFormClose = () => {
    this.setState({ formOpen: false });
  };

  selectFundingSource = () => {
      this.setState(prevState => ({
          open: !prevState.open
        })
      )
  }

  addFundingSourceForm = () => {
      this.setState({ open: false, formOpen: true })
  }
  
  addFundingSourceIAV = () => { 
    if(this.props.user.dwolla_Customer){
      let _this = this;
      let token = this.state.fsToken;

      if(token !== '') {
          this.setState({btnClick: true, open: false});
          setTimeout(() => {
              this.setState({btnClick: false});
          }, 5000);

          window.dwolla.configure('sandbox');
          window.dwolla.iav.start(token, {
              container: 'iavContainer',
              stylesheets: [
                  'https://fonts.googleapis.com/css?family=Lato&subset=latin,latin-ext'
              ],
              microDeposits: false,
              fallbackToMicroDeposits: false
          }, function (err, res) {
              if(err) {
                  toast.error('Error: ' + err.message);
              } 

              if(res) {
                  console.log("Response:", res);
                  let fundingSource = '';
                  fundingSource = res._links['funding-source'].href;
                  
                  if(fundingSource !== '') {
                      let id = _this.props.user.docid;
                      console.log("Funding Source", fundingSource);

                      _this.props.saveRecieveOnlyFundingSource({ id, url: fundingSource })
                  } else {
                      toast.error('No funding source found!')
                  }
              }

              console.log('Error: ' + JSON.stringify(err) + ' -- Response: ' + JSON.stringify(res));
          });
      } else {
          toast.error('Token not found. Try later!');
          this.props.getFundingSourceToken({dwolla_Customer: this.props.recieveOnlyUser.dwolla_Customer})
      }
    } else {
      toast.error("First create dwolla's account");
    }
  }
  
  render() {
    let { loader, btnClick, dwollaDetails, detailLoader } = this.state;

    return(
      <Container>
        <Row>
          <SearchBar title='Direct Deposit Account' button="true" callBack={this.selectFundingSource} placeholder="Add Bank"/>
        </Row>

        <Row>

          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            className='dialog'
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >

            <DialogTitle className='dialogHeader' id='alert-dialog-title'>
              <span style={{ color: 'white' }}>CHOOSE HOW YOU'D LIKE TO VERIFY YOUR ACCOUNT</span>
            </DialogTitle>
            <div className='dialogContent'>
              <div className='options'>
                <h3>Instant Account Verification</h3>
                <p>Require your bank username and password</p>
              </div>
              <div className='options'>
                <h3>Deposit Verification</h3>
                <p>Require your account and routing number</p>
                <p>Take 1-3 bussines days for small deposits</p>
                <p>to appear in your account.</p>
              </div>
            </div>
            <div className='dialogContent'>
              <div className='options'>
                <Button onClick={this.addFundingSourceIAV} color="primary">
                  USE INSTANT VERIFICATION
                            </Button>
              </div>
              <div className='options'>
                <Button onClick={this.addFundingSourceForm} color="primary" autoFocus>
                  USE DEPOSIT VERIFICATION
                            </Button>
              </div>
            </div>
          </Dialog>

          <Dialog
            open={this.state.formOpen}
            onClose={this.handleFormClose}
            className='dialog'
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >

            <DialogTitle className='dialogHeader' id='alert-dialog-title'>Enter following details to add funding source to dwolla</DialogTitle>
            <div className='formMain'>
              <div className='formFields'>
                <TextField
                  id="outlined-full-width"
                  label="Routing Number"
                  style={{ margin: 8 }}
                  placeholder="Enter Routing Number"
                  fullWidth
                  name='routingNumber'
                  onChange={this.handleChange('routingNumber')}
                  margin="normal"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  id="outlined-full-width"
                  label="Account Number"
                  style={{ margin: 8 }}
                  placeholder="Enter Account Number"
                  fullWidth
                  name='accountNumber'
                  onChange={this.handleChange('accountNumber')}
                  margin="normal"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  id="outlined-select-currency-native"
                  select
                  label="Select Account Type"
                  value={this.state.accountType}
                  onChange={this.handleChange('accountType')}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                >
                  <option key='1' value='checking'>
                    Checking
                                </option>
                  <option key='2' value='savings'>
                    Savings
                                </option>
                  <option key='3' value='general-ledger'>
                    General Ledger
                                </option>
                  <option key='4' value='loan'>
                    Loan
                                </option>
                </TextField>
                <TextField
                  id="outlined-full-width"
                  label="Nick Name"
                  style={{ margin: 8 }}
                  placeholder="Enter Any Nick Name"
                  onChange={this.handleChange('nickName')}
                  fullWidth
                  name='nickName'
                  margin="normal"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
            </div>
            <div className='dialogContent btnsHolder'>
              <div className='options'>
                <Button onClick={this.handleFormClose} color="primary">
                  Cancel
                            </Button>
              </div>
              <div className='options'>
                <Button onClick={this.onFormSubmitHandler} color="primary" autoFocus>
                  Add
                            </Button>
              </div>
            </div>
          </Dialog>

        </Row>

        <Row>
          <div id="iavContainer" style={{width: '100%', marginLeft: 'auto', marginRight: 'auto'}}>
            {btnClick &&
              <div style={{width: '100%', marginLeft: 'auto', marginRight: 'auto', marginTop: "15px", textAlign: "center" }}>
                <CircularProgress />
              </div>
            }
          </div>
        </Row>
        
        <Row>
          {
            loader ?
              <div  style={{width: '100%', marginLeft: 'auto', marginRight: 'auto', marginTop: "35px", textAlign: "center" }}>
                <CircularProgress />
              </div>
              :
                detailLoader ?
                  <div style={{width: '100%', marginLeft: 'auto', marginRight: 'auto'}}>
                    <h5 style={{ textAlign: 'center', margin: 20 }}>Fetching user details</h5>
                    <div style={{ margin: "15px", textAlign: "center" }}>
                      <CircularProgress />
                    </div>
                  </div>
                :
                  <div style={{width: '100%', marginLeft: 'auto', marginRight: 'auto'}}>
                    <BasicTable data={dwollaDetails} />
                  </div>
          }
        </Row>
      </Container>
    );
  }
}

BasicTables.propTypes = {
  t: PropTypes.func.isRequired
};

const mapStateToProps = (store) => {
  return {
      user: store.employeeUserReducer.currentEmp,
      recieveOnlyUser: store.directDepositReducer.recieveOnlyUser,
      getRecieveOnlyUserURLStatus: store.directDepositReducer.getRecieveOnlyUserURLStatus,
      fundingSourceToken: store.directDepositReducer.fundingSourceToken,
      getFundingSourceTokenStatus: store.directDepositReducer.getFundingSourceTokenStatus,
      dwollaDetails: store.directDepositReducer.dwollaDetails,
      getCustomerDetailsStatus: store.directDepositReducer.getCustomerDetailsStatus,
      addFundingSourceFormStatus: store.directDepositReducer.addFundingSourceFormStatus
  }
}

export default connect(mapStateToProps, 
  {
    getRecieveOnlyUserURL, getFundingSourceToken, getCustomerDetails, saveRecieveOnlyFundingSource, addFundingSourceForm
  }
  )(translate("common")(BasicTables));
