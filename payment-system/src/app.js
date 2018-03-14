import Vue from 'vue'
import VueFire from 'vuefire'
import App from './app.vue'
import router from './core/router'
import firebase from 'firebase'

Vue.config.productionTip = false;
Vue.use(VueFire);

let app;

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