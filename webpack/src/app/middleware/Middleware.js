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
        ignoreErrors = false
    } = action;

    if (requestAction) {
        store.dispatch({type: requestAction, additionalData});
    }

    action.promise((data, role) => {
            console.log(action);
            if (successAction) {
                store.dispatch({type: successAction, payload: data, role: role});
            }

            if (successCallback) {
                successCallback(data, role);
            }

            if (role && store.getState().user.user.role !== role) {
                console.log("kek");
            }
        },
        error => {
            if (failureAction) {
                store.dispatch({type: failureAction, payload: error, additionalData});
            }

            if (errorCallback) {
                errorCallback(error);
            }
            if (ignoreErrors) {
                return;
            }
        })


    //todo если получен некорректный токе, то удалять токен, ошибка 16
};


export default middleware;