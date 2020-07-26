import {
  ADD_SHADULE,
  ADD_SHADULE_ERR,
  GET_SHADULE,
  GET_SHADULE_ERR,
  GET_FOR_EDIT,
  GET_FOR_EDIT_ERR,
  DELETE_SCHADULE,
  DELETE_SCHADULE_ERR,
  UPDATE_SHADULE,
  UPDATE_SHADULE_ERR,
  EMPLOYEE_CONTACTS,
  EMPLOYEE_CONTACTS_ERR,
  DELETE_MESSAGE,
  DELETE_MESSAGE_ERR
} from "../actions/schaduleAction";

const initialState = {
  allSchadule: [],
  shaduleAddStatus: "not done",
  loader: new Date(),
  getSchaduleStatus: "not done",
  editSchadule: {},
  editSchaduleStatus: "not done",
  deleteSchaduleStatus: "not done",
  shaduleUpdateStatus: "not done",
  employeeContacts: [],
  getContactStatus: "not done",
  msgDeleteStatus: "not done"
};
export default (state = initialState, action) => {
  switch (action.type) {
    //   add shadule
    case ADD_SHADULE:
      return {
        ...state,
        shaduleAddStatus: "done",
        loader: new Date()
      };
    case ADD_SHADULE_ERR:
      return {
        ...state,
        shaduleAddStatus: "error",
        loader: new Date()
      };

    // Get shadules
    case GET_SHADULE:
      return {
        ...state,
        loader: new Date(),
        allSchadule: action.payload,
        getSchaduleStatus: "done",
        shaduleAddStatus: "not done"
      };
    // Get shadules
    case GET_SHADULE_ERR:
      return {
        ...state,
        loader: new Date(),
        getSchaduleStatus: "error",
        shaduleAddStatus: "not done"
      };
    case GET_FOR_EDIT:
      return {
        ...state,
        loader: new Date(),
        editSchadule: action.payload,
        editSchaduleStatus: "done",
        shaduleUpdateStatus: "not done",
        deleteSchaduleStatus: "not done"
      };
    case GET_FOR_EDIT_ERR:
      return {
        ...state,
        loader: new Date(),
        editSchaduleStatus: "error",
        shaduleUpdateStatus: "not done",
        deleteSchaduleStatus: "not done"
      };
    case DELETE_SCHADULE:
      return {
        ...state,
        loader: new Date(),
        deleteSchaduleStatus: "done"
      };
    case DELETE_SCHADULE_ERR:
      return {
        ...state,
        loader: new Date(),
        deleteSchaduleStatus: "error"
      };
    case UPDATE_SHADULE:
      return {
        ...state,
        // loader: new Date(),
        shaduleUpdateStatus: "done"
      };
    case UPDATE_SHADULE_ERR:
      return {
        ...state,
        loader: new Date(),
        shaduleUpdateStatus: "error"
      };
    case EMPLOYEE_CONTACTS:
      let empContacts = action.payload;
      empContacts.sort(function(a, b) {
        return new Date(b.PostedTime) - new Date(a.PostedTime);
      });

      return {
        ...state,
        loader: new Date(),
        employeeContacts: empContacts,
        getContactStatus: "done"
      };

    ////////////////////  Delete Message  ////////////////////////
    case DELETE_MESSAGE:
      console.log("======start delete reducer==============================");

      return {
        ...state,
        loader: new Date(),
        msgDeleteStatus: "done"
      };
    case DELETE_MESSAGE_ERR:
      return {
        ...state,
        loader: new Date(),
        msgDeleteStatus: "error"
      };
    ////////////////////  Delete Message  ////////////////////////

    case EMPLOYEE_CONTACTS_ERR:
      return {
        ...state,
        loader: new Date(),
        getContactStatus: "error"
      };

    default:
      return state;
  }
};
