import './index.css';
import './sass/main.scss';

import * as serviceWorker from './serviceWorker';

import { persistor, store } from './apps/common/store/Store';

import { IntlProvider } from 'react-intl';
import AppLayout from './apps/common/components/layout';
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';


import { getAnalytics } from "firebase/analytics"
import { getPerformance } from "firebase/performance";
import { app } from './utils/firebaseConfig';

getAnalytics(app);
getPerformance(app);
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router basename="">
        <IntlProvider locale='en'>
          <PersistGate persistor={persistor}>
            <div style={{ backgroundColor: '#E8F3F4' }}>
              <AppLayout />
            </div>
          </PersistGate>
        </IntlProvider>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
