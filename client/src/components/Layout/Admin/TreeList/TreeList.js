import React from 'react';
import classes from './TreeList.module.css';
 
const TreeList = ({ treeItem }) => {

    console.log('treeList',treeItem);
    
    const treeList =  (treeItem.children || []).map(treeItem => {
        return <TreeList key={treeItem.id} treeItem={treeItem} type="child" />
      })

   return (
      <div className={ classes.TreeItem }>
          <div> { treeItem.text } </div>
              { treeList }
      </div>
    )
}
 
export default TreeList