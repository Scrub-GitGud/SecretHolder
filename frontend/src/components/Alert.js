import React, {useContext} from 'react'
import { AlertContext } from '../context/AlertContext'

const Alert = () => {

    const alertContext = useContext(AlertContext)
    const { alerts } = alertContext

    return (
        alerts.length > 0 &&
        alerts.map((i) => 
            <div key={i.id} className={`alert alert-${i.type}`}>
                <i className="fas fa-info-circle" /> {i.msg}
            </div>
        )
    )
}

export default Alert
