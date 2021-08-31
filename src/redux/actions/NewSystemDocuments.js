import { db } from "../../boot/firebase";
import { toast } from "react-toastify";
import Endpoint from "../../EndPoint";
import axios from "axios";
export const ADD_NEW_DOCUMENTS = "ADD_NEW_DOCUMENTS";
export const ADD_NEW_DOCUMENTS_ERR = "ADD_NEW_DOCUMENTS_ERR";
// get
export const GET_DOCUMENTS = "GET_DOCUMENTS";
export const GET_DOCUMENTS_ERR = "GET_DOCUMENTS_ERR";

export const GET_AUTOPOPULATE = "GET_APaperWorksFormsUTOPOPULATE";
export const GET_AUTOPOPULATE_ERR = "GET_AUTOPOPULATE_ERR";

export const GET_UNVERIFIEDDOCUMENTS = "GET_UNVERIFIEDDOCUMENTS";
export const GET_SINGLEEMPLOYEE = "GET_SINGLEEMPLOYEE";

export const ADD_NEW_UNVERIFIED_DOCUMENTS = "ADD_NEW_UNVERIFIED_DOCUMENTS";
export const GET_UNVERIFIEDDOCUMENTS_ERR = "GET_UNVERIFIEDDOCUMENTS_ERR";

export const GET_TEMPLATESCHEMA = "GET_TEMPLATESCHEMA";
export const GET_TEMPLATESCHEMA_ERR = "GET_TEMPLATESCHEMA_ERR";

export const SAVE_EMPLOYEE_PAPERWORKS = "SAVE_EMPLOYEE_PAPERWORKS";
export const SAVE_EMPLOYEE_PAPERWORKS_ERR = "SAVE_EMPLOYEE_PAPERWORKS_ERR";

export const SAVE_EMPLOYER_PAPERWORKS = "SAVE_EMPLOYER_PAPERWORKS";
export const SAVE_EMPLOYER_PAPERWORKS_ERR = "SAVE_EMPLOYER_PAPERWORKS_ERR";

export const GENERATE_PDF = "GENERATE_PDF";
export const GENERATE_PDF_ERR = "GENERATE_PDF_ERR";

// export function addNewDocuments(data) {
//   return dispatch => {
//     axios
//       .post(`${Endpoint}/formapi/createTemplate`, data, {
//         headers: {
//           "Content-Type": `multipart/form-data`
//         }
//       })
//       .then(res => {
//         console.log("res", res);

//         if (res.data.id) {
//           let datatodb = {
//             doc_name: res.data.name,
//             template_id: res.data.id,
//             status: "unverified",
//             createdAt: `${new Date()}`
//           };

//           db.collection("systemdocuments")
//             .add(datatodb)
//             .then(function(docRef) {
//               toast.success("Succefully add System documents");
//               dispatch({
//                 type: ADD_NEW_DOCUMENTS
//               });
//             })
//             .catch(function(error) {
//               toast.error("Error occured. Please try again later");
//               dispatch({
//                 type: ADD_NEW_DOCUMENTS_ERR
//               });
//             });
//         } else {
//           console.error("err", res.data);
//           toast.error("Please choose an editable pdf!");
//           dispatch({
//             type: ADD_NEW_DOCUMENTS_ERR
//           });
//         }
//       })
//       .catch(err => {
//         console.error(err);
//         dispatch({
//           type: ADD_NEW_DOCUMENTS_ERR
//         });
//         toast.error("Error Has been Occoured!");
//       });
//   };
// }

// // Get all task
// export function getSystemDocuments() {
//   return dispatch => {
//     db.collection("systemdocuments")
//       .where("status", "==", "verified")
//       .onSnapshot(
//         function(querySnapshot) {
//           let datatoStore = [];
//           querySnapshot.forEach(function(doc) {
//             let data = doc.data();
//             let doc_id = doc.id;
//             let final = {
//               ...data,
//               doc_id
//             };

//             datatoStore.push(final);
//           });

//           dispatch({
//             type: GET_DOCUMENTS,
//             payload: datatoStore
//           });
//         },
//         function(err) {
//           dispatch({
//             type: GET_DOCUMENTS_ERR
//           });
//         }
//       );
//   };
// }

// export function getUnverifiedDocuments() {
//   return dispatch => {
//     db.collection("systemdocuments")
//       // .select('documnentName')
//       .where("status", "==", "unverified")
//       .onSnapshot(
//         function(querySnapshot) {
//           let datatoStore = [];
//           querySnapshot.forEach(function(doc) {
//             let data = doc.data();
//             let doc_id = doc.id;
//             let final = {
//               ...data,
//               doc_id
//             };

