const initialState = {
  data: "",
};

export default function DataPassReducer(state = initialState, action) {
  switch (action.type) {
    case "DATA_PASS": {
      return {
        ...state,
        data: action.payload,
      };
    }
    default:
      return state;
  }
}
