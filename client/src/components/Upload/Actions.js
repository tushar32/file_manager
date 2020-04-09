import React, { Fragment } from 'react';
import cx from './Actions.module.css';
import { Button } from 'react-bootstrap';
 
const Actions = (props) => {
   return (
       <Fragment>
            <div className={ cx.Card }>
                <div className={ cx.Body }>
                
                    <Button variant="outline-primary mr-1" onClick={ props.click }>
                        <i className="fas fa-upload"></i> Upload
                    </Button> {' '}
                
                    <Button variant="outline-primary">New Folder</Button>
                        
                </div>
            </div>
    </Fragment>
    )
}
 
export default Actions