import React from 'react'
import Secrets from '../Secrets'
import SecretsForm from '../SecretsForm'
import SecretFilter from '../SecretFilter'

const Home = () => {
    return (
        <div className="grid-2">
            <div>
                <SecretsForm />
            </div>
            <div>
                <SecretFilter />
                <Secrets />
            </div>
        </div>
    )
}

export default Home
