import * as Types from "../../const/ActionTypes";
import * as Methods from "../../const/http/HttpMethods";
import {API_PROJECT_FETCH_DATA} from "../../const/ApiPath";
import {API_CALL} from "../../const/ActionTypes";
import {api} from "../api/Api";
import {METHODS_CALL} from "../../const/ActionTypes";
import {fetchByIdAction, saveAction} from "../reduxCrud/crudActions";
import {USER_PREFIX} from "../UserAction";

export const PROJECT_PREFIX = 'PROJECT';
export const API_PROJECT = '/api/project';

export const FETCH_PROJECTS_REQUEST = 'FETCH_PROJECTS_REQUEST';
export const FETCH_PROJECTS_SUCCESS = 'FETCH_PROJECTS_SUCCESS';
export const FETCH_PROJECTS_FAILED = 'FETCH_PROJECTS_FAILED';

export const FETCH_ACTUAL_PROJECT_DATA_REQUEST = 'FETCH_ACTUAL_PROJECT_DATA_REQUEST';
export const FETCH_ACTUAL_PROJECT_DATA_SUCCESS = 'FETCH_ACTUAL_PROJECT_DATA_SUCCESS';
export const FETCH_ACTUAL_PROJECT_DATA_FAILED = 'FETCH_ACTUAL_PROJECT_DATA_FAILED';

export function fetchProjectData(data) {
    return {
        type: API_CALL,
        actions: [Types.FETCH_PROJECT_DATA_REQUEST, Types.FETCH_PROJECT_DATA_SUCCESS, Types.FETCH_PROJECT_DATA_ERROR],
        promise: api(API_PROJECT_FETCH_DATA, Methods.POST, data)
    }
}

export function fetchProjectsProfile(data, successCallback) {
    return {
        type: API_CALL,
        actions: [FETCH_PROJECTS_REQUEST, FETCH_PROJECTS_SUCCESS, FETCH_PROJECTS_FAILED],
        promise: api(API_PROJECT + '/fetchProjectsProfile', Methods.POST, data),
        successCallback
    }
}

export function saveProject(data, successCallback, errorCallback) {
    return saveAction(PROJECT_PREFIX, API_PROJECT + "/saveProject", {data, successCallback, errorCallback})
}

export function fetchProjectsByUserId() {
    return fetchByIdAction(PROJECT_PREFIX, USER_PREFIX, "/api/project/fetchProjects")
}

//actualProject
export function fetchActualProjectData(data) {
    return {
        type: API_CALL,
        actions: [FETCH_ACTUAL_PROJECT_DATA_REQUEST, FETCH_ACTUAL_PROJECT_DATA_SUCCESS, FETCH_ACTUAL_PROJECT_DATA_FAILED],
        promise: api(API_PROJECT + '/fetchActualProjectData', Methods.POST, data)
    }
}