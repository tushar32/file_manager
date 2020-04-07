import React, { useState, Fragment } from 'react';
import classes from './TreeList.module.css';
import { getFiles } from './../../../../actions/nodeStructure';
import store from './../../../../store';
 
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

    const handleToggleChildren = (e,display) => {
      
      setShowChildren(display)
    };

    const handleGetFiles = (e, path) => {
      console.log('path',path);
      
      store.dispatch(getFiles(path))
    };

   return (
     <Fragment>
      <li className={classes.TreeItem} key={ treeItem.id } >
        
          { 
            expand  ? (

              <button data-action="collapse"
                onClick={(e) => { setExpand(false) ;handleToggleChildren(e,'none') } }>
              
              </button> 
              // <Button data-action="collapse"
              //   click1={ handleToggleChildren } click2={ handleExpand }
              //   showChildren='none'
              //   expand =  { false }
              //   fa="fas fa-minus"
              // />

            ):  
            treeItem.children.length > 0  ? (

              <button data-action="expand"
                onClick={(e) => { setExpand(true);handleToggleChildren(e,'') } }>
              </button> 
            // <Button data-action="Expand"
            //     click1={ handleToggleChildren } click2={ handleExpand } 
            //     showChildren=''
            //     expand = { true }
            //     fa="fas fa-plus"
            //     />
             
            ) : ''
          }
            
           <div  className={ classes.Folder } onClick={ (e) => handleGetFiles(e, treeItem.path )}>
            <i className="fa fa-folder" style={{ color: '#890606' }}></i> 
            
                <span  className={ classes.FolderName} > { treeItem.name } </span>  
             
           
             </div>

          <ul className={ classes.TreeChildren} style={{ "display" : showChildren }}>
              { treeChildren }
          </ul>
      </li>
      </Fragment>
    )
}
 
export default TreeList