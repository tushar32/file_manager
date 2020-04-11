import React from 'react';
import { Switch } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import PrivateRoute from './PrivateRoute';
import SessionLayout from './SessionRoute';

const Routes = () => {

   return (
      <div>
        <Switch>
            <PrivateRoute exact path='/file-manager' component={Dashboard} />
            <SessionLayout exact path='/login' component={Login} />
            <SessionLayout exact path='/register' component={Register} />
        </Switch>
      </div>
    )
}
 
export default Routes