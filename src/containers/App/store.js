import { combineReducers, createStore, applyMiddleware } from 'redux';
// import { reducer as reduxFormReducer } from 'redux-form';
import thunk from 'redux-thunk';
import {createBrowserHistory} from 'history'
import {routerMiddleware} from 'connected-react-router';
import rootReducer from '../../redux/reducers/index';


const history = createBrowserHistory();
// import {
//   cryptoTableReducer,
//   newOrderTableReducer,
//   sidebarReducer,
//   themeReducer,
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
//   payStubsReducer,
// } from '../../redux/reducers/index';



// const reducer = combineReducers({
//   form: reduxFormReducer, // mounted under "form",
//   theme: themeReducer,
//   sidebar: sidebarReducer,
//   cryptoTable: cryptoTableReducer,
//   newOrder: newOrderTableReducer,
//   customizer: customizerReducer,
//   employerLogin: employerLoginReducer,
//   userReducer,
//   employeeUserReducer,
//   TaskReducer,
//   employer,
//   employeeReducer,
//   storageReducer,
//   attendanceReducer,
//   employerReducer,
//   employeeTaskReducer,
//   payStubsReducer,
// });
const store = createStore(
  // reducer,
  rootReducer(history),
  applyMiddleware(thunk,  routerMiddleware(history),)
);

export default store;

export {history}