import { GETPAYSTUBS, GETPAYSTUBSERR, GETEMPLOYERPAYSTUBS, GETEMPLOYERPAYSTUBSERR } from '../actions/paystubsActions';


var initialState = {
  paystubs: [],
  loading: 'asdf',
  employerPaystubs: [],
  employerPaystubsStatus: 'not done'
};

export default function (state = initialState, action) {

  switch (action.type) {
    case GETPAYSTUBS: {
      let payStubArry = action.payload;
      payStubArry.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.createdAt) - new Date(a.createdAt);
      });


      return {
        ...state,
        paystubs: payStubArry,
        loading: new Date()
      };
    }

    case GETPAYSTUBSERR: {
      return {
        ...state,
        loading: new Date(),
      };
    }

    case GETEMPLOYERPAYSTUBS: {
      let payStubArry = action.payload;
      payStubArry.sort(function (a, b) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });


      return {
        ...state,
        employerPaystubs: payStubArry,
        loading: new Date(),
        employerPaystubsStatus: 'done'
      };
    }

    case GETEMPLOYERPAYSTUBSERR: {
      return {
        ...state,
        loading: new Date(),
        employerPaystubsStatus: 'error'
      };
    }


    default:
      return state;
  }
}