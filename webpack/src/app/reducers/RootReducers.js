import {combineReducers} from "redux";
import {reducer} from 'redux-form';
import user from './UserReducer';
import project from './ProjectReducer';

export default combineReducers({
    form: reducer,
    user,
    project
});