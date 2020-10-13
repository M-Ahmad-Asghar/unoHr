import {
  LOGINERR,
  LOGIN,
  GETUSER,
  LOGOUT,
  GETUSERERR,
  CHANGE_ADDRESS,
  CHANGE_ADDRESS_ERR,
  UPDATE_FACILITY,
  UPDATE_FACILITY_ERR,
  SET_DEFAULT,
  SUPPORT_TICKET_STATRT,
  SUPPORT_TICKET_REPONSE_DONE,
  SUPPORT_TICKET_REPONSE_FAILED,
  GET_ALL_MY_TICKETS,
  GET_ALL_MY_TICKETS_FAILED,
  USER_LOADING,
} from "../actions/userActions";

import { UPDATE_EMPLOYER } from "../actions/profileAction";
import { faLessThanEqual } from "@fortawesome/free-solid-svg-icons";

var initialState = {
  isLoading: "nill",
  hasErrored: false,
  userStatus: true,
  LogoutDone: "notdone",
  user: {},
  getuserErr: "sadf",
  adressStatus: "not done",
  loader: new Date(),
  updateFacilityStatus: "not done",
  submitTicketStatus: false,
  myAllTickets: [],
  myTicketsStatus: "",
  userLoading: true,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_MY_TICKETS: {
      return {
        ...state,
        myAllTickets: action.payload,
        myTicketsStatus: "done",
      };
    }
    case GET_ALL_MY_TICKETS_FAILED: {
      return {
        ...state,
        myTicketsStatus: "done",
      };
    }
    case SUPPORT_TICKET_STATRT: {
      return {
        ...state,
        submitTicketStatus: true,
      };
    }
    case SUPPORT_TICKET_REPONSE_DONE: {
      return {
        ...state,
        submitTicketStatus: false,
      };
    }
    case SUPPORT_TICKET_REPONSE_FAILED: {
      return {
        ...state,
        submitTicketStatus: false,
      };
    }
    case LOGIN: {
      return {
        ...state,
        userStatus: true,
        LogoutDone: "notdone",
        user: action.payload,
        isLoading: "move",
      };
    }

    case UPDATE_EMPLOYER: {
      let lastUser = { ...state.user };
      let getPayload = action.payload;
      lastUser[getPayload.name] = getPayload.value;

      console.log("your update user is", lastUser);

      return {
        ...state,
        user: lastUser,
      };
    }

    case GETUSER: {
      return {
        ...state,
        userStatus: true,
        LogoutDone: "notdone",
        user: action.payload,
        userLoading: false,
      };
    }
    case USER_LOADING: {
      return {
        ...state,
        userLoading: true,
      };
    }

    case GETUSERERR: {
      return {
        ...state,
        getuserErr: new Date(),
        userLoading: false,
      };
    }

    case LOGOUT: {
      return {
        ...state,
        isLoading: "ssadf",
        LogoutDone: "done",
        userStatus: false,
        user: {},
      };
    }
    case CHANGE_ADDRESS: {
      let user = state.user;
      let newAddress = action.payload;
      let newObj = { ...user, ...newAddress };

      return {
        ...state,
        adressStatus: "done",
        user: newObj,
        loader: new Date(),
      };
    }

    case CHANGE_ADDRESS_ERR: {
      return {
        ...state,
        adressStatus: "error",
        loader: new Date(),
      };
    }
    case UPDATE_FACILITY: {
      return {
        ...state,
        updateFacilityStatus: "done",
        loader: new Date(),
      };
    }

    case UPDATE_FACILITY_ERR: {
      return {
        ...state,
        updateFacilityStatus: "error",
        loader: new Date(),
      };
    }
    case SET_DEFAULT: {
      return {
        ...state,
        updateFacilityStatus: "not done",
        loader: new Date(),
      };
    }

    case LOGINERR:
      return { ...state, hasErrored: action.payload };
    case "ITEMS_FETCH_DATA_SUCCESS":
      return { ...state, items: action.items };
    default:
      return state;
  }
}
