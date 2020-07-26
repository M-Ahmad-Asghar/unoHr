import { db } from "../../boot/firebase";
import { toast } from "react-toastify";
export const ADD_SHIFT = "ADD_SHIFT";
export const ADD_SHIFT_ERR = "ADD_SHIFT_ERR";
export const GET_SHIFT = "GET_SHIFT";
export const GET_SHIFT_ERR = "GET_SHIFT_ERR";
export const ASSIGN_SHIFT = "ASSIGN_SHIFT";
export const ASSIGN_SHIFT_ERR = "ASSIGN_SHIFT_ERR";
export const GET_ASS_SHIFT = "GET_ASS_SHIFT";
export const GET_ASS_SHIFT_ERR = "GET_ASS_SHIFT_ERR";
export const GET_ALL_ASS_SHIFT = "GET_ALL_ASS_SHIFT";
export const GET_ALL_ASS_SHIFT_ERR = "GET_ALL_ASS_SHIFT_ERR";
export const UPDATE_SHIFT = "UPDATE_SHIFT";
export const UPDATE_SHIFT_ERR = "UPDATE_SHIFT_ERR";
export const UPDATE_ASS_SHIFT = "UPDATE_ASS_SHIFT";
export const UPDATE_ASS_SHIFT_ERR = "UPDATE_ASS_SHIFT_ERR";
export const GET_FOR_EDIT_SHIFT = "GET_FOR_EDIT_SHIFT";
export const GET_FOR_EDIT_SHIFT_ERR = "GET_FOR_EDIT_SHIFT_ERR";
export const DELETE_SHIFT = "DELETE_SHIFT";
export const DELETE_SHIFT_ERR = "DELETE_SHIFT_ERR";
export const EMPLOYEE_CONTACTS = "EMPLOYEE_CONTACTS";
export const EMPLOYEE_CONTACTS_ERR = "EMPLOYEE_CONTACTS_ERR";
export const DELETE_MESSAGE = "DELETE_MESSAGE";
export const DELETE_MESSAGE_ERR = "DELETE_MESSAGE_ERR";
export const EMPLOYER_SHIFTS_COUNT = "EMPLOYER_SHIFTS_COUNT";
export const EMPLOYER_SHIFTS_COUNT_ERR = "EMPLOYER_SHIFTS_COUNT_ERR";

export function addShift(data) {
  return dispatch => {
    db.collection("shifts")
      .add(data)
      .then(function(docRef) {
        const id = docRef.id;
        const dataToStore = { id, ...data };
        toast.success("Shift Added successfully");

        dispatch({
          type: ADD_SHIFT,
          payload: dataToStore
        });
      })
      .catch(function(error) {
        toast.error("Error occured. Please try again later");
        dispatch({
          type: ADD_SHIFT_ERR
        });
      });
  };
}

export function getShifts(id) {
  return dispatch => {
    db.collection("shifts")
      .where("employeruid", "==", id)
      .onSnapshot(
        function(querySnapshot) {
          let datatoStore = [];
          querySnapshot.forEach(function(doc) {
            const data = doc.data();
            const id = doc.id;
            datatoStore.push({ id, ...data });

            return datatoStore;
          });

          dispatch({
            type: GET_SHIFT,
            payload: datatoStore
          });
        },
        error => {
          dispatch({
            type: GET_SHIFT_ERR
          });
        }
      );
  };
}

export function assignShift(data) {
  return dispatch => {
    db.collection("assignedShifts")
      .add(data)
      .then(function(docRef) {
        const id = docRef.id;
        const dataToStore = { id, ...data };
        toast.success("Shift Assigned successfully");

        dispatch({
          type: ASSIGN_SHIFT,
          payload: dataToStore
        });
      })
      .catch(function(error) {
        toast.error("Error occured. Please try again later");
        dispatch({
          type: ASSIGN_SHIFT_ERR
        });
      });
  };
}

export function getAssignedShiftsByEmployee(id) {
  return dispatch => {
    db.collection("assignedShifts")
      .where("employeeid", "==", id)
      .onSnapshot(
        function(querySnapshot) {
          let datatoStore = [];
          querySnapshot.forEach(function(doc) {
            const data = doc.data();
            const id = doc.id;
            datatoStore.push({ id, ...data });
          });
          dispatch({
            type: GET_ASS_SHIFT,
            payload: datatoStore
          });
        },
        error => {
          dispatch({
            type: GET_ASS_SHIFT_ERR
          });
        }
      );
  };
}

export function getAllAssignedShifts(id) {
  return dispatch => {
    db.collection("assignedShifts")
      .where("employerid", "==", id)
      .onSnapshot(
        function(querySnapshot) {
          let datatoStore = [];
          querySnapshot.forEach(function(doc) {
            const data = doc.data();
            const id = doc.id;
            datatoStore.push({ id, ...data });
          });
          dispatch({
            type: GET_ALL_ASS_SHIFT,
            payload: datatoStore
          });
        },
        error => {
          dispatch({
            type: GET_ALL_ASS_SHIFT_ERR
          });
        }
      );
  };
}

export function updateShifts(id, data) {
  return dispatch => {
    db.collection("assignedShifts")
      .doc(id)
      .set(data)
      .then(function(){
        let datatoStore = {
          id,
          data
        }

        dispatch({
          type: UPDATE_ASS_SHIFT,
          payload: datatoStore
        });
      })
      .catch(function(error){
        dispatch({
          type: UPDATE_ASS_SHIFT_ERR
        });
      })
  };
}

export function countEmployerShifts(id) {
  return dispatch => {
    db.collection("shifts")
      .where('employeruid', '==', id)
      .get()
      .then(function (querySnapshot) {
        console.log(querySnapshot.size);
        let size = 0;
        size = querySnapshot.size;
        
        dispatch({
          type: EMPLOYER_SHIFTS_COUNT,
          payload: size
        });
      })
      .catch(function(error) {
        dispatch({
          type: EMPLOYER_SHIFTS_COUNT_ERR
        });
      });
  };
}