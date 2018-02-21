import * as Roles from '../utils/Roles';
import * as Status from '../utils/AuthStatus';
import * as Types from "../const/ActionTypes";
import {putStorageItem, removeStorageItem} from "../utils/token/TokenManager";
import {tokenHeader} from '../actions/api/Api';

const initialState = {
    isFetched: false,
    isLoading: false,
    projectPermissions: [],
    user: {
        role: Roles.NOT_AUTH,
        tokenStatus: Status.NOT_AUTH
    },
    chosenProject: {}
};
export default (state = initialState, action = {}) => {
    switch (action.type) {

        case Types.MAKE_AUTH_REQUEST:
            return {
                ...initialState
            };
        case Types.MAKE_AUTH_SUCCESS:
            putStorageItem(tokenHeader, action.payload[0]);
            return {
                ...state,
                user: {tokenStatus: Status.VALID}
            };

        case Types.FETCH_USER_DATA_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case Types.FETCH_USER_DATA_FAILED:
            if (action.payload.status === 19) {
                return {
                    ...state,
                    user: {tokenStatus: Status.REFRESH_TOKEN_REQUIRED},
                    isLoading: false,
                }
            }
            return {
                ...state,
                isLoading: false,
            };
        case Types.FETCH_USER_DATA_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isFetched: true,
                projectPermissions: [
                    ...action.payload[0].projectPermissions
                ],
                user: {
                    ...action.payload[0].user,
                    tokenStatus: Status.VALID,
                    role: action.role
                }

            };
        case Types.UPDATE_TOKEN_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case Types.UPDATE_TOKEN_SUCCESS:
            putStorageItem(tokenHeader, action.payload[0]);
            return {
                ...state,
                isLoading: false,
                user:{
                    tokenStatus:Status.NOT_AUTH
                }
            };
        case Types.UPDATE_TOKEN_FAILED:
            removeStorageItem(tokenHeader);
            break;
        default:
            return state;
    }
}