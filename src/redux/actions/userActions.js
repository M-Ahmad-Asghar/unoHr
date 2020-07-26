import { auth, db } from "../../boot/firebase";
import { toast } from "react-toastify";
export const LOGIN = "LOGIN";
export const LOGINERR = "LOGINERR";
export const LOGOUT = "LOGOUT";
export const LOGOUTERR = "LOGOUTERR";
export const GETUSER = "GETUSER";
export const GETUSERERR = "GETUSERERR";
export const CHANGE_ADDRESS = "CHANGE_ADDRESS";
export const CHANGE_ADDRESS_ERR = "CHANGE_ADDRESS_ERR";
export const UPDATE_FACILITY = "UPDATE_FACILITY";
export const UPDATE_FACILITY_ERR = "UPDATE_FACILITY_ERR";
export const SET_DEFAULT = "SET_DEFAULT";

//Login
export function startLogin(data) {
  return dispatch => {
    db.collection("employers")
      .where("email", "==", data.email)
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

        if (datatoStore.stripeCustomer) {
          if (datatoStore.status === "active") {
            auth
              .signInWithEmailAndPassword(data.email, data.password)
              .then(users => {
                auth.onAuthStateChanged(user => {
                  if (user) {
                    let data = {
                      ...datatoStore,
                      uid: user.uid
                    };

                    //  toast.success('Succesfull Login!');

                    try {
                      localStorage.setItem("currentApp", "employerApp");
                    } catch (error) {
                      console.log("err", error);
                      // Error saving data
                    }

                    dispatch({
                      type: LOGIN,
                      payload: data
                    });
                  } else {
                    // toast.error('Error Occoured try again!');
                    dispatch({
                      type: LOGINERR,
                      payload: new Date()
                    });
                  }
                });

                // let data = {
                //   email: user.email,
                //   uid: user.uid
                // };
              })
              .catch(function(error) {
                // Handle Errors here.

                console.log("err from fire", error);

                toast.error("Wrong Password try again!");

                dispatch({
                  type: LOGINERR,
                  payload: new Date()
                });
                // ...
              });
          } else {
            toast.error(
              "Your account is blocked by Admin, Contact to admin for more information"
            );

            dispatch({
              type: LOGINERR,
              payload: new Date()
            });
          }
        } else {
          console.log("User not Registerd yet,Please registerd first!");

          toast.error("User not Registerd yet,Please registerd first!");

          dispatch({
            type: LOGINERR,
            payload: new Date()
          });
        }
      })
      .catch(function(error) {
        console.log("Error occoured Try again!");

        toast.error("Error occoured Try again!");

        dispatch({
          type: LOGINERR,
          payload: new Date()
        });
      });
  };
}

//Logout
export function startLogout(data) {
  return dispatch => {
    auth.signOut().then(
      function() {
        try {
          localStorage.setItem("currentApp", "nill");
        } catch (error) {
          console.log("err", error);
          // Error saving data
        }
        toast.success("Successfully Logout");

        dispatch({
          type: LOGOUT
        });
      },
      function(error) {
        toast.error("Error occoured Try again!");
      }
    );
  };
}

//current user get;
export function startGetCurrentUser() {
  return dispatch => {
    //   var user = auth.currentUser;

    auth.onAuthStateChanged(user => {
      console.log("current user", user);
      if (user) {
        db.collection("employers")
          .where("email", "==", user.email)
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

            if (datatoStore.stripeCustomer) {
              if (datatoStore.status == "active") {
                let datas = {
                  ...datatoStore,
                  uid: user.uid
                };
                console.log("data from net", datas);
                dispatch({
                  type: GETUSER,
                  payload: datas
                });
              } else {
                dispatch({
                  type: GETUSERERR,
                  payload: "nill"
                });
                toast.error(
                  "Your account is blocked by Admin, Contact to admin for more information"
                );
              }
            } else {
              dispatch({
                type: GETUSERERR,
                payload: "nill"
              });
            }
          });
      } else {
        dispatch({
          type: GETUSERERR,
          payload: "nill"
        });
      }
    });
  };
}

//ForgetPassword
export function startRessetPassword(data) {
  return dispatch => {
    auth
      .sendPasswordResetEmail(data)
      .then(function() {
        // Email sent.
      })
      .catch(function(error) {
        // An error happened.
      });
  };
}

export function changeAddress(newAddress) {
  console.log("==========action file==========================");
  console.log(newAddress);
  console.log("====================================");

  return dispatch => {
    db.collection("employers")
      .doc(newAddress.docid)
      .update(newAddress)
      .then(function(doc) {
        console.log("=========doc data===========================");
        console.log(doc);
        console.log("====================================");

        dispatch({
          type: CHANGE_ADDRESS,
          payload: newAddress
        });
      })
      .catch(function(error) {
        console.log("=========CHANGE_ADDRESS_ERR===========================");
        console.log(error);
        console.log("====================================");
        dispatch({
          type: CHANGE_ADDRESS_ERR
        });
      });
  };
}

// employees Facilities management
export function updateFacilities(empArray, data) {
  let batch = db.batch();

  empArray.forEach(element => {
    var sfRef = db.collection("employees").doc(element.id);
    batch.update(sfRef, data);
  });

  return dispatch => {
    batch
      .commit()
      .then(function(res) {
        dispatch({
          type: UPDATE_FACILITY
        });
        toast.success("Successfully updated!");
      })
      .catch(err => {
        console.log("err in fa", err);
        toast.error("Error occoured Try again!");

        dispatch({
          type: UPDATE_FACILITY_ERR
        });
      });
  };
}
export function setDefault() {
  return {
    type: SET_DEFAULT
  };
}
