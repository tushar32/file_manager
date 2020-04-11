import React,{Fragment} from 'react';
import BreadCrumb from './BreadCrumb/BreadCrumb';
import Search from '../../Search/Search';
 
const Header = () => {
   return (
      <Fragment>
        <div class="block-header">

            <div class="row clearfix">
                <div class="col-lg-5 col-md-5 col-sm-12">
                    <h4>File Manager</h4>
                    <BreadCrumb/>
                    
                </div>
                <div class="col-lg-7 col-md-7 col-sm-12">
                    <Search/>
                    
                </div>
            </div>
        </div>
      </Fragment>
    )
}
 
export default Header