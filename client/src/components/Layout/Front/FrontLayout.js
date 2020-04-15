import React, { Fragment } from 'react';
 
const FrontLayout = ({ children }) => 
  
    <Fragment>
      <section className="content">    
          <div className="container-fluid">
            <div className="content">
            { children }
            </div>
          </div>
      </section>
    </Fragment>

export default FrontLayout