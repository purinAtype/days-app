
import React, { useCallback, useState, useEffect, useContext } from "react";
import { withRouter } from "react-router";
import {
  Link,
  useHistory,
  useParams,
  useLocation,
} from 'react-router-dom';
import { auth, db, FirebaseTimestamp } from '../firebase/index';
import "../assets/styles/sing.css";

const SignUp = ({ history }) => {
  const handleSignUp = useCallback(async event => {
  event.preventDefault();
  const { email, password, username } = event.target.elements;
    try {
      await auth.createUserWithEmailAndPassword(email.value, password.value)
      .then((result) => {
        const user = auth.currentUser;
        const timestamp = FirebaseTimestamp.now();

        user.updateProfile({
          displayName: username.value
        })
        .then(() => {
          // Update successful.
          db.collection('user').doc(result.user.uid).set({
            email : email.value,
            username : username.value,
            uid : user.uid,
            created_at : timestamp,
            updated_at : timestamp,
            role : "customer"
          });
        })
      }).then(() => {
        history.push("/");
      }).catch((error) => {
        console.log(error);
      })
    } catch (error) {
      alert(error);
    }
  }, [history]);

  return (
    <div className="login-form">
      <div className="form-signin">
        <h1>Sign up</h1>
        <form onSubmit={handleSignUp}>
          {/* <label for="inputEmail">Email</label> */}
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="form-control"
            />
          {/* <label for="inputPassword">Password</label> */}
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="form-control"
            />
          {/* <label for="inputUsername">UserName</label> */}
          <input
            id="account"
            name="username"
            type="text"
            placeholder="UserName"
            className="form-control"
            />
            <div>
              <button type="submit">Sign Up</button>
            </div>
        </form>
        <div>
          <Link to="/signin">ログインはこちら。</Link>
        </div>
      </div>
    </div>
  );
};

export default withRouter(SignUp);