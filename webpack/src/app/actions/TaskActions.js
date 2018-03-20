import {API_CALL} from "../const/ActionTypes";
import {api} from "./api/Api";
import * as Methods from "../const/http/HttpMethods";

export const FETCH_TASK_LIST_REQUEST = 'FETCH_TASK_LIST_REQUEST';
export const FETCH_TASK_LIST_SUCCESS = 'FETCH_TASK_LIST_SUCCESS';
export const FETCH_TASK_LIST_FAILED = 'FETCH_TASK_LIST_FAILED';

export function fetchTaskData() {
    return {
        type: API_CALL,
        actions: [FETCH_TASK_LIST_REQUEST, FETCH_TASK_LIST_SUCCESS, FETCH_TASK_LIST_FAILED],
        promise: api("/api/task/fetchTaskData", Methods.POST)
    }
}