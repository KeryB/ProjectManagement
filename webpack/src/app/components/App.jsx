import React from 'react';
import Navbar from "./deshboard/Navbar";
import {connect} from "react-redux";
import * as Path from '../utils/RoutePath';
import Login from './forms/AuthProvider';
import {Redirect, Route, Switch} from "react-router-dom";
import * as Roles from "../utils/Roles";
import {getToken} from "../utils/token/TokenManager";
import * as userActions from '../actions/UserAction';
import {bindActionCreators} from "redux";
import * as Status from "../utils/AuthStatus";
import {Spin, Icon} from 'antd';
import DashBoard from "./deshboard/navigation/Dashboard";
import PropTypes from 'prop-types';

const LoginRoute = ({component: Component, predicate, redirectTo, componentProps, ...rest}) => (
    <div>
        <Route {...rest} render={props =>
            predicate()
                ? <Component {...componentProps}/>
                : <Redirect to={redirectTo}/>
        }/>
    </div>
);

const DashboardRoute = ({component: Component, user, predicate, redirectTo, componentProps, ...rest}) => (

    <div>
        <Route {...rest} render={props =>
            predicate()
                ? <Component {...componentProps}/>
                : (<Redirect
                    to={(user.tokenStatus === Status.NOT_AUTH || user.tokenStatus === Status.NOT_VALID) ? Path.LOGIN : redirectTo}/>)
        }/>
    </div>
);

class App extends React.Component {

    componentWillMount() {
        const {userData: {isFetched}, userActions} = this.props;
        console.log("componentWillMount");

        if (!isFetched && getToken()) {
            userActions.fetchUserData();
        }

    }

    componentWillReceiveProps(props) {
        const {userData: {isFetched, isLoading, user}, userActions} = props;
        console.log(isFetched, isLoading, user);

        console.log("componentWillReceiveProps");
        if (user.tokenStatus === Status.REFRESH_TOKEN_REQUIRED) {
            userActions.refreshToken();
        } else if (!isFetched && !isLoading && user.tokenStatus === Status.VALID) {
            userActions.fetchUserData();
        }
    }

    render() {
        const {userData: {user, isLoading, projectPermissions, tokenStatus}, location, history} = this.props;
        console.log(this.props);

        return (
            <div>
                {
                    isLoading ?
                        <div>
                            <Icon type="loading" className='spinner-large' spin/>
                        </div> :
                        <div>
                            <Navbar location={location} user={user} project={projectPermissions}/>
                            <Switch>
                                <LoginRoute path={Path.LOGIN}
                                            component={Login}
                                            predicate={() => user.role === Roles.NOT_AUTH || !getToken()}
                                            redirectTo={Path.DASHBOARD}
                                            componentProps={this.props}
                                />

                                <DashboardRoute path={Path.DASHBOARD}
                                                component={DashBoard}
                                                user={user}
                                                predicate={() => user.role !== Roles.NOT_AUTH || getToken()}
                                                redirectTo={Path.DASHBOARD}
                                                componentProps={this.props}
                                />
                                <Route component={() => {
                                    if (user.role !== Status.NOT_AUTH)
                                        return <Redirect to={Path.DASHBOARD}/>;
                                    return <Route path={Path.ROOT}/>
                                }} exact/>
                            </Switch>
                        </div>
                }

            </div>
        )
    }
}

App.propTypes = {
    userData: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(userActions, dispatch),
    }
}

function mapStateToProps(state) {
    return {
        userData: state.user,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);