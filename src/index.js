import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';


import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { createLogger } from 'redux-logger';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';

import { saveState } from './localstorage'
import watch from 'redux-watch'

//do I need to import and install rxjs?

import rootReducer from './redux/reducers';
import rootEpic from './redux/epics'; //defaults to the index file in the folder

const loggerMiddleware = createLogger()

//note Purvi used:
//import configureStore from './store/configure-store';
//const store = configureStore()
//she also has a configure-store file
//her store also has a preloaded state
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  // add redux-logger middleware!
  applyMiddleware(createEpicMiddleware(rootEpic), loggerMiddleware),
);

export const history = syncHistoryWithStore(browserHistory, store);


// I want to watch for changes only in state.savedRecipes, not entire state
// So I'm using a module called redux-watch to do that
let w = watch(store.getState, 'savedRecipes')
store.subscribe(w((newVal, oldVal, objectPath) => {
  console.log('%s changed from %s to %s', objectPath, oldVal, newVal)
  saveState(
    store.getState().savedRecipes
  )
}))



ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