//             datatoStore.push(final);
//           });

//           dispatch({
//             type: GET_UNVERIFIEDDOCUMENTS,
//             payload: datatoStore
//           });
//         },
//         function(err) {
//           dispatch({
//             type: GET_UNVERIFIEDDOCUMENTS_ERR
//           });
//         }
//       );
//   };
// }

// export function addVerifiedDocuments(data) {
//   return dispatch => {
//     db.collection("systemdocuments")
//       .doc(data.doc_id)
//       .update(data.record)
//       .then(function(docRef) {
//         toast.success("Successfully add verified System documents");
//         dispatch({
//           type: ADD_NEW_UNVERIFIED_DOCUMENTS
//         });
//       })
//       .catch(function(error) {
//         toast.error("Error occured. Please try again later");
//         dispatch({
//           type: ADD_NEW_UNVERIFIED_DOCUMENTS
//         });
//       });
//   };
// }

// export function getAutoPopulate() {
//   return dispatch => {
//     db.collection("autopopulate")
//       // .select('documnentName')
//       .onSnapshot(
//         function(querySnapshot) {
//           let datatoStore = {};
//           querySnapshot.forEach(function(doc) {
//             const data = doc.data();
//             datatoStore = data;
//           });
//           console.log(" autopopulate", datatoStore);

//           dispatch({
//             type: GET_AUTOPOPULATE,
//             payload: datatoStore
//           });
//         },
//         function(err) {
//           dispatch({
//             type: GET_AUTOPOPULATE_ERR
//           });
//         }
//       );
//   };
// }

// export function getSingleEmployeeForTesting() {
//   return dispatch => {
//     db.collection("employees")
//       .orderBy("createdAt", "desc") // Order documents by added_at field in
//       .limit(1)
//       .get()
//       .then(function(prevSnapshot) {
//         let datatoStore = {};
//         prevSnapshot.forEach(function(doc) {
//           const data = doc.data();
//           datatoStore = data;
//         });
//         console.log("single Employee", datatoStore);

//         dispatch({
//           type: GET_SINGLEEMPLOYEE,
//           payload: datatoStore
//         });
//       });
//   };
// }

