import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../dashboard/Dashboard';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Images from '../images/Images';

const Routes = () => {
   return (
      <div>
        <Switch>
            <Route exact path='/dashboard' component={Dashboard} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/images' component={Images} />
        </Switch>
      </div>
    )
}
 
export default Routes