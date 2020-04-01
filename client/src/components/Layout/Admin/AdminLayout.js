import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
 
const AdminLayout = ({ props, ...rest}) => {
   return (
      <div>
        <Sidebar />
        <section class="content file_manager">    
            <div class="container-fluid">
             <Header />
              { props }
            </div>
        </section>
      </div>
    )
}
 
export default AdminLayout