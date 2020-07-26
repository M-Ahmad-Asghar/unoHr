import {
  GT_ALL_EMPLOY,
  GET_EMP_STATUS_ERR,
  GET_EMP_WK_STATUS,
  GET_EMP_PAYPERIOD,
  GET_EMP_PAYPERIOD_ERR,
  CREATE_PAYSTUB,
  CREATE_PAYSTUB_ERR,
  GET_SYS_DOC,
  GET_SYS_DOC_ERR,
  ADDNEWEMPLOYEE,
  ADDNEWEMPLOYEEERR,
  REQUEST_BACKGROUND_CHECK,
  REQUEST_BACKGROUND_CHECK_ERR,
  CHANGE_TIMEMODE,
  CHANGE_TIMEMODE_ERR
} from "../actions/employerActions";

var initialState = {
  // loader: true,
  employees: [],
  done: "not move",
  employeeDay: [],
  loader: new Date(),
  emplDayDone: "not move",
  payPeriod: [],
  payPeriodStatus: "not done",
  payStubStatus: "not done",
  allEmployees: [],
  sysDocs: [],
  getSysDocStatus: "not done",
  newEmp: {},
  addEmpStatus: "not done",
  requestBackgroundCheckStatus: "not done",
  changeTimeModeStatus: "not done"
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GT_ALL_EMPLOY: {
      console.log("action.payload", action.payload);
      let ActiveEmployees = action.payload.filter(
        emp => emp.status == "active"
      );
      console.log("ActiveEmployees", ActiveEmployees);

      return {
        ...state,
        employees: ActiveEmployees,
        allEmployees: action.payload,
        loader: new Date(),
        done: "move",
        requestBackgroundCheckStatus: "not done"
      };
    }
    case GET_EMP_WK_STATUS: {
      let empStatusArray = action.payload;
      empStatusArray.sort(function(a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return (
          new Date(a.checkInTime.toDate()) - new Date(b.checkInTime.toDate())
        );
      });

      return {
        ...state,

        employeeDay: empStatusArray,
        loader: new Date(),
        emplDayDone: "done",
        requestBackgroundCheckStatus: "not done"
      };
    }
    case GET_EMP_STATUS_ERR: {
      return {
        ...state,
        emplDayDone: "error",
        loader: new Date(),
        requestBackgroundCheckStatus: "not done"
      };
    }
    case GET_EMP_PAYPERIOD: {
      let payPeriodArray = action.payload;
      payPeriodArray.sort(function(a, b) {
        return new Date(b.recordTo) - new Date(a.recordTo);
      });

      return {
        ...state,
        payPeriod: payPeriodArray,
        loader: new Date(),
        payPeriodStatus: "done",
        requestBackgroundCheckStatus: "not done"
      };
    }
    case GET_EMP_PAYPERIOD_ERR: {
      return {
        ...state,
        payPeriodStatus: "error",
        loader: new Date(),
        requestBackgroundCheckStatus: "not done"
      };
    }

    case CREATE_PAYSTUB: {
      let remainingPayPeriods = state.payPeriod.filter(
        item => item.id != action.payload
      );

      return {
        ...state,
        payPeriod: remainingPayPeriods,
        loader: new Date(),
        payStubStatus: "done",
        requestBackgroundCheckStatus: "not done"
      };
    }
    case CREATE_PAYSTUB_ERR: {
      return {
        ...state,
        payStubStatus: "error",
        loader: new Date(),
        requestBackgroundCheckStatus: "not done"
      };
    }
    case GET_SYS_DOC: {
      return {
        ...state,
        sysDocs: action.payload,
        loader: new Date(),
        getSysDocStatus: "done",
        addEmpStatus: "not done",
        requestBackgroundCheckStatus: "not done"
      };
    }
    case GET_SYS_DOC_ERR: {
      return {
        ...state,
        getSysDocStatus: "error",
        loader: new Date(),
        addEmpStatus: "not done",
        requestBackgroundCheckStatus: "not done"
      };
    }

    case ADDNEWEMPLOYEE: {
      return {
        ...state,
        loader: new Date(),
        newEmp: action.payload,
        addEmpStatus: "done",
        requestBackgroundCheckStatus: "not done"
      };
    }
    case ADDNEWEMPLOYEEERR: {
      return {
        ...state,
        addEmpStatus: "error",
        loader: new Date(),
        requestBackgroundCheckStatus: "not done"
      };
    }

    case REQUEST_BACKGROUND_CHECK: {
      return {
        ...state,
        loader: new Date(),
        addEmpStatus: "not done",
        requestBackgroundCheckStatus: "done"
      };
    }
    case REQUEST_BACKGROUND_CHECK_ERR: {
      return {
        ...state,
        addEmpStatus: "not done",
        loader: new Date(),
        requestBackgroundCheckStatus: "error"
      };
    }
    case CHANGE_TIMEMODE: {
      return {
        ...state,
        loader: new Date(),
        changeTimeModeStatus: "done"
      };
    }
    case CHANGE_TIMEMODE_ERR: {
      return {
        ...state,
        changeTimeModeStatus: "error",
        loader: new Date()
      };
    }

    default:
      return state;
  }
}