export function getTemplateSchema(id) {
  console.log("id get", id);

  return (dispatch) => {
    axios
      .post(`${Endpoint}/formapi/getTemplateSchema`, { id: id })
      .then((res) => {
        console.log("getTemplateSchemaResponser", res.data);

        if (res.data.properties) {
          let datatoStore = {
            ...res.data,
            template_id: id,
          };
          dispatch({
            type: GET_TEMPLATESCHEMA,
            payload: datatoStore,
          });
        } else {
          console.error("err", res.data);
          toast.error("Error Has been Occoured! Try again later");
          dispatch({
            type: GET_TEMPLATESCHEMA_ERR,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        dispatch({
          type: GET_TEMPLATESCHEMA_ERR,
        });
        toast.error("Error Has been Occoured! Try again later");
      });
  };
}

export const employeeForm = (data) => {
  // create batch for multiple docs update
  return (dispatch) => {
    var batch = db.batch();
    db.collection("autopopulate")
      .get()
      .then((querySnapshot) => {
        let autoPopulateObj = {};
        let docId = "";
        querySnapshot.forEach((doc) => {
          autoPopulateObj = doc.data();
          docId = doc.id;
        });

        Array.prototype.diff = function(a) {
          return this.filter(function(i) {
            return a.indexOf(i) < 0;
          });
        };

        let formData = data.documents[data.docIndex].employeeFormData;

        let employeeKeys = Object.keys(data.employee);
        let keysOfFormData = Object.keys(formData);
        var difEmployeeArray = keysOfFormData.diff(employeeKeys);

        let difForEmployee = {};
        difEmployeeArray.forEach(
          (item) => (difForEmployee[item] = formData[item])
        );

        var empDocument = db.collection("employees").doc(data.employee.docid);
        batch.update(empDocument, difForEmployee);

        // 2nd task
        // get difference for auto populate document
        let keysOfAutoPopulateObj = Object.keys(autoPopulateObj.employee);

        var difPopulateArray = keysOfFormData.diff(keysOfAutoPopulateObj);
        var difPopulate = {};
        difPopulateArray.forEach((item) => (difPopulate[item] = item));

        let difPopulateObj = {
          employee: { ...difPopulate, ...autoPopulateObj.employee },
        };

        var autoPopulateDoc = db.collection("autopopulate").doc(docId);
        batch.update(autoPopulateDoc, difPopulateObj);

        // 3rt task
        // update in paperworktask;

        let obj = {
          documents: data.documents,
        };

        var paperWork = db.collection("paperworktasks").doc(data.paperworkId);

        console.log("Paperwork", obj);
        batch.update(paperWork, obj);
        batch
          .commit()
          .then(function() {
            toast.success("Paperwork saved successfully!");
            dispatch({
              type: SAVE_EMPLOYEE_PAPERWORKS,
            });
          })
          .catch((err) => {
            console.log("err", err);
            toast.error(`Error: ${err}`);
            dispatch({
              type: SAVE_EMPLOYEE_PAPERWORKS_ERR,
            });
          });
      })

      .catch((err) => {
        console.log("err", err);
        toast.error(`Error: ${err}`);
        dispatch({
          type: SAVE_EMPLOYEE_PAPERWORKS_ERR,
        });
      });
  };
};

export const employerForm = (data) => {
  // create batch for multiple docs update
  console.log("<><><><><><><><><><><><><><><><><><><><><><><><>");

  return (dispatch) => {
    var batch = db.batch();
    db.collection("autopopulate")
      .get()
      .then((querySnapshot) => {
        let autoPopulateObj = {};
        let docId = "";
        querySnapshot.forEach((doc) => {
          autoPopulateObj = doc.data();
          docId = doc.id;
        });
        console.log("autoPopulateObj", autoPopulateObj);

        Array.prototype.diff = function(a) {
          return this.filter(function(i) {
            return a.indexOf(i) < 0;
          });
        };

        let employerKeys = Object.keys(data.employer);
        let keysOfEmpFormData = Object.keys(data.employerFormData);
        var difEmployerArray = keysOfEmpFormData.diff(employerKeys);
        console.log("difEmployerArray", difEmployerArray);
        let difForEmployer = {};
        difEmployerArray.forEach(
          (item) => (difForEmployer[item] = data.employerFormData[item])
        );
        console.log("diffForEmployees", difForEmployer);

        var empDocument = db.collection("employers").doc(data.employer.docid);
        batch.update(empDocument, difForEmployer);

        // 2nd task
        // get difference for auto populate document
        let keysOfAutoPopulateObj = Object.keys(autoPopulateObj.employer);

        var difPopulateArray = keysOfEmpFormData.diff(keysOfAutoPopulateObj);
        var difPopulate = {};
        difPopulateArray.forEach((item) => (difPopulate[item] = item));

        let difPopulateObj = {
          employer: { ...difPopulate, ...autoPopulateObj.employer },
        };
        console.log("diffForPopulat", difPopulateObj);
        var autoPopulateDoc = db.collection("autopopulate").doc(docId);
        batch.update(autoPopulateDoc, difPopulateObj);

        batch
          .commit()
          .then(function() {
            let sendToServer = data.pdfObj;

            axios
              .post(`${Endpoint}/formapi/generatePDF`, sendToServer)
              .then((res) => {
                console.log("geberatePDF Response");
                if (res.data.status === "success") {
                  var batch = db.batch();

                  let obj = {
                    documents: data.documents,
                  };
                  var paperWork = db
                    .collection("paperworktasks")
                    .doc(data.paperworkId);
                  batch.update(paperWork, obj);

                  let pdfObject = {
                    employeeid: data.empId,
                    doc_name: data.doc_name,
                    template_id: data.pdfObj.id,
                    employerid: data.employer.uid,
                    url: res.data.submission.download_url,
                  };
                  var pdfRecord = db.collection("pdfRecords").doc();
                  batch.set(pdfRecord, pdfObject);

                  batch
                    .commit()
                    .then(function() {
                      dispatch({
                        type: SAVE_EMPLOYER_PAPERWORKS,
                      });
                      toast.success("PDF has been Generated!");
                    })
                    .catch((err) => {
                      console.log("err", err);
                      toast.error(`Error: ${err}`);
                      dispatch({
                        type: SAVE_EMPLOYER_PAPERWORKS_ERR,
                      });
                    });
                } else {
                  toast.error(`Error: Please try again!`);
                  dispatch({
                    type: SAVE_EMPLOYER_PAPERWORKS_ERR,
                  });
                }
              })
              .catch((err) => {
                toast.error(`Error: ${err}`);
                dispatch({
                  type: SAVE_EMPLOYER_PAPERWORKS_ERR,
                });
              });
          })
          .catch((err) => {
            console.log("err", err);
            toast.error(`Error: ${err}`);
            dispatch({
              type: SAVE_EMPLOYER_PAPERWORKS_ERR,
            });
          });
      })

      .catch((err) => {
        console.log("err", err);
        toast.error(`Error: ${err}`);
        dispatch({
          type: SAVE_EMPLOYER_PAPERWORKS_ERR,
        });
      });
  };
};
