import { db } from "../../boot/firebase";
import { toast } from "react-toastify";
export const ADD_SHADULE = "ADD_SHADULE";
export const ADD_SHADULE_ERR = "ADD_SHADULE_ERR";
export const GET_SHADULE = "GET_SHADULE";
export const GET_SHADULE_ERR = "GET_SHADULE_ERR";
export const UPDATE_SHADULE = "UPDATE_SHADULE";
export const UPDATE_SHADULE_ERR = "UPDATE_SHADULE_ERR";
export const GET_FOR_EDIT = "GET_FOR_EDIT";
export const GET_FOR_EDIT_ERR = "GET_FOR_EDIT_ERR";
export const DELETE_SCHADULE = "DELETE_SCHADULE";
export const DELETE_SCHADULE_ERR = "DELETE_SCHADULE_ERR";
export const EMPLOYEE_CONTACTS = "EMPLOYEE_CONTACTS";
export const EMPLOYEE_CONTACTS_ERR = "EMPLOYEE_CONTACTS_ERR";
export const DELETE_MESSAGE = "DELETE_MESSAGE";
export const DELETE_MESSAGE_ERR = "DELETE_MESSAGE_ERR";

export function addSchadule(data) {
  return dispatch => {
    db.collection("shadule")
      .add(data)
      .then(function(docRef) {
        const id = docRef.id;
        const dataToStore = { id, ...data };
        toast.success("Schadule Added successfully");

        dispatch({
          type: ADD_SHADULE,
          payload: dataToStore
        });
      })
      .catch(function(error) {
        toast.error("Error occured. Please try again later");
        dispatch({
          type: ADD_SHADULE_ERR
        });
      });
  };
}

export function getSchadules(data) {
  console.log("data", data);

  return dispatch => {
    db.collection("shadule")
      .where("employeruid", "==", data)
      .onSnapshot(
        function(querySnapshot) {
          let datatoStore = [];
          querySnapshot.forEach(function(doc) {
            const data = doc.data();
            const id = doc.id;
            datatoStore.push({ id, ...data });

            return datatoStore;
          });
          console.log("============datatoStore========================");
          console.log(datatoStore);
          console.log("====================================");

          dispatch({
            type: GET_SHADULE,
            payload: datatoStore
          });
        },
        error => {
          dispatch({
            type: GET_SHADULE_ERR
          });
        }
      );
  };
}

export function updateSchadule(data) {
  return dispatch => {
    db.collection("shadule")
      .doc(data.id)
      .set(data)
      .then(function(docRef) {
        dispatch({
          type: UPDATE_SHADULE,
          payload: data
        });
        toast.success("successfully updated");
      })
      .catch(function(error) {
        toast.error("Error ocurred! try again later");
        dispatch({
          type: UPDATE_SHADULE_ERR
        });
      });
  };
}

// for delete schadule
export function getForEdit(data) {
  console.log("data", data);

  return dispatch => {
    db.collection("shadule")
      .doc(data)
      .get()
      .then(function(doc) {
        if (doc.exists) {
          let id = doc.id;
          let datatoStore = { id, ...doc.data() };
          console.log("============datatoStore========================");
          console.log(datatoStore);
          console.log("====================================");
          dispatch({
            type: GET_FOR_EDIT,
            payload: datatoStore
          });
        } else {
          console.log("No such document!");
        }
      })
      .catch(() => {
        dispatch({
          type: GET_FOR_EDIT_ERR
        });
      });
  };
}

export function deleteSchadule(id) {
  return dispatch => {
    db.collection("shadule")
      .doc(id)
      .delete()
      .then(function() {
        dispatch({
          type: DELETE_SCHADULE,
          payload: id
        });
        toast.success("Successfully Deleted");
      })

      .catch(function(error) {
        toast.error("Error occured! try again later");

        dispatch({
          type: DELETE_SCHADULE_ERR
        });
      });
  };
}

export function employeeContacts(id) {
  console.log("data", id);

  return dispatch => {
    db.collection("contact")
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
          console.log("============datatoStore========================");
          console.log(datatoStore);
          console.log("====================================");

          dispatch({
            type: EMPLOYEE_CONTACTS,
            payload: datatoStore
          });
        },
        error => {
          dispatch({
            type: EMPLOYEE_CONTACTS_ERR
          });
        }
      );
  };
}

// For contact msg delete
export function deleteMsg(id) {
  console.log("=============start delete action=======================");
  console.log(id);
  return dispatch => {
    db.collection("contact")
      .doc(id)
      .delete()
      .then(function() {
        toast.success("Successfully Deleted");
        dispatch({
          type: DELETE_MESSAGE,
          payload: id
        });
      })

      .catch(function(error) {
        toast.error("Error occured! try again later");

        dispatch({
          type: DELETE_MESSAGE_ERR
        });
      });
  };
}
