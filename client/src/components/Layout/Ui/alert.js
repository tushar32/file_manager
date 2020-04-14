import React from 'react';
import PropTypes from 'prop-types';
/*
   PropTypes exports a range of validators that can be used to make sure the data you receive is valid. 
   In this example, we’re using PropTypes.string.     
   When an invalid value is provided for a prop, a warning will be shown in the JavaScript     c
*/
import { connect } from 'react-redux';

const Alert = (props) => {
  
  const  { alerts }   = props;
  const name = props.name;

  console.log(alerts);
  
  return name in alerts ? (
      
      <p className="invalid-feedback label-danger" style={{ "display": "block" }}> { alerts[name].msg } </p>
  
  ) :'' ;
  
}

Alert.propTypes = {
  alerts: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);