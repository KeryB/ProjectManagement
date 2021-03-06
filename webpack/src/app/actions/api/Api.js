import {getStorageItem} from "../../utils/token/LocalStorage";
import * as HttpMethods from "../../const/http/HttpMethods";
import * as HttpStatus from "../../const/http/HttpStatus";

export const tokenHeader = "X-Auth-Token";
export const roleHeader = "X-Role-Header";
export const chosenProject="Chosen-Project";

export const api = (path, method, data = null) => (successHandler, errorHandler) => {

    let headers = {};
    headers['Content-Type'] = 'application/json';

    const token = getStorageItem(tokenHeader);
    if (token) {
        headers[tokenHeader] = token;
    }

    const projectId = getStorageItem(chosenProject);
    if(projectId){
        headers[chosenProject] = projectId;
    }

    const config = ({
        method: method,
        headers
    });

    if(method === HttpMethods.POST && data){
        config.body = JSON.stringify(data);
    }

    let role;

    fetch(path, config).then((response)=>{
        console.log(response);
        const status = response.status;
        if(status >= HttpStatus.OK && status < 300){
            role = response.headers.get(roleHeader);
            return response.json();
        }
        throw {
            status,
            message: response.statusText
        }
    }).then(body => {
        console.log(body);
        if (body.status !== HttpStatus.OK) {
            let error = {
                status:  body.status,
                message: body.message,
            };
            if (body.result) {
                error.data = body.result;
            }
            console.log(body);
            throw error;
        } else if (!body.result || !Array.isArray(body.result)) {
            throw {
                status:  HttpStatus.NO_DATA_FROM_SERVER,
                message: 'Данные от сервера не получены',
            };
        } else {
            console.log(body.result, role);
            successHandler(body.result, role);
        }
    }).catch(e => errorHandler(e));
};