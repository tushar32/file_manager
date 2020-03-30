import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Col, Row } from 'react-bootstrap';

const PrivateRoute = ({ component: Component,auth: { isAuth, loading },...rest }) => (
  <Route {...rest}
    render={ props =>
      !isAuth && !loading ? (  <Redirect to='/login' />) : ( 
      
      <div class="authentication">
        <div class="container">
            <Col className="content-center">
                <Row><Component {...props} /></Row>
            </Col>
        </div>
      </div>
     

      )
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.register
});

export default connect(mapStateToProps)(PrivateRoute);