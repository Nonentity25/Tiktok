import { SHOW_MODAL, HIDE_MODAL, LOGIN_SUCCESS, LOGOUT_SUCCESS, UPDATE_FOLLOW, UPDATE_LIKED } from "./constance";


export const initState = {
    ModalLogin: false,
    currentUser: {
        status: false,
        id: null,
        liked: [],
        follow: []
    }
}


function reducer(state, action) {
    switch (action.type) {
        case SHOW_MODAL:
            return {
                ...state,
                ModalLogin: true
            }
        case HIDE_MODAL:
            return {
                ...state,
                ModalLogin: false
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                currentUser: {
                    status: true,
                    id: action.payload.id,
                    liked: action.payload.liked,
                    follow: action.payload.follow
                }
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                currentUser: {
                    status: false,
                    id: null,
                    liked: [],
                    follow: []
                }
            }
        case UPDATE_FOLLOW:
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    follow: [...action.payload]
                }
            }
        case UPDATE_LIKED:
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    liked: [...action.payload]
                }
            }
        default:
            throw new Error('Invalid action!')
    }
}

export default reducer