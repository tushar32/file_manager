import React, { Fragment } from 'react';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import './scss/style.scss';

 export default function App(){
 
  return(    
    
    <Fragment>
      <Sidebar />
      <section class="content file_manager">    
        <div class="container-fluid">
           <Header />
        </div>
      </section>

    </Fragment>
      
        
    );
}
