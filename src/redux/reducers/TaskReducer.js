import { ADD_TASK } from "../actions/TasksActions";
import { GET_TASK } from "../actions/TasksActions";
import { UPDATE_TASK, UPDATE_TASK_ERR } from "../actions/TasksActions";
import { DELETE_TASK, DELETE_TASK_ERR } from "../actions/TasksActions";

import { COMPL_TASK, COMPL_TASK_ERR } from "../actions/TasksActions";
import { GT_COMP_TASK } from "../actions/TasksActions";

import { ADD_OWN_TASK } from "../actions/TasksActions";
import { GET_OWN_TASK } from "../actions/TasksActions";

import { PAPERWORK_TASK } from "../actions/TasksActions";
import {
  DELETE_OWN_TASK,
  DELETE_OWN_TASK_ERR,
  GET_ALL_LOG,
} from "../actions/TasksActions";

const initialState = {
  AllTask: [],
  PaperworkTask: [],
  CompletedTask: [],
  OwnTask: [],
  loader: "true",
  taskAddStatus: "not done",
  deleteStatusCom: "not done",
  loading: "",
  deleteOwnStatus: "not Done",
  taskDeleteStatus: "not done",
  completionStatus: "not done",
  updateTaskStatus: "not done",
  logs: [],
};
export default (state = initialState, action) => {
  switch (action.type) {
    //get all logs
    case GET_ALL_LOG:
      action.payload.sort(function(a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.taskCompleted) - new Date(a.taskCompleted);
      });
      return {
        ...state,
        logs: action.payload,
      };

    // get all tasks
    case GET_TASK:
      let tasksArray = action.payload;
      tasksArray.sort(function(a, b) {
        return new Date(b.PostedTime) - new Date(a.PostedTime);
      });

      return {
        ...state,
        AllTask: tasksArray,
        loader: "false",
      };

    // add task
    case ADD_TASK:
      let AllTask = [...state.AllTask];
      AllTask.unshift(action.payload);

      // let newArray = state.AllTask;
      // newArray.unshift(action.payload);

      console.log("==============ADD_TASK============");
      console.log(AllTask);
      console.log("====================================");
      return {
        ...state,
        AllTask: AllTask,
        taskAddStatus: "done",
        loading: new Date(),
      };

    // for task update
    case UPDATE_TASK:
      let updateState = state.AllTask;
      let id = action.payload.id;

      let newList = updateState.filter((item) => item.id != id);
      newList.unshift(action.payload);

      return {
        ...state,
        AllTask: newList,
        updateTaskStatus: "done",
      };

    case UPDATE_TASK_ERR:
      return {
        ...state,
        updateTaskStatus: "error",
      };

    // to delete task
    case DELETE_TASK:
      let currentState = state.AllTask;

      let taskid = action.payload;

      let newState = currentState.filter((item) => item.id != taskid);
      let newCompTask = state.CompletedTask.filter((item) => item.id != taskid);

      return {
        ...state,
        AllTask: newState,
        CompletedTask: newCompTask,
        deleteStatusCom: "doneCom",
        taskDeleteStatus: "done",
        loading: new Date(),
      };
    case DELETE_TASK_ERR:
      return {
        deleteStatusCom: "errorCom",
        taskDeleteStatus: "error",
        loading: new Date(),
      };

    // to add completed task
    case COMPL_TASK:
      let CompletedTask = [...state.CompletedTask];
      CompletedTask.unshift(action.payload);

      let doneId = action.payload.id;

      newState = state.AllTask.filter((item) => item.id != doneId);

      return {
        ...state,
        AllTask: newState,
        CompletedTask: CompletedTask,
        completionStatus: "done",
      };

    case COMPL_TASK_ERR:
      return {
        ...state,
        completionStatus: "error",
        loading: new Date(),
      };

    // get all completed tasks
    case GT_COMP_TASK:
      let completedTaskArray = action.payload;
      completedTaskArray.sort(function(a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.taskCompleted) - new Date(a.taskCompleted);
      });

      return {
        ...state,
        CompletedTask: completedTaskArray,
        loader: "false",
      };

    // for add own task
    case ADD_OWN_TASK:
      let OwnTask = [...state.OwnTask];
      OwnTask.unshift(action.payload);
      console.log("=============OwnTask=======================");
      console.log(OwnTask);
      console.log("====================================");

      return {
        ...state,
        OwnTask: OwnTask,
        taskAddStatus: "done own",
      };

    // get own tasks
    case GET_OWN_TASK:
      let ownTaskArray = action.payload;
      ownTaskArray.sort(function(a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.PostedTime) - new Date(a.PostedTime);
      });

      console.log("===========ownTaskArray=========================");
      console.log(ownTaskArray);
      console.log("====================================");
      return {
        ...state,
        OwnTask: ownTaskArray,
        loader: "false",
      };

    // to delete OWN task
    case DELETE_OWN_TASK:
      let newOwnTask = state.OwnTask.filter(
        (item) => item.id != action.payload
      );

      return {
        ...state,
        OwnTask: newOwnTask,
        deleteOwnStatus: "done",
        loading: new Date(),
      };

    case DELETE_OWN_TASK_ERR:
      return {
        ...state,
        deleteOwnStatus: "error",
        loading: new Date(),
      };

    default:
      return state;
  }
};
