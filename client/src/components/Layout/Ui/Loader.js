import React, { Fragment } from 'react';
import spinner from './Loading_icon.gif';

export default () => (
  <Fragment>
    <div className="loader"> 
      <img
        src={spinner}
        style={{ width: '200px', margin: 'auto', display: 'block' }}
        alt='Loading...'
      />
    </div>
  </Fragment>
);