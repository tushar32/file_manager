import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route,Switch }  from 'react-router-dom';
import './scss/style.scss';
import Routes from './components/Routes/Routes';
import { loadUser } from './actions/auth';
import { getFiles } from './actions/nodeStructure';


//Redux
import { Provider } from 'react-redux';
import store from './store';

import setAuthToken from './utils/setAuthToken';


if(localStorage.token){
  setAuthToken(localStorage.token)
}

const  App = () => {
 

  useEffect( () => {
    store.dispatch(loadUser())
    store.dispatch(getFiles(''))
  },[]);

  return(    
    <Provider store={store}>
      <Fragment>
        <Router basename={'client'}>
          <Switch>
            <Route component={Routes} />
          </Switch>
        </Router>
      </Fragment>
    </Provider>
    );
}

export default App;