import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import * as eventActions from '../redux/events/event.actions'
import * as alertActions from '../redux/Alert/alert.action'
import * as userActions from '../redux/Users/user.action'
import * as userReducer from '../redux/Users/user.reducer'


let UploadEvents = () => {
   let history = useHistory();
   let dispatch = useDispatch();

   let [event, setEvent] = useState({
      name : '',
      image : '',
      date : '',
      price : '',
      type : '',
      info : '',

   })

   let updateEvent = (e) => {
      setEvent({
         ...event,
         [e.target.name] : e.target.value
      })
   }

   let userInfo = useSelector((state) => {
      return state[userReducer.usersFeatureKey];
   })

   let {user} = userInfo;

   let uploadSubmit = (e) => {
      e.preventDefault();
      if(event.name !== '' && event.image !== '' && event.price !== '' && event.type !== '' && event.date !== '' && event.info !== ''){
         dispatch(eventActions.uploadEvent(event, history))
      }else{
         dispatch(alertActions.setAlert('Please fill in the fields', 'danger'))
      }
   }

  return(
     <Fragment>
      <section className="p-3">
      <div className="container">
         <div className="row">
            <div className="col">
               <p className="h4 text-teal">
               <i className="fa fa-file-upload"/> Upload Events</p>
               <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel sunt cum molestias dolores, natus ipsam fuga totam quo minima cupiditate est laborum eveniet, quaerat, eligendi atque nesciunt exercitationem libero doloremque?</p>
               
            </div>
         </div>
      </div>
      </section>
     {
        user?.isAdmin ? 
        <Fragment>
         <section>
         <div className="container">
            <div className="row">
               <div className="col-md-8">
                  <form onSubmit={uploadSubmit}>
                     <div className="form-group">
                        <input
                           name='name'
                           value={event.name}
                           onChange={updateEvent}
                           required
                           type="text" className="form-control" placeholder="Name"/>
                     </div>
                     <div className="form-group">
                        <input 
                           name='image'
                           value={event.image}
                           onChange={updateEvent}
                           required
                           type="text" className="form-control" placeholder="Image"/>
                     </div>
                     <div className="form-group">
                        <select 
                           name='type'
                           value={event.type}
                           required
                           onChange={updateEvent} className="form-control">
                           <option value="">Event type</option>
                           <option value="FREE">FREE</option>
                           <option value="PRO">PRO</option>
                        </select>
                     </div>
                     <div className="form-group">
                        <input
                           name='price'
                           value={event.price}
                           onChange={updateEvent}
                           required
                           type="number" className="form-control" placeholder="Price"/>
                     </div>
                     <div className="form-group">
                        <input 
                           name='date'
                           value={event.date}
                           onChange={updateEvent}
                           required
                           type="text" className="form-control" placeholder="Date"/>
                     </div>
                     <div className="form-group">
                        <textarea
                           name='info'
                           value={event.info}
                           onChange={updateEvent}
                           required
                           rows="4" className="form-control" placeholder="Information"></textarea>
                     </div>
                     <div>
                        <input type="submit" className="btn btn-teal btn-sm" value="Upload"/>
                     </div>
                  </form>
               </div>
            </div></div>
      </section>
        </Fragment> :
        <Fragment>
            <div className="container">
               <div className="row">
                  <div className="col text-center">
                      <p className="h4 text-danger">---------You are not Authorised to Upload---------</p>
                      <small>if You are Admin?, please contact to DBA to give access.</small> 
                  </div>
               </div>
            </div>
        </Fragment>
     }
     </Fragment>
  )
};

export default UploadEvents;


