import React from 'react'
import GoogleIcon from './GoogleIcon.svg'

const LoggedInWith = (props) => {
    switch(props.loggedin_with.toLowerCase()) {
        case "with-facebook":
            return (
                <h4 className="text-inline text-dark">Logged In With: <span className="text-facebook"><i className="fab fa-facebook-square"/> Facebook </span></h4>
                
            )
        case "with-google":
        case "gmail":
            return (
                <div>
                    <h4 className="text-inline">Logged In With: {" "}</h4>
                    <h3 className="text-inline">
                        <img src={GoogleIcon} style={{"width": "17px"}} />
                        {/* <span className="text-google">G</span> */}
                        <span className="text-google">o</span>
                        <span className="text-google">o</span>
                        <span className="text-google">g</span>
                        <span className="text-google">l</span>
                        <span className="text-google">e</span>
                    </h3>
                </div>
            )
        case "with-github":
            return (
                <h4 className="text-inline text-dark">Logged In With: <i className="fab fa-github"/> Github</h4>
            )
    }
}

export default LoggedInWith
