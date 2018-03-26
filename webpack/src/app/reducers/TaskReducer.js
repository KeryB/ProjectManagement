import {
    FETCH_TASK_DATA_FAILED,
    FETCH_TASK_DATA_REQUEST, FETCH_TASK_DATA_SUCCESS, FETCH_TASK_LIST_FAILED, FETCH_TASK_LIST_REQUEST,
    FETCH_TASK_LIST_SUCCESS, TASK_SAVE_SUCCESS
} from "../actions/TaskActions";

const initialState = {
    loading: false,
    isFetched: false,
    totalElements: 0,
    taskList: [],
    taskData: {
        payload: {},
        loading: false,
    }
};

export default (state = initialState, action = {}) => {

    switch (action.type) {

        case TASK_SAVE_SUCCESS:
            return {
                ...state
            };
        case FETCH_TASK_LIST_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_TASK_LIST_SUCCESS:
            const payload = action.payload[0];
            return {
                ...state,
                loading: false,
                totalElements: payload.totalElements,
                taskList: payload.content
            };
        case FETCH_TASK_LIST_FAILED:
            return {
                ...state,
                loading: false,
            };

        case FETCH_TASK_DATA_REQUEST:
            return {
                ...state,
                taskData: {
                    ...state.taskData,
                    loading: true,
                }
            };
        case FETCH_TASK_DATA_SUCCESS:
            return {
                ...state,
                isFetched: true,
                loading: false,
                taskData: {
                    payload: action.payload[0],
                    loading: false
                }
            };
        case FETCH_TASK_DATA_FAILED:
            return {
                ...state,
                taskData: {
                    ...state.taskData,
                    loading: true,
                }
            };

        default:
            return state;
    }
}