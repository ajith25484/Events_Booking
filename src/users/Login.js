import React, { Fragment } from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import brand from "../../src/images/events-brand.png"
import * as userActions from '../redux/Users/user.action'
import * as alertActions from '../redux/Alert/alert.action'
import { useDispatch } from "react-redux";

let Login = () => {
   let dispatch = useDispatch();
   let history = useHistory();
   
   let [user, setUser] = useState({
      email:'',
      password:''
   })
   let [userError, setUserError] = useState({
      emailError:'',
      passwordError:''
   })

   let validateEmail = (e) => {
      setUser({...user, email : e.target.value})
      let regExp = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
      !regExp.test(e.target.value) ?
         setUserError({...userError, emailError : 'Enter a proper email'})
         : setUserError({...userError, emailError : ''})
      }
   let validatepassword = (e) => {
      setUser({...user, password : e.target.value})
      let regExp = /^[A-Za-z]\w{7,14}$/;
      !regExp.test(e.target.value) ?
         setUserError({...userError, passwordError : 'Enter a proper password'})
         : setUserError({...userError, passwordError : ''})
      }
   
      let submitLogin = (e) => {
         e.preventDefault();
         if(user.email !=='' && user.password !== ''){
            dispatch(userActions.loginUser(user, history))
         }else{
            dispatch(alertActions.setAlert('please fill in the fields', 'danger'))
         }
      }
  return(
     <Fragment>
        <section className="p-3">
         <div className="container">
            <div className="row">
               <div className="col-md-4 m-auto">
                  <div className="card animated zoomIn">
                     <div className="card-header bg-teal text-white text-center">
                        <p className="h3">Login Here</p>
                     </div>
                     <div className="card-body bg-light">
                     <form onSubmit = {submitLogin}>
                        <div className="form-group">
                        <input 
                           name='email'
                           value={user.email}
                           onChange={validateEmail}
                           type="email" className={`form-control ${userError.emailError.length > 0 ? 'is-invalid' : ''}`} placeholder="Email"/>
                           <small className = "text-danger">{userError.emailError}</small>
                        </div>
                        <div className="form-group">
                        <input 
                           name='password'
                           value={user.password}
                           onChange={validatepassword}
                           type="password" className={`form-control ${userError.passwordError.length > 0 ? 'is-invalid' : ''}`} placeholder="Password"/>
                           <small className = "text-danger">{userError.passwordError}</small>
                        </div>
                        <div>
                           <input type="submit" value="Login" className="btn btn-teal btn-sm"/>
                        </div>
                        <small>Don't have an Account?<Link to="../users/Register" className="font-weight-bold text-Primary">Register</Link> </small>
                     </form>

                     </div>
                     <div className="card-footer text-center">
                     <img src={brand} alt="" width="150" height="30"/>
                     </div>
                  </div>
               </div>
            </div>
         </div>
        </section>
     </Fragment>
  )
};

export default Login;