import React, { useCallback, useState, useEffect, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import {
  Link,
  useHistory,
  useParams,
  useLocation,
} from 'react-router-dom';
import {auth} from '../firebase/index';
import { AuthContext } from "./Auth";
import "../assets/styles/sing.css";

const SignIn = ({ history }) => {

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const clearErrors = () => {
    setEmailError('');
    setPasswordError('');
  }

  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await auth.signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        // alert(error);
        switch(error.code) {
        case "auth/invalid-email":
        case "auth/user-disabled":
        case "auth/user-not-found":
          setEmailError(error.message);
          break;
        case "auth/wrong-password":
          setPasswordError(error.message);
          break;
        }
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div className="login-form">
      <div className="form-signin">
        <h1>Log in</h1>
        <form onSubmit={handleLogin}>
          {/* <label for="inputEmail">Email</label> */}
          <input name="email" type="email" placeholder="Email" className="form-control"/>
          <p className="errorMsg">{emailError}</p>

          {/* <label for="inputPassword">Password</label> */}
          <input name="password" type="password" placeholder="Password" className="form-control"/>
          <p className="errorMsg">{passwordError}</p>

          <button type="submit" className="login-button">Log in</button>
        </form>
        <div>
          <Link to="/signup">新規登録はこちら。</Link>
        </div>
      </div>
    </div>
  );
};

export default withRouter(SignIn);