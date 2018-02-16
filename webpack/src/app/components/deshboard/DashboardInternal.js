import * as React from "react";
import DashBoard from "./navigation/Dashboard";
import {Route, Switch} from "react-router-dom";
import * as Path from '../../utils/RoutePath'
import Profile from "./component/Profile";
import Projects from "./component/Projects";


class DashboardInternal extends React.Component {

    render() {
        const{userData:{projectPermissions}} = this.props;

        console.log(projectPermissions);

        return (
            <DashBoard
                {...this.props}>
                <Switch>
                    <Route path={Path.PROJECTS} render={(props)=>(<Projects projects={projectPermissions}/>)} />
                    <Route path={Path.PROFILE} component={Profile}/>
                </Switch>
            </DashBoard>
        )
    }
}

export default DashboardInternal;