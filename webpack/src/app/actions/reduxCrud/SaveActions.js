import {saveAction} from "./crudActions";

export const SAVE_PROJECT_PREFIX = 'PROJECT';
export const SAVE_USER_SETTINGS = 'USER_SETTINGS';
export const TASK_PREFIX = 'TASK';

export function saveProject(data, successCallback, errorCallback) {
    return saveAction(SAVE_PROJECT_PREFIX, "/api/project/saveProject", {data, successCallback, errorCallback})
}

export function saveUserSettings(data, successCallback, errorCallback) {
    return saveAction(SAVE_USER_SETTINGS, "/api/user/saveUserSettings", {data, successCallback, errorCallback})
}

export function saveTask(data, successCallback, errorCallback) {
    return saveAction(TASK_PREFIX, "/api/task/saveTask", {data, successCallback, errorCallback})
}
