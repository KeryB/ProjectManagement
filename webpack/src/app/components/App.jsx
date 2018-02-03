import React from 'react';
import Navbar from "./deshboard/Navbar";
import {connect} from "react-redux";
import * as Path from '../utils/RoutePath';
import Login from './forms/AuthProvider';
// import Login from './example';
import {Redirect, Route, Switch} from "react-router-dom";
import * as AuthStatus from "../utils/Roles";
import {getToken} from "../utils/token/TokenManager";

const LoginRoute = ({component: Component, predicate, redirectTo, componentProps, ...rest}) => (
    <div>
        <Route {...rest} path={Path.LOGIN} render={props =>
            predicate()
                ? <Component {...componentProps}/>
                : <Redirect to={redirectTo}/>
        }/>
    </div>
);

class App extends React.Component {

    componentWillMount() {
        console.log(this.props)
    }

    componentWillReceiveProps(props) {
        console.log(props);
    }

    render() {
        const {auth, location} = this.props;
        return (
            <div>
                <Navbar props={this.props}/>
                <LoginRoute path={Path.LOGIN}
                            component={Login}
                            predicate={() => auth.status === AuthStatus.NOT_AUTH || !getToken()}
                            redirectTo={Path.DASHBOARD}
                />

            </div>
        )
    }
}

App.propTypes = {
    auth: React.PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        auth: state.auth,
    }
}

export default connect(mapStateToProps)(App);