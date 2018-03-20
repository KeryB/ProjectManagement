
const initialState = {
    isLoading: false,
    isFetched: false,
    items:[

    ]
};

export default (state = initialState, action = {}) => {

    switch (action.type){

        case "TASK_SAVE_SUCCESS":
            state.tasks.unshift(action.payload[0]);
            return {
                ...state
            };

        default:
            return state;
    }
}