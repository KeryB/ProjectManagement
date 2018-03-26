import {API_CALL} from "../const/ActionTypes";
import {api} from "./api/Api";
import * as Methods from "../const/http/HttpMethods";

export const FETCH_TASK_LIST_REQUEST = 'FETCH_TASK_LIST_REQUEST';
export const FETCH_TASK_LIST_SUCCESS = 'FETCH_TASK_LIST_SUCCESS';
export const FETCH_TASK_LIST_FAILED = 'FETCH_TASK_LIST_FAILED';

export const FETCH_TASK_DATA_REQUEST = 'FETCH_TASK_DATA_REQUEST';
export const FETCH_TASK_DATA_SUCCESS = 'FETCH_TASK_DATA_SUCCESS';
export const FETCH_TASK_DATA_FAILED = 'FETCH_TASK_DATA_FAILED';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILED = 'ADD_COMMENT_FAILED';

export const TASK_SAVE_REQUEST = 'TASK_SAVE_REQUEST';
export const TASK_SAVE_SUCCESS = 'TASK_SAVE_SUCCESS';
export const TASK_SAVE_FAILED = 'TASK_SAVE_FAILED';

export function fetchTaskList() {
    return {
        type: API_CALL,
        actions: [FETCH_TASK_LIST_REQUEST, FETCH_TASK_LIST_SUCCESS, FETCH_TASK_LIST_FAILED],
        promise: api("/api/task/fetchTaskList", Methods.POST)
    }
}

export function fetchTaskData(data) {
    return {
        type: API_CALL,
        actions: [FETCH_TASK_DATA_REQUEST, FETCH_TASK_DATA_SUCCESS, FETCH_TASK_DATA_FAILED],
        promise: api("/api/task/fetchTaskData", Methods.POST, data)
    }
}

export function addComment(data) {
    return {
        type: API_CALL,
        actions: [ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILED],
        promise: api("/api/task/addComment", Methods.POST, data)
    }
}

export function saveTask(data, successCallback) {
    return {
        type: API_CALL,
        actions: [TASK_SAVE_REQUEST, TASK_SAVE_SUCCESS, TASK_SAVE_FAILED],
        promise: api("/api/task/saveTask", Methods.POST, data),
        successCallback
    }
}