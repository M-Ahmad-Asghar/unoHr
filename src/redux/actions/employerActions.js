import axios from "axios";
import { toast } from "react-toastify";
import { db } from "../../boot/firebase";
import { client_url, authApi, payrollApi } from "../../EndPoint";
export const ADDNEWEMPLOYEE = "ADDNEWEMPLOYEE";
export const ADDNEWEMPLOYEEERR = "ADDNEWEMPLOYEEERR";

export const ADDNEWEMPLOYER = "ADDNEWEMPLOYER";
export const ADDNEWEMPLOYERERR = "ADDNEWEMPLOYERERR";

export const GT_ALL_EMPLOY = "GT_ALL_EMPLOY";
export const GET_EMP_WK_STATUS = "GET_EMP_WK_STATUS";
export const GET_EMP_STATUS_ERR = "GET_EMP_STATUS_ERR";
export const GET_EMP_PAYPERIOD = "GET_EMP_PAYPERIOD";
export const GET_EMP_PAYPERIOD_ERR = "GET_EMP_PAYPERIOD_ERR";
export const CREATE_PAYSTUB = "CREATE_PAYSTUB";
export const CREATE_PAYSTUB_ERR = "CREATE_PAYSTUB_ERR";
export const DELETE_MESSAGE = "DELETE_MESSAGE";
export const REQUEST_BACKGROUND_CHECK_ERR = "REQUEST_BACKGROUND_CHECK_ERR";
export const REQUEST_BACKGROUND_CHECK = "REQUEST_BACKGROUND_CHECK";

export const VERIFY_NO = "VERIFY_NO";
export const GET_SYS_DOC = "GET_SYS_DOC";
export const GET_SYS_DOC_ERR = "GET_SYS_DOC_ERR";
export const CHANGE_TIMEMODE = "CHANGE_TIMEMODE";
export const CHANGE_TIMEMODE_ERR = "CHANGE_TIMEMODE_ERR";

//ForgetPassword
export function registerEmployer(data) {
  console.log("At action employer sign up", data);
  return (dispatch) => {
    axios
      .post(`${client_url}${authApi.employer_singup}`, data)
      .then((res) => {
        console.log("response", res);
        if (res.data == "successfully registered user") {
          console.log("Successfully created employeer!");
          toast.success("Successfully registered employer!");
          dispatch({ type: ADDNEWEMPLOYER });
        } else {
          console.log("An Error has Occurred! Please Try again", res.data);
          toast.error(res.data.message);
          dispatch({ type: ADDNEWEMPLOYERERR });
        }
      })
      .catch((err) => {
        toast.error("An Error has Occurred! Please Try again");
        console.error("err from net", err);
        dispatch({ type: ADDNEWEMPLOYERERR });
      });
  };
}

//Add New Employee
export function addNewEmployee(data) {
  // "https://us-central1-promising-saga-232017.cloudfunctions.net/restfullapi/employeeRegisteration",
  console.log("at action file to invite employee", data);
  return (dispatch) => {
    axios
      .post(`${client_url}${authApi.employee_invite}`, data)
      .then((res) => {
        console.log("In Actions res", res);

        if (res.data == "successfully created employe") {
          console.log("Successfully created employee!");
          toast.success("Successfully created employee!");
          dispatch({ type: ADDNEWEMPLOYEE, payload: data });
        } else {
          console.log("Error Has been Occoured! Try again");
          toast.error(res.data.message);
          dispatch({ type: ADDNEWEMPLOYEEERR });
        }
      })

      .catch((err) => {
        toast.error("Error Has been Occoured! Try again");
        console.error("err", err);

        dispatch({ type: ADDNEWEMPLOYEEERR });
      });
  };
}

