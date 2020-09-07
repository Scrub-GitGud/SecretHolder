import React, {useContext, Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { SecretContext } from '../context/SecretContext'

const Navbar = ({title, icon}) => {

    const secretContext = useContext(SecretContext)
    const { ClearAllSecrets } = secretContext
    const authContext = useContext(AuthContext)
    const { isAuthenticated, user, Logout, LoadUser } = authContext

    useEffect(() => {
        LoadUser();
        ClearAllSecrets();
        // eslint-disable-next-line
    }, [])

    const onLogout = () => {
        Logout();
    }

    const GuestLinks = (
        <Fragment>
            <li><Link to='/Register'>Register</Link></li>
            <li><Link to='/Login'>Login</Link></li>
        </Fragment>
    )
    const LoggedInLinks = (
        <Fragment>
            <li>
                <i className="fas fa-user-circle" />{" "}
                {user && user.name}
            </li>
            <li>
                <a onClick={onLogout} href="#!">
                    <i className="fas fa-sign-out-alt" />{" "}
                    <span className="">Logout</span>
                </a>
            </li>
        </Fragment>
    )

    return (
        <div className="navbar bg-primary">
            <h1><i className={icon} /> {title}</h1>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/about'>About</Link></li>{" "}
                {isAuthenticated ? LoggedInLinks : GuestLinks}
            </ul>
        </div>
    )
}

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string
}
Navbar.defaultProps = {
    title: "Password Manager",
    icon: "fab fa-keycdn"
}

export default Navbar
