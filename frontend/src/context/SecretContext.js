import React, { createContext, useReducer } from 'react'
import axios from 'axios'
import { secretReducer } from './SecretReducer';
export const SecretContext = createContext();

const SecretContextProvider = (props) => {
    const initianState = {
        secrets: [],
        current_edit: null,
        filtered: null,
        error: null
    }

    const [state, dispatch] = useReducer(secretReducer, initianState)

    const AddSecret = async (passed_new_secret) => {
        const config = {
            headers: {'Content-Type': 'application/json'}
        }
        
        try {
            const res = await axios.post('/api/secrets', passed_new_secret, config)
            dispatch({type: "ADD_SECRET", newSecret: res.data})
        } catch(err) {
            dispatch({type: "ADD_SECRET_FAIL", payload: err.response.data.msg})
        }
    }
    const RemoveSecret = async (id) => {
        try {
            await axios.delete(`/api/secrets/${id}`)
            dispatch({type: "REMOVE_SECRET", payload: id})
        } catch (err) {
            dispatch({type: "ERROR", payload: err.response.data.msg})
        }
    }
    const GetSecrets = async () => {
        try {
            const res = await axios.get('/api/secrets')
            dispatch({type: "GET_SECRETS", payload: res.data})
        } catch(err) {
            dispatch({type: "ERROR", payload: err.response.data.msg})
        }
    }
    const ClearAllSecrets = () => {
        dispatch({type: "CLEAR_ALL_SECRETS"})
    }
    const SetCurrEdit = (secret_i) => {
        dispatch({type: "SET_CUTRRENT_EDIT", editable_secret: secret_i})
    }
    const UpdateSecret = async (passed_secret) => {
        const config = {
            headers: {'Content-Type': 'application/json'}
        }
        try {
            const res = await axios.put(`/api/secrets/${passed_secret._id}`, passed_secret, config)
            dispatch({type: "REMOVE_SECRET", payload: res.data})
        } catch (err) {
            dispatch({type: "ERROR", payload: err.response.data.msg})
        }
        dispatch({type: "UPDATE_SECRET", updatedSecret: passed_secret})
    }
    const ClearCurrEdit = () => {
        dispatch({type: "CLEAR_CURRENT_EDIT"})
    }
    const FilterSecret = (passed_text) => {
        dispatch ({type: "FILTER_SECRET", searched_text: passed_text})
    }
    const ClearFilter = () => {
        dispatch ({type: "CLEAR_FILTER"})
    }

    return (
        <SecretContext.Provider 
            value={{
                secrets: state.secrets,
                current_edit: state.current_edit,
                filtered: state.filtered,
                error: state.error,
                AddSecret,
                RemoveSecret,
                GetSecrets,
                ClearAllSecrets,
                SetCurrEdit,
                UpdateSecret,
                ClearCurrEdit,
                FilterSecret,
                ClearFilter
            }}>
            { props.children }
        </SecretContext.Provider>
    )
}

export default SecretContextProvider;