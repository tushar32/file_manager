import React from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button } from 'react-bootstrap';
import NodeTreeContainer from '../../../containers/NodeTreeContainer/NodeTreeContainer';
import { logout } from './../../../actions/auth';

 
const Sidebar = ({ logout, auth : { isAuth, user } }) => {

     const handleLogout = () => {
         logout();
     }

   return (
      <div>
          <aside>
         <div id="leftsidebar" className="sidebar">
        <div className="menu">
            <ul className="list">
                <li>
                    <div className="user-info text-center m-b-20">
                        <div className="image">
                            <a href="profile.html"><img src={ require("./../../../assets/images/profile_av.jpg") } alt= "User"/></a>
                        </div>
                        <div className="detail">
                            <h4>{ user ? user.name : '' }</h4>
                            <p className="m-b-0">{ user ? user.email : '' }</p>
                        </div>
                        <Button variant="primary" className="btn mb-3" key="logout" onClick={  handleLogout }>
                            <i className="fa fa-sign-out-alt"></i> Logout
                        </Button>
                    </div>
                </li>
                <li className="upload">
                   
                </li>
                <li className="header"><i className="fa fa-file"></i>  Files </li>

                <NodeTreeContainer />
                
               
            </ul>
        </div>
    </div>
    </aside>
      </div>
    )
}

Sidebar.propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired

} 
 
const mapStateToProps = state => ({
    auth: state.register
});

export default connect(mapStateToProps,{ logout }) (Sidebar)