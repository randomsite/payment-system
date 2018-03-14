import firebase from 'firebase'

let config = {
    apiKey: "AIzaSyCfxWQvLTvZJna1o-7EOcFkymNUmmDd0AM",
    authDomain: "rndm-pays.firebaseapp.com",
    databaseURL: "https://rndm-pays.firebaseio.com",
    projectId: "rndm-pays",
    storageBucket: "",
    messagingSenderId: "868857430754"
};
let firebaseApp = firebase.initializeApp(config)
let db = firebaseApp.database()

export default db