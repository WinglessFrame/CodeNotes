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
// const storage = firebaseApp.storage();

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

export async function fetchUserNotes(uid: string | null) {
  if (uid === null) {
    const defaultCellValuesnapshot = await db
      .collection('notes')
      .doc('DefaultCells')
      .get();
    const defaultData = defaultCellValuesnapshot.data();
    if (defaultData) {
      return { id: '', data: defaultData.data };
    }
    return { id: '', data: '' };
  }
  const snapshot = await db
    .collection('notes')
    .where('author', '==', uid)
    .get();
  if (snapshot.docs.length > 0) {
    const id = snapshot.docs[0].id;
    const data = snapshot.docs[0].data().data as string;
    return { id, data };
  } else {
    const defaultCellValuesnapshot = await db
      .collection('notes')
      .doc('DefaultCells')
      .get();
    const defaultData = defaultCellValuesnapshot.data();
    if (defaultData) {
      const id = await createUserNote(uid, defaultData.data);
      return { id, data: defaultData.data };
    }
    return { id: '', data: '' };
  }
}

export async function uploadUserNotes(id: string, data: string) {
  if (id) {
    await db.collection('notes').doc(id).update({
      data,
    });
  }
}

export async function createUserNote(uid: string, defaultData: string) {
  const note = await db.collection('notes').add({
    author: uid,
    data: defaultData,
  });
  return note.id;
}
