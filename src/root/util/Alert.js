import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import * as alertReducer from '../../redux/Alert/alert.reducer'

let Alert = () => {
   let alertList = useSelector((state) => {
      return state[alertReducer.alertFeatureKey]
   })


  return(
     <Fragment>{
         alertList.length > 0 ?
         <Fragment>
            <div className = {`alert alert-${alertList[0].color} alert-dismissable m-2 fixed-top animated zoomIn`}>
               <button className='close'><i className='fa fa-times-circle'></i></button>
            {
               alertList.map(alert => {
                  return(
                     <div key = {alert.id}>
                        <small className="font-weight-bold">{alert.message}</small>
                     </div>
                  )
               })
            }
            </div>
         </Fragment> : null
      } 
     </Fragment>
  )
};

export default Alert;
