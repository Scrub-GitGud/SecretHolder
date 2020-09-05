import React, {useState, useEffect, useContext} from 'react'
import { AlertContext } from '../../context/AlertContext'
import { AuthContext } from '../../context/AuthContext'

const Register = (props) => {

    const alertContext = useContext(AlertContext)
    const authContext = useContext(AuthContext)
    const { error, isAuthenticated } = authContext

    useEffect(() => {
        if(isAuthenticated){
            props.history.push('/') // ??????????????? Redirect to "/"
        }

        if(error !== null) {
            alertContext.SetAlert(error, "danger")
            authContext.ClearError()
        }
        //eslint-disable-next-line
    }, [error, isAuthenticated, props.history])


    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    })
    
    const onChange = (e) => {setUserData({...userData, [e.target.name]: e.target.value})}

    const onSubmit = (e) => {
        e.preventDefault()
        if(userData.password !== userData.password2){
            alertContext.SetAlert("Password doesn't match", "danger")
        }else {
            authContext.Register(userData)
        }
    }

    return (
        <div className="form-container">
            <h1 className="text-primary">Register</h1>

            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" value={userData.name} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" value={userData.email} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={userData.namepassword} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password2">Confirm Password</label>
                    <input type="password" name="password2" value={userData.password2} onChange={onChange} />
                </div>
                <input type="submit" value="Sign Up" className="btn btn-primary" />
            </form>
        </div>
    )
}

export default Register
