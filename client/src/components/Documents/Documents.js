import React, { Fragment, useState } from 'react';
import Upload from '../Upload/Upload';
import cx from './../Images/Images.module.css';
import cs from './../../containers/FolderContainer/FolderContainer.module.css';

import { Row } from 'react-bootstrap';
 
const Documents = (props) => {

   const { nodeTreeFiles }  = props;
   
   const [ renameDir , setRenameDir ] = useState({ id:0, display: 'none' });
   const [ folderText, setFolderText ] = useState({ id: 0, value: '' });


   const hanldeToggleDir = (e,folder_id, folder_name) => {
     setRenameDir({ id: folder_id, display:'block' })
     setFolderText({ id: folder_id, value: folder_name })
   }
   
   const handleChange = (e) => {    
    setFolderText({ id: e.target.id, value: e.target.value })
   }

   
   return (
    <Fragment>
  
    { props.dropzone ?  ( <Upload type={props.type} path={nodeTreeFiles.path}  /> ) : '' }

    <Row className="mt-3">
        {
            nodeTreeFiles.folders.map(folder => {
                return (
                   
                   <div className="col-lg-2 col-md-3 col-sm-12  mt-3" key={folder.id }>
                         <div className={ cs.folder_icon }>
                             <div className={ cx.hover }>
                                 <button className={`${cs.trash} link-button` } onClick={e => props.deleteDir(e,folder.name) }>
                                     <i className="fas fa-trash" style={{ color: '#a31be2' }}></i>
                                 </button>
                             </div>
                             <button className={ `${cs.folder} link-button` } onDoubleClick={ e => props.goToFolder(e, folder.name)}>
                                 <i className="fa fa-folder fa-7x"  style={{ color: '#890606' }}></i>
                             </button>
                             <div className={ cs.folder_name }>
                                 <div className="m-b-5 text-center" onBlur={ () => setRenameDir(!renameDir)}>
                                     
                                     { renameDir.id === folder.id ? 
                                     <input type="text"   onChange={e => handleChange(e)} value={ folderText.value } 
                                      id={folder.id} style={{ display: renameDir }} onKeyDown={ e => props.rename(e,folder.name) } />: 
                                        
                                     
                                    <button className="link-button" data_id={folder.id}  
                                    onClick={ (e) => hanldeToggleDir(e, folder.id, folder.name)} >
                                     
                                        { folder.name }
                                        </button> 
                                    }
                                    
                                  </div>
                             </div>
                         </div>
                     </div>
                
                    )
               })
        }
      {
          
       nodeTreeFiles.files.map(file => {
         return (
            
            <div className="col-lg-2 col-md-3 col-sm-12 mt-3" key={file.id}>
              <div className="card">
                  <div className="file">
                      <div className="hover">
                      <button className={`${cs.trash} link-button` } onClick={e => props.delete(e,file.name) }>
                                     <i className="fas fa-trash"></i>
                        </button>
                      </div>
                      <div className={ cx.image }>
                          <img src={ file.filePath } alt="img" className="img-fluid" />
                      </div>
                      <div className={ cx.file_name }>
                          <span className="m-b-5 text-muted">{ file.name }</span>
                         
                      </div>
                  </div>
              </div>
          </div>
         
         )
        })
        
      }
      </Row>
      </Fragment>
       )  
    
};
 
export default Documents