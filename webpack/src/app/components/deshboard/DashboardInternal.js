import * as React from "react";
import DashBoard from "./navigation/Dashboard";
import {Route, Switch} from "react-router-dom";
import * as Path from '../../utils/RoutePath'
import Profile from "./dashboardComponents/Profile";
import Projects from "./dashboardComponents/project/Projects";
import ProjectCreation from "./dashboardComponents/ProjectCreation";
import UserSettings from "./dashboardComponents/UserSettings";
import ActualProject from "./dashboardComponents/project/ActualProject";
import TaskCreation from "./dashboardComponents/task/TaskCreation";
import TaskProjectList from "./dashboardComponents/task/TaskProjectList";
import TaskProjectListInternal from "./dashboardComponents/task/TaskProjectListInternal";
import ProjectSettings from "./dashboardComponents/settings/ProjectSettings";
import ProjectUserSettings from "./dashboardComponents/settings/ProjectSettingsUser";
import ProjectSettingsRole from "./dashboardComponents/settings/ProjectSettingsRole";
import Chats from "./dashboardComponents/chats/Chats";
import ChatPage from "./dashboardComponents/chats/ChatPage";
import ChatInternal from "./dashboardComponents/chats/ChatInternal";
import MainView from "./main/MainView";


class DashboardInternal extends React.Component {

    render() {
        const{userData:{projectData}, userActions, userData} = this.props;

        //todo сделать 404 ошибку
        return (
            <DashBoard {...this.props}>
                <Switch>
                    <Route exact path={Path.DASHBOARD} component={MainView}/>
                    <Route breadcrumbName="projects" path={Path.PROJECTS} render={()=>(<Projects userActions={userActions}/>)} />
                    <Route path={Path.PROFILE} component={Profile}/>
                    <Route path={Path.Settings} render={()=>(<UserSettings userData={userData}/>)}/>
                    <Route breadcrumbName="project:/id" path={Path.ACTUAL_PROJECT} render={()=>(<ActualProject projectData={projectData}/>)} />
                    <Route path={Path.CREATE_PROJECT} component={ProjectCreation}/>
                    <Route path={Path.CREATE_TASK} component={TaskCreation}/>
                    <Route path={Path.TASK_PROJECT_LIST} component={TaskProjectListInternal}/>
                    <Route path={Path.PROJECT_SETTINGS} component={ProjectSettings}/>
                    <Route path={Path.PROJECT_SETTINGS_USER} component={ProjectUserSettings}/>
                    <Route path={Path.PROJECT_SETTINGS_ROLE} component={ProjectSettingsRole}/>
                    <Route path={Path.CHAT} component={ChatInternal}/>
                </Switch>
            </DashBoard>
        )
    }
}

export default DashboardInternal;