import React, {useState,useEffect,useCallback}  from 'react';
import { BrowserRouter as Router, Switch, Route, useHistory, Redirect } from 'react-router-dom';
import {SignIn, SignUp, Home, Profile, AuthProvider, PrivateRoute, Todo} from './components/index';

// import { AuthProvider } from "./components/Auth";
// import PrivateRoute from "./components/PrivateRouter";
import {auth} from './firebase/index';
import './assets/styles/index.css';
import './assets/styles/style.css';



function App() {
  const history = useHistory();


  const goToHome = () => {
    history.push('/')
  }
  const goToProfile = () => {
    history.push('/profile')
  }
  const goToTodo = () => {
    history.push('/todo')
  }


  return (
  <div className="wrapper">
    <AuthProvider>
      <Router>
        <Switch>
            <PrivateRoute path="/" component={Home} />
            {/* <PrivateRoute exact path="/home" component={Home} /> */}
            {/* <PrivateRoute path="/todo" component={Todo} />
            <PrivateRoute path="/profile" component={Profile} /> */}

            <Route exact path={"/signin"} component={SignIn} />
            <Route exact path={"/signup"} component={SignUp} />
        </Switch>
      </Router>
    </AuthProvider>
  </div>
  );
}

export default App;
