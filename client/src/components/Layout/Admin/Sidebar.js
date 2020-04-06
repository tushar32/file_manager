import React from 'react';
import { Button } from 'react-bootstrap';
import NodeTreeContainer from '../../../containers/NodeTreeContainer/NodeTreeContainer';
 
const Sidebar = () => {

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
                            <h4>Michael</h4>
                            <p className="m-b-0">info@example.com</p>
                        </div>
                        <Button variant="primary" className="btn m-b-0">
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
 
export default Sidebar