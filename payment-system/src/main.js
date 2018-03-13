import Vue from 'vue'
import VueFire from 'vuefire'
import App from './App'
import router from './router'
import firebase from 'firebase'

Vue.config.productionTip = false;
Vue.use(VueFire);

let app;
let config = {
    apiKey: "AIzaSyCfxWQvLTvZJna1o-7EOcFkymNUmmDd0AM",
    authDomain: "rndm-pays.firebaseapp.com",
    databaseURL: "https://rndm-pays.firebaseio.com",
    projectId: "rndm-pays",
    storageBucket: "",
    messagingSenderId: "868857430754"
};

firebase.initializeApp(config)

// Create a table in Firebase
var projectsRef = firebase.database().ref('projects');
export {projectsRef as db};

firebase.auth().onAuthStateChanged(function(user) {
    if (!app) {
        /* eslint-disable no-new */
        app = new Vue({
            el: '#app',
            template: '<App/>',
            components: { App },
            router
        })
    }
});