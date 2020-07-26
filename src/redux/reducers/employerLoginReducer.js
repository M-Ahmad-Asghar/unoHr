import { EMPLOYER_LOGIN } from '../actions/employerLoginActions';

const initialState = {
  loginDetail: {
    email: '',
    password: '',
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case EMPLOYER_LOGIN:
      console.log('i am in reducer; ', action.payload);
      return { ...state, loginDetail: action.payload };
    default:
      return state;
  }
}
