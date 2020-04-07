import React, { Fragment  } from 'react';
 
const Images = (props) => {
  console.log('sfsdfsd');
  
   const { nodeTreeFiles }  = props;

   return (
    <Fragment>
     
      {
       nodeTreeFiles.files.map(file => {
         return (
            <div className="col-lg-3 col-md-4 col-sm-12" key={file.id}>
              <div className="card">
                  <div className="file">
                      <div className="hover">
                          <button type="button" className="btn btn-icon btn-icon-mini btn-round btn-danger">
                              <i className="fas fa-delete"></i>
                          </button>
                      </div>
                      <div className="image">
                          <img src={ file.filePath } alt="img" className="img-fluid" />
                      </div>
                      <div className="file-name">
                          <p className="m-b-5 text-muted">{ file.name}</p>
                          <small>Size: 2MB <span className="date text-muted">Dec 11, 2017</span></small>
                      </div>
                  </div>
              </div>
          </div>
         )
        })
        
      }
      </Fragment>
       )  
    
};
 
export default Images