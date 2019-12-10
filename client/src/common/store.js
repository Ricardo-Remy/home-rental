import { compose, createStore, combineReducers, applyMiddleware } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory as createHistory } from 'history';
import thunk from 'redux-thunk';
import logger from './middleware/logger';

import * as reducers from './reducers';

const rootReducer = history =>
  combineReducers({
    ...reducers,
    router: connectRouter(history),
  });

const history = createHistory();

const createdRouterMiddleware = routerMiddleware(history);

const composeEnhancers = global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //eslint-disable-line

const store = createStore(
  rootReducer(history),

  composeEnhancers(
    applyMiddleware(createdRouterMiddleware),
    applyMiddleware(thunk, logger)
  )
);

export { store, history };
