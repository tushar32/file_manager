import React from 'react';
 
const Button = (props) => {
    console.log('expand',props.expand);
    
   return (
    <button data-action="collapse"
        onClick= {e =>   { props.click1(e,props.showChildren)  ; props.click2(e, props.expand)  } }>
    </button>
    )
}
 
export default Button