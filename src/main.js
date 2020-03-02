import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import BootstrapVue from "bootstrap-vue";
import './style.scss'


import {MdBadge, MdBottomBar, MdButton, MdIcon} from "vue-material/dist/components"
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

import Storage from "vue-ls";


Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(MdIcon);
Vue.use(MdButton);
Vue.use(MdBottomBar);
Vue.use(MdBadge);

// Vue.config.errorHandler = function (err, vm, info) {
//     alert(`Error: ${err.toString()}\nInfo: ${info}`);
// };

const options = {
    namespace: 'vuejs__', // key prefix
    name: 'ls', // name variable Vue.[ls] or this.[$ls],
    storage: 'local', // storage name session, local, memory
};
Vue.use(Storage, options);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
