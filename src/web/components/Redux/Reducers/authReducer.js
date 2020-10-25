import { SET_CURRENT_USER_WEB } from '../Action/types'
import isEmpty from 'lodash/isEmpty'

const initialState = {
    isAuthenticatedweb: false,
    user: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER_WEB:
            console.log(!isEmpty(action.user))
            console.log(action.user)
            return {
                isAuthenticatedweb: !isEmpty(action.user),
                user: action.user
            };
        default:
            return state
    }

}
