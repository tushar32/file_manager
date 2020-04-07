import React from 'react';
import cx from './Actions.module.css';
import { Button } from 'react-bootstrap';
 
const Actions = () => {
   return (
    <div className={ cx.Card }>
    <div className={ cx.Body }>
       
                <Button variant="outline-primary">
                    <i className="fas fa-upload"></i> Upload
                </Button> {' '}
            
                <Button variant="outline-primary">New Folder</Button>
             
    </div>
<div></div></div>
    )
}
 
export default Actions