import {
    GET_WC_STATES,
    GET_WC_STATES_ERR
  } from "../actions/wcStateAction";

  const initialState = {
    wcStates: [],
    loader: new Date(),
    getWCStatesStatus: 'not done'
  };

export default (state = initialState, action) => {
    switch (action.type) {
      
    case GET_WC_STATES:
        console.log("Get Wages Reducer: ", action.payload);
        return {
            ...state,
            loader: new Date(),
            wcStates: action.payload,
            getWCStatesStatus: "done"
        };

    case GET_WC_STATES_ERR:
        return {
            ...state,
            loader: new Date(),
            getWCStatesStatus: "error"
        };

    default:
        return{
            state
        }    
    }
}