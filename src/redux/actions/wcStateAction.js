import { db } from "../../boot/firebase";
import {toast} from "react-toastify";

export const GET_WC_STATES = "GET_WC_STATES";
export const GET_WC_STATES_ERR = "GET_WC_STATES_ERR";

export const getWcStates = () => {
    return dispatch => {
      db.collection("wcStates")
        .doc('one')
        .get()
        .then( function(doc) {
          let dataToStore = [];
          if(doc.data()) {
            const data = doc.data();
            dataToStore = data["wcStates"];
  
            dispatch({
              type: GET_WC_STATES,
              payload: dataToStore
            });
          } else {
            toast.error('No such data found!');
            dispatch({
              type: GET_WC_STATES_ERR
            });
          }
        })
        .catch(function(error) {
          toast.error('Error, while fetching data from Database!');
          dispatch({
            type: GET_WC_STATES_ERR
          });
        });
    };
  };