import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDefWLxKxVT--YE9B6JDIvKioElXNO4Qgc',
  authDomain: 'criticeye77.firebaseapp.com',
  projectId: 'criticeye77',
  storageBucket: 'criticeye77.appspot.com',
  messagingSenderId: '636735929339',
  appId: '1:636735929339:web:529591b587d6cabc47695e',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
