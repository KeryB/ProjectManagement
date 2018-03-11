import {combineReducers} from "redux";
import {reducer} from 'redux-form';
import user from './UserReducer';
import project from './ProjectReducer';
import profile from './ProfileReducer';
import actualProject from './ActualProject';

export default combineReducers({
    form: reducer,
    user,
    project,
    profile,
    actualProject
});