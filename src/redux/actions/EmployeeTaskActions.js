import { db } from "../../boot/firebase";
// import { Toast } from "native-base";

// add task type const
export const ADD_TASK = "ADD_TASK";
// add paperwork type const
export const PAPERWORK_TASK = "PAPERWORK_TASK";
// get all task type const
export const GET_TASK = "GET_TASK";

// update task type const
export const UPDATE_TASK = "UPDATE_TASK";

// delete task type const
export const DELETE_TASK = "DELETE_TASK";
// completed task add type const
export const COMPL_TASK = "COMPL_TASK";
// Get all completed task type const
export const GT_COMP_TASK = "GT_COMP_TASK";
// add task type own task
export const ADD_EMP_OWN_TASK = "ADD_EMP_OWN_TASK";
// Get task type own task
export const GET_OWN_TASK_EE = "GET_OWN_TASK_EE";

// delete task type const
export const DELETE_OWN_TASK = "DELETE_OWN_TASK";

// add task function
export function addTask(data) {
  return dispatch => {
    db.collection("tasks")
      .add(data)
      .then(function(docRef) {
        const id = docRef.id;
        // const Taskdata = docRef.data();
        const dataToStore = { id, ...data };

        dispatch({
          type: ADD_TASK,
          payload: dataToStore
        });
      })
      .catch(function(error) {
          console.log('Error occoured Try again!');
        // Toast.show({
        //   text: "Error occoured Try again!",
        //   buttonText: "ok",
        //   position: "top",
        //   type: "danger"
        // });
      });
  };
}

// // add paperwork task function
// export function addPaperWorkTask(data) {
//   return dispatch => {
//     db.collection("paperworktask")
//       .add(data)
//       .then(function(docRef) {
//         const id = docRef.id;
//         // const Taskdata = docRef.data();
//         const dataToStore = { id, ...data };
//         console.log("=======doc ref=============================");
//         console.log(dataToStore);
//         console.log("====================================");

//         dispatch({
//           type: PAPERWORK_TASK,
//           payload: dataToStore
//         });
//       })
//       .catch(function(error) {
//         Toast.show({
//           text: "Error occoured Try again!",
//           buttonText: "ok",
//           position: "top",
//           type: "danger"
//         });
//       });
//   };
// }

// Get all task
export function getTask(uid, empid) {
  return dispatch => {
    db.collection("tasks")
      .where("uid", "==", uid)
      .where("employeeid", "==", empid)
      .onSnapshot(function(querySnapshot) {
        let datatoStore = [];
        querySnapshot.forEach(function(doc) {
          const data = doc.data();
          const id = doc.id;
          if (data.DueTime !== "Completed") {
            datatoStore.push({ id, ...data });
          }
          return datatoStore;
        });

        dispatch({
          type: GET_TASK,
          payload: datatoStore
        });
      })
      // .catch(function(error) {
     
      // });
  };
}

// update action

export function updateTask(data) {
  return dispatch => {
    db.collection("tasks")
      .doc(data.id)
      .set(data)
      .then(function(docRef) {
        dispatch({
          type: UPDATE_TASK,
          payload: data
        });
      })
      .catch(function(error) {
        console.log('Error occoured Try again!');
        // Toast.show({
        //   text: "Error occoured Try again!",
        //   buttonText: "ok",
        //   position: "top",
        //   type: "danger"
        // });
      });
  };
}

// to add completed task
export function completedTask(data) {
  return dispatch => {
    db.collection("tasks")
      .doc(data.id)
      .set(data)
      .then(function(docRef) {
        dispatch({
          type: COMPL_TASK,
          payload: data
        });
      })
      .catch(function(error) {
        console.log('Error occoured Try again!');
        // Toast.show({
        //   text: "Error occoured Try again!",
        //   buttonText: "ok",
        //   position: "top",
        //   type: "danger"
        // });
      });
  };
}

// action for delete task

export function deleteTask(id) {
  return dispatch => {
    db.collection("tasks")
      .doc(id)
      .delete()
      .then(function() {
        dispatch({
          type: DELETE_TASK,
          payload: id
        });
      })
      .catch(function(error) {
        console.log('Error occoured Try again!');
        // Toast.show({
        //   text: "Error occoured Try again!",
        //   buttonText: "ok",
        //   position: "top",
        //   type: "danger"
        // });
      });
  };
}

// Get all Completed task
export function getCompletedTask(data) {
  return dispatch => {
    db.collection("tasks")
      .where("uid", "==", data)
      .get()
      .then(function(querySnapshot) {
        let datatoStore = [];
        querySnapshot.forEach(function(doc) {
          const data = doc.data();
          const id = doc.id;

          if (data.DueTime == "Completed") {
            datatoStore.push({ id, ...data });
          }
          return datatoStore;
        });
        dispatch({
          type: GT_COMP_TASK,
          payload: datatoStore
        });
      })
      .catch(function(error) {
        console.log('Error occoured Try again!');
        // Toast.show({
        //   text: "Error occoured Try again!",
        //   buttonText: "ok",
        //   position: "top",
        //   type: "danger"
        // });
      });
  };
}

//  add own task function
export function addEmpOwnTask(data) {
  // console.log("==========own data==========================");
  // console.log(data);
  // console.log("====================================");
  return dispatch => {
    db.collection("owntask")
      .add(data)
      .then(function(docRef) {
        const id = docRef.id;
        // const Taskdata = docRef.data();
        const dataToStore = { id, ...data };

        // console.log("=========dataToStore own===========================");
        // console.log(dataToStore);
        // console.log("====================================");

        dispatch({
          type: ADD_EMP_OWN_TASK,
          payload: dataToStore
        });
      })
      .catch(function(error) {
        console.log('Error occoured Try again!');
        // Toast.show({
        //   text: "Error occoured Try again!",
        //   buttonText: "ok",
        //   position: "top",
        //   type: "danger"
        // });
      });
  };
}

export function getOwnTask(data) {
  console.log('own id is at action: ', data)
  return dispatch => {
    db.collection("owntask")
      .where("employeeid", "==", data)
      .get()
      .then(function(querySnapshot) {
        let datatoStore = [];
        querySnapshot.forEach(function(doc) {
          const data = doc.data();
          const id = doc.id;

          datatoStore.push({ id, ...data });

          return datatoStore;
        });
        dispatch({
          type: GET_OWN_TASK_EE,
          payload: datatoStore
        });
      })
      .catch(function(error) {
        console.log('Error occoured Try again!');
        // Toast.show({
        //   text: "Error occoured Try again!",
        //   buttonText: "ok",
        //   position: "top",
        //   type: "danger"
        // });
      });

  };
}

// action for delete own task

export function deletOwnTask(id) {
  return dispatch => {
    db.collection("owntask")
      .doc(id)
      .delete()
      .then(function() {
        dispatch({
          type: DELETE_OWN_TASK,
          payload: id
        });
      })
      .catch(function(error) {
        console.log('Error occoured Try again!');

        // Toast.show({
        //   text: "Error occoured Try again!",
        //   buttonText: "ok",
        //   position: "top",
        //   type: "danger"
        // });
      });
  };
}
