import React, {useState, useContext, useEffect} from 'react'
import { AlertContext } from '../../context/AlertContext'
import { AuthContext } from '../../context/AuthContext'

const Login = (props) => {

    const alertContext = useContext(AlertContext)
    const authContext = useContext(AuthContext)
    const { error, isAuthenticated } = authContext

    useEffect(() => {
        if(isAuthenticated){
            props.history.push('/') // ??????????????? Redirect to "/"
        }

        if(error !== null) {
            alertContext.SetAlert(error, "warning")
            authContext.ClearError()
        }
        //eslint-disable-next-line
    }, [error, isAuthenticated, props.history])


    const [userData, setUserData] = useState({
        email: '',
        password: ''
    })

    const onChange = (e) => {setUserData({...userData, [e.target.name]: e.target.value})}

    const onSubmit = (e) => {
        e.preventDefault()
        authContext.Login(userData)
    }

    return (
        <div className="form-container">
            <h1 className="text-primary">Login</h1>

            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" value={userData.email} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={userData.namepassword} onChange={onChange} />
                </div>
                <input type="submit" value="Log In" className="btn btn-primary" />
            </form>
        </div>
    )
}

export default Login
