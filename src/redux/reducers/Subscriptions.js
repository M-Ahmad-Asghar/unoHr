
import { CANCEL_SUBSCRIPTION ,CHANGE_SUBSCRIPTION, CHANGE_SUBSCRIPTION_ERR} from "../actions/SubscriptionActions";

var initialState = {
  loader:'null',
  changeSubStatus: "not done"

};

export default function(state = initialState, action) {
  switch (action.type) {
   

    case CHANGE_SUBSCRIPTION: {
      return {
        ...state,
        loader: new Date(),
        changeSubStatus: 'done'
      };
    }
    case CHANGE_SUBSCRIPTION_ERR: {
      return {
        ...state,
        loader: new Date(),
        changeSubStatus: 'error'
      };
    }
   
    default:
      return state;
  }
}
