import * as Types from '../../const/ActionTypes';
import {api} from "../api/Api";
import * as Methods from "../../const/http/HttpMethods";

export function saveAction(actionPrefix, path, {
    data,
    successCallback, errorCallback
}) {
    return {
        type: Types.API_CALL,
        actions: [
            `${actionPrefix}_SAVE_START`,
            `${actionPrefix}_SAVE_SUCCESS`,
            `${actionPrefix}_SAVE_FAILED`,
        ],
        successCallback,
        errorCallback,
        promise: api(path, Methods.POST, data)
    };
}

export function fetchByIdAction(affix, actionPrefix, path,
                                data=null,
                                successCallback, errorCallback) {
    return {
        type: Types.API_CALL,
        actions: [
            `FETCH_${affix}_BY_${actionPrefix}_ID_REQUEST`,
            `FETCH_${affix}_BY_${actionPrefix}_ID_SUCCESS`,
            `FETCH_${affix}_BY_${actionPrefix}_ID_FAILED`,
        ],
        successCallback,
        errorCallback,
        promise: api(path, Methods.POST, data)
    };

}