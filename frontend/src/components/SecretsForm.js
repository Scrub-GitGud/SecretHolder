import React, { useState, useEffect, useContext } from 'react'
import { SecretContext } from '../context/SecretContext'
import GoogleIcon from './GoogleIcon.svg'

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
        loggedin_with: '',
        id: ''
    })
    
    useEffect(() => {
        if(current_edit !== null) {
            setSecret(current_edit)
        } else {
            setSecret({title: '', username: '', email: '', phone: '', password: '', link: '', note: '', loggedin_with: '', id: ''})
        }
        // eslint-disable-next-line
    }, [secretContext, current_edit])
    
    const onChange = (e) => {setSecret({...secret, [e.target.name]: e.target.value})}
    const onRadioChange = (e) => {setSecret({...secret, loggedin_with: e.target.value})}

    const onSubmit = (e) => {
        e.preventDefault();
        
        if(current_edit !== null){
            secretContext.UpdateSecret(secret)
            secretContext.ClearCurrEdit();
        } else {
            secretContext.AddSecret(secret)
        }
        setSecret({title: '', username: '', email: '', phone: '', password: '', link: '', note: '', loggedin_with: '', id: ''})
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

            {/* Radio | Logged In With */}
            <h3 className="text-inline">Logged In With: </h3> {" "}
            <label htmlFor="with-google" className="cursos-pointer">
                <input type="radio" id="with-google" name="loggedin-with" value="with-google" onChange={onRadioChange} />
                <h3 className="text-inline"> <img src={GoogleIcon} style={{"width": "17px"}} /></h3>
            </label> {" "}
            <label htmlFor="with-facebook" className="cursos-pointer">
                <input type="radio" id="with-facebook" name="loggedin-with" value="with-facebook" onChange={onRadioChange} />
                <h3 className="text-facebook text-inline"> <i className="fab fa-facebook-square " /></h3>
            </label>
            <label htmlFor="with-github" className="cursos-pointer">
                <input type="radio" id="with-github" name="loggedin-with" value="with-github" onChange={onRadioChange} />
                <h3 className=" text-dark text-inline"> <i className="fab fa-github" /></h3>
            </label>
            <label htmlFor="with-none" className="cursos-pointer">
                <input type="radio" id="with-none" name="loggedin-with" value="" onChange={onRadioChange} />
                <h3 className=" text-dark text-inline"> None </h3>
            </label>

            <input type="submit" value={current_edit ? "Update" : "Add New"} className="btn btn-primary btn-block" />
            {current_edit && <button onClick={ClearForm} className="btn btn-light btn-block">Clear</button>}
        </form>
    )
}

export default SecretsForm
