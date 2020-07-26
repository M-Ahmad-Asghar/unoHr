import { db } from "../../boot/firebase";
import { toast } from "react-toastify";
// add task type const

export const GET_EMP_SHADULE = "GET_EMP_SHADULE";
export const GET_EMP_SHADULE_ERR = "GET_EMP_SHADULE_ERR";
export const CONTECT_EMPLOYEE = "CONTECT_EMPLOYEE";
export const CONTECT_EMPLOYEE_ERR = "CONTECT_EMPLOYEE_ERR";

export function getEmpSchadule(data) {
  console.log("data", data);

  return dispatch => {
    db.collection("shadule")
      .where("employeeid", "==", data)
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
            type: GET_EMP_SHADULE,
            payload: datatoStore
          });
        },
        error => {
          dispatch({
            type: GET_EMP_SHADULE_ERR
          });
        }
      );
  };
}
export function contactEmp(data) {
  console.log("data", data);

  return dispatch => {
    db.collection("contact")
      .add(data)
      .then(function(docRef) {
        const id = docRef.id;
        // const Taskdata = docRef.data();
        const dataToStore = { id, ...data };
        
        dispatch({
          type: CONTECT_EMPLOYEE,
          payload: dataToStore
        });
        toast.success("Successfully sent");
      })
      .catch(function(error) {
        dispatch({
          type: CONTECT_EMPLOYEE_ERR
        });
        toast.error("Error occured! try again later");
      });
  };
}
