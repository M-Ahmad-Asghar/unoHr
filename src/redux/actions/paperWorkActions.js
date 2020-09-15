import { db } from "../../boot/firebase";
import Endpoint from "../../EndPoint";
import { toast } from "react-toastify";
import axios from "axios";
export const GET_DOCUMENTS = "GEt_DOCUMENTS";
export const GET_DOCUMENTS_ERR = "GET_DOCUMENTS_ERR";
export const EMPLOYER_PAPER_COUNT = "EMPLOYER_PAPER_COUNT";
export const EMPLOYER_PAPER_COUNT_ERR = "EMPLOYER_PAPER_COUNT_ERR";
export const EMPLOYEE_PAPER_COUNT = "EMPLOYEE_PAPER_COUNT";
export const EMPLOYEE_PAPER_COUNT_ERR = "EMPLOYEE_PAPER_COUNT_ERR";
export const LOADEROFF = "LOADEROFF";
export const GET_PDF_RECORDS = "GET_PDF_RECORDS";
export const GET_PDF_RECORDS_ERR = "GET_PDF_RECORDS_ERR";
export const GET_ALL_PAPER_DOCS = "GET_ALL_PAPER_DOCS";
export const GET_ALL_VARIFIED_DOCUMENTS = "GET_ALL_VARIFIED_DOCUMENTS";
export const GET_ALL_VARIFIED_DOCUMENTS_ERROR =
  "GET_ALL_VARIFIED_DOCUMENTS_ERROR";
export const GET_ALL_PAPER_ERROR = "GET_ALL_PAPER_ERROR";

// Get all task
export function getEmployeDocuments(employerUid, empid) {
  return (dispatch) => {
    db.collection("paperworktasks")
      .where("employeruid", "==", employerUid)
      .where("employeeid", "==", empid)
      .onSnapshot(function(querySnapshot) {
        let datatoStore = [];
        querySnapshot.forEach(function(doc) {
          const data = doc.data();
          const id = doc.id;
          datatoStore.push({ id, ...data });
        });
        if (datatoStore.length > 0) {
          dispatch({
            type: GET_DOCUMENTS,
            payload: datatoStore,
          });
        } else {
          dispatch({
            type: GET_DOCUMENTS_ERR,
          });
        }
      });
  };
}

export function GenerateDocumentAndSave(data) {
  return (dispatch) => {
    axios
      .post(`${Endpoint}/pdf/GenrateEmployeePDF`, data)
      .then((res) => {
        console.log("res", res.data);
        if (res.data == "success") {
        } else {
          console.error("err", res.data);
        }
      })
      .catch((err) => {
        console.error(err);
        // this.setState({ loading: false });
      });
  };
}

export function addAndDellPaperwork(data, dellid) {
  return (dispatch) => {
    console.log("data", data);
    db.collection("filledFormEmployees")
      .add(data)
      .then(function(docRef) {
        db.collection("paperworktasks")
          .doc(dellid)
          .delete()
          .then(function() {
            dispatch({
              type: LOADEROFF,
            });
            toast.success("Check Your Email For documents");
          })

          .catch(function(error) {
            toast.error("Error occured! try again later");

            dispatch({
              type: LOADEROFF,
            });
          });
      })
      .catch(function(error) {
        dispatch({
          type: LOADEROFF,
        });
        toast.error("Error occured. Please try again later");
      });
  };
}
export function addAndUpdataPaperwork(data, updateData, id) {
  return (dispatch) => {
    console.log("Data update", data);
    db.collection("filledFormEmployees")
      .add(data)
      .then(function(docRef) {
        db.collection("paperworktasks")
          .doc(id)
          .update(updateData)
          .then(function() {
            dispatch({
              type: LOADEROFF,
            });
            toast.success("Check Your Email For documents");
          })

          .catch(function(error) {
            toast.error("Error occured! try again later");

            dispatch({
              type: LOADEROFF,
            });
          });
      })
      .catch(function(error) {
        dispatch({
          type: LOADEROFF,
        });
        toast.error("Error occured. Please try again later");
      });
  };
}

