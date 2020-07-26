import {
  GET_EMP_SHADULE,
  GET_EMP_SHADULE_ERR,
  CONTECT_EMPLOYEE,
  CONTECT_EMPLOYEE_ERR
} from "../actions/empSchedule";

const initialState = {
  empSchadule: [],

  loader: new Date(),
  getSchaduleStatus: "not done",
  editSchadule: {},
  contactStatus: "not done",
  contacts: []
};
export default (state = initialState, action) => {
  switch (action.type) {
    // Get shadules
    case GET_EMP_SHADULE:
      console.log("=========payload===========================");
      console.log(action.payload);
      console.log("====================================");
      return {
        ...state,
        loader: new Date(),
        empSchadule: action.payload,
        getSchaduleStatus: "done"
      };
    // Get shadules
    case GET_EMP_SHADULE_ERR:
      return {
        ...state,
        loader: new Date(),
        getSchaduleStatus: "error"
      };
    case CONTECT_EMPLOYEE:
    let newContact = state.contacts.push(action.payload);
    console.log("=========payload===========================");
    console.log(action.payload);
    console.log("=================newContact===================", newContact);
      return {
        ...state,
        loader: new Date(),
        contacts: newContact,
        contactStatus: "done"
      };
    // Get shadules
    case CONTECT_EMPLOYEE_ERR:
      return {
        ...state,
        loader: new Date(),
        getSchaduleStatus: "error"
      };

    default:
      return state;
  }
};
