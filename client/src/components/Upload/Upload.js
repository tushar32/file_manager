import React, { Component } from 'react';
import { Button, Card } from 'react-bootstrap';
import axios from 'axios';

class Upload extends Component {

  constructor(props){
    super(props);
    this.state = {
      files: [],
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

  uploadFiles = (e) => {
    e.preventDefault();

     this.state.files.forEach(file => {
      let data = new FormData();
     
      data.append('file', file);
      data.append('name', file.name);
      
      axios.post('/upload',data)
      .then(function(res){

      })
     })
  }

  removeFile = (e,fileIndex) => {
    e.stopPropagation();
    let files = [ ...this.state.files ];
   
    const new_files = files.splice(1,fileIndex);
    this.setState({ files : new_files })
    
  }

  renderProgress(fileIndex) {
    
    
    


  }

  componentDidUpdate(prevProps, prevState){
   // console.log('componentDidUpdate',prevState);
    
  }
  
  render() {

   return (
     <Card>
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
                <input type="file" className="fileInput"  multiple onChange={this.onFilesAdded}  ref={this.fileInputRef} />
                <span>Drop files here or click to upload.</span>
          </div>
        </div>

        <div className="Files" >
          {
            this.state.files ? this.state.files.map((file,index) => {
              return (
                  <div key={index} className="file-items"> 
                    <div className="file-image">
                        <img src={URL.createObjectURL(file)} />
                      </div>
                      <div className="dz-details">    
                        <div className="dz-size">
                            <span data-dz-size=""><strong>0.3</strong> MB</span>
                        </div>    
                        <div className="dz-filename">
                          <span data-dz-name="">
                            { file.name }
                          </span>
                        </div>
                        <div class="dz-success-mark">
                            <a href="javascript:void(0)" onClick={ (e) =>  this.removeFile(e, index) }><i class="far fa-times-circle fa-3x" 
                          ></i> </a>
                        </div>
                      </div>
                    { this.renderProgress(file)}
                  </div>
              );
            }) : ''
            }
          </div>
        </div>
        <div className="Actions" >
            <Button vairant="outline-primary" onClick={ this.uploadFiles }> 
              <i className="fa fa-upload" ></i> Upload 
            </Button>
         </div>
      </Card>
    )
   }
}
 
export default Upload