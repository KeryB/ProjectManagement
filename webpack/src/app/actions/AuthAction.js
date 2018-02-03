import {api} from './api/Api';
import * as Types from "../const/ActionTypes";
import * as Methods from "../const/http/HttpMethods";

export function makeAuth(url, data, successCallback, errorCallback) {
    return {
        type:           Types.API_CALL,
        actions:        [Types.MAKE_AUTH_REQUEST, Types.MAKE_AUTH_SUCCESS, Types.MAKE_AUTH_FAILED],
        promise:        api(url, Methods.POST, data),
        successCallback,
        errorCallback
    }
}