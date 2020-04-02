import React, { Fragment } from 'react';
import TreeList from './../TreeList/TreeList' ;

// function TreeList({ treeItem }) {
//   const nestedComments = (treeItem.children || []).map(treeItem => {
//     return <treeItem key={treeItem.id} treeItem={treeItem} type="child" />
//   })
 
//   return (
//     <div style={{"marginLeft": "25px", "marginTop": "10px"}}>
//       <div>{treeItem.text}</div>
//       {nestedComments}
//     </div>
//   )
// }

const TreeView = (props) => {
    const treeItems  = props.treeArray;

return (
  <Fragment>
    {
      treeItems.map(treeItem => {
        return (
          <TreeList key={treeItem.id} treeItem={ treeItem } />
        )
      })
    }
    </Fragment>
  )
}

export default TreeView