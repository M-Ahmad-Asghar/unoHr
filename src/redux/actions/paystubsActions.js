import { db } from "../../boot/firebase";
import axios from "axios";
import { checkApi, checkApiUrl } from "../../EndPoint";
export const GETPAYSTUBS = "GETPAYSTUBS";
export const GETPAYSTUBSERR = "GETPAYSTUBSERR";
export const GETEMPLOYERPAYSTUBS = "GETEMPLOYERPAYSTUBS";
export const GETEMPLOYERPAYSTUBSERR = "GETEMPLOYERPAYSTUBSERR";
export const GETCHECKPAYSTUBS = "GETCHECKPAYSTUBS";
export const GETCHECKPAYSTUBSERR = "GETCHECKPAYSTUBS";
export const GETCHECKPAYSTUBSPDF = "GETCHECKPAYSTUBSPDF";
export const GETCHECKPAYSTUBSPDFERR = "GETCHECKPAYSTUBSPDFERR";

export function getStartPayStubs(id) {
  return async (dispatch) => {
    db.collection("paystubs")
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
            type: GETPAYSTUBS,
            payload: datatoStore,
          });
        },
        function(error) {
          dispatch({
            type: GETPAYSTUBSERR,
            payload: new Date(),
          });
        }
      );
  };
}

export function getEmployerPayStubs(id) {
  return async (dispatch) => {
    db.collection("paystubs")
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
            type: GETEMPLOYERPAYSTUBS,
            payload: datatoStore,
          });
        },
        function(error) {
          dispatch({
            type: GETEMPLOYERPAYSTUBSERR,
            payload: new Date(),
          });
        }
      );
  };
}

export function getCheckPayStubs(empId) {
  return async (dispatch) => {
    var config = {
      method: "get",
      url: `${checkApiUrl}/employees/${empId}/paystubs`,
      headers: {
        Authorization: `Bearer ${checkApi}`,
      },
    };

    axios(config)
      .then((response) => {
        dispatch({
          type: GETCHECKPAYSTUBS,
          payload: response.data.results,
        });
      })
      .catch((error) => {
        console.log("ERROR GETTING CHECK PAYSTUB", error);
        dispatch({
          type: GETCHECKPAYSTUBSERR,
          payload: new Date(),
        });
      });
  };
}
export function getCheckPayStubPDF(empId, payrollId) {
  return async (dispatch) => {
    var config = {
      method: "get",
      url: `${checkApiUrl}/employees/${empId}/paystubs/${payrollId}`,
      responseType: "arraybuffer",
      headers: {
        Accept: "application/pdf",
        Authorization: `Bearer ${checkApi}`,
      },
    };

    axios(config)
      .then((response) => {
        console.log("PDF RESPONSE", response.data);
        let blob = new Blob([response.data], { type: "application/pdf" });
        let link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "Report.pdf";
        dispatch({
          type: GETCHECKPAYSTUBSPDF,
          payload: link,
        });
      })
      .catch((error) => {
        console.log("ERROR GETTING CHECK PAYSTUB", error);
        dispatch({
          type: GETCHECKPAYSTUBSPDFERR,
          payload: new Date(),
        });
      });
  };
}
