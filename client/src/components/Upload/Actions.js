import React, { Fragment } from 'react';
import cx from './Actions.module.css';
import { Button } from 'react-bootstrap';
 
const Actions = (prop) => {
    console.log('action',prop);
    const { type } = prop;
   return (
       <Fragment>
            <div className={ cx.Card }>
                <div className={ cx.Body }>
                
                    <Button variant="outline-primary mr-1" key="1" onClick={ prop.click }>
                        <i className="fas fa-upload"></i> Upload
                    </Button> {' '}
                
                    <Button variant="outline-primary" key="2" onClick={ prop.newFolder }>
                        New Folder
                    </Button>
                    {' '}
                    <Button  key="3" className="float-right" onClick={ prop.newFolder }>
                    <i class="far fa-arrow-alt-circle-left"></i>
                    </Button>

                    { 
                     type == 'documents' ? (
                        <Button variant="outline-primary" key="4" onClick={ prop.newDocument }>
                           <i class="fas fa-file-alt"></i> New text
                        </Button>
                    ) : '' }
                </div>
            </div>
    </Fragment>
    )
}
 
export default Actions