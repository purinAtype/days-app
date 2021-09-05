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











// const SignIn = () => {
//   const history = useHistory();

//   const [user, setUser] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [emailError, setEmailError] = useState('');
//   const [passwordError, setPasswordError] = useState('');
//   const [hasAccount, setHasAccount] = useState(false);

//   const clearInputs = () => {
//     setEmail('');
//     setPassword('');
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
//       history.push("/");
//       console.log(email);
//       console.log(password);
//       console.log('sign in successfully.');
//       // ログイン成功。
//       // ページを移動する、ユーザーの情報を取得して処理を行う、等する。user.uid をユーザーIDとして使用する。
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
//     .catch(error => {
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

//   const handleLogout = () => {
//     auth.signOut()
//     .then((result) => {
//       // location.href = 'index.html';
//       history.push("/signin");
//       console.log('sign out successfully.');
//       // ログイン画面に戻る等
//     }).catch((error) => {
//       console.log(error.message);
//       // エラーを表示する等
//     })
//   }

//   const authLister = () => {
//     auth.onAuthStateChanged(user => {
//       if(user) {
//         clearInputs();
//         setUser(user);
//         console.log(user);
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
//       <h2 className="">ログイン画面</h2>
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
//       </div>
//       <div className="btnContainer">
//         <button onClick={handleLogin}>SignIn</button>
//       </div>
//           <Link to="/signup">新規登録はこちら。</Link>
//           <p className="u-text-small">アカウントをお持ちの方はこちら</p>
//           <button onClick={handleLogout} className="">Logout</button>
//     </div>
//   );
// };

// export default SignIn;





