import axios from "axios";
// import { Toast } from "native-base";
import { db } from "../../boot/firebase";
import { toast } from "react-toastify";

export const GETEMPLOYE = "GETEMPLOYE";
export const GETEMPLOYEERR = "GETEMPLOYEERR";

export const EMPLOYEESIGNUP = "EMPLOYEESIGNUP";
export const EMPLOYEESIGNUPERR = "EMPLOYEESIGNUPERR";

export const RESETSIGNUPLOADER = "RESETSIGNUPLOADER";

export const UPDATE_EMPLOYEE = "UPDATE_EMPLOYEE";
export const UPDATE_EMPLOYEE_ERR = "UPDATE_EMPLOYEE_ERR";

//ForgetPassword
export function getEmployeData(id) {
  return dispatch => {
    db.collection("employees")
      .where("employeeid", "==", id)
      .get()
      .then(function(querySnapshot) {
        let datatoStore = {};
        querySnapshot.forEach(function(doc) {
          let data = doc.data();
          let docid = doc.id;
          let final = {
            ...data,
            docid
          };
          datatoStore = final;
        });

        if (datatoStore.employeeid) {
          dispatch({
            type: GETEMPLOYE,
            payload: datatoStore
          });
        } else {
          dispatch({
            type: GETEMPLOYEERR,
            payload: "err"
          });
        }
      })
      .catch(function(error) {
        dispatch({
          type: GETEMPLOYEERR,
          payload: "err"
        });
      });
  };
}
//ForgetPassword
export function employeeSignup(data) {
  console.log("aciton file employee signUp: ", data);
  return dispatch => {
    axios
      .post(
        "https://us-central1-promising-saga-232017.cloudfunctions.net/restfullapi/employeeSignUp",
        data
      )
      .then(res => {
        console.log("res", res.data);

        if (res.data == "successfully signup") {
          console.log("Successfully registered employee!");

          toast.success("Successfully registered employee!");
          dispatch({ type: EMPLOYEESIGNUP });
        } else {
          console.log("Error Has Occurred! Try again", res);
          if(res.data.body._embedded.errors[0].message) {
            toast.error(res.data.body._embedded.errors[0].message);
            dispatch({ type: EMPLOYEESIGNUPERR });
          } else {
            toast.error(res.data.message);
            dispatch({ type: EMPLOYEESIGNUPERR });
          }
        }
      })

      .catch(err => {
        toast.error("Error Has Occurred! Try again!");
        console.error("err", err);
        dispatch({ type: EMPLOYEESIGNUPERR });
      });
  };
}

export function updateEmployeeMobNumber(data) {
  return dispatch => {
    db.collection("employees")
      .doc(data.id)
      .update({cell: data.cell})
      .then(function(docRef) {
        dispatch({
          type: "UPDATE_MOB_NUMBER"
        });
      })
      .catch(function(error) {
        toast.error("An error occurred while updating mobile number!");
      });
  };
}

export function resetSignUpLoader() {
  return { type: RESETSIGNUPLOADER };
}

export function updateEmployee(data) {
  return dispatch => {
    db.collection("employees")
      .doc(data.docid)
      .update({ [data.name] : data.value})
      .then(function(docRef) {
        dispatch({
          type: UPDATE_EMPLOYEE
        });
        toast.success("Employee updated successfully!");
      })
      .catch(function(error) {
        dispatch({
          type: UPDATE_EMPLOYEE_ERR
        });
        toast.error("An error occurred while updating employee!");
      });
  };
}