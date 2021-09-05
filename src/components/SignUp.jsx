
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
  // const [email, setEmail] = useState("")
  // const [password, setPassword] = useState("")
  // const [username, setUsername] = useState("")

  // const inputEmail = useCallback((e) => {
  //   setEmail(e.target.value)
  // },[setEmail]);

  // const inputPassword = useCallback((e) => {
  //     setPassword(e.target.value)
  // },[setPassword]);

  // const inputUsername = useCallback((e) => {
  //     setUsername(e.target.value)
  // },[setUsername]);

  const handleSignUp = useCallback(async event => {
  event.preventDefault();
  const { email, password, username } = event.target.elements;
  // let name = document.querySelector('#account').value;
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




















// import React, {useState,useEffect,useCallback}  from 'react';
// import {
//   Link,
//   useHistory,
//   useParams,
//   useLocation,
// } from 'react-router-dom';
// import {PrimaryButton, TextInput} from "./UIkit/index";
// import {SignIn, Home} from "./index";
// import {auth ,db} from '../firebase/index';


// const SignUp = () => {
//   const history = useHistory();

//   const [user, setUser] = useState('');
//   const [userName, setUserName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [emailError, setEmailError] = useState('');
//   const [passwordError, setPasswordError] = useState('');
//   const [hasAccount, setHasAccount] = useState(false);

//   const clearInputs = () => {
//     setEmail('');
//     setPassword('');
//     setUserName('');
//   }

//   const clearErrors = () => {
//     setEmailError('');
//     setPasswordError('');
//   }

//   const handleLogin = () => {
//     clearErrors();

//     auth.signInWithEmailAndPassword(email, password)
//     .then((result) => {
//       // signInSuccessUrl: 'home.html';
//       // history.push("/");
//       console.log(email);
//       console.log(password);
//       console.log('sign in successfully.');
//       // ログイン成功。
//     }).catch(error => {
//       switch(error.code) {
//         case "auth/invalid-email":
//         case "auth/user-disabled":
//         case "auth/user-not-found":
//           setEmailError(error.message);
//           break;
//         case "auth/wrong-password":
//           setPasswordError(error.message);
//           break;
//       }
//     });
//   };

//   const handleSignup = () => {
//     clearErrors();

//     auth.createUserWithEmailAndPassword(email, password)
//     .then((result) => {
//       const profile = auth.currentUser;
//       profile.updateProfile({
//         displayName: userName
//       }).then((result) => {
//         // Update successful.
//         db.collection('user').doc(result.user.uid).set({
//           username : userName,
//           email : email
//         });
//       })
//       console.log(email);
//       console.log(password);
//       console.log(userName);
//       console.log('sign up successfully.');
//     }).catch(error => {
//       switch(error.code) {
//         case "auth/email-already-in-use":
//         case "auth/invalid-email":
//         // case "auth/user-not-found":
//           setEmailError(error.message);
//           break;
//         case "auth/weak-password":
//           setPasswordError(error.message);
//           break;
//       }
//     });
//   };

//   const authLister = () => {
//     auth.onAuthStateChanged(user => {
//       if(user) {
//         clearInputs();
//         setUser(user);
//       } else {
//         setUser("");
//       }
//     })
//   }

//   useEffect(() => {
//     authLister();
//   },[]);


//   return (
//     <div className="login">
//       <h2 className="">アカウント登録</h2>
//       <div className="loginContainer">
//         <label htmlFor="">Username</label>
//         <input
//           type="text"
//           autoFocus
//           required
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <p className="errorMsg">{emailError}</p>

//         <label htmlFor="">Password</label>
//         <input
//           type="password"
//           required
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <p className="errorMsg">{passwordError}</p>

//         <label htmlFor="">UserName</label>
//         <input
//           type="text"
//           required
//           value={userName}
//           onChange={(e) => setUserName(e.target.value)}
//         />

//       </div>
//       <div className="btnContainer">
//         <button onClick={handleSignup}>SignUp</button>
//       </div>
//           <Link to="/signin">ログインはこちら。</Link>
//           {/* <p className="u-text-small">アカウントをお持ちの方はこちら</p> */}
//           {/* <button onClick={handleLogout} className="">Logout</button> */}
//     </div>
//   );
// };


// export default SignUp;






