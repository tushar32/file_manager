import React, { Fragment ,useState } from 'react';
import { Row,Col } from 'react-bootstrap';
import Upload from './../upload/Upload';
 
const Images = () => {

   return (
      <Fragment>
        <Row className="label-bar">
          <Col className="text-center">
            <Upload />
          </Col>
        </Row>

        <Row>
          <div className="">
             
          </div>
        </Row>
      </Fragment>
    )
}
 
export default Images