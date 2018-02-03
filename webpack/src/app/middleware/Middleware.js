import * as Types from "../const/ActionTypes";

const middleware = store => next => action => {

    if (action.type !== Types.API_CALL) return next(action);

    const {
        actions: [requestAction, successAction, failureAction],
        additionalData,
        successMessage,
        successCallback,
        errorMessage,
        errorCallback,
    } = action;

    if (requestAction) {
        store.dispatch({type: requestAction, additionalData});
    }

    action.promise((data, role) => {
            console.log(action);
            if (successAction) store.dispatch({type: successAction, payload: data, additionalData});

            if (successCallback) successCallback(data, role);
        },
        error => {
            if (failureAction) {
                store.dispatch({type: failureAction, payload: error, additionalData});
            }

            if (errorCallback) {
                errorCallback(error);
            }
        })
};


export default middleware;