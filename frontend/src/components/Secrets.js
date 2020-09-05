import React, {useContext, useEffect} from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { SecretContext } from '../context/SecretContext'
import SecretsItem from './SecretsItem'

const Secrets = () => {

    const secretContext = useContext(SecretContext)
    const { secrets, filtered, GetSecrets } = secretContext

    useEffect(() => {
        GetSecrets();
        // eslint-disable-next-line
    }, [])


    if(secretContext.secrets === null || !secretContext.secrets.length) {
        return <div>No secret available.</div>
    }

    // WITHOUT REACT TRANSITION GROUP
    // return (
    //     filtered == null ? <div>
    //         {secrets.map((i) => 
    //             <SecretsItem key={i.id} secret_i={i}/>
    //         )}
    //     </div> : <div>
    //         {filtered.map((i) => 
    //             <SecretsItem key={i.id} secret_i={i}/>
    //         )}
    //     </div>
    // )

    return (
        <div>
            <TransitionGroup>
                {filtered == null
                    ? secrets.map((i) => 
                    <CSSTransition key={i._id} timeout={300} classNames="item">
                        <SecretsItem secret_i={i}/>
                    </CSSTransition>
                    )
                    : filtered.map((i) =>
                    <CSSTransition key={i._id} timeout={300} classNames="item">
                        <SecretsItem secret_i={i}/>
                    </CSSTransition>
                )}
            </TransitionGroup>
        </div>
    )
}

export default Secrets
