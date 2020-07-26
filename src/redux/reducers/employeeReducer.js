import {GETEMPLOYE,GETEMPLOYEERR,EMPLOYEESIGNUP,EMPLOYEESIGNUPERR,RESETSIGNUPLOADER, UPDATE_EMPLOYEE, UPDATE_EMPLOYEE_ERR} from '../actions/employeeActions';


var initialState = {

  isLoading: 'nill',
  data: {},
  loader: 'asdfaw',
  signupLoader: true,
  done: 'sdf',
  updateEmployeeStatus: 'not done'

};

export default function(state = initialState, action) {

  switch (action.type) {

    case GETEMPLOYE:{
      console.log('=========GETEMPLOYE===========================');
      console.log(action.payload);
      console.log('====================================');
        
      return {
         ...state,
          isLoading:new Date(),
          data:action.payload
          };
      }

    case GETEMPLOYEERR:{
      return {
        ...state,
        isLoading:new Date(),
      };
    }

    case EMPLOYEESIGNUP:{
      console.log('you are at reducer abaid: ');
      return {
        ...state,
        loader:new Date(),
        done:'move'
      };
    }
  
    case EMPLOYEESIGNUPERR:{
      return {
        ...state,
        loader: new Date(),
        signupLoader: false
      };
    }

    case RESETSIGNUPLOADER: {
      return {
        ...state,
        signupLoader: true
      };
    }

    case UPDATE_EMPLOYEE: {
      return {
        ...state,
        loader: new Date(),
        createPayStubStatus: 'not done',
        updateEmployeeStatus: 'done'
      };
    }

    case UPDATE_EMPLOYEE_ERR: {
      return {
        ...state,
        loader: new Date(),
        createPayStubStatus: 'not done',
        updateEmployeeStatus: 'error'
      };
    }

    default:
      return state;
  }
}
