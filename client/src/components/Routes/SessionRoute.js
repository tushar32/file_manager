import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Col, Row } from 'react-bootstrap';

const SessionRoute = ({ component: Component,auth: { isAuth, loading },...rest }) => (
  <Route {...rest}
    render={ props =>
      ( 
      
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

SessionRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.register
});

export default connect(mapStateToProps)(SessionRoute);