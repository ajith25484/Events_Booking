import React, { Fragment } from "react";
import spinner from '../../images/spinner.gif'

let Spinner = () => {
  return(
     <Fragment>
        <img src={spinner} alt='' className='d-block m-auto' />
     </Fragment>
  )
};

export default Spinner;
