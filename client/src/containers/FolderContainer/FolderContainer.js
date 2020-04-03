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
        isLeaf: false,
        children: [
            {
                id: 101,
                text: 'Satsang',
                isLeaf: false,
                parent_node:100,
                children: [
                {
                    id: 102,
                    text: 'Vedas',
                    isLeaf: true,
                    parent_node:101,
                    children : []
                }
                ]
            },
            {
                id: 102,
                text: 'Mafinama',
                isLeaf: true, 
                parent_node:100,
                children: []
            }
        ],
        
    },{
        id: 106,
        text: 'Documents',
        isLeaf: false,
        children: [
            {
                id: 107,
                text: 'Kabir Vani',
                isLeaf: true, 
                parent_node:106,
                children: []
            }
        ]
    }
];

   return (
      <Fragment>
          <li>
            <TreeView treeArray={ treeArray } /> 
          </li>
      </Fragment>
    )
}
 
export default FolderContainer