import React, { Component, useState } from 'react';
// import FacebookLogin from 'react-facebook-login';
// import GoogleLogin from 'react-google-login';
// import fbLogin from "./services/fblogin.js"
// import googleLogin from "./services/googlelogin.js"
import './App.css';
import firebase from 'firebase/compat/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import Login from './login';

const App = () => {
  // const [uid, setUID] = useState("")
  // const firebaseApp = firebase.apps[0];
  // const provider = new GoogleAuthProvider();
  // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  // const auth = getAuth();
  // auth.languageCode = 'it';
  // const user = auth.currentUser;

  
    return (
      <div className="App">
        <h1>LOGIN WITH GOOGLE</h1>
        <Login />
      </div>
    );
  
}

export default App;