import * as React from "react";
import DashBoard from "./navigation/Dashboard";
import {Route, Switch} from "react-router-dom";
import * as Path from '../../utils/RoutePath'
import Profile from "./component/Profile";


class DashboardInternal extends React.Component {

    render() {
        return (
            <DashBoard
                {...this.props}>
                <Switch>
                    <Route path{Path.DASHBOARD} component{}/>
                    <Route path={Path.PROFILE} component={Profile}/>
                </Switch>
            </DashBoard>
        )
    }
}