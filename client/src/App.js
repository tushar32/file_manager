import React, { Fragment } from 'react';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import { BrowserRouter as Router, Route,Switch ,Redirect}  from 'react-router-dom';
import './scss/style.scss';
import Home from './components/Home/Home';
import Routes from './components/routes/Routes';
import PrivateRoute from './components/routes/PrivateRoute';

import Login from './components/auth/Login';

//Redux
import { Provider } from 'react-redux';
import store from './store';

 export default function App(){
 
  return(    

    <Provider store={store}>
      <Fragment>
       
        <Sidebar />
          <section class="content file_manager">    
            <div class="container-fluid">
              <Header />
              <Router>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route component={Routes} />
                </Switch>
                </Router>
            </div>
          </section>
      </Fragment>
    </Provider>
      
        
    );
}
