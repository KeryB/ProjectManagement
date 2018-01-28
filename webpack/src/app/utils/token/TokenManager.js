import {tokenHeader} from "../../actions/api/Api";

export const getToken = () => {
    return window.localStorage.getItem(tokenHeader);
};

export const putToken = (token) => {
    return window.localStorage.setItem(tokenHeader,token);
};

export const removeToken = (token) => {
    return window.localStorage.removeItem(tokenHeader);
};