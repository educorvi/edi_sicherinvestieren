import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//Bootstrap-Vue
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue';
import './styles.scss';
//Vue Material/Bottombar
import {MdBadge, MdBottomBar, MdButton, MdIcon} from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
//Axios
import axios from "axios"
import {setDefaultInterceptor} from "@/js/axiosInterceptors";
//Liqour Tree für Übersicht
import LiquorTree from 'liquor-tree'
//VuejsDialog
import VuejsDialog from "vuejs-dialog";
import "vuejs-dialog/dist/vuejs-dialog.min.css"
//Vue-ls
import Storage from "vue-ls"

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);


Vue.use(MdBottomBar);
Vue.use(MdIcon);
Vue.use(MdBadge);
Vue.use(MdButton);


Vue.prototype.http = axios;
setDefaultInterceptor(Vue.prototype.http);


Vue.use(LiquorTree);


Vue.use(VuejsDialog);


const options = {
    namespace: 'sicherinvestieren__', // key prefix
    name: 'ls', // name variable Vue.[ls] or this.[$ls],
    storage: 'local', // storage name session, local, memory
};

Vue.use(Storage, options);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
