import firebase from 'firebase'
import firestore from 'firebase/firestore'

var config = {
  apiKey: "AIzaSyC_uXtn43VkUD3_bqeMEP6w_X1lggreiKw",
  authDomain: "to-do-list-dcecc.firebaseapp.com",
  databaseURL: "https://to-do-list-dcecc.firebaseio.com",
  projectId: "to-do-list-dcecc",
  storageBucket: "to-do-list-dcecc.appspot.com",
  messagingSenderId: "991730603756"
};


const firebaseApp = firebase.initializeApp(config);

// firebaseApp.firestore().settings({ timestampsInSnapshots: true })

export default firebaseApp.firestore()
