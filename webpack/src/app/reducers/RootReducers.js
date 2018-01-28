import {combineReducers} from "redux";
import {reducer} from 'redux-form';
import auth from './AuthReducer';

export default combineReducers({
    form: reducer,
    auth
});