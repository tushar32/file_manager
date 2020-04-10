import React, { Fragment, useState } from 'react';
import Upload from '../Upload/Upload';
import cx from './Images.module.css';
import cs from './../../containers/FolderContainer/FolderContainer.module.css';
import {Link} from 'react-router-dom'

import { Row } from 'react-bootstrap';
 
const Images = (props) => {
  
   const { nodeTreeFiles }  = props;
   console.log('props', props);
   
   const [ renameDir , setRenameDir ] = useState(false);

   return (
    <Fragment>
  
    { props.dropzone ?  ( <Upload type={props.type} path={nodeTreeFiles.path}  /> ) : '' }

    <Row className="mt-3">
        {
            nodeTreeFiles.folders.map(folder => {
                return (
                   
                   <div className="col-lg-2 col-md-3 col-sm-12  mt-3" key={folder.id}>
                         <div className={ cs.folder_icon }>
                             <div className={ cx.hover }>
                                 <a href="javascript:void(0)" onClick={e => props.delete(e,folder.name) }>
                                     <i className="fas fa-trash"></i>
                                 </a>
                             </div>
                             <a href="javascript:void(0)" className={ cx.folder }>
                                 <i className="fa fa-folder fa-7x"  style={{ color: '#890606' }}></i>
                             </a>
                             <div className={ cs.folder_name }>
                                 <div className="m-b-5 text-center">
                                     { 
                                      renameDir ? (
                                        <input type="text" value={ folder.name }></input>
                                     ) : ( 
                                          <Link to="" onClick={ () => setRenameDir(!renameDir)}
                                          onBlur={ () => setRenameDir(!renameDir)}
                                          >
                                              { folder.name }</Link> 
                                       )
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
                      <a onClick={e => props.delete(e,file.name) }>
                                     <i className="fas fa-trash"></i>
                        </a>
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
 
export default Images