import React from 'react';
import './App.css';

import UpcomingEvents from './components/Events/UpcomingEvents';
import UpComingAll from './components/Events/UpComingAll';
import AllEvents from './components/Events/AllEvents';
import EventView from './components/Events/EventView';
import Registration from './components/Member/Registration';
import MemberLogin from './components/Login/MemberLogin';
// import MemberLogin from '../admin/components/';
import UserProfile from './components/Member/UserProfile';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {store, persistor} from '../web/components/Redux/Store/Store'
toast.configure() 
function App() {
  return ( <div>
     { <link href="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.19.1/css/mdb.min.css" rel="stylesheet"></link>}
     <Provider store={store}>
      <PersistGate persistor={persistor} >
    <Router>
        <Switch>
              <Route path="/upcomingAll">  <UpComingAll /> </Route>
              <Route path="/allEvents">  <AllEvents /> </Route>
              <Route path="/view/:eventId">  <EventView /> </Route>
              <Route path="/Registration">  <Registration /> </Route>
              <Route path="/UserProfile">  <UserProfile /> </Route>
              <Route path="/MemberLogin">  <MemberLogin /> </Route>
              <Route path="/">  <UpcomingEvents /> </Route>
        </Switch>
    </Router>
    </PersistGate>
    </Provider>
  </div> 
  );
}

export default App;
