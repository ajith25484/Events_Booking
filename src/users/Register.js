import React, { Fragment } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory} from "react-router-dom";
import brand from "../../src/images/events-brand.png"
import * as alertActions from "../redux/Alert/alert.action"
import * as userActions from '../redux/Users/user.action'

let Register = () => {
   let dispatch = useDispatch();
   let history = useHistory();
   let [user, setUser] = useState({
      name:'',
      email:'',
      password:''
   })
   let [userError, setUserError] = useState({
      nameError:'',
      emailError:'',
      passwordError:''
   })

   let validateUsername = (e) => {
      setUser({...user, name : e.target.value})
      let regExp = /^[a-zA-Z0-9]{4,10}$/;
      !regExp.test(e.target.value) ?
         setUserError({...userError, nameError : 'Enter a proper username'})
         : setUserError({...userError, nameError : ''})
      }
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
   
      let submitRegister = (e) => {
         e.preventDefault();
         if(user.name !== '' && user.email !== '' && user.password !== ''){
            dispatch(userActions.registerUser(user, history))
         }else{
            dispatch(alertActions.setAlert('Please fill in the fields', 'danger'))
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
                   <p className="h3">Register Here</p>
                </div>
                <div className="card-body bg-light">
                   <form onSubmit = {submitRegister}>
                     <div className="form-group">
                        <input
                           name='name'
                           value={user.name}
                           onChange={validateUsername}
                           type="text" className={`form-control ${userError.nameError.length > 0 ? 'is-invalid' : ''}`} placeholder="Name"/>
                           <small className = "text-danger">{userError.nameError}</small>
                     </div>
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
                         <input type="submit" value="Register" className="btn btn-teal btn-sm"/>
                      </div>
                      <small>Already have an Account?<Link to="../users/Login" className="font-weight-bold text-Primary">Login</Link> </small>
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

export default Register;