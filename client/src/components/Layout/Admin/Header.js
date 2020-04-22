import React,{Fragment} from 'react';
import BreadCrumb from './BreadCrumb/BreadCrumb';
import Search from '../../Search/Search';

const Header = () => {
   return (
      <Fragment>
        <div className="block-header">
            
            <div className="row clearfix">
                <div className="col-lg-5 col-md-5 col-sm-12">
                    <h4>File Manager</h4>
                    <BreadCrumb/>
                    
                </div>
                <div className="col-lg-7 col-md-7 col-sm-12">
                    <Search/>
                    
                </div>
            </div>
        </div>
      </Fragment>
    )
}
 
export default Header