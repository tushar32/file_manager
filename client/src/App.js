import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route,Switch ,Redirect}  from 'react-router-dom';
import './scss/style.scss';
import Routes from './components/routes/Routes';

//Redux
import { Provider } from 'react-redux';
import store from './store';

 export default function App(){
 
  return(    

    <Provider store={store}>
      <Fragment>
        <Router>
          <Switch>  
            <Route component={Routes} />
          </Switch>
        </Router>
      </Fragment>
    </Provider>
    );
}
