import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

var firebaseConfig = {
  apiKey: 'AIzaSyC6fq4lmOlTZS-WYy9Zr3SPqyitJDIgrTA',
  authDomain: 'codenotes-aa924.firebaseapp.com',
  projectId: 'codenotes-aa924',
  storageBucket: 'codenotes-aa924.appspot.com',
  messagingSenderId: '1050481312290',
  appId: '1:1050481312290:web:4b8f6e8496f017cd44007b',
};

const firebaseApp = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

export async function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  await auth.signInWithPopup(provider);
  window.location.reload();
}

export function checkAuth(cb: (user: firebase.User | null) => void) {
  auth.onAuthStateChanged(cb);
}

export async function logOut() {
  await auth.signOut();
  window.location.reload();
}

export async function fetchUserNotes(uid: string) {
  const snapshot = await db
    .collection('notes')
    .where('author', '==', uid)
    .get();
  console.log(snapshot.docs[0].data());
  return snapshot.docs;
}
