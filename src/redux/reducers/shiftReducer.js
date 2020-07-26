import {
  ADD_SHIFT,
  ADD_SHIFT_ERR,
  GET_SHIFT,
  GET_SHIFT_ERR,
  ASSIGN_SHIFT,
  ASSIGN_SHIFT_ERR,
  GET_ASS_SHIFT,
  GET_ASS_SHIFT_ERR,
  GET_ALL_ASS_SHIFT,
  GET_ALL_ASS_SHIFT_ERR,
  UPDATE_ASS_SHIFT,
  UPDATE_ASS_SHIFT_ERR,
  EMPLOYER_SHIFTS_COUNT,
  EMPLOYER_SHIFTS_COUNT_ERR
} from "../actions/shiftAction";

const initialState = {
  allShifts: [],
  assignedShiftsEmployee: [],
  allAssignedShifts: [],
  employerShiftCount: 0,
  shiftAddStatus: "not done",
  loader: new Date(),
  getShiftStatus: "not done",
  editShift: {},
  editShiftStatus: "not done",
  deleteShiftStatus: "not done",
  shiftUpdateStatus: "not done",
  employeeContacts: [],
  getContactStatus: "not done",
  msgDeleteStatus: "not done",
  shiftAssignedStatus: 'not done',
  getAssignedShiftStatus: 'not done',
  getAllAssignedShiftStatus: 'not done',
  updateAssignedShiftStatus: 'not done',
  employerShiftCountStatus: 'not done'
};
export default (state = initialState, action) => {
  switch (action.type) {

    //   add shift
    case ADD_SHIFT:
      return {
        ...state,
        shiftAddStatus: "done",
        getShiftStatus: 'not done',
        editShiftStatus: "not done",
        deleteShiftStatus: "not done",
        shiftUpdateStatus: "not done",
        getContactStatus: "not done",
        msgDeleteStatus: "not done",
        shiftAssignedStatus: 'not done',
        getAssignedShiftStatus: 'not done',
        updateAssignedShiftStatus: 'not done',
        loader: new Date(),
        getAllAssignedShiftStatus: 'not done'
      };
    case ADD_SHIFT_ERR:
      return {
        ...state,
        shiftAddStatus: "error",
        getShiftStatus: 'not done',
        editShiftStatus: "not done",
        deleteShiftStatus: "not done",
        shiftUpdateStatus: "not done",
        getContactStatus: "not done",
        msgDeleteStatus: "not done",
        shiftAssignedStatus: 'not done',
        getAssignedShiftStatus: 'not done',
        updateAssignedShiftStatus: 'not done',
        loader: new Date(),
        getAllAssignedShiftStatus: 'not done'
      };

    // Get shifts
    case GET_SHIFT:
      return {
        ...state,
        loader: new Date(),
        allShifts: action.payload,
        getShiftStatus: "done",
        shiftAddStatus: "not done",
        editShiftStatus: "not done",
        deleteShiftStatus: "not done",
        shiftUpdateStatus: "not done",
        getContactStatus: "not done",
        msgDeleteStatus: "not done",
        shiftAssignedStatus: 'not done',
        getAssignedShiftStatus: 'not done',
        updateAssignedShiftStatus: 'not done',
        getAllAssignedShiftStatus: 'not done'
      };
    // Get shifts error
    case GET_SHIFT_ERR:
      return {
        ...state,
        loader: new Date(),
        getShiftStatus: "error",
        shiftAddStatus: "not done",
        editShiftStatus: "not done",
        deleteShiftStatus: "not done",
        shiftUpdateStatus: "not done",
        getContactStatus: "not done",
        msgDeleteStatus: "not done",
        shiftAssignedStatus: 'not done',
        getAssignedShiftStatus: 'not done',
        updateAssignedShiftStatus: 'not done',
        getAllAssignedShiftStatus: 'not done'
      };

    //   asign shift
    case ASSIGN_SHIFT:
      return {
        ...state,
        shiftAssignedStatus: "done",
        getShiftStatus: 'not done',
        shiftAddStatus: "not done",
        editShiftStatus: "not done",
        deleteShiftStatus: "not done",
        shiftUpdateStatus: "not done",
        getContactStatus: "not done",
        msgDeleteStatus: "not done",
        getAssignedShiftStatus: 'not done',
        updateAssignedShiftStatus: 'not done',
        loader: new Date(),
        getAllAssignedShiftStatus: 'not done'
      };
    case ASSIGN_SHIFT_ERR:
      return {
        ...state,
        shiftAssignedStatus: "error",
        getShiftStatus: 'not done',
        editShiftStatus: "not done",
        shiftAddStatus: "not done",
        deleteShiftStatus: "not done",
        shiftUpdateStatus: "not done",
        getContactStatus: "not done",
        msgDeleteStatus: "not done",
        getAssignedShiftStatus: 'not done',
        updateAssignedShiftStatus: 'not done',
        loader: new Date(),
        getAllAssignedShiftStatus: 'not done'
      };

    //   get assigned shifts of employee
    case GET_ASS_SHIFT:
      return {
        ...state,
        assignedShiftsEmployee: action.payload,
        getAssignedShiftStatus: "done",
        getShiftStatus: 'not done',
        editShiftStatus: "not done",
        shiftAddStatus: "not done",
        deleteShiftStatus: "not done",
        shiftUpdateStatus: "not done",
        getContactStatus: "not done",
        msgDeleteStatus: "not done",
        shiftAssignedStatus: 'not done',
        updateAssignedShiftStatus: 'not done',
        loader: new Date(),
        getAllAssignedShiftStatus: 'not done'
      };
    case GET_ASS_SHIFT_ERR:
      return {
        ...state,
        getAssignedShiftStatus: "error",
        getShiftStatus: 'not done',
        shiftAddStatus: "not done",
        editShiftStatus: "not done",
        deleteShiftStatus: "not done",
        shiftUpdateStatus: "not done",
        getContactStatus: "not done",
        msgDeleteStatus: "not done",
        shiftAssignedStatus: 'not done',
        updateAssignedShiftStatus: 'not done',
        loader: new Date(),
        getAllAssignedShiftStatus: 'not done'
      };

    //   get all assigned shifts of employer
    case GET_ALL_ASS_SHIFT:
      return {
        ...state,
        allAssignedShifts: action.payload,
        getAllAssignedShiftStatus: "done",
        getAssignedShiftStatus: "not done",
        getShiftStatus: 'not done',
        editShiftStatus: "not done",
        shiftAddStatus: "not done",
        deleteShiftStatus: "not done",
        shiftUpdateStatus: "not done",
        getContactStatus: "not done",
        msgDeleteStatus: "not done",
        shiftAssignedStatus: 'not done',
        updateAssignedShiftStatus: 'not done',
        loader: new Date()
      };
    case GET_ALL_ASS_SHIFT_ERR:
      return {
        ...state,
        getAllAssignedShiftStatus: "error",
        getAssignedShiftStatus: "not done",
        getShiftStatus: 'not done',
        shiftAddStatus: "not done",
        editShiftStatus: "not done",
        deleteShiftStatus: "not done",
        shiftUpdateStatus: "not done",
        getContactStatus: "not done",
        msgDeleteStatus: "not done",
        shiftAssignedStatus: 'not done',
        updateAssignedShiftStatus: 'not done',
        loader: new Date()
      };

    //   update assigned shift
    case UPDATE_ASS_SHIFT: {
      let shifts = state.assignedShiftsEmployee.map(shift => {
        if (shift.id === action.payload.id) {
          return action.payload;
        } else {
          return shift;
        }
      })

      return {
        ...state,
        assignedShiftsEmployee: shifts,
        updateAssignedShiftStatus: "done",
        getShiftStatus: 'not done',
        shiftAddStatus: "not done",
        editShiftStatus: "not done",
        deleteShiftStatus: "not done",
        shiftUpdateStatus: "not done",
        getContactStatus: "not done",
        msgDeleteStatus: "not done",
        shiftAssignedStatus: 'not done',
        getAssignedShiftStatus: 'not done',
        loader: new Date(),
        getAllAssignedShiftStatus: 'not done'
      };
    }
    case UPDATE_ASS_SHIFT_ERR:
      return {
        ...state,
        updateAssignedShiftStatus: "error",
        getShiftStatus: 'not done',
        shiftAddStatus: "not done",
        editShiftStatus: "not done",
        deleteShiftStatus: "not done",
        shiftUpdateStatus: "not done",
        getContactStatus: "not done",
        msgDeleteStatus: "not done",
        shiftAssignedStatus: 'not done',
        getAssignedShiftStatus: 'not done',
        loader: new Date(),
        getAllAssignedShiftStatus: 'not done'
      };

    case EMPLOYER_SHIFTS_COUNT:
      return {
        ...state,
        employerShiftCount: action.payload,
        employerShiftCountStatus: 'done',
        getAllAssignedShiftStatus: "not done",
        getShiftStatus: "not done",
        getAssignedShiftStatus: 'not done',
        loader: new Date()
      }

    case EMPLOYER_SHIFTS_COUNT_ERR:
      return {
        ...state,
        employerShiftCountStatus: 'error',
        getAllAssignedShiftStatus: "not done",
        getShiftStatus: "not done",
        getAssignedShiftStatus: 'not done',
        loader: new Date()
      }

    default:
      return state;
  }
};
