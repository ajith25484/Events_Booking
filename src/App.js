import React from 'react'
import { Fragment } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import './App.css';
import Navbar from './root/layout/Navbar'
import FreeEvents from './events/FreeEvents';
import UploadEvents from './events/UploadEvents';
import Home from './root/layout/Home';
import ProEvents from './events/ProEvents'
import Login from './users/Login'
import Register from './users/Register'
import Alert from './root/util/Alert';
import * as userActions from './redux/Users/user.action'
import * as userUtil from './util/userUtil'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import PrivateRoute from './util/privateRoute';


let App = () => {
  let dispatch = useDispatch()

  useEffect(() => {
    if(userUtil.getToken()){
      dispatch(userActions.getUserInfo())
    }
  })

  return (
    <Fragment>
      <BrowserRouter>
        <Navbar/>
        <Alert/>
          <Switch>
            <Route exact path = "/" component={Home}/>
            <Route exact path = "/events/free" component={FreeEvents}/>
            <PrivateRoute exact path = "/events/pro" component={ProEvents}/>
            <PrivateRoute exact path = "/events/upload" component={UploadEvents}/>
            <Route exact path = "/users/login" component={Login}/>
            <Route exact path = "/users/register" component={Register}/>
            
          </Switch>
        </BrowserRouter>
    </Fragment>
  );
}

export default App;
