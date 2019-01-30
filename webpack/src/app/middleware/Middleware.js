import * as Types from "../const/ActionTypes";
import * as HttpStatus from '../const/http/HttpStatus';
import {message, Modal} from 'antd';
import {removeStorageItem} from "../utils/token/LocalStorage";
import {tokenHeader} from '../actions/api/Api';

const middleware = store => next => action => {

    if (action.type === Types.METHODS_CALL) {
        console.log(action);
        store.dispatch({
            type: action.action,
            payload: action.object
        })
    }

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
            if (successAction) {
                store.dispatch({type: successAction, payload: data, role: role});
            }

            if (successCallback) {
                successCallback(data, role);
            }

            if (role && store.getState().user.user.role !== role) {
            }
        }, error => {
            if (failureAction) {
                store.dispatch({type: failureAction, payload: error, additionalData});
            }

            if (errorCallback) {
                errorCallback(error);
            }
            if (ignoreErrors) {
                return;
            }

            switch (error.status) {
                case HttpStatus.INVALID_TOKEN_HEADER:
                    removeStorageItem(tokenHeader);
                    break;
                case HttpStatus.SERVER_ERROR:
                    const object = popupContent("Внутрення ошибка сервера", "Пожалуйста, перезагрузите страницу");
                    console.log(object);
                    Modal.error({title: object.title, content: object.content});
                    break;
                case HttpStatus.ETHERNET_PROBLEM:
                    const warning = popupContent("Осутствует интернет соединение", "Пожалуйста, проверьте интернет соединение");
                    Modal.warning({title: warning.title, content: warning.content});
                    break;
                case HttpStatus.INVALID_PROJECT_ID:
                    const invalidProjectId = popupContent("Внимание", "Нет доступа к проекту или такого проекта нет!");
                    Modal.error({title: invalidProjectId.title, content: invalidProjectId.content});
                    break;
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