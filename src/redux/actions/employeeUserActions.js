import { auth, db } from "../../boot/firebase";

import { toast } from "react-toastify";

export const EMPLOYEELOGIN = "EMPLOYEE";
export const EMPLOYEELOGINERR = "EMPLOYEELOGINERR";
export const EMPLOYEELOGOUT = "EMPLOYEELOGOUT";
export const EMPLOYEELOGOUTERR = "EMPLOYEELOGOUTERR";
export const EMPLOYEEGETUSER = "EMPLOYEEGETUSER";
export const EMPLOYEEGETUSERERR = "EMPLOYEEGETUSERERR";
export const CHANGE_ADDRESS_EMP = "CHANGE_ADDRESS_EMP";
export const CHANGE_ADDRESS_EMP_ERR = "CHANGE_ADDRESS_EMP_ERR";

export const FORGETPASSWORD = "FORGETPASSWORD";
export const FORGETPASSWORDERR = "FORGETPASSWORDERR";
export const USER_LOADING = "USER_LOADING";

//Login
export function startLoginEmployee(data) {
  return (dispatch) => {
    db.collection("employees")
      .where("email", "==", data.email)
      .get()
      .then(function(querySnapshot) {
        let datatoStore = {};
        querySnapshot.forEach(function(doc) {
          let data = doc.data();
          let docid = doc.id;
          let final = {
            ...data,
            docid,
          };
          datatoStore = final;
        });

        if (datatoStore.employeeid) {
          auth
            .signInWithEmailAndPassword(data.email, data.password)
            .then((user) => {
              auth.onAuthStateChanged((user) => {
                if (user) {
                  let data = {
                    ...datatoStore,
                    uid: user.uid,
                  };

                  try {
                    localStorage.setItem("currentApp", "employeeApp");
                  } catch (error) {
                    console.log("err", error);
                    // Error saving data
                  }

                  dispatch({
                    type: EMPLOYEELOGIN,
                    payload: data,
                  });
                } else {
                  console.log("Error occoured Try again!");
                  // toast.error("Error Occoured! Try Again");

                  dispatch({
                    type: EMPLOYEELOGINERR,
                    payload: new Date(),
                  });
                }
              });
            })
            .catch(function(error) {
              console.log("Wrong password Try again!");
              toast.error("Wrong Password! Try Again");

              dispatch({
                type: EMPLOYEELOGINERR,
                payload: new Date(),
              });
              // ...
            });
        } else {
          console.log("User not Registerd yet,Please registerd first!");
          toast.error("User Not Registered Yet! Try Again");
          dispatch({
            type: EMPLOYEELOGINERR,
            payload: new Date(),
          });
        }
      })
      .catch(function(error) {
        console.log("Error occoured Try again!");
        toast.error("Error Occoureds! Try Again");

        dispatch({
          type: EMPLOYEELOGINERR,
          payload: new Date(),
        });
      });
  };
}

//Logout
export function startLogoutEmployee(data) {
  return (dispatch) => {
    auth.signOut().then(
      function(user) {
        console.log("user from logout", user);

        try {
          localStorage.setItem("currentApp", "nill");
        } catch (error) {
          console.log("err", error);
          // Error saving data
        }

        toast.success("Successfully Logout");

        dispatch({
          type: EMPLOYEELOGOUT,
        });
      },
      function(error) {
        toast.error("Error while logout Ocoured! try Again");
      }
    );
  };
}
function loading() {
  return (dispatch) => {
    dispatch({
      type: USER_LOADING,
      payload: true,
    });
  };
}

//current user get;
export function startGetCurrentUserEmployee() {
  return (dispatch) => {
    //   var user = auth.currentUser;
    //   console.log('current user',user);
    dispatch(loading);
    auth.onAuthStateChanged((user) => {
      if (user) {
        db.collection("employees")
          .where("email", "==", user.email)
          .get()
          .then(function(querySnapshot) {
            let datatoStore = {};
            querySnapshot.forEach(function(doc) {
              let data = doc.data();
              let docid = doc.id;
              let final = {
                ...data,
                docid,
              };
              datatoStore = final;
            });

            if (datatoStore.employeeid) {
              let data = {
                ...datatoStore,
                uid: user.uid,
              };

              dispatch({
                type: EMPLOYEEGETUSER,
                payload: data,
              });
            } else {
              dispatch({
                type: EMPLOYEEGETUSERERR,
                payload: "nill",
              });
            }
          });
      } else {
        dispatch({
          type: EMPLOYEEGETUSERERR,
          payload: "nill",
        });
      }
    });
  };
}

//ForgetPassword
export function startRessetPassword(data) {
  return (dispatch) => {
    auth
      .sendPasswordResetEmail(data)
      .then(function() {
        toast.success("Please Check Your Email Address!");
        dispatch({
          type: FORGETPASSWORD,
        });
      })
      .catch(function(error) {
        // An error happened.
        toast.error("Error Occoureds! Try Again");
        dispatch({
          type: FORGETPASSWORDERR,
        });
      });
  };
}

export function changeAddress(newAddress) {
  console.log("==========action file==========================");
  console.log(newAddress);
  console.log("====================================");

  return (dispatch) => {
    db.collection("employees")
      .doc(newAddress.docid)
      .update(newAddress)
      .then(function(doc) {
        console.log("=========doc data===========================");
        console.log(doc);
        console.log("====================================");

        dispatch({
          type: CHANGE_ADDRESS_EMP,
          payload: newAddress,
        });
      })
      .catch(function(error) {
        console.log(
          "=========CHANGE_ADDRESS_EMP_ERR==========================="
        );
        console.log(error);
        console.log("====================================");
        dispatch({
          type: CHANGE_ADDRESS_EMP_ERR,
        });
      });
  };
}
