import { db } from "../../boot/firebase";
import { toast } from "react-toastify";
import { client_url, taskApi } from "../../EndPoint";
import axios from "axios";
// add task type const
export const ADD_TASK = "ADD_TASK";
// add paperwork type const
export const PAPERWORK_TASK = "PAPERWORK_TASK";
// get all task type const
export const GET_TASK = "GET_TASK";

// update task type const
export const UPDATE_TASK = "UPDATE_TASK";
export const UPDATE_TASK_ERR = "UPDATE_TASK_ERR";

// delete task type const
export const DELETE_TASK = "DELETE_TASK";
export const DELETE_TASK_ERR = "DELETE_TASK_ERR";
// completed task add type const
export const COMPL_TASK = "COMPL_TASK";
export const COMPL_TASK_ERR = "COMPL_TASK_ERR";
// Get all completed task type const
export const GT_COMP_TASK = "GT_COMP_TASK";
// add task type own task
export const ADD_OWN_TASK = "ADD_OWN_TASK";
// Get task type own task
export const GET_OWN_TASK = "GET_OWN_TASK";

// delete task type const
export const DELETE_OWN_TASK = "DELETE_OWN_TASK";
export const DELETE_OWN_TASK_ERR = "DELETE_OWN_TASK_ERR";

//get logs
export const GET_ALL_LOG = "GET_ALL_LOG";

// add task function
export function addTask(data) {
  return (dispatch) => {
    db.collection("tasks")
      .add(data)
      .then(function(docRef) {
        const id = docRef.id;
        // const Taskdata = docRef.data();
        const dataToStore = { id, ...data };

        // toast.success("Task added successfully");
        dispatch({
          type: ADD_TASK,
          payload: dataToStore,
        });
      })
      .catch(function(error) {
        toast.error("Error occured. Please try again later");
      });
  };
}

export function addEmpTask(data, history) {
  // "https://us-central1-promising-saga-232017.cloudfunctions.net/restfullapi/addEmpTask",
  return (dispatch) => {
    axios
      .post(`${client_url}${taskApi.add_task}`, data)
      .then((res) => {
        console.log("res while add task", res.data);

        if (res.data === "successfully added") {
          history.push("/home/employeer/employeeTask");
          dispatch({
            type: ADD_TASK,
          });
        } else {
          toast.error("Error occured. Please try again later");
        }
      })
      .catch((err) => {
        console.log("=========in while adding doc============");
        console.log(err);
        console.log("====================================");
        toast.error("Error occured. Please try again later");
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
export function getTask(data) {
  console.log("data", data);

  return (dispatch) => {
    db.collection("tasks")
      .where("uid", "==", data)
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
        console.log("============datatoStore========================");
        console.log(datatoStore);
        console.log("====================================");

        dispatch({
          type: GET_TASK,
          payload: datatoStore,
        });
      });
  };
}

// update action

export function updateTask(data) {
  return (dispatch) => {
    db.collection("tasks")
      .doc(data.id)
      .set(data)
      .then(function(docRef) {
        dispatch({
          type: UPDATE_TASK,
          payload: data,
        });
        toast.success("successfully updated");
      })
      .catch(function(error) {
        toast.error("Error ocurred! try again later");
        dispatch({
          type: UPDATE_TASK_ERR,
        });
      });
  };
}

// to add completed task
export function completedTask(data) {
  console.log("good! you are at Action file: ", data);
  return (dispatch) => {
    db.collection("tasks")
      .doc(data.id)
      .set(data)
      .then(function(docRef) {
        dispatch({
          type: COMPL_TASK,
          payload: data,
        });
        toast.success("Successfully Completed");
      })
      .catch(function(error) {
        toast.error("Error occured! try again later");

        dispatch({
          type: COMPL_TASK_ERR,
        });
      });
  };
}

// action for delete task

export function deleteTask(id) {
  return (dispatch) => {
    db.collection("tasks")
      .doc(id)
      .delete()
      .then(function() {
        dispatch({
          type: DELETE_TASK,
          payload: id,
        });
        toast.success("Successfully Deleted");
      })

      .catch(function(error) {
        toast.error("Error occured! try again later");

        dispatch({
          type: DELETE_TASK_ERR,
        });
      });
  };
}

// Get all Completed task
export function getCompletedTask(data) {
  return (dispatch) => {
    db.collection("tasks")
      .where("uid", "==", data)
      .onSnapshot(function(querySnapshot) {
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
          payload: datatoStore,
        });
      });
  };
}

//  add own task function
export function addOwnTask(data, history) {
  return (dispatch) => {
    db.collection("owntask")
      .add(data)
      .then(function(docRef) {
        const id = docRef.id;
        // const Taskdata = docRef.data();
        const dataToStore = { id, ...data };

        // Toast.show({
        //   text: "Task added successfully",
        //   type: "success",
        //   duration: 3000,
        //   position: "top"
        // });
        toast.success("Task added successfully");

        history.push("/home/employeer/ownTask");
        dispatch({
          type: ADD_OWN_TASK,
          payload: dataToStore,
        });
      })
      .catch(function(error) {
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
  return (dispatch) => {
    db.collection("owntask")
      .where("uid", "==", data)

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
          type: GET_OWN_TASK,
          payload: datatoStore,
        });
      })
      .catch(function(error) {
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
  return (dispatch) => {
    db.collection("owntask")
      .doc(id)
      .delete()
      .then(function() {
        dispatch({
          type: DELETE_OWN_TASK,
          payload: id,
        });
        toast.success("Successfully Deleted");
      })
      .catch(function(error) {
        toast.error("Error occur, try again later");

        dispatch({
          type: DELETE_OWN_TASK_ERR,
        });
      });
  };
}

export function getLogs(data) {
  return (dispatch) => {
    db.collection("taskLogs")
      .where("uid", "==", data)
      .onSnapshot(
        function(querySnapshot) {
          let datatoStore = [];
          querySnapshot.forEach(function(doc) {
            const data = doc.data();
            const key = doc.id;
            datatoStore.push({ ...data, key });

            return datatoStore;
          });

          dispatch({
            type: GET_ALL_LOG,
            payload: datatoStore,
          });
        },
        function(error) {
          console.log("error", error);
        }
      );
  };
}
