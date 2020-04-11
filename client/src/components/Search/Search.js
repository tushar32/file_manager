import React from 'react';
 

const Search = () => {
   return (
    <div class="input-group mb-0">
        <input type="text" class="form-control" placeholder="Search..."/>
        <div class="input-group-append">
            <span class="input-group-text">
                <i class="fa fa-search" style={{ color: '#a134d4'}}></i></span>
        </div>
    </div>
    )
}
 
export default Search