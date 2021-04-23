import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AdminLayout from './../Layout/Admin/AdminLayout';
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component,...rest }) => {

  const { token } = useSelector((state) => state.register);

  return(  
  
    <Route {...rest}
    render={ props =>
     !token ? <Redirect to="/login" /> :
       ( 
          <div>
            <AdminLayout {...props}>
                <Component {...props} />
            </AdminLayout>
          </div>
      )
    }
  />
)
}


export default PrivateRoute;