import firebase from "firebase/app";
import "firebase/auth" ;
import "firebase/messaging";
import "firebase/firestore";
import { put } from "./utility/Fetch";

const firebaseConfig = {
  apiKey: "AIzaSyAtNxdQSXcO_wpGzVXXfvg2EJMH1K7gp_U",
  authDomain: "servizio-bar.firebaseapp.com",
  databaseURL: "https://servizio-bar.firebaseio.com",
  projectId: "servizio-bar",
  storageBucket: "servizio-bar.appspot.com",
  messagingSenderId: "228170779994",
  appId: "1:228170779994:web:b3bcee64497be176f9b763",
  measurementId: "G-W3GWKB9BPR"
};

const vapidKey = 'BEUnlTTZ1WXSEKRTgHgMikQGJvnPIjd_FdRMoGfi9dm5z2jkbqrbsUVUVCQUES_wI6hJd3F2SAaYQTNYLMHXR_4';

firebase.initializeApp(firebaseConfig);

const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const Logout = () => firebase.auth().signOut();
export const CurrentUser = () =>  firebase.auth().currentUser;

export const getToken = () =>{
if (messaging!==null){
messaging.getToken({ vapidKey })
  .then((msgid) => {
    if (msgid) {
      console.log(msgid)
      const { uid } = firebase.auth().currentUser;
      
      put('users', { uid, msgid }).then((response) => {console.log("msgid aggiornato",response);});

    } else {
      console.log('No registration token available. Request permission to generate one.');
      return {};
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
  });
}}

  export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;
  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { email, displayName } = user;
    try {
      await userRef.set({
        displayName,
        email,
        ...additionalData
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};

export const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();
    return {
      uid,
      ...userDocument.data()
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};

export const auth = firebase.auth();
export const messaging = firebase.messaging.isSupported() ? firebase.messaging() : null;
export const firestore = firebase.firestore();