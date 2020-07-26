import { db } from "../../boot/firebase";

export const GETPAYSTUBS = "GETPAYSTUBS";
export const GETPAYSTUBSERR = "GETPAYSTUBSERR";
export const GETEMPLOYERPAYSTUBS = "GETEMPLOYERPAYSTUBS";
export const GETEMPLOYERPAYSTUBSERR = "GETEMPLOYERPAYSTUBSERR";

export function getStartPayStubs(id) {
  return async dispatch => {
    db.collection("paystubs")
      .where("employeeUid", "==", id)
      .onSnapshot(
        function(querySnapshot) {
          let datatoStore = [];
          querySnapshot.forEach(function(doc) {
            const data = doc.data();
            const id = doc.id;
            datatoStore.push({ id, ...data });
          });
           
          dispatch({
            type: GETPAYSTUBS,
            payload: datatoStore
          });
        },
        function(error) {
          dispatch({
            type: GETPAYSTUBSERR,
            payload: new Date()
          });
        }
      );
  };
}

export function getEmployerPayStubs(id) {
  return async dispatch => {
    db.collection("paystubs")
      .where("employerUid", "==", id)
      .onSnapshot(
        function(querySnapshot) {
          let datatoStore = [];
          querySnapshot.forEach(function(doc) {
            const data = doc.data();
            const id = doc.id;
            datatoStore.push({ id, ...data });
          });

          dispatch({
            type: GETEMPLOYERPAYSTUBS,
            payload: datatoStore
          });
        },
        function(error) {
          dispatch({
            type: GETEMPLOYERPAYSTUBSERR,
            payload: new Date()
          });
        }
      );
  };
}