import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import BootstrapVue from "bootstrap-vue";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


import {MdBottomBar, MdButton, MdIcon} from "vue-material/dist/components"
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'


Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(MdIcon);
Vue.use(MdButton);
Vue.use(MdBottomBar);
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
