import { db } from "../../boot/firebase";
import { toast } from "react-toastify";
import axios from 'axios';
import { restful_url } from '../../EndPoint';
export const CREATE_PERSONAL_USER = "CREATE_PERSONAL_USER";
export const CREATE_PERSONAL_USER_ERR = "CREATE_PERSONAL_USER_ERR";
export const GET_PERSONAL_USER_URL = "GET_PERSONAL_USER_URL";
export const GET_PERSONAL_USER_URL_ERR = "GET_PERSONAL_USER_URL_ERR";
export const GET_FUNDING_SOURCE_TOKEN = "GET_FUNDING_SOURCE_TOKEN";
export const GET_FUNDING_SOURCE_TOKEN_ERR = "GET_FUNDING_SOURCE_TOKEN_ERR";
export const GET_CUSTOMER_DETAILS = "GET_CUSTOMER_DETAILS";
export const GET_CUSTOMER_DETAILS_ERR = "GET_CUSTOMER_DETAILS_ERR";
export const SAVE_FUNDING_SOURCE = "SAVE_FUNDING_SOURCE";
export const SAVE_FUNDING_SOURCE_ERR = "SAVE_FUNDING_SOURCE_ERR";
export const GET_RECIEVE_ONLY_USER_URL = "GET_RECIEVE_ONLY_USER_URL";
export const GET_RECIEVE_ONLY_USER_URL_ERR = "GET_RECIEVE_ONLY_USER_URL_ERR";
export const SAVE_RECIEVE_ONLY_FUNDING_SOURCE = "SAVE_RECIEVE_ONLY_FUNDING_SOURCE";
export const SAVE_RECIEVE_ONLY_FUNDING_SOURCE_ERR = "SAVE_RECIEVE_ONLY_FUNDING_SOURCE_ERR";
export const GET_TRANSACTIONS_DETAILS = "GET_TRANSACTIONS_DETAILS";
export const GET_TRANSACTIONS_DETAILS_ERR = "GET_TRANSACTIONS_DETAILS_ERR";
export const CHANGE_DIRECT_REPOSIT = "CHANGE_DIRECT_REPOSIT";
export const CHANGE_DIRECT_REPOSIT_ERR = "CHANGE_DIRECT_REPOSIT_ERR";
export const ADD_FUNDING_SOURCE_FORM = "ADD_FUNDING_SOURCE_FORM";
export const ADD_FUNDING_SOURCE_FORM_ERR = "ADD_FUNDING_SOURCE_FORM_ERR";

//Create Personal User
const createPersonalUserSuc = (data) => {
    console.log("createPersonalUser from server========>", data)
    if(data !== 'successfully created'){
        toast.error('Error: ' + data.body.message);
        return {
            type: CREATE_PERSONAL_USER_ERR
        }
    } else {
        toast.success('Account created successfully!')
        return {
            type: CREATE_PERSONAL_USER,
            data
        }
    }
}

const createPersonalUserFail = (err) => {
    console.log("ERROR createPersonalUser===>", err)
    toast.error('Error creating account. Try again!')
    return {
        type: CREATE_PERSONAL_USER_ERR
    }
} 

export function createPersonalUser(data) {
    console.log(data)
  return dispatch => {
    axios.post(restful_url + '/dwolla_Verified_Personal_Customer', data)
        .then(res => dispatch(createPersonalUserSuc(res.data)))
        .catch(err => dispatch(createPersonalUserFail(err)))
  }
}

//Get funding source token
const getFundingSourceTokenSuc = (data) => {
    console.log("getFundingSourceToken from server========>", data)
    return {
        type: GET_FUNDING_SOURCE_TOKEN,
        data: data.token
    }
}

const getFundingSourceTokenFail = (err) => {
    console.log("ERROR getFundingSourceToken===>", err)
    return {
        type: GET_FUNDING_SOURCE_TOKEN_ERR
    }
} 

export function getFundingSourceToken(data) {
    console.log(data)
  return dispatch => {
    axios.post(restful_url + '/dwolla_fundingsource_token', data)
        .then(res => dispatch(getFundingSourceTokenSuc(res.data)))
        .catch(err => dispatch(getFundingSourceTokenFail(err)))
  }
}

//Get dwolla's customer details
const getCustomerDetailsSuc = (data) => {
    console.log("getCustomerDetails from server========>", data)
    return {
        type: GET_CUSTOMER_DETAILS,
        data: data.body
    }
}

const getCustomerDetailsFail = (err) => {
    console.log("ERROR getCustomerDetails===>", err)
    return {
        type: GET_CUSTOMER_DETAILS_ERR
    }
} 

export function getCustomerDetails(data) {
    console.log(data)
  return dispatch => {
    axios.post(restful_url + '/dwolla_Customer_Details', data)
        .then(res => dispatch(getCustomerDetailsSuc(res.data)))
        .catch(err => dispatch(getCustomerDetailsFail(err)))
  }
}

//Get personal user's account URL
export const getPersonalUserURL = (id) => {
    return dispatch => {
      let docRef = db.collection("employers").doc(id);
          docRef.get().then(function(doc) {
            if (doc.exists) {
                let data = doc.data();
                console.log("getPersonalUserURL from server========>", data)
                dispatch({
                    type: GET_PERSONAL_USER_URL,
                    data
                  });
            } else {
                console.log("No data found getPersonalUserURL===>");
                dispatch({
                    type: GET_PERSONAL_USER_URL_ERR
                });
            }
        }).catch(function(error) {
            console.log("ERROR getPersonalUserURL===>", error);
            dispatch({
                type: GET_PERSONAL_USER_URL_ERR
            });
        });
    }
};

//Save funding source
export const saveFundingSource = (data) => {
    console.log("DATA at saveFundingSource", data);
    return dispatch => {
        let url = data.url; 
        let docRef = db.collection("employers").doc(data.id);
          docRef.set({fundingSource: url}, { merge: true })
          .then(function() {
                console.log("saveFundingSource from server========>", url)
                toast.success('Funding source saved successfully!')
                dispatch({
                    type: SAVE_FUNDING_SOURCE,
                    data
                  });
        }).catch(function(error) {
            toast.error('Error saving funding source. Try again!')
            console.log("ERROR saveFundingSource===>", error);
            dispatch({
                type: SAVE_FUNDING_SOURCE_ERR
            });
        });
    }
};

//Get personal user's account URL
export const getRecieveOnlyUserURL = (id) => {
    return dispatch => {
      let docRef = db.collection("employees").doc(id);
          docRef.get().then(function(doc) {
            if (doc.exists) {
                let data = doc.data();
                console.log("getRecieveOnlyUserURL from server========>", data)
                dispatch({
                    type: GET_RECIEVE_ONLY_USER_URL,
                    data
                  });
            } else {
                console.log("No data found getRecieveOnlyUserURL===>");
                dispatch({
                    type: GET_RECIEVE_ONLY_USER_URL_ERR
                });
            }
        }).catch(function(error) {
            console.log("ERROR getRecieveOnlyUserURL===>", error);
            dispatch({
                type: GET_RECIEVE_ONLY_USER_URL_ERR
            });
        });
    }
};

//Save funding source
export const saveRecieveOnlyFundingSource = (data) => {
    console.log("DATA at saveRecieveOnlyFundingSource", data);
    return dispatch => {
        let url = data.url; 
        let docRef = db.collection("employees").doc(data.id);
          docRef.set({fundingSource: url}, { merge: true })
          .then(function() {
                console.log("saveRecieveOnlyFundingSource from server========>", url)
                toast.success('Funding source saved successfully!')
                dispatch({
                    type: SAVE_RECIEVE_ONLY_FUNDING_SOURCE,
                    data
                  });
        }).catch(function(error) {
            toast.error('Error saving funding source. Try again!')
            console.log("ERROR saveRecieveOnlyFundingSource===>", error);
            dispatch({
                type: SAVE_RECIEVE_ONLY_FUNDING_SOURCE_ERR
            });
        });
    }
};

//Get dwolla's customer details
const getCustomerTransactionsSuc = (data) => {
    console.log("getCustomerTransactions from server========>", data)
    return {
        type: GET_TRANSACTIONS_DETAILS,
        data: data.body
    }
}

const getCustomerTransactionsFail = (err) => {
    console.log("ERROR getCustomerTransactions===>", err)
    return {
        type: GET_TRANSACTIONS_DETAILS_ERR
    }
} 

export function getCustomerTransactions(data) {
    console.log(data)
  return dispatch => {
    axios.post(restful_url + '/dwolla_Customer_Transactions', data)
        .then(res => dispatch(getCustomerTransactionsSuc(res.data)))
        .catch(err => dispatch(getCustomerTransactionsFail(err)))
  }
}

//Change Employer's payment method
export const changeDirectDeposit = (data) => {
    console.log("DATA at changeDirectDeposit", data);
    return dispatch => {
        let is = false;
        let paymentMethod = data.paymentMethod;
        let emloyeruid = data.emloyeruid;

        if(paymentMethod === 'direct deposit') 
            is = true;
        else if(paymentMethod === 'manual')
            is = false;    
         
        let docRef = db.collection("employers").doc(data.id);
          docRef.set({isDirectDeposit: is}, { merge: true })
          .then(function() {
            let data = {
                paymentMethod,
                emloyeruid
            }
            axios
                .post(restful_url + '/employeesChangePaymentMethod', data)
                .then(function(res) {
                    if(res.data === 'successfully updated'){
                        console.log('Transaction success!', res)
                        toast.success('Payment method changed successfully!')
                        dispatch({
                            type: CHANGE_DIRECT_REPOSIT
                        });
                    } else {
                        toast.error('Error changing payment method. Try again!')
                        console.log('Transaction fail!', res)
                        dispatch({
                            type: CHANGE_DIRECT_REPOSIT_ERR
                        });
                    }
                })
                .catch(function(error) {
                    toast.error('Error changing payment method. Try again!')
                    console.log("ERROR changeDirectDeposit===>", error);
                    dispatch({
                        type: CHANGE_DIRECT_REPOSIT_ERR
                    });
                });
        }).catch(function(error) {
            toast.error('Error changing payment method. Try again!')
            console.log("ERROR changeDirectDeposit===>", error);
            dispatch({
                type: CHANGE_DIRECT_REPOSIT_ERR
            });
        });
    }
};

//Add 3-days funding source
export const addFundingSourceForm = (data) => {
    console.log("Data at addFundingSourceForm:", data);
    return dispatch => {
        axios
            .post(restful_url + '/dwolla_Customer_Add_FundingSource', data)
            .then(function(res) {
                console.log('Transaction success!', res)
                if(res.data === 'successfully add'){
                    dispatch({
                        type: ADD_FUNDING_SOURCE_FORM
                    });
                } else if(res.data.body.message){
                    toast.error(res.data.body._embedded.errors[0].message)
                    dispatch({
                        type: ADD_FUNDING_SOURCE_FORM_ERR
                    });
                }
            })
            .catch(function(error) {
                console.log("ERROR addFundingSourceForm===>", error);
                dispatch({
                    type: ADD_FUNDING_SOURCE_FORM_ERR
                });
            });
    }
}