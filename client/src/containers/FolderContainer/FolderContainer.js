import React,{ Fragment, useState } from 'react';
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Images from './../../components/Images/Images';
import Actions from './../../components/Upload/Actions';

const FolderContainer = ({  files : { nodeTreeFiles, loading }   }) => {

    let fileComponent = null;
    
    const [ dropzone, setDropzone ] = useState(false);
    console.log('dropzone', dropzone);

    if(nodeTreeFiles) {
        switch(nodeTreeFiles.root){

            case 'images':
                fileComponent = <Images nodeTreeFiles={ nodeTreeFiles } dropzone={ dropzone } />
                break;
            default:
                fileComponent = <Images nodeTreeFiles={ nodeTreeFiles } />
                break;
        }
    }
        
   
  
    
return loading && nodeTreeFiles === null ?  (
    <div> loading</div>
) : (
        <Fragment>
            <Actions type="images" click= { () =>  { setDropzone(!dropzone) } } />
            { fileComponent }
        </Fragment>
    )   
    
}

FolderContainer.propTypes = {
    files: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    files: state.files
});
 
export default connect(mapStateToProps) (withRouter(FolderContainer));