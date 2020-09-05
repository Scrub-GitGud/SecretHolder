export const authReducer = (state, action) => {
    switch(action.type){
        case "LOAD_USER":
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
                loading: false
            }
        case "REGISTER_SUCCESS":
        case "LOGIN_SUCCESS":
            localStorage.setItem('xToken', action.payload.token)
            return {
                ...state,
                isAuthenticated: true,
                loading: false
            }
        case "LOAD_USER_ERROR":
        case "REGISTER_FAIL":
        case "LOGIN_FAIL":
        case "LOGOUT":
            localStorage.removeItem('xToken')
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                user: null,
                error: action.payload,
                loading: false
            }
        case "CLEAR_ERROR":
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}