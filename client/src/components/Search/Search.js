import React from 'react';
 

const Search = () => {
   return (
    <div className="input-group mb-0">
        <input type="text" className="form-control" placeholder="Search..."/>
        <div className="input-group-append">
            <span className="input-group-text">
                <i className="fa fa-search" style={{ color: '#a134d4'}}></i></span>
        </div>
    </div>
    )
}
 
export default Search