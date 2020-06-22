import React,{ Fragment, useEffect } from 'react';
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import TreeView from './../../components/Layout/Admin/TreeView/TreeView';
import { getNodeTree } from './../../actions/nodeStructure';

const NodeTreeContainer = ({  nodeStructure : { nodeTree, loading } , getNodeTree  }) => {

    useEffect(() => {
        console.log('dsdsd');
        
        getNodeTree()
    },[getNodeTree])

  /*
       Tree view only includes Folders
       Clicking each folder will display child folders and files in
       the container.
       IT will take the path of the current folder through API and searches
       in a folders and display files
    */
//    const treeArray = [
//     {
//         id: 100,
//         text: 'Images',
//         isLeaf: false,
//         children: [
//             {
//                 id: 101,
//                 text: 'Satsang',
//                 isLeaf: false,
//                 parent_node:100,
//                 children: [
//                 {
//                     id: 102,
//                     text: 'Vedas',
//                     isLeaf: true,
//                     parent_node:101,
//                     children : []
//                 }
//                 ]
//             },
//             {
//                 id: 102,
//                 text: 'Mafinama',
//                 isLeaf: true, 
//                 parent_node:100,
//                 children: []
//             }
//         ],
        
//     },{
//         id: 106,
//         text: 'Documents',
//         isLeaf: false,
//         children: [
//             {
//                 id: 107,
//                 text: 'Kabir Vani',
//                 isLeaf: true, 
//                 parent_node:106,
//                 children: []
//             }
//         ]
//     }


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

NodeTreeContainer.propTypes = {
    getNodeTree : PropTypes.func.isRequired,
    nodeStructure: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    nodeStructure: state.nodeStructure
});
 
export default connect(mapStateToProps,{ getNodeTree }) (withRouter(NodeTreeContainer));