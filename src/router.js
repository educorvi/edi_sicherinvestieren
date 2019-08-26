import Vue from 'vue'
import Router from 'vue-router'
import store from "@/store";
import router from "@/router";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('./views/Home.vue')
        },
        {
            path: "/abschluss",
            name: "abschluss",
            component: () => import('./views/Abschluss.vue')
        },
        {
            path: "/login",
            name: "login",
            component: () => import('./views/Login.vue')
        },
        {
            path: "/logout",
            name: "logout",
            beforeEnter: (to, from, next) => {
                store.dispatch("setToken", null);
                router.replace(from.path);
                alert("Erfolgreich abgemeldet")
            }
        },
        {
            path: '/liste/:offen',
            name: 'listen',
            component: () => import('./views/Listen.vue')
        },
        {
            path: '/:fragebogen/:frage',
            name: 'fragebogen',
            component: () => import('./views/Fragebogen.vue')
        }
    ]
})
