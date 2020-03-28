import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../dashboard/Dashboard';
import Images from '../images/Images';
import Login from '../auth/Login';
import Register from '../auth/Register';
import PrivateRoute from './PrivateRoute';

const Routes = () => {

   return (
      <div>
        <Switch>
            <PrivateRoute exact path='/dashboard' component={Dashboard} />
            <PrivateRoute exact path='/images' component={Images} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
        </Switch>
      </div>
    )
}
 
export default Routes