import { combineReducers } from "redux";
import { reducer as reduxFormReducer } from "redux-form";
import DataPassReducer from "./dataPassReducer";
import themeReducer from "./themeReducer";
import sidebarReducer from "./sidebarReducer";
import cryptoTableReducer from "./cryptoTableReducer";
import newOrderTableReducer from "./newOrderTableReducer";
import customizerReducer from "./customizerReducer";
import employerLoginReducer from "./employerLoginReducer";
import userReducer from "./userReducer";
import employeeUserReducer from "./employeeUserReducer";
import TaskReducer from "./TaskReducer";
import employer from "./newEmployer";
import employeeReducer from "./employeeReducer";
import storageReducer from "./storageReducer";
import attendanceReducer from "./attendanceReducer";
import employerReducer from "./employerReducer";
import employeeTaskReducer from "./EmployeeTaskReducer";
import payStubsReducer from "./payStubsReducer";
import shaduleReducer from "./shaduleReducer";
import shiftReducer from "./shiftReducer";
import empScheduleReducer from "./empScheduleReducer";
import paperWorkReducer from "./paperWorkReducer";
import { connectRouter } from "connected-react-router";
import Subscription from "./Subscriptions";
import employeerBackupReducer from "./employerBackupReducer";
import dbReducers from "./dbReducers";
import wcStateReducer from "./wcStateReducer";
import directDepositReducer from "./directDepositReducer";
import SystemDocuments from "./SystemDocuments";

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    form: reduxFormReducer, // mounted under "form",
    theme: themeReducer,
    sidebar: sidebarReducer,
    cryptoTable: cryptoTableReducer,
    newOrder: newOrderTableReducer,
    customizer: customizerReducer,
    employerLogin: employerLoginReducer,
    userReducer,
    employeeUserReducer,
    TaskReducer,
    DataPassReducer,
    employer,
    employeeReducer,
    storageReducer,
    attendanceReducer,
    employerReducer,
    employeeTaskReducer,
    payStubsReducer,
    shaduleReducer,
    shiftReducer,
    empScheduleReducer,
    paperWorkReducer,
    Subscription,
    employeerBackupReducer,
    dbReducers,
    wcStateReducer,
    directDepositReducer,
    SystemDocuments,
  });

// export {
//   themeReducer,
//   sidebarReducer,
//   cryptoTableReducer,
//   newOrderTableReducer,
//   customizerReducer,
//   employerLoginReducer,
//   userReducer,
//   employeeUserReducer,
//   TaskReducer,
//   employer,
//   employeeReducer,
//   storageReducer,
//   attendanceReducer,
//   employerReducer,
//   employeeTaskReducer,
//   payStubsReducer
// };
