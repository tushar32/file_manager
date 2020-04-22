import React,{ Fragment, useState } from 'react';
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Images from './../../components/Images/Images';

import Actions from './../../components/Upload/Actions';

import { getFiles,saveFile,readFile, createDocument,deleteFile, createFolder,renameFolder, deleteFolder } 
from './../../actions/nodeStructure';
import Loader from './../../components/Layout/Ui/Loader'
import { Modal, Form, Toast } from 'react-bootstrap';
    

const FolderContainer = ({  files : { nodeTreeFiles, loading },
    deleteFile, createFolder, renameFolder,createDocument,readFile,saveFile,
     deleteFolder,getFiles  }) => {


    const path = nodeTreeFiles ? nodeTreeFiles.path : null;
    const current_path = nodeTreeFiles? nodeTreeFiles.current_path : null;

    const [ dropzone, setDropzone ] = useState(false);
    const [ fileContent, setFileContent ] = useState({ isOpen: false, content:'' , name: '',path });
    const [show, setShow] = useState(true);
    const [toastShow, setToastShow] = useState(true);
    const [keyStoke, setKeyStroke] = useState('');

    const handleChange = (e) => {
        console.log(e.target.value);
        
        setFileContent({ ...fileContent, content: e.target.value  })
    }

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
            renameFolder({ old_name, current_path, path, new_name })
        }
    }

    const handleRenameFile = (e,old_name) => {
       
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

    const handleShowFile = async (e,fileName, filePath) => {
        e.preventDefault()

        const data = await readFile({ fileName,filePath});
         console.log('datasdsafsd',data);
         
        setFileContent({ isOpen: true,content: data.data.data, name: fileName, path: filePath })
        setShow(true)
          readFile({ current_path, path,filePath})
      }

      const handleClose = () => setShow(false);
    
      const handleSaveFile = async (e) => {
        e.preventDefault();
        setKeyStroke(e.key);

        if( (keyStoke == 'Control' && e.key =='.' ) || (keyStoke == '.' && e.key =='Control'  )){
            
           await saveFile(e.target.value,fileContent.path);
           setToastShow(true) 
            
        }
      }

return loading && nodeTreeFiles === null ?  (
    <Loader />
) : (
        <Fragment>

            { fileContent.isOpen ? (
                <Fragment>
               <Modal show={show} onHide={handleClose}>
               <Modal.Header closeButton>
                 <Modal.Title>{fileContent.name}</Modal.Title>
               </Modal.Header>
               <Modal.Body> 
                    <Form.Control as="textarea" rows="50" onChange={e => handleChange(e) } 
                     onKeyUp={e => handleSaveFile(e)}>
                        { fileContent.content }
                    </Form.Control>
               </Modal.Body>
              
             </Modal>

                <Toast style={{
                    position: 'absolute',
                    top: '0',
                    right: 0,
                    backgroundColor: 'green',
                    zIndex:9999
                    }}
                    onClose={() => setToastShow(false)} show={toastShow} delay={3000} autohide>
                    <Toast.Body>file saved successfully!</Toast.Body>
                </Toast>
           </Fragment>
            ) : ''
            }
            <Actions type={ nodeTreeFiles.root } newFolder={ handleCreateFolder } 
            click= { () =>  { setDropzone(!dropzone) } } newDocument={ handleNewDocument } />

          <Images nodeTreeFiles={ nodeTreeFiles }  delete={ handlerDeleteFile }
                deleteDir={ handlerDeleteFolder }
                rename={ handleRenameFolder }
                renameFile={ handleRenameFile }
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
    createDocument: PropTypes.func.isRequired,
    readFile: PropTypes.func.isRequired ,
    saveFile: PropTypes.func.isRequired ,
}

const mapStateToProps = state => ({
    files: state.files
});
 
export default connect(mapStateToProps,{ getFiles,saveFile, readFile, deleteFile, createDocument, createFolder, renameFolder, deleteFolder }) (withRouter(FolderContainer));
