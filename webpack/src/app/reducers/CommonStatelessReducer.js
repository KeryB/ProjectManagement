const initialState = {
    isLoading: false,
    isFetched: false,
    projects: [],
    users:[]
};


//todo сделать crudReducer
export default (state = initialState, action = {}) => {

    switch (action.type) {

        case "FETCH_PROJECT_BY_USER_ID_REQUEST":
            return {
                ...state,
                isLoading: true
            };

        case "FETCH_PROJECT_BY_USER_ID_FAILED":
            return {
                ...state,
                isLoading: false
            };
        case "FETCH_PROJECT_BY_USER_ID_SUCCESS":
            return {
                ...state,
                isLoading: false,
                projects: [...action.payload]
            };
        case "FETCH_USERS_BY_PROJECT_ID_REQUEST":
            return {
                ...state,
                isLoading: true
            };
        case "FETCH_USERS_BY_PROJECT_ID_SUCCESS":
            return {
                ...state,
                isLoading: false,
                users: [...action.payload]
            };
        case "FETCH_USERS_BY_PROJECT_ID_FAILED":
            return {
                ...state,
                isLoading: false
            };
        default:
            return state;
    }
}