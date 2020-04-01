import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../dashboard/Dashboard';
import Images from '../images/Images';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import PrivateRoute from './PrivateRoute';
import SessionLayout from './SessionRoute';

const Routes = () => {

   return (
      <div>
        <Switch>
            <PrivateRoute exact path='/dashboard' component={Dashboard} />
            <PrivateRoute exact path='/images' component={Images} />
            <SessionLayout exact path='/login' component={Login} />
            <SessionLayout exact path='/register' component={Register} />
        </Switch>
      </div>
    )
}
 
export default Routes