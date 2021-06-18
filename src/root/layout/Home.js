import React, { Fragment } from "react";
import {Link} from 'react-router-dom'

let Home = () => {
  return(
     <Fragment>
        <div className="landing-page">
         <div className="wrapper">
            <div className="d-flex flex-column justify-content-center text-center align-items-center h-100">
               <h5 className="display-4">Let Book an Event</h5>
               <p className="load px-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus dolorum magni ea sint tenetur totam labore accusantium, ex quibusdam. Quam enim excepturi quia assumenda doloremque quis vitae provident! Suscipit, odio.</p>
               <Link to = '/events/free' className="btn btn-danger btn-sm">Book Now</Link>
            </div>   
         </div>
        </div>
     </Fragment>
  )
};

export default Home;
