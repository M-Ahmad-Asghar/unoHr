import {
    EMPLOYEELOGINERR,
    EMPLOYEELOGIN,
    EMPLOYEELOGOUT,
    EMPLOYEEGETUSER,
    EMPLOYEEGETUSERERR,
    CHANGE_ADDRESS_EMP,
    CHANGE_ADDRESS_EMP_ERR,
    FORGETPASSWORD,
    FORGETPASSWORDERR
  } from "../actions/employeeUserActions";
  
  var initialState = {
    loader: "nill",
    hasErroredErr: false,
    userStatusEmp: false,
    LogoutEmp: "notdefine",
    currentEmp: {},
    getUserErr: "sfd",
    adressStatus: "not done",
    forget:'sdwe',
    forgetWait:'some'
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case EMPLOYEELOGIN: {
        console.log('at reducer: ', action.payload);
        return {
          ...state,
          userStatusEmp: true,
          LogoutEmp: "notdefine",
          currentEmp: action.payload,
          loader: "move"
        };
      }
  
      case EMPLOYEEGETUSER: {
        return {
          ...state,
          userStatusEmp: true,
          LogoutEmp: "notdefine",
          currentEmp: action.payload
        };
      }
  
      case EMPLOYEEGETUSERERR: {
        return {
          ...state,
          getUserErr: new Date()
        };
      }
  
      case EMPLOYEELOGOUT: {
        return {
          ...state,
          loader: "",
          LogoutEmp: "donenow",
          userStatusEmp: false,
          currentEmp: {}
        };
      }

      case CHANGE_ADDRESS_EMP: {
        let currentEmp = state.currentEmp;
        let newAddress = action.payload;
        let newObj = { ...currentEmp, ...newAddress };
        console.log("==========newObj from reducer==========================");
        console.log(newObj);
        console.log("====================================");
  
        return {
          ...state,
          adressStatus: "done",
          currentEmp: newObj,
          loader: new Date()
        };
      }
  
      case CHANGE_ADDRESS_EMP_ERR: {
        return {
          ...state,
          adressStatus: "error",
          loader: new Date(),
        }
      }
      case FORGETPASSWORD: {
        return {
          ...state,
          forget:new Date(),
          forgetWait:'move'
        };
      }
      case FORGETPASSWORDERR: {
        return {
          ...state,
          forget:new Date(),
        };
      }
  
      case EMPLOYEELOGINERR:
        return { ...state, hasErroredErr: action.payload };
      case "ITEMS_FETCH_DATA_SUCCESS":
        return { ...state, items: action.items };
      default:
        return state;
    
  }
}