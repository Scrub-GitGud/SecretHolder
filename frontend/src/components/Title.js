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
                <h3 className="text-left text-inline">
                    <span className="text-google">G</span>
                    <span className="text-google">o</span>
                    <span className="text-google">o</span>
                    <span className="text-google">g</span>
                    <span className="text-google">l</span>
                    <span className="text-google">e</span>
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
        case "deviantart":
            return (
                <h3 className="text-deviantart text-left">
                    <div><i className="fab fa-deviantart" /> Deviantart</div>
                </h3>
            )
        case "artstation":
            return (
                <h3 className="text-artstation text-left">
                    <div><i className="fab fa-artstation" /> Art<span style={{"fontWeight": "lighter"}}>station</span></div>
                </h3>
            )
        case "dribbble":
            return (
                <h3 className="text-dribbble text-left">
                    <div><i className="fab fa-dribbble" /> Dribbble</div>
                </h3>
            )
        case "quora":
            return (
                <h3 className="text-quora text-left">
                    <div><i className="fab fa-quora " /> Quora</div>
                </h3>
            )
        case "pinterest":
            return (
                <h3 className="text-pinterest text-left">
                    <div><i className="fab fa-pinterest " /> Pinterest</div>
                </h3>
            )
        case "stack-overflow":
        case "stackoverflow":
        case "stack overflow":
            return (
                <h3 className="text-dark text-left">
                    <div><i className="fab fa-stack-overflow " /> <span style={{"fontWeight": "lighter"}}>stack</span>overflow</div>
                </h3>
            )
        case "firefox":
        return (
            <h3 className="text-left" style={{"color": "orangered"}}>
                <div><i className="fab fa-firefox-browser " /> Firefox</div>
            </h3>
        )
        case "chrome":
        return (
            <h3 className="text-left" style={{"color": "#4c8bf5"}}>
                <div><i className="fab fa-chrome " /> Chrome</div>
            </h3>
        )
        case "discord":
        return (
            <h3 className="text-left" style={{"color": "#7289da"}}>
                <div><i className="fab fa-discord " /> Discord</div>
            </h3>
        )
        default:
            return (
                <h3 className="text-dark text-left">
                    <div><i className="fab fa-keycdn text-primary" /> {props.title}</div>
                </h3>
            )
    }
}

export default Title
