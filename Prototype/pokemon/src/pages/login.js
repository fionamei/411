import React, { Component, useState } from 'react';
import firebase from 'firebase/compat/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";

export default function Login() {

    const [displayName, setDisplayName] = useState("");
    const firebaseApp = firebase.apps[0];
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    const auth = getAuth();
    auth.languageCode = 'it';
    const user = auth.currentUser;

    const signInWithGoogle = async () => {
        await signInWithPopup(auth, provider)
        .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
        console.log("user is " + user);
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.log("error is " + errorMessage);
        });

        onAuthStateChanged(auth, (user) => {
        if (user) {
            const name = user.displayName;
            setDisplayName(name);
        }
        }); 

        }

  return (
    <div>
         <button onClick={signInWithGoogle}>Log in with Google</button>
        <h2>Hello {displayName} </h2>
    </div>
  )
}