//Request Employee Background Check
export function requestBackgroundCheck(emp) {
  console.log("at action file to request employee background check", emp);
  return (dispatch) => {
    axios({
      method: "post",
      url: "https://api.turning.io/v1/person/search_async",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIiLCJzdWIiOiJiRG5NUUJtUl9HR3BlaFVVNEZLU19LRmluSDF1OTUwb29IcWppcXl6c0FnUjNLMHZXUmxiLXVPUllxZ0lFWTg9IiwiYXVkIjoiX0lfaC1vV2Y0dlFEZWE2aU9BejYyemxoaThET1V2dz0iLCJleHAiOjE1OTE3MTQxMTgsImlhdCI6MTU2MDE3ODExOH0.xZ2ZcFiZyj2rxU0279j-69-4v0cWYhtHf96emmeqwtE",
      },
      data: {
        email_candidate: "true",
        redirect_url: "https://turning.io",
        last_name: emp.lastName,
        reference_id: emp.employeeid,
        email: emp.email,
        callback_url:
          "https://us-central1-promising-saga-232017.cloudfunctions.net/restfullapi/test",
        phone_number: emp.cell,
        first_name: emp.firstName,
      },
    })
      .then((res) => {
        console.log("Background Check Response: ", res.data);

        if (
          res.data.message.message == "The operation completed successfully."
        ) {
          console.log("Employee Background check is requested successfully!");
          toast.success("Employee Background check is requested successfully!");
          dispatch({
            type: REQUEST_BACKGROUND_CHECK,
          });
          emp["request_uuid"] = res.data.message.request_uuid;
          emp["bgCheckStatus"] = "emailed";

          db.collection("employees")
            .doc(emp.id)
            .update(emp)
            .catch((error) => {
              console.log("An error occurred while updating data!");
              toast.error("An error occurred while updating data!");
              dispatch({
                type: REQUEST_BACKGROUND_CHECK_ERR,
              });
            });
        } else {
          console.log("An error has occurred! Please try again");
          toast.error("An error has occurred! Please try again");
          dispatch({
            type: REQUEST_BACKGROUND_CHECK_ERR,
          });
        }
      })

      .catch((err) => {
        toast.error("An error has occurred! Please try again");
        dispatch({
          type: REQUEST_BACKGROUND_CHECK_ERR,
        });
        console.error("err", err);
      });
  };
}

// Get all employees
export function getEmployees(data) {
  return (dispatch) => {
    db.collection("employees")
      .where("employeruid", "==", data)
      // .where("status", "==", "active")
      .onSnapshot(function(querySnapshot) {
        let datatoStore = [];
        querySnapshot.forEach(function(doc) {
          const data = doc.data();
          const id = doc.id;

          datatoStore.push({ id, ...data });
          return datatoStore;
        });
        console.log("data to store", datatoStore);

        dispatch({
          type: GT_ALL_EMPLOY,
          payload: datatoStore,
        });
      });
  };
}

// get employees week timeline

export function getEmployeStatus(empUid) {
  console.log("======data fro action==============================");
  console.log(empUid);
  console.log("====================================");

  return (dispatch) => {
    db.collection("attendance")
      .where("employeeUid", "==", empUid)
      // .orderBy("day")
      .onSnapshot(
        function(querySnapshot) {
          let datatoStore = [];
          querySnapshot.forEach((doc) => {
            let data = doc.data();

            const id = doc.id;
            datatoStore.push({ id, ...data });

            return datatoStore;
          });
          console.log(
            "========action checking data============================"
          );
          console.log(datatoStore);
          console.log("====================================");

          dispatch({
            type: GET_EMP_WK_STATUS,
            payload: datatoStore,
          });
        },
        function(error) {
          dispatch({
            type: GET_EMP_STATUS_ERR,
          });
        }
      );
  };
}

// get pay period

export function getPayPariod(id) {
  return (dispatch) => {
    db.collection("payperiod")
      .where("employeeUid", "==", id)
      .onSnapshot(
        function(querySnapshot) {
          let datatoStore = [];
          querySnapshot.forEach(function(doc) {
            const data = doc.data();
            const id = doc.id;
            datatoStore.push({ id, ...data });

            return datatoStore;
          });
          console.log("===========datatoStore=========================");
          console.log(datatoStore);
          console.log("====================================");

          dispatch({
            type: GET_EMP_PAYPERIOD,
            payload: datatoStore,
          });
        },
        function(error) {
          dispatch({
            type: GET_EMP_PAYPERIOD_ERR,
          });
        }
      );
  };
}

