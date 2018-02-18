import * as React from "react";
import DashBoard from "./navigation/Dashboard";
import {Route, Switch} from "react-router-dom";
import * as Path from '../../utils/RoutePath'
import Profile from "./component/Profile";
import Projects from "./component/Projects";


class DashboardInternal extends React.Component {

    render() {
        const{userData:{isLoading}} = this.props;

        //todo сделать 404 ошибку
        return (
            <DashBoard
                {...this.props}>
                <Switch>
                    <Route path={Path.PROJECTS} render={()=>(<Projects isLoadingUserData={isLoading}/>)} />
                    <Route path={Path.PROFILE} component={Profile}/>
                </Switch>
            </DashBoard>
        )
    }
}

export default DashboardInternal;