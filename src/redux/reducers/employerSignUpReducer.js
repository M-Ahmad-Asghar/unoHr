import { EMPLOYER_SIGN_UP } from "../actions/employerSignUpActions";

const initialState = {
  loginDetail: {
    email: "",
    password: "",
  },
  signUpDetail: {
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    password: "",

    street: "",
    city: "",
    state: "",
    zip: "",
  },
};

export default function(state = initialState, action) {
  switch (action.type) {
    case EMPLOYER_SIGN_UP:
      console.log("i am in reducer; ", action.payload);
      return { ...state, loginDetail: action.payload };
    default:
      return state;
  }
}
