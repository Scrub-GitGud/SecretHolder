import React, { createContext, useReducer } from 'react'
import axios from 'axios'
import { authReducer } from './AuthReducer';
import setDefaultHeader from '../SetAxiosDefaultHeader'
export const AuthContext = createContext();

const AuthContextProvider = (props) => {
    const initianState = {
        token: localStorage.getItem('xToken'),
        isAuthenticated: null,
        user: null,
        loading: null,
        error: null
    }
    const [state, dispatch] = useReducer(authReducer, initianState)

    const Register = async (formData) => {
        const config = {
            headers: {'Content-Type': 'application/json'}
        }

        try {
            const res = await axios.post('/api/reg', formData, config)
            dispatch({type: "REGISTER_SUCCESS", payload: res.data})
            LoadUser();
        } catch(err) {
            dispatch({type: "REGISTER_FAIL", payload: err.response.data.msg})
        }
    }

    const LoadUser = async () => {
        if(localStorage.xToken){
            setDefaultHeader(localStorage.xToken)
        }

        try {
            const res = await axios.get('/api/login')
            dispatch({type: "LOAD_USER", payload: res.data})
        } catch (err) {
            dispatch({type: "LOAD_USER_ERROR", payload: err.response.data.msg})
        }
    }

    const Login = async (formData) => {
        const config = {
            headers: {'Content-Type': 'application/json'}
        }

        try {
            const res = await axios.post('/api/login', formData, config)
            dispatch({type: "LOGIN_SUCCESS", payload: res.data})
            LoadUser();
        } catch(err) {
            console.log(err);
            dispatch({type: "LOGIN_FAIL", payload: err.response.data.msg})
        }
    }

    const Logout = async () => {
        dispatch({type: "LOGOUT"})
    }
    const ClearError = async () => {
        dispatch({type: "CLEAR_ERROR"})
    }

    return (
        <AuthContext.Provider 
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                user: state.user,
                loading: state.loading,
                error: state.error,
                Register,
                LoadUser,
                Login,
                Logout,
                ClearError
            }}>
            { props.children }
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;