import {combineReducers} from "redux";
import {reducer} from 'redux-form';
import user from './UserReducer';

export default combineReducers({
    form: reducer,
    user
});