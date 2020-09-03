import { toast } from "react-toastify";
import { auth, db } from "../../boot/firebase";

export const UPDATE_EMPLOYER = "UPDATE_EMPLOYER";
export const UPDATE_EMPLOYEE_PROFILE = "UPDATE_EMPLOYEE_PROFILE";

//for empolyer

export function updateEmployer(data, cb) {
  return (dispatch) => {
    console.log("data is here====>", data);
    db.collection("employers")
      .doc(data.docid)
      .update({ [data.name]: data.value })
      .then(function(docRef) {
        toast.success("successfully updated");
        dispatch({
          type: UPDATE_EMPLOYER,
          payload: data,
        });
        cb();
      })
      .catch(function(error) {
        // dispatch({
        //   type: UPDATE_EMPLOYER_ERR,
        // });
        console.log(error);
        toast.error("An Error Occurred!");
      });
  };
}

export function startRessetPassword(data, cb) {
  return (dispatch) => {
    auth
      .sendPasswordResetEmail(data)
      .then(function() {
        toast.success("please check your email");
        cb();
      })
      .catch(function(error) {
        toast.error("An Error Occurred!");
      });
  };
}

//for employee

export function updateEmployee(data, cb) {
  console.log("your data===>", data);
  return (dispatch) => {
    db.collection("employees")
      .doc(data.docid)
      .update({ [data.name]: data.value })
      .then(function(docRef) {
        toast.success("successfully updated");

        dispatch({
          type: UPDATE_EMPLOYEE_PROFILE,
          payload: data,
        });
        cb();
      })
      .catch(function(error) {
        console.log(error);
        toast.error("An Error Occurred!");
      });
  };
}
