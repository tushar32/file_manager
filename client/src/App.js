import React, { Fragment } from 'react';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import { BrowserRouter as Router, Route,Switch}  from 'react-router-dom';
import './scss/style.scss';
import Home from './components/Home/Home';
import Routes from './components/routes/Routes';

 export default function App(){
 
  return(    
    
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
      
        
    );
}
