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
            beforeEnter: () => {
                store.dispatch("setToken", null);
                store.commit("setListen", {angefangen: [], fertig: []});
                router.replace("/");
                alert("Erfolgreich abgemeldet")
            }
        },
        {
            path: "/settings",
            name: "einstellungen",
            component: () => import("./views/Menuepages/Settings.vue")
        },
        {
            path: "/impressum",
            name: "impressum",
            component: () => import("./views/Menuepages/Impressum.vue")
        },
        {
            path: '/liste/:offen',
            name:
                'listen',
            component:
                () => import('./views/Listen.vue'),
            beforeEnter:
                (to, from, next) => {
                    store.commit("setListen", {fertig: [], angefangen: []});
                    store.dispatch("getListen");
                    next()
                }
        }
        ,
        {
            path: '/:fragebogen/:frage',
            name:
                'fragebogen',
            component:
                () => import('./views/Fragebogen.vue')
        }
    ]
})
