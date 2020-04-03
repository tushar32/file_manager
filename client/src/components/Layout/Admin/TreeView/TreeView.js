import React, { Fragment } from 'react';
import TreeList from './../TreeList/TreeList';

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