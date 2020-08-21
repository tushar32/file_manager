import React, { Fragment } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
 
const AdminLayout = ({ children }) => 
  
    <Fragment>
      <Sidebar />
      <section className="content file_manager">    
          <div className="container-fluid">
            <Header />
            <div className="content">
              { children }
            </div>
          </div>
      </section>
    </Fragment>

export default AdminLayout