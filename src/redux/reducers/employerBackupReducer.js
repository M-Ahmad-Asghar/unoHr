import {GETEMPLOYERPAYSTUBS, GETEMPLOYERPAYSTUBSERR} from '../actions/employeerBackupAction';


var initialState = {
  paystubs: [],
  loading:'asdf'
};

export default function(state = initialState, action) {

  switch (action.type) {
    case GETEMPLOYERPAYSTUBS:{
      let payStubArry = action.payload;
      payStubArry.sort(function(a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.createdAt) - new Date(a.createdAt);
      });  

      console.log('==============At employerBackupReducer======================');
      console.log("data: ", payStubArry);
      console.log('====================================');

      return {
         ...state,
         paystubs:payStubArry,
         loading:new Date()
          };
      }

    case GETEMPLOYERPAYSTUBSERR:{
      return {
         ...state,
         loading:new Date(),
           };
      }

   
    default:
      return state;
  }
}
