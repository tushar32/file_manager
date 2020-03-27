import React , { Component } from 'react';
 
class Dropzone  extends Component {

    constructor(props) {
        super(props);
        this.fileInputRef = React.createRef();
        this.state = { highlight : false }
    }

    

    onFilesAdded = e => {
        e.preventDefault();
        const files =  e.target.files;
        const fileArray = this.fileAddedArray(files)
        this.props.onFilesAdded(fileArray)    

        console.log(files)
    }

    fileAddedArray(files){
        const fileArray = [];
        for(var i=0;i<files.length;i++){
            fileArray.push(files[i])
        }
        return fileArray;
    }
 
    render() {
        return (
            
            <div className={ `Dropzone  ${ this.state.highlight ? 'Highlight' :''}`}  
              
            >               
                <img
                    alt="upload"
                    className="Icon"
                    src="/images/cloud_upload-black.svg"
                />
                <input type="file" className="fileInput"  multiple onChange={this.onFilesAdded}  ref={this.fileInputRef} />
                <span>Drop files here or click to upload.</span>
            </div>
        )
   }
}
 
export default Dropzone