export function countEmployerPaperWork(id) {
  return (dispatch) => {
    db.collection("paperworktasks")
      .where("employeruid", "==", id)
      .onSnapshot(
        function(querySnapshot) {
          let docs = [];
          let size = 0;
          let allEmployerDocs = [];

          querySnapshot.forEach(function(doc) {
            const data = doc.data();
            const id = doc.id;

            let documents = [];
            let employeeFormData = {};
            let employeeid = data.employeeid;
            if (data.employeeFormData) {
              employeeFormData = data.employeeFormData;
            }
            let allDocs = [];

            data.documents.map((d, i) => {
              if (d["phaseStatus"] == "employer") {
                size = size + 1;
                documents.push({ docIndex: i, ...d });
              }

              allDocs.push(d);
            });
            docs.push({
              fbDocId: id,
              employeeid,
              documents,
              employeeFormData,
            });
            allEmployerDocs.push({
              employeeid,
              allDocs,
            });
          });

          dispatch({
            type: EMPLOYER_PAPER_COUNT,
            payload: { size, docs, allEmployerDocs },
          });
        },
        function(error) {
          dispatch({
            type: EMPLOYER_PAPER_COUNT_ERR,
          });
        }
      );
  };
}

export function countEmployeePaperWork(id) {
  return (dispatch) => {
    db.collection("paperworktasks")
      .where("employeeid", "==", id)
      .onSnapshot(
        function(querySnapshot) {
          let docs = [];
          let allEmployeeDocs = [];
          let size = 0;
          querySnapshot.forEach(function(doc) {
            const data = doc.data();
            const id = doc.id;
            data.documents.map((d, i) => {
              if (d["phaseStatus"] == "employee") {
                size = size + 1;
                docs.push({ ...d, fbDocId: id, docIndex: i });
              }

              allEmployeeDocs.push(d);
            });
          });

          dispatch({
            type: EMPLOYEE_PAPER_COUNT,
            payload: { size, docs, allEmployeeDocs },
          });
        },
        function(error) {
          dispatch({
            type: EMPLOYEE_PAPER_COUNT_ERR,
          });
        }
      );
  };
}

export function getPdfRecords(id) {
  return (dispatch) => {
    db.collection("pdfRecords")
      .where("employerid", "==", id)
      .onSnapshot(
        function(querySnapshot) {
          let pdfs = [];
          querySnapshot.forEach(function(doc) {
            const data = doc.data();
            const id = doc.id;

            pdfs.push({ ...data, id });
          });

          dispatch({
            type: GET_PDF_RECORDS,
            payload: pdfs,
          });
        },
        function(error) {
          toast.error(`Error: ${error}`);

          dispatch({
            type: GET_PDF_RECORDS_ERR,
          });
        }
      );
  };
}

export function getEmpDocs(id) {
  return (dispatch) => {
    try {
      console.log("called===========================>");
      db.collection("paperworktask")
        .where("emp_id", "==", id)
        .onSnapshot(function(querySnapshot) {
          let datatoStore = [];
          querySnapshot.forEach(function(doc) {
            const data = doc.data();
            const id = doc.id;
            datatoStore.push({ id, ...data });
          });
          console.log(
            "here is your query snap shot================>",
            datatoStore
          );
          dispatch({
            type: GET_ALL_PAPER_DOCS,
            payload: datatoStore,
          });
        });
    } catch (err) {
      dispatch({
        type: GET_ALL_PAPER_ERROR,
      });
    }
  };
}

export function getSystemDocuments() {
  return (dispatch) => {
    db.collection("systemdocuments")
      // .where("status", "==", "verified")
      .onSnapshot(
        function(querySnapshot) {
          let datatoStore = [];
          querySnapshot.forEach(function(doc) {
            let data = doc.data();
            let doc_id = doc.id;
            let final = {
              ...data,
              doc_id,
            };

            datatoStore.push(final);
          });

          dispatch({
            type: GET_ALL_VARIFIED_DOCUMENTS,
            payload: datatoStore,
          });
        },
        function(err) {
          dispatch({
            type: GET_ALL_VARIFIED_DOCUMENTS_ERROR,
          });
          console.log("error", err);
        }
      );
  };
}

export const addPaperWork = (data) => {
  return new Promise((resolve, reject) => {
    db.collection("paperworktask")
      .add(data)
      .then(resolve)
      .catch(reject);
  });
};
