import * as Roles from '../utils/Roles';
import * as Status from '../utils/AuthStatus';
import * as Types from "../const/ActionTypes";
import {putToken} from "../utils/token/TokenManager";

const initialState = {
    isFetched: false,
    user: {
        role: Roles.NOT_AUTH,
        status: Status.NOT_AUTH
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
            return state;

        default:
            return state;
    }
}