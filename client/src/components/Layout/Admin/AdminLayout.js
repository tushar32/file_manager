import React, { Fragment } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
 
const AdminLayout = ({ children }) => 
  
    <Fragment>
      <Sidebar />
      <section class="content file_manager">    
          <div class="container-fluid">
            <Header />
            <div className="content">
            { children }
            </div>
          </div>
      </section>
    </Fragment>

export default AdminLayout