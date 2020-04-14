import React from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getFiles } from "./../../../../actions/nodeStructure";

    const BreadCrumb = ( { files: { nodeTreeFiles, loading }, getFiles }) => {
 
         const handleGetFiles = (e,path) => {
            getFiles(path)
         }

        return (

        <ul className="breadcrumb padding-0">

            <li className="breadcrumb-item"><a href="/file-manager"><i className="fa fa-home"></i></a></li>
            { nodeTreeFiles !== null ?  
               
               nodeTreeFiles.current_path.split("/")
              
                 .map((path,index) => {
                    return  (<li key={ index } className="breadcrumb-item active">
                       <button className="link-button" onClick={e => handleGetFiles(e, path)}> { path } </button> 
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