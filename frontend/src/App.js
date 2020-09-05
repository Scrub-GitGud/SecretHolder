import React, {Fragment} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar'
import Alert from './components/Alert'
import Home from './components/pages/Home'
import about from './components/pages/about'
import register from './components/pages/Register'
import login from './components/pages/Login'
import PrivateRoute from './components/pages/PrivateRoute';
import SecretContextProvider from './context/SecretContext';
import AuthContextProvider from './context/AuthContext';
import AlertContextProvider from './context/AlertContext';
import setDefaultHeader from './SetAxiosDefaultHeader'

if(localStorage.xToken){
  setDefaultHeader(localStorage.xToken)
}

function App() {
  return (
    <AuthContextProvider>
    <SecretContextProvider>
    <AlertContextProvider>
    <BrowserRouter>
    
        <Fragment>
          <Navbar />
          <Alert />
          <Switch>
              <PrivateRoute exact path='/' component={Home} />
              <Route exact path='/about' component={about} />
              <Route exact path='/register' component={register} />
              <Route exact path='/login' component={login} />
          </Switch>

        </Fragment>

    </BrowserRouter>
    </AlertContextProvider> 
    </SecretContextProvider>
    </AuthContextProvider>
  );
}

export default App;
