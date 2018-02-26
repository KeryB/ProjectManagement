import * as React from "react";
import DashBoard from "./navigation/Dashboard";
import {Route, Switch} from "react-router-dom";
import * as Path from '../../utils/RoutePath'
import Profile from "./dashboardComponents/Profile";
import Projects from "./dashboardComponents/Projects";
import ProjectCreation from "./dashboardComponents/ProjectCreation";


class DashboardInternal extends React.Component {

    render() {
        const{userData:{isLoading}, userActions} = this.props;

        //todo сделать 404 ошибку
        return (
            <DashBoard {...this.props}>
                <Switch>
                    <Route path={Path.PROJECTS} render={()=>(<Projects userActions={userActions} isLoadingUserData={isLoading}/>)} />
                    <Route path={Path.PROFILE} component={Profile}/>
                    <Route path={Path.CREATE_PROJECT} component={ProjectCreation}/>
                </Switch>
            </DashBoard>
        )
    }
}

export default DashboardInternal;