// for creating paystub
export function createPayStub(payStubData) {
  console.log("===========id from action=========================");
  console.log(payStubData);
  console.log("====================================");

  // "https://us-central1-promising-saga-232017.cloudfunctions.net/superAdminApi/generatePayStubs",
  return (dispatch) => {
    axios
      .post(`${client_url}${payrollApi.generate_payStubs}`, payStubData)
      .then((res) => {
        console.log("PayStubResponse", res.data);
        if (res.data === "successfully work done") {
          dispatch({
            type: CREATE_PAYSTUB,
            payload: payStubData.id,
          });
        } else {
          console.log("else");

          dispatch({ type: CREATE_PAYSTUB_ERR });
        }
        //err
      })
      .catch((err) => {
        //err
        console.error("err", err);
        dispatch({ type: CREATE_PAYSTUB_ERR });
      });
  };
}

// verify number
export function verifyNumber(data) {
  return (dispatch) => {
    axios
      .post(
        " https://us-central1-promising-saga-232017.cloudfunctions.net/superAdminApi/sendmessage",
        data
      )
      .then((res) => {
        console.log("res", res.data);
        if (res.data == "successfully sent") {
          console.log("res", res.data);
          // dispatch({
          //   type: CREATE_PAYSTUB,
          //   payload: payStubData.id
          // });
        } else {
          console.log("else");

          // dispatch({ type: CREATE_PAYSTUB_ERR });
        }
        //err
      })
      .catch((err) => {
        //err
        console.error("err", err);
        // dispatch({ type: CREATE_PAYSTUB_ERR });
      });
  };
}

// verify number
export function verifyEmail(data) {
  return (dispatch) => {
    axios
      .post(`${client_url}/sendMail`, data)
      .then((res) => {
        console.log("res", res.data);
        if (res.data == "successfully sent") {
          console.log("res", res.data);
          // dispatch({
          //   type: CREATE_PAYSTUB,
          //   payload: payStubData.id
          // });
        } else {
          console.log("else");
          // dispatch({ type: CREATE_PAYSTUB_ERR });
        }
        //err
      })
      .catch((err) => {
        //err
        console.error("err", err);
      });
  };
}

// get all system docs
export function getSystemDocs() {
  return (dispatch) => {
    db.collection("systemdocuments").onSnapshot(
      function(querySnapshot) {
        let datatoStore = [];
        querySnapshot.forEach(function(doc) {
          const data = doc.data();
          const id = doc.id;
          // if (data.status === "verified") {
          datatoStore.push({ id, ...data });
          // }
        });
        // console.log("data to store", datatoStore);

        dispatch({
          type: GET_SYS_DOC,
          payload: datatoStore,
        });
      },
      function(error) {
        console.log("=================error===================");
        console.log(error);
        console.log("====================================");
        dispatch({
          type: GET_SYS_DOC_ERR,
        });
      }
    );
  };
}

export function updateEmployerMobNumber(data) {
  return (dispatch) => {
    db.collection("employers")
      .doc(data.id)
      .update({ cell: data.cell })
      .then(function(docRef) {
        dispatch({
          type: "UPDATE_MOB_NUMBER",
        });
      })
      .catch(function(error) {
        toast.error("An error occurred while updating mobile number!");
      });
  };
}

// change time mode action
// this action will be called when employerr change the time mode of a employee

export function changeTime(data) {
  return (dispatch) => {
    db.collection("employees")
      .doc(data.empDocId)
      .update({ timeMode: data.timeMode })
      .then(function(docRef) {
        dispatch({
          type: CHANGE_TIMEMODE,
        });
        toast.success("Successfully changed!");
      })
      .catch(function(error) {
        toast.error(error.message);
        dispatch({
          type: CHANGE_TIMEMODE_ERR,
        });
      });
  };
}

// change time mode in case the employee's status is checkIn
export function changeTimeMode(data) {
  console.log("at action file to invite employee", data);
  // "https://us-central1-promising-saga-232017.cloudfunctions.net/restfullapi/changeTimeMode",
  return (dispatch) => {
    axios
      .post(`${client_url}${payrollApi.change_timeMode}`, data)
      .then((res) => {
        console.log("In Actions res", res);

        if (res.data == "successfully change Time Mode") {
          console.log("successfully change Time Mode!");
          dispatch({
            type: CHANGE_TIMEMODE,
          });
          toast.success("Successfully changed!");
        } else {
          console.log("Error Has been Occoured! Try again");
          toast.error(res.data.message);
          dispatch({
            type: CHANGE_TIMEMODE_ERR,
          });
        }
      })

      .catch((err) => {
        toast.error(err.message);
        dispatch({
          type: CHANGE_TIMEMODE_ERR,
        });
      });
  };
}
