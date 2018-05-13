import * as React from "react";
import DashBoard from "./navigation/Dashboard";
import {Route, Switch} from "react-router-dom";
import * as Path from '../../utils/RoutePath'
import Profile from "./dashboardComponents/Profile";
import Projects from "./dashboardComponents/project/Projects";
import ProjectCreation from "./dashboardComponents/ProjectCreation";
import UserSettings from "./dashboardComponents/UserSettings";
import ActualProject from "./dashboardComponents/actualproject/ActualProject";
import TaskCreation from "./dashboardComponents/task/TaskCreation";
import TaskProjectList from "./dashboardComponents/task/TaskProjectList";
import TaskProjectListInternal from "./dashboardComponents/task/TaskProjectListInternal";
import ProjectSettings from "./dashboardComponents/settings/ProjectSettings";
import ProjectUserSettings from "./dashboardComponents/settings/ProjectSettingsUser";
import ProjectSettingsRole from "./dashboardComponents/settings/ProjectSettingsRole";
import Chats from "./dashboardComponents/chats/ChatList";
import ChatPage from "./dashboardComponents/chats/ChatPage";
import ChatInternal from "./dashboardComponents/chats/ChatInternal";
import MainView from "./dashboardComponents/main/MainView";
import Mail from "./dashboardComponents/mail/Mail";
import TaskList from "./dashboardComponents/task/TaskList";
import DetailScheduleTaskCalendar from "./dashboardComponents/main/DetailScheduleTaskCalendar";
import Documents from "./dashboardComponents/documents/Documents";


class DashboardInternal extends React.Component {

    render() {
        const{userData:{projectData}, userActions, userData} = this.props;

        console.log(this.props);

        //todo сделать 404 ошибку
        return (
            <DashBoard {...this.props}>
                <Switch>
                    <Route exact path={Path.DASHBOARD} component={MainView}/>
                    <Route breadcrumbName="projects" path={Path.PROJECTS} render={()=>(<Projects userActions={userActions}/>)} />
                    <Route path={Path.PROFILE} component={Profile}/>
                    <Route path={Path.Settings} render={()=>(<UserSettings userData={userData}/>)}/>
                    <Route path={Path.ACTUAL_PROJECT} component={ActualProject}/>
                    <Route path={Path.MAIL} component={Mail}/>
                    <Route path={Path.CREATE_PROJECT} component={ProjectCreation}/>
                    <Route path={Path.CREATE_TASK} component={TaskCreation}/>
                    <Route path={Path.TASK_PROJECT_LIST} component={TaskProjectListInternal}/>
                    <Route path={Path.PROJECT_SETTINGS} component={ProjectSettings}/>
                    <Route path={Path.PROJECT_SETTINGS_USER} component={ProjectUserSettings}/>
                    <Route path={Path.PROJECT_SETTINGS_ROLE} component={ProjectSettingsRole}/>
                    <Route path={Path.CHAT} component={ChatInternal}/>
                    <Route path={Path.DOCUMENTS} component={Documents}/>
                    <Route path={Path.TASK_LIST} component={TaskList}/>
                    <Route path={Path.DETAIL_SCHEDULE_TASK_CALENDAR} component={DetailScheduleTaskCalendar}/>
                </Switch>
            </DashBoard>
        )
    }
}

export default DashboardInternal;