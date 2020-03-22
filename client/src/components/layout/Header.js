import React,{Fragment} from 'react';
 
const Header = () => {
   return (
      <Fragment>
        <div class="block-header">

            <div class="row clearfix">
                <div class="col-lg-5 col-md-5 col-sm-12">
                    <h2>File Manager</h2>
                    <ul class="breadcrumb padding-0">
                        <li class="breadcrumb-item"><a href="index.html"><i class="zmdi zmdi-home"></i></a></li>
                        <li class="breadcrumb-item"><a href="file-dashboard.html">File Manager</a></li>
                        <li class="breadcrumb-item active">Dashboard</li>
                    </ul>
                </div>
                <div class="col-lg-7 col-md-7 col-sm-12">
                    <div class="input-group mb-0">
                        <input type="text" class="form-control" placeholder="Search..." />
                        <div class="input-group-append">
                            <span class="input-group-text"><i class="zmdi zmdi-search"></i></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </Fragment>
    )
}
 
export default Header