import { db } from "../../boot/firebase";

export const GET_STATES_WAGES = "GET_STATES_WAGES";
export const GET_STATES_WAGES_ERR = "GET_STATES_WAGES_ERR";
export const GET_TERMS_CONDITIONS = "GET_TERMS_CONDITIONS";
export const GET_TERMS_CONDITIONS_ERR = "GET_TERMS_CONDITIONS_ERR";
export const GET_PRIVACY_POLICY = "GET_PRIVACY_POLICY";
export const GET_PRIVACY_POLICY_ERR = "GET_PRIVACY_POLICY_ERR";

export const GET_INDUSTRY = "GET_INDUSTRY";
export const GET_INDUSTRY_ERR = "GET_INDUSTRY_ERR";

export const getStateWages = () => {
  return (dispatch) => {
    db.collection("stateWages").onSnapshot(
      function(querySnapshot) {
        let dataToStore = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          dataToStore = data["stateWages"];
        });

        dispatch({
          type: GET_STATES_WAGES,
          payload: dataToStore,
        });
      },
      (error) => {
        dispatch({
          type: GET_STATES_WAGES_ERR,
        });
      }
    );
  };
};

export const getTermsConditions = () => {
  return (dispatch) => {
    db.collection("terms")
      .doc("termsConditions")
      .onSnapshot(
        function(querySnapshot) {
          if (querySnapshot.data()) {
            const data = querySnapshot.data();
            console.log(
              "===============data from firestore in action====================="
            );
            console.log(data);
            console.log("====================================");

            dispatch({
              type: GET_TERMS_CONDITIONS,
              payload: data,
            });
          } else {
            dispatch({
              type: GET_TERMS_CONDITIONS_ERR,
            });
          }
        },
        (error) => {
          dispatch({
            type: GET_TERMS_CONDITIONS_ERR,
          });
        }
      );
  };
};

export const getPrivacyPolicy = () => {
  return (dispatch) => {
    db.collection("terms")
      .doc("privacyPolicy")
      .onSnapshot(
        function(querySnapshot) {
          if (querySnapshot.data()) {
            const data = querySnapshot.data();
            console.log(
              "===============data from firestore in action====================="
            );
            console.log(data);
            console.log("====================================");

            dispatch({
              type: GET_PRIVACY_POLICY,
              payload: data,
            });
          } else {
            dispatch({
              type: GET_PRIVACY_POLICY_ERR,
            });
          }
        },
        (error) => {
          dispatch({
            type: GET_PRIVACY_POLICY_ERR,
          });
        }
      );
  };
};

///////////////////// INDUSTRY /////////////////////
export const getIndustry = () => {
  return (dispatch) => {
    db.collection("industry")
      .get()
      .then(function(doc) {
        let firebaseData = [];
        doc.forEach((docRecord) => {
          let data = docRecord.data();
          firebaseData.push(data);
        });
        dispatch({
          type: GET_INDUSTRY,
          payload: firebaseData,
        });
      })
      .catch(function(error) {
        dispatch({
          type: GET_INDUSTRY_ERR,
        });
      });
  };
};
