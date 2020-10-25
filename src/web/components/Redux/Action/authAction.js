import { SET_CURRENT_USER_WEB } from './types'

// user authentication
export function setCurrentUser(user){
    return {
        type : SET_CURRENT_USER_WEB,
        user
    };
}

export function SignOut(){
    return {
        type : 'USER_LOGOUT'
    };
}