import * as Types from "../const/ActionTypes";
import {PROJECT_PREFIX} from "../actions/project/ProjectAction";

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
            console.log(action);
            return {
                ...state,
                isLoading: false,
                isFetched: true,
                projects: [...action.payload[0].userProjects],
                totalPages: action.payload[0].totalPages
            };
        case Types.FETCH_USER_DATA_FAILED:
            return {
                ...state,
                isLoading: false,
            };
        case PROJECT_PREFIX + '_SAVE_SUCCESS':
            state.projects.unshift(action.payload[0]);
            return {
                ...state
            };
        default:
            return state;
    }
}