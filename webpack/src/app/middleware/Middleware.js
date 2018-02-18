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

            switch (error.status) {
                case HttpStatus.INVALID_TOKEN_HEADER:
                    removeToken();
                    break;
                case HttpStatus.SERVER_ERROR:
                    const object = popupContent("Внутрення ошибка сервера", "Пожалуйста, перезагрузите страницу");
                    Modal.error({title: object.header, content: object.body});
                    break;
                case HttpStatus.ETHERNET_PROBLEM:
                    const warning = popupContent("Осутствует интернет соединение", "Пожалуйста, проверьте интернет соединение");
                    Modal.warning({title: warning.header, content: warning.body})
            }
        });

    const popupContent = (header, body) => {
        const title = header;
        const content = <div>
            <h3>{body}</h3>
        </div>;
        return {title, content}
    }


    //todo если получен некорректный токе, то удалять токен, ошибка 16
};


export default middleware;