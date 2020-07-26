import {GETAPP, GETAPPERR} from '../actions/storageAction';


var initialState = {
  getapp: 'some',
  loading:'sadf'
};

export default function(state = initialState, action) {

  switch (action.type) {
    case GETAPP:{
        console.log('red',action.payload);
        
      return {
         ...state,
         getapp:action.payload,
         loading:new Date()
          };
      }

    case GETAPPERR:{
        console.log('red','err');
      return {
         ...state,
         getapp:new Date(),
           };
      }

   
    default:
      return state;
  }
}
