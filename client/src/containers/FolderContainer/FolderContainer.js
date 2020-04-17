import React,{ Fragment, useState } from 'react';
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Images from './../../components/Images/Images';

import Actions from './../../components/Upload/Actions';
import { getFiles, createDocument,deleteFile, createFolder,renameFolder, deleteFolder } 
   from './../../actions/nodeStructure';
import Loader from './../../components/Layout/Ui/Loader'
    

const FolderContainer = ({  files : { nodeTreeFiles, loading }, 
    deleteFile, createFolder, renameFolder,createDocument, deleteFolder,getFiles  }) => {

    const path = nodeTreeFiles ? nodeTreeFiles.path : null;
    const current_path = nodeTreeFiles? nodeTreeFiles.current_path : null;

    const [ dropzone, setDropzone ] = useState(false);

    const handlerDeleteFile = (e,file_name) => {

       if( window.confirm('Are you sure want to delete a file?')) {
            deleteFile({ file_name,current_path, path })
       }
    }

    const handlerDeleteFolder = (e,folder_name) => {

        if( window.confirm('Are you sure want to delete a folder?')) {
             deleteFolder({ folder_name,current_path, path })
        }
     }

    const handleCreateFolder = () => {
        createFolder({ current_path, path })
    }

    const handleRenameFolder = (e,old_name) => {
       
        if(e.keyCode === 13){
            const new_name =  e.target.value;
            renameFolder({old_name, current_path, path, new_name })
        }
    }

    const handleGoToFolder = (e, folder_name) => {
       
        getFiles(current_path + '/'+folder_name )
    }

    const handleNewDocument = () => {
        createDocument({ current_path, path })
    }

    const handleShowFile = async (e,filePath) => {
        e.preventDefault()
         // readFile({ current_path, path,filePath})
      }

    
return loading && nodeTreeFiles === null ?  (
    <Loader />
) : (
        <Fragment>
            <Actions type={ nodeTreeFiles.root } newFolder={ handleCreateFolder } 
            click= { () =>  { setDropzone(!dropzone) } } newDocument={ handleNewDocument } />
          <Images nodeTreeFiles={ nodeTreeFiles }  delete={ handlerDeleteFile }
                deleteDir={ handlerDeleteFolder }
                rename={ handleRenameFolder }
                goToFolder={ handleGoToFolder }
                newDocument={ handleNewDocument }
                showFile={ handleShowFile }
                dropzone={ dropzone } />
        </Fragment>
    )   
    
}

FolderContainer.propTypes = {
    files: PropTypes.object.isRequired,
    deleteFile: PropTypes.func.isRequired,
    createFolder: PropTypes.func.isRequired,
    renameFolder: PropTypes.func.isRequired,
    deleteFolder: PropTypes.func.isRequired,
    getFiles: PropTypes.func.isRequired,
    createDocument: PropTypes.func.isRequired   
}

const mapStateToProps = state => ({
    files: state.files
});
 
export default connect(mapStateToProps,{ getFiles, deleteFile, createDocument, createFolder, renameFolder, deleteFolder }) (withRouter(FolderContainer));