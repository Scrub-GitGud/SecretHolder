import React, { createContext, useReducer } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { alertReducer } from './AlertReducer';
export const AlertContext = createContext();

const AlertContextProvider = (props) => {
    const initianState = {
        alerts: []
    }
    const [state, dispatch] = useReducer(alertReducer, initianState)


    const SetAlert = (msg, type) => {
        const id = uuidv4();
        dispatch({type: "SET_ALERT", payload: {msg, type, id}})
        setTimeout(() => dispatch({type: "REMOVE_ALERT", payload: id}), 5000)
    }


    return (
        <AlertContext.Provider 
            value={{
                alerts: state.alerts,
                SetAlert
            }}>
            { props.children }
        </AlertContext.Provider>
    )
}

export default AlertContextProvider;