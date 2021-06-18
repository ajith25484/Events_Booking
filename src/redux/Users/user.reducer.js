import * as userActions from './user.action'
export const usersFeatureKey = "users"

let initialState = {
    loading : false,
    errorMessage :'',
    token : '',
    user : {},
    isAuthenticated : false

}

export const reducer = (state = initialState, action) => {
    let {type, payload } = action
    switch (type) {
        case userActions.REGISTER_USER_REQUEST:
            return {
                ...state,
                loading : true
            }
        case userActions.REGISTER_USER_SUCCESS:
            return {
                ...state,
                loading : false
            }
        case userActions.REGISTER_USER_FAILURE:
            return {
                ...state,
                loading : false,
                errorMessage : payload

            }
        case userActions.LOGIN_USER_REQUEST:
            return {
                ...state,
                loading : true
            }
        case userActions.LOGIN_USER_SUCCESS:
            localStorage.setItem('events-token', payload.token);
            return {
                ...state,
                loading : false,
                token : payload.token,
                user : payload.user,
                isAuthenticated : true
            }
        case userActions.LOGIN_USER_FAILURE:
            return {
                ...state,
                loading : false,
                errorMessage : payload,
                token : '',
                user : {},
                isAuthenticated : false
            }
        case userActions.LOGOUT_USER:
            localStorage.removeItem('events-token')
            return {
                ...state,
                token : '',
                user : {},
                isAuthenticated : false
            }

        case userActions.GET_USER_INFO_REQUEST:
            return {
                ...state,
                loading : true
            }
        
        case userActions.GET_USER_INFO_SUCCESS:
            return {
                ...state,
                loading : false,
                user : payload.user
            }
        case userActions.GET_USER_INFO_FAILURE:
            return {
                ...state,
                loading : false,
                user : {}
            }
        default:
            return state
    }
}
     
