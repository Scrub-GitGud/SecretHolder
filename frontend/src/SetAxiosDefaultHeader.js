import axios from "axios"

const setDefaultHeader = (passed_token) => {
    if(passed_token){
        axios.defaults.headers.common['x-auth-token'] = passed_token
    } else {
        delete axios.defaults.headers.common['x-auth-token']
    }
}

export default setDefaultHeader;