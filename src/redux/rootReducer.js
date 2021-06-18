import { combineReducers } from "redux";
import * as alertReducer from './Alert/alert.reducer'
import * as userReducer from "./Users/user.reducer"
import * as eventReducer from "./events/event.reducer"

export const rootReducer = combineReducers({
    [alertReducer.alertFeatureKey] : alertReducer.reducer,
    [userReducer.usersFeatureKey]  : userReducer.reducer,
    [eventReducer.eventsFeatureKey] : eventReducer.reducer
})
    