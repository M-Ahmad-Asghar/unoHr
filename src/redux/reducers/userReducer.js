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
} from "../actions/userActions";

import { UPDATE_EMPLOYER } from "../actions/profileAction";

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
};

export default function(state = initialState, action) {
  switch (action.type) {
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
      };
    }

    case GETUSERERR: {
      return {
        ...state,
        getuserErr: new Date(),
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
      console.log("==========newObj from reducer==========================");
      console.log(newObj);
      console.log("====================================");

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
