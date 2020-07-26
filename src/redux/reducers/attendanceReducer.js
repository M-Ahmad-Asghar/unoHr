import {
  EMPLOYE_CHECKIN,
  DELETE_RECORD,
  EMPLOYE_CHECKOUT,
  SUBMIT_RECORD,
  GET_EMP_OLD_STATUS,
  GET_EMP_STATUS,
  SUBMIT_RECORD_ERR,
  RECORD_ATTEND,
  RECORD_ATTEND_ERR,
  SET_DEFAULT,
  GET_WEEK_STATUS,
  START_BREAK_ERR,
  START_BREAK,
  BREAK_DATA,
  DEFAULT_VALUE,
  GETEMPLOYERATTENDANCE,
  GETEMPLOYERATTENDANCEERR,
  GETEMPLOYEEATTENDANCE,
  GETEMPLOYEEATTENDANCEERR
} from "../actions/attendanceAction";
// // import CardItem from "../../theme/components/CardItem";

var initialState = {
  empAttendances: [],
  employeeAttendances: [],
  loader: true,
  employeeDay: [],
  employeeCheckIn: {},
  done: "not done",
  empOldWeekStatus: false,
  submitedRecords: [],
  submitStatus: "not done",
  status: "adsf",
  empManualRecords: [],
  getEmpRecordStatus: "not done",
  submitDayStatus: "not done",
  weekStatus: [],
  startBreakStatus: "not done",
  breakData: [],
  getEmpAttendancesStatus: 'not done',
  getEmployeeAttendancesStatus: 'not done'
};

export default function(state = initialState, action) {
  switch (action.type) {
    case EMPLOYE_CHECKIN: {
      console.log("==========emp reducer==========================");
      console.log(action.payload);
      console.log("====================================");
      return {
        ...state,
        employeeCheckIn: action.payload,
        loader: new Date(),
        done: "done",
        status: "checkIn"
      };
    }

    case EMPLOYE_CHECKOUT: {
      return {
        ...state,
        loader: new Date(),
        done: "done",
        status: "checkOut"
      };
    }

    case GET_EMP_STATUS: {
      console.log("============action.payload========================");
      console.log(action.payload);
      console.log("====================================");
      let employeeCheckIn = action.payload.filter(
        item => item.status == "checkIn"
      );

      let empStatusArray = action.payload;
      empStatusArray.sort(function(a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return (
          new Date(a.checkInTime.toDate()) - new Date(b.checkInTime.toDate())
        );
      });
      console.log("=============get all red=======================");
      console.log(empStatusArray);
      console.log("====================================");
      let status = "";
      if (employeeCheckIn.length > 0) {
        status = "checkIn";
      } else {
        status = "checkOut";
      }

      return {
        ...state,
        employeeCheckIn: employeeCheckIn[0],
        employeeDay: empStatusArray,
        empOldWeekStatus: false,
        loader: new Date(),
        status: status
      };
    }

    case GET_EMP_OLD_STATUS: {
      let employeeCheckIn = action.payload.filter(
        item => item.status == "checkIn"
      );

      let empOldStatusStatus = action.payload;
      empOldStatusStatus.sort(function(a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return (
          new Date(a.checkInTime.toDate()) - new Date(b.checkInTime.toDate())
        );
      });

      return {
        ...state,

        employeeDay: empOldStatusStatus,
        loader: new Date(),
        empOldWeekStatus: true
      };
    }

    case SUBMIT_RECORD: {
      return {
        ...state,
        employeeDay: [],
        empOldWeekStatus: false,
        submitStatus: "done",
        loader: new Date()
      };
    }
    case DELETE_RECORD: {
      let employeeNewRecords = state.employeeDay.filter(
        item => item.employeeUid == action.payload
      );

      return {
        ...state,

        employeeDay: employeeNewRecords,
        empOldWeekStatus: false,
        loader: new Date()
      };
    }
    case SUBMIT_RECORD_ERR: {
      return {
        ...state,
        submitStatus: "error",
        loader: new Date()
      };
    }
    case RECORD_ATTEND: {
      return {
        ...state,
        submitDayStatus: "done",
        loader: new Date()
      };
    }
    case RECORD_ATTEND_ERR: {
      return {
        ...state,
        submitDayStatus: "error",
        loader: new Date()
      };
    }
    case START_BREAK: {
      return {
        ...state,
        startBreakStatus: "done",
        loader: new Date()
      };
    }
    case START_BREAK_ERR: {
      return {
        ...state,
        startBreakStatus: "error",
        loader: new Date()
      };
    }
    case BREAK_DATA: {
      return {
        ...state,
        breakData: action.payload,
        loader: new Date()
      };
    }
    case SET_DEFAULT: {
      return {
        ...state,
        submitDayStatus: "not done"
      };
    }
    case DEFAULT_VALUE: {
      return {
        ...state,
        startBreakStatus: "not done"
      };
    }
    case GET_WEEK_STATUS: {
      return {
        ...state,
        weekStatus: action.payload,
        loader: new Date()
      };
    }

    case GETEMPLOYERATTENDANCE: {

      let empAttendances = action.payload;

      return {
        ...state,
        empAttendances,
        loader: new Date(),
        getEmpAttendancesStatus: 'done',
        getEmployeeAttendancesStatus: 'not done'
      };
    }
    
    case GETEMPLOYERATTENDANCEERR: {
      return {
        ...state,
        loader: new Date(),
        getEmpAttendancesStatus: 'error',
        getEmployeeAttendancesStatus: 'not done'
      };
    }

    case GETEMPLOYEEATTENDANCE: {
      return {
        ...state,
        employeeAttendances: action.payload,
        loader: new Date(),
        getEmployeeAttendancesStatus: 'done'
      };
    }
    
    case GETEMPLOYEEATTENDANCEERR: {
      return {
        ...state,
        loader: new Date(),
        getEmployeeAttendancesStatus: 'error'
      };
    }

    default:
      return state;
  }
}
