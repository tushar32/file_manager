import React,{ Fragment } from 'react';
import TreeView from './../../components/Layout/Admin/TreeView/TreeView';
 
const FolderContainer = () => {

  /*
       Tree view only includes Folders
       Clicking each folder will display child folders and files in
       the container.
       IT will take the path of the current folder through API and searches
       in a folders and display files
    */
   const treeArray = [
    {
        id: 100,
        text: 'Images',
        children: [
            {
                id: 101,
                text: 'Satsang',
                isLeaf: true,
                children: []
            },
            {
                id: 102,
                text: 'Mafinama',
                isLeaf: true,  
                children: []
            }
        ]
    }
];

   return (
      <Fragment>
          <TreeView treeArray={ treeArray } /> 
      </Fragment>
    )
}
 
export default FolderContainer