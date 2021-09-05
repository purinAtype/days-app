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
    <Router>
      <div style={{margin: 20}}>
      <Switch>
        <Route exact path={'/home/profile'} component={Home}/>
        <Route exact path={'/home/profile/ja'} component={HomeJapanese}/>
        <Route exact path={'/home/profile/en'} component={HomeEnglish}/>
        <Route exact path={'/home/profile/cn'} component={HomeChinese}/>
      </Switch>
      </div>
    </Router>
    </>
  );
};

const Home = () => {
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

const HomeJapanese = () => {
  return(
    <div>
      <h1>こんにちわ</h1>
      <p><a href="/profile">戻る</a></p>
    </div>
  );
}
const HomeEnglish = () => {
  return (
  <div>
    <h1>Hello</h1>
    <p><a href="/profile">戻る</a></p>
  </div>
  );
}
const HomeChinese = () => {
  return (
  <div>
    <h1>你好</h1>
    <p><a href="/profile">戻る</a></p>
  </div>
  );
}


export default Profile;
