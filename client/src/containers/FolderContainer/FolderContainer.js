import React,{ Fragment, useState } from 'react';
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Images from './../../components/Images/Images';
import Actions from './../../components/Upload/Actions';
import { deleteFile, createFolder } from './../../actions/nodeStructure';

const FolderContainer = ({  files : { nodeTreeFiles, loading }, deleteFile, createFolder  }) => {

    let fileComponent = null;
    const path = nodeTreeFiles ? nodeTreeFiles.path : null;
    const current_path = nodeTreeFiles? nodeTreeFiles.current_path : null;

    const [ dropzone, setDropzone ] = useState(false);

    const handlerDeleteFile = (e,file_name) => {

       if( window.confirm('Are you sure want to delete a file?')) {
            deleteFile({ file_name,current_path, path })
       }
    }

    const handleCreateFolder = () => {
        console.log('dsdsfafsc');
        
        createFolder({ current_path, path })
    }

    if(nodeTreeFiles) {
        switch(nodeTreeFiles.root){

            case 'images':
                fileComponent = <Images nodeTreeFiles={ nodeTreeFiles } 
                delete={ handlerDeleteFile }
                dropzone={ dropzone } />
                break;
            default:
                fileComponent = <Images nodeTreeFiles={ nodeTreeFiles } />
                break;
        }
    }
    
return loading && nodeTreeFiles === null ?  (
    <div> loading</div>
) : (
        <Fragment>
            <Actions type={ nodeTreeFiles.root } newFolder={ handleCreateFolder } 
            click= { () =>  { setDropzone(!dropzone) } } />
            { fileComponent }
        </Fragment>
    )   
    
}

FolderContainer.propTypes = {
    files: PropTypes.object.isRequired,
    deleteFile: PropTypes.func.isRequired,
    createFolder: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    files: state.files
});
 
export default connect(mapStateToProps,{ deleteFile, createFolder }) (withRouter(FolderContainer));