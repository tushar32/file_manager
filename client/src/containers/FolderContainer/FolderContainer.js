import React,{ Fragment, useEffect } from 'react';
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import TreeView from './../../components/Layout/Admin/TreeView/TreeView';
import { getNodeTree } from './../../actions/nodeStructure';

const FolderContainer = ({  nodeStructure : { nodeTree, loading } , getNodeTree  }) => {

    useEffect(() => {
        console.log('dsdsd');
        
        getNodeTree()
    },[getNodeTree])

console.log('nodeTree',nodeTree);
console.log('loading',loading);


return loading && nodeTree === null ?  (
    <div> loading</div>
) : (
      <Fragment>
        
          <li>
            <TreeView treeArray = { nodeTree } />
          </li>
      </Fragment>
    )
}

FolderContainer.propTypes = {
    getNodeTree : PropTypes.func.isRequired,
    nodeStructure: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    nodeStructure: state.nodeStructure
});
 
export default connect(mapStateToProps,{ getNodeTree }) (withRouter(FolderContainer));