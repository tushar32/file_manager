import React, { Fragment, useState } from 'react';
import Upload from '../Upload/Upload';
import cx from './Images.module.css';
import { Row } from 'react-bootstrap';
 
const Images = (props) => {
  
   const { nodeTreeFiles }  = props;
   console.log('props', props);
   
   return (
    <Fragment>
  
    { props.dropzone ?  ( <Upload type={props.type} path={nodeTreeFiles.path}  /> ) : '' }

    <Row className="mt-3">
      {
       nodeTreeFiles.files.map(file => {
         return (
            
            <div className="col-lg-3 col-md-4 col-sm-12" key={file.id}>
              <div className="card">
                  <div className={ cx.file }>
                      <div className={ cx.hover }>
                          <button type="button" className="btn btn-icon btn-icon-mini btn-round btn-danger">
                              <i className="fas fa-delete"></i>
                          </button>
                      </div>
                      <div className={ cx.image }>
                          <img src={ file.filePath } alt="img" className="img-fluid" />
                      </div>
                      <div className={ cx.file_name }>
                          <p className="m-b-5 text-muted">{ cx.file_name}</p>
                          <small>Size: 2MB <span className="date text-muted">Dec 11, 2017</span></small>
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