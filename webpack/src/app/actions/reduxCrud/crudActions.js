import * as Types from '../../const/ActionTypes';
import {api} from "../api/Api";
import * as Methods from "../../const/http/HttpMethods";

export const saveAction = (actionPrefix, path, {
    data,
    successCallback, errorCallback
}) => ({
    type: Types.API_CALL,
    actions: [
        `${actionPrefix}_SAVE_START`,
        `${actionPrefix}_SAVE_SUCCESS`,
        `${actionPrefix}_SAVE_FAILED`,
    ],
    successCallback,
    errorCallback,
    promise: api(path, Methods.POST, data)
});