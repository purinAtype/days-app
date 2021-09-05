import React, { useEffect, useState } from "react";
import {auth} from '../firebase/index';

export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user)
      setPending(false)
      var name, email, uid;
      name = user.displayName;
      email = user.email;
      uid = user.uid;
      // document.querySelector('#userName').textContent = name;
      // document.querySelector('#userEmail').textContent = email;
    });
  }, []);

  if(pending){
    return <>Loading...</>
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;