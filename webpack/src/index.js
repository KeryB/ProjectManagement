import React from 'react';
import {render} from 'react-dom';
import configureStore from './app/store/Store';
import {routes} from "./app/routes/Routes";
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import {AppContainer} from 'react-hot-loader';
import 'antd/dist/antd.less';
import 'bootstrap/dist/css/bootstrap-grid.css'
import './resources/index.less';
import './resources/less/project-list.less'
import './resources/less/layout-sider.less'
import './resources/less/System.less'
import './resources/less/Dashboard.less'
import {LocaleProvider} from 'antd';
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import ru from 'antd/lib/locale-provider/ru_RU';
import 'moment/locale/fr';
import '../node_modules/Font-Awesome/svg-with-js/js/fontawesome-all.min'


const store = configureStore();

const renderApp = App => {
    render(
        <Provider store={store}>
            <LocaleProvider locale={ru}>
                <Router>
                    <AppContainer>
                        {App}
                    </AppContainer>
                </Router>
            </LocaleProvider>
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