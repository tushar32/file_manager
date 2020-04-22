import React,{ Fragment,useState } from 'react';
import { login } from '../../actions/auth';
import Alert from '../Layout/Ui/alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {  Redirect } from 'react-router-dom';
import { Col, Spinner } from 'react-bootstrap';
import Loader from '../Layout/Ui/Loader';
 
const Login = ({ login, isAuth }) => {

  console.log('isAuth',isAuth);
  
    const [formData, setFormData ] = useState({
       email: '',
       password: ''
    });
    const [isLoading, setLoading] = useState(false);
    const { email,password } = formData;

    const onChange = e => setFormData({
      ...formData,
       [e.target.name]: e.target.value
    })

    const onSubmit = async(e) =>  {
       e.preventDefault();
       setLoading(true);
       await login({ email,password })
       setLoading(false);

    }

    if(isAuth){
      return <Redirect to="/file-manager"></Redirect>
    }
    
   return (
     <Fragment>
       <Col lg={6} md={12}>
       <div className="company_detail">
            <h4 className="logo">Alpino</h4>
            <h3>The ultimate <strong>Bootstrap 4</strong> Admin Dashboard</h3>
            <p>Alpino is fully based on HTML5 + CSS3 Standards. Is fully responsive and clean on every device and every browser</p>                        
            
        </div>
       </Col>
       <Col lg={{ span:4, offset: 1 } } md={12} >
         <div className="card-plain">

          <h2 className="large text-primary">Sign In</h2>
          <Alert name="invalid_credential" />

          <form className="form" onSubmit={e => onSubmit(e) }>
            <div className="input-group">
              <input type="email" 
              className="form-control"
              placeholder="Email Address" 
              value={email}
              onChange={e => { onChange(e) } }
              name="email" />

               <Alert name="email" />
            </div>
            <div className="input-group">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="password"
                onChange={e => { onChange(e) } }
                value={password}
                minLength="6"
              />
              <Alert name="password" />
            </div>
            <input type="submit" className="btn btn-primary btn-rounded btn-block"  disabled={isLoading} value="Login" />
            {isLoading ? ( <Loader /> ) : ''}
          </form>
        <p className="my-1 mt-3">
          Don't have an account? <a href="/register">Sign Up</a>
        </p>
      </div>
      </Col>
     </Fragment>
    )
}
 
Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuth: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuth: state.register.isAuth
});

export default connect(mapStateToProps,{ login }) (Login);