export const ROOT = "/";
export const LOGIN = '/login';
export const REGISTRATION = 'registration';

export const DASHBOARD = '/dashboard';
export const CREATE_PROJECT = DASHBOARD + '/createproject';
export const PROFILE = DASHBOARD + '/profile/:id';
export const ACTUAL_PROJECT = DASHBOARD + '/project/id=:id';
export const PROJECTS = DASHBOARD + '/projects';
export const ADD_TO_PROJECT = DASHBOARD + '/addProject';
export const Settings = DASHBOARD + '/settings';
export const CREATE_TASK = DASHBOARD + "/createtask";
export const TASK_PROJECT_LIST = DASHBOARD + '/taskProjectList';
export const TASK = TASK_PROJECT_LIST +  '/task';
export const PROJECT_SETTINGS = DASHBOARD + '/project-settings';

export const PROJECT_SETTINGS_USER = DASHBOARD + '/users/project:id';
export const PROJECT_SETTINGS_ROLE = DASHBOARD + '/permission/project:id';
export const CHAT = DASHBOARD + '/chat';
export const CHAT_LIST = CHAT + '/list';
export const CHAT_PAGE = CHAT + '/page';