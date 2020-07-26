import {ADDNEWEMPLOYER,ADDNEWEMPLOYERERR,ADDNEWEMPLOYEEERR,ADDNEWEMPLOYEE} from '../actions/employerActions';


var initialState = {
  isLoading: 'nill',
  done:'sdaf',

  Loading: 'nill nill',
  successDone:'no yet',

};

export default function(state = initialState, action) {

  switch (action.type) {

    case ADDNEWEMPLOYER:{
      console.log('at reddcer eRR sign Up');
      return {
         ...state,
          isLoading:new Date(),
          done:'move'
          };
      }

    case ADDNEWEMPLOYERERR:{
      return {
         ...state,
          isLoading:new Date(),
          };
      }

    case ADDNEWEMPLOYEE:{
      console.log('at reducer for invite employee: ')
      return {
         ...state,
          Loading:new Date(),
          successDone:'move'
          };
      }

    case ADDNEWEMPLOYEEERR:{
      return {
         ...state,
          Loading:new Date(),
          };
      }

   
    default:
      return state;
  }
}
