import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyAOAbgtPthzjQoLQiRn9FnqP9l_mDvBErI",
  authDomain: "devzone-9504c.firebaseapp.com",
  databaseURL: "https://devzone-9504c.firebaseio.com",
  projectId: "devzone-9504c",
  storageBucket: "devzone-9504c.appspot.com",
  messagingSenderId: "512204278120",
  appId: "1:512204278120:web:45523a1e38b1c879022edd",
  measurementId: "G-Q6Q3H66GSZ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase