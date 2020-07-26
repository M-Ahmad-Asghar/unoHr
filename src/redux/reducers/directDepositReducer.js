import {
    CREATE_PERSONAL_USER,
    CREATE_PERSONAL_USER_ERR,
    GET_PERSONAL_USER_URL,
    GET_PERSONAL_USER_URL_ERR,
    GET_FUNDING_SOURCE_TOKEN,
    GET_FUNDING_SOURCE_TOKEN_ERR,
    GET_CUSTOMER_DETAILS,
    GET_CUSTOMER_DETAILS_ERR,
    SAVE_FUNDING_SOURCE,
    SAVE_FUNDING_SOURCE_ERR,
    GET_RECIEVE_ONLY_USER_URL,
    GET_RECIEVE_ONLY_USER_URL_ERR,
    SAVE_RECIEVE_ONLY_FUNDING_SOURCE,
    SAVE_RECIEVE_ONLY_FUNDING_SOURCE_ERR,
    GET_TRANSACTIONS_DETAILS,
    GET_TRANSACTIONS_DETAILS_ERR,
    CHANGE_DIRECT_REPOSIT,
    CHANGE_DIRECT_REPOSIT_ERR,
    ADD_FUNDING_SOURCE_FORM,
    ADD_FUNDING_SOURCE_FORM_ERR
  } from "../actions/directDepositAction";
  
  var initialState = {
      loader: new Date(),
      personalUser: {},
      personalUserURL: '',
      dwollaDetails: {},
      fundingSourceToken: '',
      fundingSource: '',
      recieveOnlyUser: {},
      recieveOnlyUserURL: '',
      transactionsDetails: {},
      createPersonalUserStatus: 'not done',
      getPersonalUserURLStatus: 'not done',
      getFundingSourceTokenStatus: 'not done',
      getCustomerDetailsStatus: 'not done',
      saveFundingSourceStatus: 'not done',
      getRecieveOnlyUserURLStatus: 'not done',
      saveRecieveOnlyFundingSourceStatus: 'not done',
      getTransactionsDetailsStatus: 'not done',
      changeDirectDepositStatus: 'not done',
      addFundingSourceFormStatus: 'not done'
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case CREATE_PERSONAL_USER: {
        return {
          ...state,
          personalUser: action.data,
          createPersonalUserStatus: 'done',
          getPersonalUserURLStatus: 'not done',
          saveFundingSourceStatus: 'not done',
          getRecieveOnlyUserURLStatus: 'not done',
          saveRecieveOnlyFundingSourceStatus: 'not done',
          getTransactionsDetailsStatus: 'not done',
          changeDirectDepositStatus: 'not done',
          addFundingSourceFormStatus: 'not done'
        };
      }

      case CREATE_PERSONAL_USER_ERR: {
        return {
          ...state,
          createPersonalUserStatus: 'error',
          getPersonalUserURLStatus: 'not done',
          saveFundingSourceStatus: 'not done',
          getRecieveOnlyUserURLStatus: 'not done',
          saveRecieveOnlyFundingSourceStatus: 'not done',
          getTransactionsDetailsStatus: 'not done',
          changeDirectDepositStatus: 'not done',
          addFundingSourceFormStatus: 'not done'
        };
      }
      
      case GET_PERSONAL_USER_URL: {
        return {
          ...state,
          personalUser: action.data,
          personalUserURL: action.data.dwolla_Customer,
          getPersonalUserURLStatus: 'done',
          createPersonalUserStatus: 'not done',
          saveFundingSourceStatus: 'not done',
          getRecieveOnlyUserURLStatus: 'not done',
          saveRecieveOnlyFundingSourceStatus: 'not done',
          getTransactionsDetailsStatus: 'not done',
          changeDirectDepositStatus: 'not done',
          addFundingSourceFormStatus: 'not done'
        };
      }

      case GET_PERSONAL_USER_URL_ERR: {
        return {
          ...state,
          getPersonalUserURLStatus: 'error',
          createPersonalUserStatus: 'not done',
          saveFundingSourceStatus: 'not done',
          getRecieveOnlyUserURLStatus: 'not done',
          saveRecieveOnlyFundingSourceStatus: 'not done',
          getTransactionsDetailsStatus: 'not done',
          changeDirectDepositStatus: 'not done',
          addFundingSourceFormStatus: 'not done'
        };
      }
      
      case GET_FUNDING_SOURCE_TOKEN: {
        return {
          ...state,
          fundingSourceToken: action.data,
          getFundingSourceTokenStatus: 'done',
          getPersonalUserURLStatus: 'not done',
          createPersonalUserStatus: 'not done',
          saveFundingSourceStatus: 'not done',
          getRecieveOnlyUserURLStatus: 'not done',
          saveRecieveOnlyFundingSourceStatus: 'not done',
          getTransactionsDetailsStatus: 'not done',
          changeDirectDepositStatus: 'not done',
          addFundingSourceFormStatus: 'not done'
        };
      }

      case GET_FUNDING_SOURCE_TOKEN_ERR: {
        return {
          ...state,
          getFundingSourceTokenStatus: 'error',
          getPersonalUserURLStatus: 'not done',
          createPersonalUserStatus: 'not done',
          saveFundingSourceStatus: 'not done',
          getRecieveOnlyUserURLStatus: 'not done',
          saveRecieveOnlyFundingSourceStatus: 'not done',
          getTransactionsDetailsStatus: 'not done',
          changeDirectDepositStatus: 'not done',
          addFundingSourceFormStatus: 'not done'
        };
      }
      
      case GET_CUSTOMER_DETAILS: {
        return {
          ...state,
          dwollaDetails: action.data,
          getCustomerDetailsStatus: 'done',
          getFundingSourceTokenStatus: 'not done',
          getPersonalUserURLStatus: 'not done',
          createPersonalUserStatus: 'not done',
          saveFundingSourceStatus: 'not done',
          getRecieveOnlyUserURLStatus: 'not done',
          saveRecieveOnlyFundingSourceStatus: 'not done',
          getTransactionsDetailsStatus: 'not done',
          changeDirectDepositStatus: 'not done',
          addFundingSourceFormStatus: 'not done'
        };
      }

      case GET_CUSTOMER_DETAILS_ERR: {
        return {
          ...state,
          getCustomerDetailsStatus: 'error',
          getFundingSourceTokenStatus: 'not done',
          getPersonalUserURLStatus: 'not done',
          createPersonalUserStatus: 'not done',
          saveFundingSourceStatus: 'not done',
          getRecieveOnlyUserURLStatus: 'not done',
          saveRecieveOnlyFundingSourceStatus: 'not done',
          getTransactionsDetailsStatus: 'not done',
          changeDirectDepositStatus: 'not done',
          addFundingSourceFormStatus: 'not done'
        };
      }
      
      case SAVE_FUNDING_SOURCE: {
        return {
          ...state,
          fundingSource: action.data,
          saveFundingSourceStatus: 'done',
          getCustomerDetailsStatus: 'not done',
          getFundingSourceTokenStatus: 'not done',
          getPersonalUserURLStatus: 'not done',
          createPersonalUserStatus: 'not done',
          getRecieveOnlyUserURLStatus: 'not done',
          saveRecieveOnlyFundingSourceStatus: 'not done',
          getTransactionsDetailsStatus: 'not done',
          changeDirectDepositStatus: 'not done',
          addFundingSourceFormStatus: 'not done'
        };
      }

      case SAVE_FUNDING_SOURCE_ERR: {
        return {
          ...state,
          saveFundingSourceStatus: 'error',
          getCustomerDetailsStatus: 'not done',
          getFundingSourceTokenStatus: 'not done',
          getPersonalUserURLStatus: 'not done',
          createPersonalUserStatus: 'not done',
          getRecieveOnlyUserURLStatus: 'not done',
          saveRecieveOnlyFundingSourceStatus: 'not done',
          getTransactionsDetailsStatus: 'not done',
          changeDirectDepositStatus: 'not done',
          addFundingSourceFormStatus: 'not done'
        };
      }
      
      case GET_RECIEVE_ONLY_USER_URL: {
        return {
          ...state,
          recieveOnlyUser: action.data,
          recieveOnlyUserURL: action.data.dwolla_Customer,
          getRecieveOnlyUserURLStatus: 'done',
          getPersonalUserURLStatus: 'not done',
          createPersonalUserStatus: 'not done',
          saveFundingSourceStatus: 'not done',
          saveRecieveOnlyFundingSourceStatus: 'not done',
          getTransactionsDetailsStatus: 'not done',
          changeDirectDepositStatus: 'not done',
          addFundingSourceFormStatus: 'not done'
        };
      }

      case GET_RECIEVE_ONLY_USER_URL_ERR: {
        return {
          ...state,
          getRecieveOnlyUserURLStatus: 'error',
          getPersonalUserURLStatus: 'not done',
          createPersonalUserStatus: 'not done',
          saveFundingSourceStatus: 'not done',
          saveRecieveOnlyFundingSourceStatus: 'not done',
          getTransactionsDetailsStatus: 'not done',
          changeDirectDepositStatus: 'not done',
          addFundingSourceFormStatus: 'not done'
        };
      }
      
      case SAVE_RECIEVE_ONLY_FUNDING_SOURCE: {
        return {
          ...state,
          fundingSource: action.data,
          saveRecieveOnlyFundingSourceStatus: 'done',
          saveFundingSourceStatus: 'not done',
          getCustomerDetailsStatus: 'not done',
          getFundingSourceTokenStatus: 'not done',
          getPersonalUserURLStatus: 'not done',
          createPersonalUserStatus: 'not done',
          getRecieveOnlyUserURLStatus: 'not done',
          getTransactionsDetailsStatus: 'not done',
          changeDirectDepositStatus: 'not done',
          addFundingSourceFormStatus: 'not done'
        };
      }

      case SAVE_RECIEVE_ONLY_FUNDING_SOURCE_ERR: {
        return {
          ...state,
          saveRecieveOnlyFundingSourceStatus: 'error',
          saveFundingSourceStatus: 'not done',
          getCustomerDetailsStatus: 'not done',
          getFundingSourceTokenStatus: 'not done',
          getPersonalUserURLStatus: 'not done',
          createPersonalUserStatus: 'not done',
          getRecieveOnlyUserURLStatus: 'not done',
          getTransactionsDetailsStatus: 'not done',
          changeDirectDepositStatus: 'not done',
          addFundingSourceFormStatus: 'not done'
        };
      }
      
      case GET_TRANSACTIONS_DETAILS: {
        return {
          ...state,
          transactionsDetails: action.data,
          getTransactionsDetailsStatus: 'done',
          getCustomerDetailsStatus: 'not done',
          getFundingSourceTokenStatus: 'not done',
          getPersonalUserURLStatus: 'not done',
          createPersonalUserStatus: 'not done',
          saveFundingSourceStatus: 'not done',
          getRecieveOnlyUserURLStatus: 'not done',
          saveRecieveOnlyFundingSourceStatus: 'not done',
          changeDirectDepositStatus: 'not done',
          addFundingSourceFormStatus: 'not done'
        };
      }

      case GET_TRANSACTIONS_DETAILS_ERR: {
        return {
          ...state,
          getTransactionsDetailsStatus: 'error',
          getCustomerDetailsStatus: 'not done',
          getFundingSourceTokenStatus: 'not done',
          getPersonalUserURLStatus: 'not done',
          createPersonalUserStatus: 'not done',
          saveFundingSourceStatus: 'not done',
          getRecieveOnlyUserURLStatus: 'not done',
          saveRecieveOnlyFundingSourceStatus: 'not done',
          changeDirectDepositStatus: 'not done',
          addFundingSourceFormStatus: 'not done'
        };
      }
      
      case CHANGE_DIRECT_REPOSIT: {
        return {
          ...state,
          loader: new Date(),
          changeDirectDepositStatus: 'done',
          getTransactionsDetailsStatus: 'not done',
          getCustomerDetailsStatus: 'not done',
          getFundingSourceTokenStatus: 'not done',
          getPersonalUserURLStatus: 'not done',
          createPersonalUserStatus: 'not done',
          saveFundingSourceStatus: 'not done',
          getRecieveOnlyUserURLStatus: 'not done',
          saveRecieveOnlyFundingSourceStatus: 'not done',
          addFundingSourceFormStatus: 'not done'
        };
      }

      case CHANGE_DIRECT_REPOSIT_ERR: {
        return {
          ...state,
          loader: new Date(),
          changeDirectDepositStatus: 'error',
          getTransactionsDetailsStatus: 'not done',
          getCustomerDetailsStatus: 'not done',
          getFundingSourceTokenStatus: 'not done',
          getPersonalUserURLStatus: 'not done',
          createPersonalUserStatus: 'not done',
          saveFundingSourceStatus: 'not done',
          getRecieveOnlyUserURLStatus: 'not done',
          saveRecieveOnlyFundingSourceStatus: 'not done',
          addFundingSourceFormStatus: 'not done'
        };
      }
      
      case ADD_FUNDING_SOURCE_FORM: {
        return {
          ...state,
          loader: new Date(),
          addFundingSourceFormStatus: 'done',
          changeDirectDepositStatus: 'not done',
          getTransactionsDetailsStatus: 'not done',
          getCustomerDetailsStatus: 'not done',
          getFundingSourceTokenStatus: 'not done',
          getPersonalUserURLStatus: 'not done',
          createPersonalUserStatus: 'not done',
          saveFundingSourceStatus: 'not done',
          getRecieveOnlyUserURLStatus: 'not done',
          saveRecieveOnlyFundingSourceStatus: 'not done'
        };
      }

      case ADD_FUNDING_SOURCE_FORM_ERR: {
        return {
          ...state,
          loader: new Date(),
          addFundingSourceFormStatus: 'error',
          changeDirectDepositStatus: 'not done',
          getTransactionsDetailsStatus: 'not done',
          getCustomerDetailsStatus: 'not done',
          getFundingSourceTokenStatus: 'not done',
          getPersonalUserURLStatus: 'not done',
          createPersonalUserStatus: 'not done',
          saveFundingSourceStatus: 'not done',
          getRecieveOnlyUserURLStatus: 'not done',
          saveRecieveOnlyFundingSourceStatus: 'not done'
        };
      }

      default:
        return state;
    }
  }
  