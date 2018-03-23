import {FETCH_TASK_LIST_FAILED, FETCH_TASK_LIST_REQUEST, FETCH_TASK_LIST_SUCCESS} from "../actions/TaskActions";

const initialState = {
    loading: false,
    isFetched: false,
    taskList: [],
    taskData: {}
};

export default (state = initialState, action = {}) => {

    switch (action.type) {

        case "TASK_SAVE_SUCCESS":
            state.tasks.unshift(action.payload[0]);
            return {
                ...state
            };
        case FETCH_TASK_LIST_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_TASK_LIST_SUCCESS:
            console.log(action.payload[0].content);
            return {
                ...state,
                loading: false,
                taskList: action.payload[0].content
            };
        case FETCH_TASK_LIST_FAILED:
            return {
                ...state,
                loading: false,
            };

        default:
            return state;
    }
}