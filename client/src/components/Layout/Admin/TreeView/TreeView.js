import React, { Fragment } from 'react';
import TreeList from './../TreeList/TreeList';
import classes from './../TreeList/TreeList.module.css';
import uuid from 'react-uuid';

const TreeView = (props) => {
  console.log(props.treeArray);
  
    const treeItems  = props.treeArray;

return (
  <Fragment>
    {
      treeItems.map(treeItem => {
        return (
          <ul key={uuid ()} className={ classes.TreeList }>
            <TreeList key={treeItem.id} treeItem={ treeItem } />
          </ul>
        )
      })
    }
    </Fragment>
  )
}

export default TreeView