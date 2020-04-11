import React from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getFiles } from "./../../../../actions/nodeStructure";

    const BreadCrumb = ( { files: { nodeTreeFiles, loading }, getFiles }) => {
 
         const handleGetFiles = (e,path) => {
            getFiles(path)
         }

        return (

        <ul class="breadcrumb padding-0">

            <li class="breadcrumb-item"><a href="/file-manager"><i className="fa fa-home"></i></a></li>
            { nodeTreeFiles !== null ?  
               
               nodeTreeFiles.current_path.split("/")
              
                 .map(path => {
                    return  (<li class="breadcrumb-item active">
                       <a href="javascript:void(0)" onClick={e => handleGetFiles(e, path)}> { path } </a> 
                        </li>)
                 })
             : ''
        }
        </ul>
        )
}

BreadCrumb.propTypes = {
    files: PropTypes.object.isRequired,
    getFiles: PropTypes.func.isRequired,

} 
 
const mapStateToProps = state => ({
    files: state.files
});

export default connect(mapStateToProps,{ getFiles }) (BreadCrumb)