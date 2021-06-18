import React, { Fragment } from "react";
import { Link, useHistory } from "react-router-dom";
import brand from '../../images/events-brand.png'
import * as userUtil from '../../util/userUtil'
import * as userActions from '../../redux/Users/user.action'
import { useDispatch, useSelector } from "react-redux";
import * as userReducer from '../../redux/Users/user.reducer'


let Navbar = () => {
   let history = useHistory();
   let dispatch = useDispatch();

   let clickLogOut = () => {
      dispatch(userActions.logOutUser(history))
   }

   let userInfo = useSelector((state) => {
      return state[userReducer.usersFeatureKey]
   })

   let {isAuthenticated, user} = userInfo;

   let afterLoginLinks = (
      <Fragment>
         <li className = "nav-item">
            <Link to = "/" className = "nav-link">
            <img src={user.avatar} alt='' width='25' height='25' className='rounded-circle'/> {user.name} </Link>
         </li>
         <li className = "nav-item">
            <Link to = "/" className = "nav-link" onClick = {clickLogOut}>
            <i className = "fa fa-sign-out-alt text-muted"/> Logout</Link>
         </li>
      </Fragment>
   )

   let beforeLoginLinks = (
      <Fragment>
         <li className = "nav-item">
            <Link to = "/users/login" className = "nav-link">
            <i className = "fa fa-sign-in-alt text-muted"/> Login</Link>
         </li>
         <li className = "nav-item">
            <Link to = "/users/register" className = "nav-link">
            <i className = "fa fa-user-cog text-muted"/> Register</Link>
         </li>
      </Fragment>
   )
      
  return(
     <Fragment>
        <nav className="navbar navbar-light bg-gray-light navbar-expand-sm">
         <div className="container">
            <Link to ="/" className ="navbar-brand">
               <img src = {brand} alt=""/>
            </Link>  
            
            <div className="collpse navbar-collapse">
               <ul className="navbar-nav">
                  <li className = "nav-item">
                     <Link to = "/events/free" className = "nav-link">Free Events</Link>
                  </li>
                  <li className = "nav-item">
                     <Link to = "/events/pro" className = "nav-link">Pro Events</Link>
                  </li>
                  <li className = "nav-item">
                     <Link to = "/events/upload" className = "nav-link">Upload Events</Link>
                  </li>
               </ul>
               <ul className="navbar-nav ml-auto">
                  {
                     userUtil.isLoggenIn() ? afterLoginLinks : beforeLoginLinks
                  }
               </ul>
                  
            </div>
         </div>
        </nav>
     </Fragment>
  )
};

export default Navbar;