import firebase from 'firebase'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWlaPpz7lwmGTRUYJENTQ3xPCqaDBvnco",
  authDomain: "buchat-b51e3.firebaseapp.com",
  projectId: "buchat-b51e3",
  storageBucket: "buchat-b51e3.appspot.com",
  messagingSenderId: "334945500205",
  appId: "1:334945500205:web:713e21aabc74ea7ede8ca4"
};

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db =  firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, provider }
  export default db 