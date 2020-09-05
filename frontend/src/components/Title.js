import React from 'react'

const Title = (props) => {

    switch(props.title.toLowerCase()) {
        case "facebook":
        case "fb":
            return (
                <h3 className="text-facebook text-left">
                    <div><i className="fab fa-facebook-square"/> Facebook</div>
                </h3>
            )
        case "instagram":
            return (
                <h3 className="text-instagram text-left">
                    <div>
                        <i className="fab fa-instagram-square instagram-icon"/> Instagram
                    </div>
                </h3>
            )
        case "google":
        case "gmail":
            return (
                <h3 className="text-left">
                    <span className="text-google">G</span>
                    <span className="text-google">o</span>
                    <span className="text-google">o</span>
                    <span className="text-google">g</span>
                    <span className="text-google">l</span>
                    <span className="text-google">e</span>
                    {/* <i className="fab fa-google"/>  */}
                    {/* { props.title} */}
                </h3>
            )
        case "mega":
            return (
                <h3 className="text-mega text-left">
                    <div><span className="mega-icon">M</span> MEGA</div>
                </h3>
            )
        case "twitter":
            return (
                <h3 className="text-twitter text-left">
                    <div><i className="fab fa-twitter-square"/> Twitter</div>
                </h3>
            )
        case "github":
            return (
                <h3 className="text-dark text-left">
                    <div><i className="fab fa-github"/> Github</div>
                </h3>
            )
        default:
            return (
                <h3 className="text-primary text-left">
                    <div>{props.title}</div>
                </h3>
            )
    }
}

export default Title
