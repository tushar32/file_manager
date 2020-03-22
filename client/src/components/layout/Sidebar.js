import React from 'react';
import { Button } from 'react-bootstrap';
 
const Sidebar = () => {
   return (
      <div>
          <aside>
         <div id="leftsidebar" className="sidebar">
        <div className="menu">
            <ul className="list">
                <li>
                    <div className="user-info m-b-20"> bg tg 
                        <div className="image">
                            <a href="profile.html"><img src="assets/images/profile_av.jpg" alt= "User"/></a>
                        </div>
                        <div className="detail">
                            <h6>Michael</h6>
                            <p className="m-b-0">info@example.com</p>
                            <a href="javascript:void(0);" title="" className=" waves-effect waves-block"><i className="zmdi zmdi-facebook-box"></i></a>
                            <a href="javascript:void(0);" title="" className=" waves-effect waves-block"><i className="zmdi zmdi-linkedin-box"></i></a>
                            <a href="javascript:void(0);" title="" className=" waves-effect waves-block"><i className="zmdi zmdi-instagram"></i></a>
                            <a href="javascript:void(0);" title="" className=" waves-effect waves-block"><i className="zmdi zmdi-twitter-box"></i></a>                            
                        </div>
                    </div>
                </li>
                <li className="upload">
                    <Button variant="primary" className="btn">
                        <i className="fal fa-plus"></i> Create New
                    </Button>
                </li>
                <li className="header"><i className="fa fa-file"></i>  Files </li>
               
               
            </ul>
        </div>
    </div>
    </aside>
      </div>
    )
}
 
export default Sidebar