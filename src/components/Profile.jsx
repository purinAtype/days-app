import React, { useState, useEffect, useCallback } from "react";
import {
  Link,
  useHistory,
  useParams,
  useLocation,
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import "../assets/styles/profile.css";


const Profile = () => {
  const history = useHistory();
  return (
    <>
    <div style={{margin: 20}}>
      <Greeting />
    </div>
    <div style={{margin: 20}}>
      <Router>
          <Switch>
            <Route path={'/profile/ja'} component={Japanese}/>
            <Route path={'/profile/en'} component={English}/>
            <Route path={'/profile/cn'} component={Chinese}/>
          </Switch>
      </Router>
    </div>
    </>
  );
};

const Greeting = () => {
  return (
    <div>
      <h1>Hello App</h1>
      <p>言語を選択してください。</p>
      <ul>
        <li><a href="/profile/ja">日本語</a></li>
        <li><a href="/profile/en">英語</a></li>
        <li><a href="/profile/cn">中国語</a></li>
      </ul>
    </div>
  );
}

const Japanese = () => {
  return(
    <div>
      <h1>こんにちわ</h1>
      <p><a href="/profile">戻る</a></p>
    </div>
  );
}
const English = () => {
  return (
  <div>
    <h1>Hello</h1>
    <p><a href="/profile">戻る</a></p>
  </div>
  );
}
const Chinese = () => {
  return (
  <div>
    <h1>你好</h1>
    <p><a href="/profile">戻る</a></p>
  </div>
  );
}


export default Profile;
