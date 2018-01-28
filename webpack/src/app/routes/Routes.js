import React from 'react';
import {Route} from 'react-router-dom';
import App from '../components/App';
import AuthProvider from "../components/forms/AuthProvider";

export const routes = (
    <div>
        <main>
            <switch>
                <Route path='/' component={App}/>
                {/*<Route path='/login' component={AuthProvider}/>*/}
            </switch>
        </main>
    </div>
);