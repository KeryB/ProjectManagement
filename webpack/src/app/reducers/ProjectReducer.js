import * as Status from '../utils/AuthStatus';
import * as Types from "../const/ActionTypes";

const initialState = {
    isFetched: false,
    isLoading: false,
    projects: []
};

export default (state = initialState, action = {}) => {

    switch (action.type) {
        case Types.FETCH_PROJECT_DATA_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case Types.FETCH_PROJECT_DATA_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isFetched: true,
                projects: [...action.payload[0].projectPermissions],
                totalPages: action.payload[0].totalPages
            };
        case Types.FETCH_USER_DATA_FAILED:
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
}