import * as Roles from '../utils/Roles';
import * as Status from '../utils/AuthStatus';
import * as Types from "../const/ActionTypes";
import {getStorageItem, putStorageItem, removeStorageItem} from "../utils/token/LocalStorage";
import {tokenHeader} from '../actions/api/Api';

const initialState = {
    isFetched: false,
    isLoading: false,
    projectData: {
        countProjects: 0,
        chosenProject: null
    },
    user: {
        role: Roles.NOT_AUTH,
        tokenStatus: Status.NOT_AUTH
    },
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
                const {user} = state;
                user.tokenStatus = Status.REFRESH_TOKEN_REQUIRED;
            }
            return {
                ...state,
                isLoading: false,
            };
        case Types.FETCH_USER_DATA_SUCCESS:
            console.log(...action);
            const payload = action.payload[0];
            return {
                ...state,
                isLoading: false,
                isFetched: true,
                projectData: {
                    countProjects: payload.paging.totalElements,
                    chosenProject: payload.chosenProject
                },
                user: {
                    ...action.payload[0].user,
                    tokenStatus: Status.VALID,
                    role: action.role
                },
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
                    tokenStatus:Status.VALID
                }
            };
        case Types.UPDATE_TOKEN_FAILED:
            removeStorageItem(tokenHeader);
            break;

        case Types.CHOSEN_PROJECT:
            return {
                ...state,
                projectData:{
                    chosenProject:action.payload
                }
            };
        default:
            return state;
    }
}