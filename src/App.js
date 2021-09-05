import React, {useState,useEffect,useCallback}  from 'react';
import { BrowserRouter as Router, Switch, Route, useHistory, Redirect } from 'react-router-dom';
import {SignIn, SignUp, Home, Profile, AuthProvider, PrivateRoute} from './components/index';

// import { AuthProvider } from "./components/Auth";
// import PrivateRoute from "./components/PrivateRouter";
import {auth} from './firebase/index';
import './assets/styles/index.css';
import './assets/styles/style.css';



function App() {
  const history = useHistory();

  return (
  <div className="wrapper">
    <AuthProvider>
      <Router>
        <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute exact path="/home" component={Home} />
            <PrivateRoute exact path="/home/todo" component={Home} />
            <PrivateRoute exact path="/home/profile" component={Home} />
            <PrivateRoute exact path="/ja" component={Home} />

            <PrivateRoute exact path="/profile" component={Profile} />
            <PrivateRoute exact path="/profile/ja" component={Profile} />
            <PrivateRoute exact path="/profile/en" component={Profile} />
            <PrivateRoute exact path="/profile/cn" component={Profile} />

            {/* <PrivateRoute exact path="/" component={Home} /> */}
            <Route exact path={"/signin"} component={SignIn} />
            <Route exact path={"/signup"} component={SignUp} />
        </Switch>
      </Router>
    </AuthProvider>
  </div>
  );
}

export default App;
