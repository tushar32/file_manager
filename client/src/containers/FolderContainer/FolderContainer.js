import React,{ Fragment } from 'react';
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Images from './../../components/Images/Images';
import Actions from './../../components/Upload/Actions';

const FolderContainer = ({  files : { nodeTreeFiles, loading }   }) => {

    let fileComponent = null;
    
    if(nodeTreeFiles) {
        switch(nodeTreeFiles.root){

            case 'images':
                fileComponent = <Images nodeTreeFiles={ nodeTreeFiles } />
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
         <Actions type="images" />
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