import { db } from "../../boot/firebase";
import axios from "axios";
import firebase from "firebase";
import { client_url, payrollApi } from "../../EndPoint";
import moment from "moment";
import { toast } from "react-toastify";
export const EMPLOYE_CHECKIN = "EMPLOYE_CHECKIN";
export const EMPLOYE_CHECKOUT = "EMPLOYE_CHECKOUT";
export const GET_EMP_STATUS = "GET_EMP_STATUS";
export const GET_EMP_OLD_STATUS = "GET_EMP_OLD_STATUS";
export const SUBMIT_RECORD = "SUBMIT_RECORD";
export const DELETE_RECORD = "DELETE_RECORD";

export const SUBMIT_RECORD_ERR = "SUBMIT_RECORD_ERR";
export const RECORD_ATTEND = "RECORD_ATTEND";
export const RECORD_ATTEND_ERR = "RECORD_ATTEND_ERR";
export const SET_DEFAULT = "SET_DEFAULT";
export const GET_WEEK_STATUS = "GET_WEEK_STATUS";
export const GET_WEEK_STATUS_ERR = "GET_WEEK_STATUS_ERR";
export const START_BREAK = "START_BREAK";
export const START_BREAK_ERR = "START_BREAK_ERR";
export const BREAK_DATA = "BREAK_DATA";
export const DEFAULT_VALUE = "DEFAULT_VALUE";
export const GETEMPLOYERATTENDANCE = "GETEMPLOYERATTENDANCE";
export const GETEMPLOYERATTENDANCEERR = "GETEMPLOYERATTENDANCEERR";
export const GETEMPLOYEEATTENDANCE = "GETEMPLOYEEATTENDANCE";
export const GETEMPLOYEEATTENDANCEERR = "GETEMPLOYEEATTENDANCEERR";

export function employeCheckIn(checkInData) {
  console.log("==========action==========================");
  console.log(checkInData);
  console.log("====================================");

  return (dispatch) => {
    db.collection("attendance")
      .add(checkInData)
      .then(function(docRef) {
        const id = docRef.id;
        const dataToStore = { id, ...checkInData };

        dispatch({
          type: EMPLOYE_CHECKIN,
          payload: dataToStore,
        });
        toast.success("Successfully Checked-in");
      })
      .catch(function(error) {
        console.log("====================================");
        console.log(error);
        console.log("====================================");
        toast.error("Error occur, try again later");
      });
  };
}

export function employeCheckOut(checkOutData) {
  console.log("==========action==========================");
  console.log(checkOutData);
  console.log("====================================");

  return (dispatch) => {
    db.collection("attendance")
      .doc(checkOutData.id)
      .update(checkOutData)
      .then(function(doc) {
        console.log("=========doc data===========================");
        console.log(doc);
        console.log("====================================");

        dispatch({
          type: EMPLOYE_CHECKOUT,
          payload: checkOutData,
        });
        toast.success("Successfully Checked-out");
      })
      .catch(function(error) {
        console.log("====================================");
        console.log(error);
        console.log("====================================");
        toast.error("Error occur, try again later");
      });
  };
}

export function getEmployeStatus(empid, timeMode) {
  return (dispatch) => {
    db.collection("attendance")
      .where("employeeUid", "==", empid)

      .onSnapshot(
        function(querySnapshot) {
          let datatoStore = [];
          let currentWeekAtd = [];
          let lastWeekAtd = [];

          // pre monday
          var prevMonday = new Date();
          prevMonday.setDate(
            prevMonday.getDate() - ((prevMonday.getDay() + 6) % 7)
          );

          console.log("prevMonday", prevMonday);

          querySnapshot.forEach((doc) => {
            let data = doc.data();

            const id = doc.id;
            if (
              moment(data.checkInTime.toDate()).format("MMM/DD/YYYY") >=
              moment(prevMonday).format("MMM/DD/YYYY")
            ) {
              currentWeekAtd.push({ id, ...data });
              return currentWeekAtd;
            } else {
              lastWeekAtd.push({ id, ...data });
              return lastWeekAtd;
            }
          });

          if (lastWeekAtd.length > 0) {
            console.log("===========lastWeekAtd=========================");
            console.log(lastWeekAtd);
            console.log("====================================");
            // lastWeekAtd = lastWeekAtd.sort()

            dispatch({
              type: GET_EMP_OLD_STATUS,
              payload: lastWeekAtd,
            });
          } else {
            console.log("==========currentWeekAtd==========================");
            console.log(currentWeekAtd);
            console.log("====================================");
            dispatch({
              type: GET_EMP_STATUS,
              payload: currentWeekAtd,
            });
          }
        },
        function(error) {
          console.log("============error========================");
          console.log(error);
          console.log("====================================");
        }
      );
  };
}

