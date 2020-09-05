export const secretReducer = (state, action) => {
    switch(action.type){
        case "ADD_SECRET":
            return {
                ...state,
                secrets:[...state.secrets, action.newSecret]
            }
        case "ADD_SECRET_FAIL":
            return {
                ...state,
                error: action.newSecret
            }
        case "REMOVE_SECRET":
            return {
                ...state,
                secrets: state.secrets.filter(item => item._id !== action.payload),
            }
        case "GET_SECRETS":
            return {
                ...state,
                secrets: action.payload
            }
        case "CLEAR_ALL_SECRETS":
            return {
                ...state,
                secrets: null,
                current_edit: null,
                filtered: null,
                error: null
            }
        case "SET_CUTRRENT_EDIT":
            return {
                ...state,
                current_edit: action.editable_secret
            }
        case "UPDATE_SECRET":
            return {
                ...state,
                secrets: state.secrets.map((i) => 
                    i._id === action.updatedSecret._id ? action.updatedSecret : i)
            }
        case "CLEAR_CURRENT_EDIT":
            return {
                ...state,
                current_edit: null
            }
        case "FILTER_SECRET":
            return {
                ...state,
                filtered: state.secrets.filter(i => {
                    const regexp = new RegExp(action.searched_text, "gi")
                    return i.title.match(regexp) || i.email.match(regexp)
                })
            }
        case "CLEAR_FILTER":
            return {
                ...state,
                filtered: null
            }
        case "ERROR":
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}