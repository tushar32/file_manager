import React, { Component, Fragment } from 'react';
import { Button, Card, Spinner, ProgressBar} from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { upload } from './../../actions/upload';
import cx from './Upload.module.css';
import axios from 'axios';
//import uuid from 'react-uuid';

class Upload extends Component {

  constructor(props){
    super(props);
     this.fileExt = {
        'images' :  ['image/webp','image/jpeg','image/jpg','image/png','image/gif'],
        'documents' : [ 'text/plain','txt','xlsx'],
        'audios' : ['audio/mpeg']
    };

    this.state = {
      files: [],
      uploadStatus: false,
      highlight : false,
      uploadProgress: {
        uploadStatus:false,
       1 : {
          id:1,
          file: '',
          progress: 0,
        }
       }
    }
    this.percentCompleted = 0;
    this.fileInputRef = React.createRef();
  }

  onFilesAdded = e => {
    e.preventDefault();
    const files =  e.target.files;
    const fileArray = this.fileAddedArray(files);
    this.setState(prevState => ({
      files: prevState.files.concat(fileArray)
    })
    );
  }

  fileAddedArray(files){
      const fileArray = [];
      
      for(var i=0;i<files.length;i++){
        if(this.fileExt[this.props.type].includes(files[i].type))
          fileArray.push(files[i])
      }
      return fileArray;
  }

  openFileDialog =  () => {
    this.fileInputRef.current.click();
  }

  onDragOver = () => {
      this.setState({ highlight : true })
  }

  onDragLeave = () => {
      this.setState({ highlight : false })
  }

  handleOnDrop = e => {
      const files =  e.dataTransfer.files;
      alert(files)
  }

  uploadFiles = async (e) => {
    this.setState({ uploadStatus : true })
        e.stopPropagation();
     let data = new FormData();
     data.append('path', this.props.path);
     // for data can't be visible in console log

     this.state.files.forEach((file,index) => {
      data.append('file', file);
      data.append('name', file.name);

      var config = {
        onUploadProgress: function(progressEvent) {
           const percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );

           if(percentCompleted == 100) {
            let files = [ ...this.state.files ];
            files.splice(index,1);
            
            this.setState({ files : files })

           } else {
            this.setState({
              uploadProgress:{ 
                ...this.state.uploadProgress,
                uploadStatus:true,
                [index]: { 
                  id: index,
                  file:file, 
                  progress: percentCompleted 
                 } 
              }
            })
           }
         
        }.bind(this)
      };
      
        // axios.put('/api/upload',data, config)
        // .then(function (res) {
          
        // })
        // .catch(function (err) {
        
        // });
      this.props.upload(data, this.props.path);
     })
 
  } 
   
  removeFile = (e,fileIndex) => {
    e.stopPropagation();
    let files = [ ...this.state.files ];
    files.splice(fileIndex,1);
    
    this.setState({ files : files })
    
  }
  
  render() {

   return (
     <Fragment>
        <Card className="mt-3" >
        <div className={ cx.Body }>
         <div className="Upload"  
             onClick={this.openFileDialog}
             onDragOver={this.onDragOver}
             onDragLeave={this.onDragLeave}
             onDrop={this.handleOnDrop}>
           <div className="Content"
           style={{ display : this.state.files.length ? 'none' : 'flex'}}
           >
             <div className={ `Dropzone  ${ this.state.highlight ? 'Highlight' :''}`}>               
                   <img
                       alt="upload"
                       className="Icon"
                       src="/images/cloud_upload-black.svg"
                   />
                   <input type="file" className="fileInput"  multiple 
                   onChange={this.onFilesAdded}  
                   ref={this.fileInputRef} style={{ display: "none" }} />
                   <span>Drop files here or click to upload.</span>
             </div>
           </div>
 
           <div className="Files" >
             {
               this.state.files ? this.state.files.map((file,index) => {
               console.log('this.percentCompleted',this.percentCompleted);
                let id;
                 let src = '';
                   if(this.fileExt['images'].includes(file.type) ){
                     src = URL.createObjectURL(file)
                   } else{
                     src = require('../../images/doc.jpg')
                   }
 
                 return (
                     <div key={index} className="file-items"> 
                       <div className="file-image">
                           <img src={src}  alt="" />
                         </div>
                         <div className="dz-details">    
                           <div className="dz-size">
                               <span data-dz-size=""><strong>{ file.size / 1000 }</strong> KB</span>
                           </div>    
                           <div className="dz-filename">
                             <span data-dz-name="">
                               { file.name }
                             </span>
                           </div>
                           <div className="dz-success-mark">
                               <button className='link-button' onClick={ (e) =>  this.removeFile(e, index) }>
                                 <i className="far fa-times-circle fa-3x" 
                             ></i> </button>
                           </div>
                         
                         </div>
                         
                         { this.state.uploadProgress.uploadStatus
                         && Object.values(this.state.uploadProgress)[index] !== undefined ?
                          ( 
                            <div className="m-t">
                              <ProgressBar striped  key={index} variant="warning" now={ Object.values(this.state.uploadProgress)[index].progress } /> 
                            </div>
                           ) 
                          :''
                         }
                         
                       {/* { this.renderProgress(file)} */}
                     </div>
                 )
               }) : ''
               }
             </div>
           </div>
         <div className="Actions" >
             <Button vairant="outline-primary"  type="button" onClick={  this.uploadFiles }> 
               <i className="fa fa-upload" ></i> Upload 
             </Button>
          </div>
          </div>
       </Card>
      
     
     </Fragment>
   
    )
   }
}

Upload.propTypes = {
  upload: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  isAuth: state.register.isAuth
});
const mapDispatchToProps = dispatch => ({
  upload: data => dispatch(upload(data))
})
export default connect(mapStateToProps,mapDispatchToProps) (Upload)