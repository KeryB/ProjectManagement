import * as Status from '../utils/AuthStatus';
import * as Types from "../const/ActionTypes";
import {
    FETCH_PROJECTS_FAILED, FETCH_PROJECTS_REQUEST,
    FETCH_PROJECTS_SUCCESS
} from "../actions/project/ProjectAction";

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

        case FETCH_PROJECTS_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case FETCH_PROJECTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isFetched: true,
                projects:[...action.payload]
            };
        case FETCH_PROJECTS_FAILED:
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
}