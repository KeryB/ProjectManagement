import {FETCH_PROJECTS_FAILED, FETCH_PROJECTS_REQUEST, FETCH_PROJECTS_SUCCESS} from "../actions/project/ProjectAction";
import {
    FETCH_USER_PROFILE_FAILED, FETCH_USER_PROFILE_REQUEST, FETCH_USER_PROFILE_SUCCESS,
    TO_PROFILE_USER
} from "../actions/UserAction";

const initialState = {
    user: null,
    loading: false,
    projects: []
};

export default (state = initialState, action = {}) => {

    switch (action.type) {
        case FETCH_PROJECTS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case FETCH_PROJECTS_SUCCESS:
            return {
                ...state,
                projects: [...action.payload],
                loading: false
            };
        case FETCH_PROJECTS_FAILED:
            return {
                ...state,
                loading: false
            };
        case FETCH_USER_PROFILE_REQUEST:
            return {
                ...state,
                loading: true
            };
        case FETCH_USER_PROFILE_SUCCESS:
            console.log(action);
            return {
                ...state,
                user: action.payload[0],
                loading: false
            };
        case FETCH_USER_PROFILE_FAILED:
            return {
                ...state,
                loading: false
            };
        case TO_PROFILE_USER:
            console.log(action);
            return {
                user: action.payload
            }
        default:
            return state;
    }
}