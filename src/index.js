import React from 'react';
import ReactDOM from 'react-dom';
import AdminLogin from './admin/components/Login/AdminLogin';
import App from './admin/App';
import WebApp from './web/WebApp';
import './index.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./admin/components/Redux/Store/Store";

ReactDOM.render(
        <Provider store={store}>
                <PersistGate persistor={persistor}>
                        <Router>
                                <Switch>
                                        <Route path="/adminlogin">  <AdminLogin /> </Route>
                                        <Route path="/admin">  <App /> </Route>
                                        <Route path="/">  <WebApp /> </Route>

                                </Switch>
                        </Router>
                </PersistGate>
        </Provider>,
        document.getElementById('root')
);

