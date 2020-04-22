import React, { Component, Fragment } from 'react';
import { Button, Card, Spinner} from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { upload } from './../../actions/upload';
import cx from './Upload.module.css';

class Upload extends Component {

  constructor(props){
    super(props);
     this.fileExt = {
        'images' :  ['image/webp','image/jpeg','image/jpg','image/png','image/gif'],
        'documents' : [ 'text/plain','txt','xlsx']
    };

    this.state = {
      files: [],
      uploadStatus: false,
      highlight : false
    }
    this.fileInputRef = React.createRef();
  }

  onFilesAdded = e => {
    e.preventDefault();
    const files =  e.target.files;
    const fileArray = this.fileAddedArray(files);
    this.setState(prevState => ({
      files: prevState.files.concat(fileArray)
    }));
  }

  fileAddedArray(files){
      const fileArray = [];
     
      
      for(var i=0;i<files.length;i++){
        console.log('fdfsf',files[i]);
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
     this.state.files.forEach(file => {
      data.append('file', file);
      data.append('name', file.name);
     
     })

     this.props.upload(data, this.props.path);
 
  }

  removeFile = (e,fileIndex) => {
    e.stopPropagation();
    let files = [ ...this.state.files ];
   
    const new_files = files.splice(1,fileIndex);
    this.setState({ files : new_files })
    
  }
  
  render() {

   return (
     <Fragment>
       { this.state.uploadStatus ? 
        <Spinner animation="border" variant="primary" />
        : 
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
               console.log(file);
               
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
      
      }
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