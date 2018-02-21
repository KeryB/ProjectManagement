import {api} from './api/Api';
import * as Types from "../const/ActionTypes";
import * as Methods from "../const/http/HttpMethods";
import {API_AUTH_UPDATE_TOKEN, API_USER_FETCH} from "../const/ApiPath";

export function makeAuth(path, data, successCallback, errorCallback) {
    return {
        type: Types.API_CALL,
        actions: [Types.MAKE_AUTH_REQUEST, Types.MAKE_AUTH_SUCCESS, Types.MAKE_AUTH_FAILED],
        promise: api(path, Methods.POST, data),
        successCallback,
        errorCallback,
        ignoreErrors: true
    }
}

export function fetchUserData() {
    return {
        type: Types.API_CALL,
        actions: [Types.FETCH_USER_DATA_REQUEST, Types.FETCH_USER_DATA_SUCCESS, Types.FETCH_USER_DATA_FAILED],
        promise: api(API_USER_FETCH, Methods.POST)
    }
}

export function refreshToken() {
    return {
        type: Types.API_CALL,
        actions: [Types.UPDATE_TOKEN_REQUEST, Types.UPDATE_TOKEN_SUCCESS, Types.UPDATE_TOKEN_FAILED],
        promise: api(API_AUTH_UPDATE_TOKEN, Methods.POST)
    }
}

export function logout() {
    return {
        type: Types.API_CALL,
        actions: Types.LOGOUT_USER
    }
}