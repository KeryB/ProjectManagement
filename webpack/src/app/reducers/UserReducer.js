import * as Roles from '../utils/Roles';
import * as Status from '../utils/AuthStatus';
import * as Types from "../const/ActionTypes";
import {putToken} from "../utils/token/TokenManager";

const initialState = {
    isFetched: false,
    isLoading: false,
    projectPermissions: [],
    user: {
        role: Roles.NOT_AUTH,
        tokenStatus: Status.NOT_AUTH
    }
};
export default (state = initialState, action = {}) => {
    switch (action.type) {

        case Types.MAKE_AUTH_REQUEST:
            return {
                ...initialState
            };
        case Types.MAKE_AUTH_SUCCESS:
            putToken(action.payload[0]);
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
            return {
                ...state,
                isLoading: false,
            };
        case Types.FETCH_USER_DATA_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isFetched: true,
                projectPermissions:[
                    ...action.payload[0].projectPermissions
                ],
                user: {
                    ...action.payload[0].user,
                    tokenStatus: Status.VALID,
                    role: action.role}
            };
        default:
            return state;
    }
}