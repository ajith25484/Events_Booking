import React, { Fragment, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux'
import * as eventActions from '../redux/events/event.actions'
import * as eventReducer from '../redux/events/event.reducer'
import Spinner from "../root/util/Spinner";

let ProEvents = () => {
   let dispatch = useDispatch();

   let eventsInfo = useSelector((state) => {
      return state[eventReducer.eventsFeatureKey]
   })

   let {loading, events} = eventsInfo

   useEffect(() => {
      dispatch(eventActions.getProEvent())
   },[])



   return(
      <Fragment>
         <section className="p-3">
          <div className="container">
             <div className="row">
                <div className="col">
                   <p className="h4 text-teal">Pro Events</p>
                   <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel sunt cum molestias dolores, natus ipsam fuga totam quo minima cupiditate est laborum eveniet, quaerat, eligendi atque nesciunt exercitationem libero doloremque?</p>
                   <p className="h6">Total available: {events.length} </p>
                </div>
             </div>
          </div>
         </section>
         {
            loading ? <Spinner/> : 
            <Fragment>
                {
                   (events.length) > 0 ?
                   <Fragment>
                      <section>
                      <div className="container">
                         <div className="row">
                            <div className="col">
                               {
                                  events.map(event => {
                                     return(
                                        <Fragment>
                                        <div className="card mt-3" key = {event._id}>
                                        <img src ={event.image} alt=""/>
                                        <div className="card-body bg-gray-light">
                                           <div className="row">
                                              <div className="col">
                                                 <p className="h4">{event.name}</p>
                                                 <p>Date: {event.date}</p>
                                                 <div className="h6">Price: {event.price}</div>
                                              </div>
                                              <div className="col">
                                                 <div className="btn btn-teal btn-sm">Book Now</div>
                                              </div>
                                           </div>
                                        </div>
                                     </div>
                                        </Fragment>
                                        
                                     )
                                  })
                               }
                            </div>
                         </div>
                      </div>
                      </section> 
                   </Fragment> : null
                }
            </Fragment>
         }
      </Fragment>
   )
};

export default ProEvents;