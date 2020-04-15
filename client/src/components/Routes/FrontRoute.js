import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import FrontLayout from './../Layout/Front/FrontLayout';

const FrontRoute = ({component: Component, ...rest }) => (
  
    <Route {...rest}
    render={ props =>
       ( 
          <div>
            <FrontLayout {...props}>
                <Component {...props} />
            </FrontLayout>
          </div>
      )
    }
  />
);


export default FrontRoute;