import React, { Fragment ,useState } from 'react';
import { Row,Col } from 'react-bootstrap';
import Upload from './../upload/Upload';
 
const Images = () => {

  const [ formData, setFormData ] =  useState({
      file: ""
  });

  const { file } = formData;

  const onChange = e => setFormData({
    ...formData,
      [e.target.name]: e.target.value
    })
    
   return (
      <Fragment>
        <Row className="label-bar">
          <Col> </Col>
          <Col>
            <Upload />

            <form>
              <div class="file btn btn-lg btn-primary">
                <i className="fa fa-upload"> </i> Upload
                <input type="file" name="file" value={file} onChange={e => onChange(e) } />
              </div>
            </form>
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