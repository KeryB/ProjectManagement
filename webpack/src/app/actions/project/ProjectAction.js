import * as Types from "../../const/ActionTypes";
import * as Methods from "../../const/http/HttpMethods";
import {API_PROJECT_FETCH_DATA} from "../../const/ApiPath";
import {API_CALL} from "../../const/ActionTypes";
import {api} from "../api/Api";
import {METHODS_CALL} from "../../const/ActionTypes";
import {saveAction} from "../reduxCrud/crudActions";

const SAVE_PROJECT_PREFIX = 'PROJECT';

export const FETCH_PROJECTS_REQUEST = 'FETCH_PROJECTS_REQUEST';
export const FETCH_PROJECTS_SUCCESS = 'FETCH_PROJECTS_SUCCESS';
export const FETCH_PROJECTS_FAILED = 'FETCH_PROJECTS_FAILED';

export function fetchProjectData(data) {
    return {
        type: API_CALL,
        actions: [Types.FETCH_PROJECT_DATA_REQUEST, Types.FETCH_PROJECT_DATA_SUCCESS, Types.FETCH_PROJECT_DATA_ERROR],
        promise: api(API_PROJECT_FETCH_DATA, Methods.POST, data)
    }
}

export function fetchProjects(data) {
    return {
        type: API_CALL,
        actions: [FETCH_PROJECTS_REQUEST, FETCH_PROJECTS_SUCCESS, FETCH_PROJECTS_FAILED],
        promise: api('/api/project/fetchProjects', Methods.POST, data)
    }
}

export function saveProject(data, successCallback, errorCallback) {
    return saveAction(SAVE_PROJECT_PREFIX, "/api/project/saveProject", {data, successCallback, errorCallback})
}