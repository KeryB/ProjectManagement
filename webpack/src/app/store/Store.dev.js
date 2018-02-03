"use strict";

import {applyMiddleware, compose, createStore} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/RootReducers';
import middleware from "../middleware/Middleware";

export default function configureStore() {
    const store = createStore(
        rootReducer,
        compose(
            applyMiddleware(middleware),
            window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    );

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers/RootReducers', () => {
            const nextRootReducer = require('../reducers/RootReducers').default;
            store.replaceReducer(nextRootReducer);
        })
    }

    return store
}