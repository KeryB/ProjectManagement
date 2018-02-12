import * as Types from "../const/ActionTypes";
import * as HttpStatus from '../const/http/HttpStatus';
import {message, Modal} from 'antd';
import {removeToken} from "../utils/token/TokenManager";

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
            console.log(error);

            switch (error.status){
                case HttpStatus.INVALID_TOKEN_HEADER:
                    removeToken();
                    break;
                case HttpStatus.SERVER_ERROR:
                    const header = 'Внутрення ошибка сервера';
                    const body = <div>
                        <h3>Пожалуйста, перезагрузите страницу</h3>
                    </div>;
                    Modal.error({title: header, content: body})
            }
        })


    //todo если получен некорректный токе, то удалять токен, ошибка 16
};


export default middleware;