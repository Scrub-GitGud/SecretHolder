import React, { useState, useContext } from 'react'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { SecretContext } from '../context/SecretContext'
import Title from './Title'
import LoggedInWith from './LoggedInWith';

const SecretsItem = (props) => {

    const secretContext = useContext(SecretContext)

    const [copySuccess, setCopySuccess] = useState(false);

    const onEdit = () => {
        secretContext.SetCurrEdit(props.secret_i)
    }
    const onDelete = () =>{
        secretContext.RemoveSecret(props.secret_i._id)
        secretContext.ClearCurrEdit()
    }

    const onCopy = () => {
        setCopySuccess(true)
        setTimeout(() =>  setCopySuccess(false), 2000)
    }

    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className="card bg-light">
            
            <Title title={props.secret_i.title}></Title>

            {props.secret_i.loggedin_with && <LoggedInWith loggedin_with={props.secret_i.loggedin_with} />}

            {props.secret_i.username && <div><i className="fas fa-user-tie"/> Username: {props.secret_i.username}</div> }
            {props.secret_i.email && <div><i className="fas fa-envelope"/> Email: {props.secret_i.email}</div> }
            {props.secret_i.phone && <div><i className="fas fa-phone"/> Phone: {props.secret_i.phone}</div> }

            {/* {props.secret_i.password && <div><i className="fas fa-key"/> Password: {checked ? props.secret_i.password : "xxxxxxx"} <input onChange={()=>setChecked(!checked)} type="checkbox" className="big-checkbox"/></div>} */}
            {props.secret_i.password && <div><i className="fas fa-key"/> Password: {showPassword ? props.secret_i.password : "xxxxxxx"} <button onClick={()=>setShowPassword(!showPassword)} type="checkbox" className="btn badge badge-warning big-checkbox">{showPassword ? "Hide":"Show"}</button></div>}
            
            {props.secret_i.link && 
                <div>
                    <i className="fas fa-link"></i> {props.secret_i.link} {""}
                    <CopyToClipboard text={props.secret_i.link} onCopy={onCopy}>
                        <button className="btn btn-link"><i className="fas fa-external-link-alt" /> Copy {copySuccess && <span className="badge bg-success"> Copied</span>}</button>
                    </CopyToClipboard>
                </div> 
            }
            
            {props.secret_i.note && <div><i className="fas fa-comment-alt"></i> {props.secret_i.note}</div> }
            {/* {props.secret_i.date && <div><i className="fas fa-clock"></i> Date: {props.secret_i.date}</div> } */}

            <button onClick={onEdit} className="btn btn-dark btn-sm">Edit</button>
            <button onClick={onDelete} className="btn btn-danger btn-sm">Delete</button>
        </div>
    )
}

export default SecretsItem
