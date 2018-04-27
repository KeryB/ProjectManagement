import {
    FETCH_ACTUAL_PROJECT_DATA_FAILED, FETCH_ACTUAL_PROJECT_DATA_REQUEST,
    FETCH_ACTUAL_PROJECT_DATA_SUCCESS
} from "../actions/project/ProjectAction";

const initialState = {
    loading: false,
    isFetched: false,
    projectData: {}
};

export default (state = initialState, action = {}) => {

    switch (action.type) {

        case FETCH_ACTUAL_PROJECT_DATA_REQUEST:
            return {
                ...state,
                loading: true
            };
        case FETCH_ACTUAL_PROJECT_DATA_SUCCESS:
            return {
                ...state,
                loading:false,
                projectData: action.payload[0]
            };
        case FETCH_ACTUAL_PROJECT_DATA_FAILED:
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
}