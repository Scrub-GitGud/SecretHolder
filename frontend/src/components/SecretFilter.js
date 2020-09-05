import React, {useContext} from 'react'
import { SecretContext } from '../context/SecretContext'

const SecretFilter = () => {

    const secretContext = useContext(SecretContext)

    const onChange = (e) => {
        if(e.target.value !== ""){
            secretContext.FilterSecret(e.target.value) // Filtering
        } else {
            secretContext.ClearFilter()
        }
    } 

    return (
        <form>
            <input type="text" placeholder="Search" onChange={onChange}/>
        </form>
    )
}

export default SecretFilter
