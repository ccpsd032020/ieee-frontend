import { SET_CURRENT_USER_WEB } from '../Action/types'
import isEmpty from 'lodash/isEmpty'

const initialState = {
    isAuthenticatedweb: false,
    user: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER_WEB:
            return {
                isAuthenticatedweb: !isEmpty(action.user),
                user: action.user
            };
        default:
            return state
    }

}
