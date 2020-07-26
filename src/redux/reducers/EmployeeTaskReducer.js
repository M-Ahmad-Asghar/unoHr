import { ADD_TASK } from "../actions/EmployeeTaskActions";
import { GET_TASK } from "../actions/EmployeeTaskActions";
import { UPDATE_TASK } from "../actions/EmployeeTaskActions";
import { DELETE_TASK } from "../actions/EmployeeTaskActions";

import { COMPL_TASK } from "../actions/EmployeeTaskActions";
import { GT_COMP_TASK } from "../actions/EmployeeTaskActions";

import { ADD_EMP_OWN_TASK } from "../actions/EmployeeTaskActions";
import { GET_OWN_TASK_EE } from "../actions/EmployeeTaskActions";

import { PAPERWORK_TASK } from "../actions/EmployeeTaskActions";
import { DELETE_OWN_TASK } from "../actions/EmployeeTaskActions";

const initialState = {
  AllTask: [],
  PaperworkTask: [],
  CompletedTask: [],
  empOwnTask: [],
  loader: "true"
};

export default (state = initialState, action) => {
  switch (action.type) {
    // get all tasks
    case GET_TASK:
      let tasksArray = action.payload;
      tasksArray.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.PostedTime) - new Date(a.PostedTime);
      });

      return {
        ...state,
        AllTask: tasksArray,
        loader: "false"
      };

    // add task
    case ADD_TASK:
     let AllTask = [...state.AllTask];
      AllTask.unshift(action.payload);
      return {
        ...state,
        AllTask: AllTask
      };

    // for add paperwork task
    // case PAPERWORK_TASK:
    //   return {
    //     ...state,
    //     PaperworkTask: state.PaperworkTask.concat([action.payload])
    //   };

    // for task update
    case UPDATE_TASK:
      let updateState = state.AllTask;
      let id = action.payload.id;

      let newList = updateState.filter(item => item.id != id);
      newList.unshift(action.payload);

      return {
        ...state,
        AllTask: newList
      };

    // to delete task
    case DELETE_TASK:
      let currentState = state.AllTask;

      let taskid = action.payload;

      let newState = currentState.filter(item => item.id != taskid);
      let newCompTask = state.CompletedTask.filter(item => item.id != taskid);

      return {
        ...state,
        AllTask: newState,
        CompletedTask: newCompTask
      };
    // to add completed task
    case COMPL_TASK:
      let doneId = action.payload.id;

      newState = state.AllTask.filter(item => item.id != doneId);

      return {
        ...state,
        AllTask: newState,
        CompletedTask: state.CompletedTask.concat([action.payload])
      };

    // get all completed tasks
    case GT_COMP_TASK:
      let completedTaskArray = action.payload;
      completedTaskArray.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.taskCompleted) - new Date(a.taskCompleted);
      });
      return {
        ...state,
        CompletedTask: completedTaskArray,
        loader: "false"
      };

    // for add paperwork task
    case ADD_EMP_OWN_TASK:
      console.log("============action.payload========================");
      console.log(action.payload);
      console.log("====================================", state.empOwnTask);

      // empOwnTaska = [...state.empOwnTask];
      // empOwnTaska.unshift(action.payload);

      let { empOwnTask } = state
      empOwnTask.unshift(action.payload)

      console.log('=========empOwnTask reducer after===========================');
      console.log(empOwnTask);
      console.log('====================================');

      return {
        ...state,
        empOwnTask: empOwnTask
      };

    // get own tasks
    case GET_OWN_TASK_EE:
      let empownTaskArray = action.payload;
      empownTaskArray.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.PostedTime) - new Date(a.PostedTime);

      });
      return {
        ...state,
        empOwnTask: empownTaskArray,
        loader: "false"
      };

    // to delete OWN task
    case DELETE_OWN_TASK:
      let newempOwnTask = state.empOwnTask.filter(item => item.id != action.payload);

      return {
        ...state,
        empOwnTask: newempOwnTask
      };

    default:
      return state;
  }
};
