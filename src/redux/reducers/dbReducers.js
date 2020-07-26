import {
    GET_STATES_WAGES,
    GET_STATES_WAGES_ERR,
    GET_PRIVACY_POLICY,
    GET_PRIVACY_POLICY_ERR,
    GET_TERMS_CONDITIONS,
    GET_TERMS_CONDITIONS_ERR
  } from "../actions/dbActions";

var initialState = {
    loader: new Date(),
    statesWages: [],
    getStatesWagesStatus: "not done",
    termsConditions: {},
    privacyPolicy: {},
    getTermsStatus: "not done",
    getPrivacyStatus: "not done"
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_STATES_WAGES:
            console.log("Get Wages Reducer: ", action.payload);
            return {
                ...state,
                loader: new Date(),
                statesWages: action.payload,
                getStatesWagesStatus: "done",
                getTermsStatus: "not done",
                getPrivacyStatus: "not done"
            };
        case GET_STATES_WAGES_ERR:
            return {
                ...state,
                loader: new Date(),
                getStatesWagesStatus: "error",
                getTermsStatus: "not done",
                getPrivacyStatus: "not done"
            };

        case GET_TERMS_CONDITIONS: {
            return {
                ...state,
                termsConditions: action.payload,
                getTermsStatus: "done",
                getPrivacyStatus: "not done",
                loader: new Date(),
                getStatesWagesStatus: "not done",
            };
        }

        case GET_TERMS_CONDITIONS_ERR: {
            return {
                ...state,
                getTermsStatus: "error",
                getPrivacyStatus: "not done",
                loader: new Date(),
                getStatesWagesStatus: "not done",
            };
        }

        case GET_PRIVACY_POLICY: {
            return {
                ...state,
                privacyPolicy: action.payload,
                getPrivacyStatus: "done",
                getTermsStatus: "not done",
                loader: new Date(),
                getStatesWagesStatus: "not done",
            };
        }

        case GET_PRIVACY_POLICY_ERR: {
            return {
                ...state,
                getPrivacyStatus: "error",
                getTermsStatus: "not done",
                loader: new Date(),
                getStatesWagesStatus: "not done",
            };
        }

        default:
            return state;
    }
}