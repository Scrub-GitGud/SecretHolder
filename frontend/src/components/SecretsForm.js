import React, { useState, useEffect, useContext } from 'react'
import { SecretContext } from '../context/SecretContext'

const SecretsForm = () => {
    
    const secretContext = useContext(SecretContext)
    const { current_edit } = secretContext
    
    const [secret, setSecret] = useState({
        title: '',
        username: '',
        email: '',
        phone: '',
        password: '',
        link: '',
        note: '',
        id: ''
    })
    
    useEffect(() => {
        if(current_edit !== null) {
            setSecret(current_edit)
        } else {
            setSecret({title: '', username: '', email: '', phone: '', password: '', link: '', note: '', id: ''})
        }
        // eslint-disable-next-line
    }, [secretContext, current_edit])
    
    const onChange = (e) => {setSecret({...secret, [e.target.name]: e.target.value})}

    const onSubmit = (e) => {
        e.preventDefault();

        if(current_edit !== null){
            secretContext.UpdateSecret(secret)
            secretContext.ClearCurrEdit();
        } else {
            secretContext.AddSecret(secret)
        }
        setSecret({title: '', username: '', email: '', phone: '', password: '', link: '', note: '', id: ''})
    }
    const ClearForm = (e) => {
        e.preventDefault();
        secretContext.ClearCurrEdit();
    }

    return (
        <form onSubmit={onSubmit} className="px-1">
            <h2 className="text-left text-primary">Save Passwords & Secrets. Totally can trust us 🐸</h2>
            <input type="text" placeholder="Title" name="title" value={secret.title} onChange={onChange}/>
            <input type="text" placeholder="Username" name="username" value={secret.username} onChange={onChange}/>
            <input type="text" placeholder="Email" name="email" value={secret.email} onChange={onChange}/>
            <input type="text" placeholder="Phone" name="phone" value={secret.phone} onChange={onChange}/>
            <input type="text" placeholder="Password" name="password" value={secret.password} onChange={onChange}/>
            <input type="text" placeholder="Link" name="link" value={secret.link} onChange={onChange}/>
            <textarea type="text" placeholder="Extra Note" name="note" value={secret.note} onChange={onChange}/>
            <input type="submit" value={current_edit ? "Update" : "Add New"} className="btn btn-primary btn-block" />
            {current_edit && <button onClick={ClearForm} className="btn btn-light btn-block">Clear</button>}
        </form>
    )
}

export default SecretsForm
