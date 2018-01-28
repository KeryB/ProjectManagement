import React from 'react';
import {render} from 'react-dom';
import configureStore from './app/store/Store';
import {routes} from "./app/routes/Routes";
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import {AppContainer} from 'react-hot-loader';
import 'antd/dist/antd.less';
import './resources/index.less';

const store = configureStore();

const renderApp = App => {
    render(
        <Provider store={store}>
            <Router>
                <AppContainer>
                    {App}
                </AppContainer>
            </Router>
        </Provider>,
        document.getElementById('root'),
    )
};

renderApp(routes);

if (module.hot) {
    module.hot.accept('./app/routes/Routes', () => {
        renderApp(routes);
    });
}