export function submitRecord(submitData) {
  console.log("==========action==========================");
  console.log(submitData);
  console.log("====================================");

  return (dispatch) => {
    axios
      .post(`${client_url}${payrollApi.create_payPeriod}`, submitData)

      .then((res) => {
        console.log("res subm", res);

        if (res.data == "successfully work done") {
          //everything working fine
          dispatch({
            type: SUBMIT_RECORD,
            // payload: dataToStore
          });
        } else {
          //err

          dispatch({
            type: SUBMIT_RECORD_ERR,
          });
        }
      })
      .catch((err) => {
        //err
        console.error("err submit", err.response);
        dispatch({
          type: SUBMIT_RECORD_ERR,
        });
      });

    // db.collection("payperiod")
    //   .add(submitData)
    //   .then(function(docRef) {
    //     const id = docRef.id;
    //     const dataToStore = { id, ...submitData };

    //     dispatch({
    //       type: SUBMIT_RECORD,
    //       payload: dataToStore
    //     });

    //   })

    //   .catch(function(error) {
    //     console.log("====================================");
    //     console.log(error);
    //     console.log("====================================");
    //     Toast.show({
    //       text: "Error occoured Try again!",
    //       buttonText: "ok",
    //       position: "top",
    //       type: "danger",
    //       duration: 3000
    //     });
    //   });
  };
}

// export function deleteRecord(id) {

//   console.log('===========delete id=========================');
//   console.log(id);
//   console.log('====================================');
//   return dispatch => {
//     db.collection("attendance")
//       .where("employeeUid", "==", id)
//       .delete()
//       .then(function() {
//         dispatch({
//           type: DELETE_RECORD,
//           payload: id
//         });
//       })
//       .catch(function(error) {
//         console.log("===========error=========================");
//         console.log(error);
//         console.log("====================================");
//       });
//   };
// }

// manual time attendence

export function recordAttendence(attdData) {
  console.log("==========action==========================");
  console.log(attdData);
  console.log("====================================");

  return (dispatch) => {
    db.collection("attendance")
      .add(attdData)
      .then(function(docRef) {
        const id = docRef.id;
        const dataToStore = { id, ...attdData };

        dispatch({
          type: RECORD_ATTEND,
          payload: dataToStore,
        });
        toast.success("Successfully Submitted");
      })
      .catch(function(error) {
        console.log("====================================");
        console.log(error);
        console.log("====================================");
        toast.error("Error occur, try again later");
        dispatch({
          type: RECORD_ATTEND_ERR,
        });
      });
  };
}

export const setDefault = () => {
  return {
    type: SET_DEFAULT,
  };
};

// update attendance
export function updateAttnd(attdData) {
  console.log("==========action==========================");
  console.log(attdData);
  console.log("====================================");

  return (dispatch) => {
    db.collection("attendance")
      .doc(attdData.id)
      .update(attdData)
      .then(function(doc) {
        console.log("=======doc data==============================");
        console.log(doc);
        console.log("====================================");

        dispatch({
          type: RECORD_ATTEND,
        });
        toast.success("Successfully Submitted");
      })
      .catch(function(error) {
        console.log("====================================");
        console.log(error);
        console.log("====================================");
        toast.error("Error occur, try again later");
        dispatch({
          type: RECORD_ATTEND_ERR,
        });
      });
  };
}

export function getWeekStatus(data) {
  console.log("data", data);

  return (dispatch) => {
    db.collection("attendenceWeeks")
      .where("employeeUid", "==", data)
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
            type: GET_WEEK_STATUS,
            payload: datatoStore[0],
          });
        },
        (err) => {
          console.log(err);
        }
      );
  };
}

// start Break

export function breakStart(data) {
  return (dispatch) => {
    db.collection("attendance")
      .doc(data.id)
      .update({
        dayBreaks: firebase.firestore.FieldValue.arrayUnion(data),
      })
      .then(function(doc) {
        console.log("=========doc data===========================");
        console.log(doc);
        console.log("====================================");

        dispatch({
          type: START_BREAK,
        });
        toast.success("Successfully Started");
      })
      .catch(function(error) {
        console.log("====================================");
        console.log(error);
        console.log("====================================");
        toast.error("Error occur, try again later");
        dispatch({
          type: START_BREAK_ERR,
        });
      });
  };
}
export function breakEnd(data, id) {
  return (dispatch) => {
    db.collection("attendance")
      .doc(id)
      .update(data)
      .then(function(doc) {
        console.log("=========doc data===========================");
        console.log(doc);
        console.log("====================================");

        dispatch({
          type: START_BREAK,
        });
        toast.success("Successfully Ended");
      })
      .catch(function(error) {
        console.log("====================================");
        console.log(error);
        console.log("====================================");
        toast.error("Error occur, try again later");
        dispatch({
          type: START_BREAK_ERR,
        });
      });
  };
}

export const defaultValue = () => {
  return {
    type: DEFAULT_VALUE,
  };
};

export function getAttendance(id) {
  return async (dispatch) => {
    db.collection("attendance")
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
            type: GETEMPLOYERATTENDANCE,
            payload: datatoStore,
          });
        },
        function(error) {
          dispatch({
            type: GETEMPLOYERATTENDANCEERR,
            payload: new Date(),
          });
        }
      );
  };
}

export function getEmployeeAttendance(id) {
  return async (dispatch) => {
    db.collection("attendance")
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
            type: GETEMPLOYEEATTENDANCE,
            payload: datatoStore,
          });
        },
        function(error) {
          dispatch({
            type: GETEMPLOYEEATTENDANCEERR,
            payload: new Date(),
          });
        }
      );
  };
}
