import React, { useState } from 'react';
import classes from './TreeList.module.css';
 
const TreeList = ({ treeItem }) => {

    
    const [ expand, setExpand ] = useState(
         false
    );
    const [ showChildren, setShowChildren ] = useState(
       'none'
    );

    const treeChildren =  (treeItem.children || []).map(treeItem => {
        return <TreeList key={treeItem.id} treeItem={treeItem} type="child" />
      })

    const handleToggleChildren = (display) => {
      setShowChildren(display)
    };

   return (
      <div className={classes.TreeItem} key={ treeItem.id } >

         { expand  ? (

          <button data-action="collapse" type="button"
            onClick={() => { setExpand(false) ;handleToggleChildren('none') } }>
          Collapse
         </button> 

         ):  
         treeItem.children.length > 0  ? (
          <button data-action="Expand" type="button" 
              onClick={() => {   handleToggleChildren('') ;   setExpand(true ) } }>
            Expand
          </button>
         ) : ''
   
         }
          
          { treeItem.text }
          <div className={ classes.TreeChildren} style={{ "display" : showChildren }}>
              { treeChildren }
          </div>
      </div>
    )
}
 
export default TreeList