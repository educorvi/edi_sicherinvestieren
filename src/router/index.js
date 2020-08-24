import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Uebersicht.vue'
import Impressum from "../views/Impressum";
import Datenschutz from "../views/Datenschutz";
import config from "../config.json";

Vue.use(VueRouter)


// eslint-disable-next-line no-unused-vars
const allowed = (s) => !config.disabledFeatures.includes(s)


const routes = [
    {
        path: '/',
        name: 'Fragebögen',
        component: Home
    },
    {
        path: '/about',
        name: 'Über',
        bezeichnung: "info",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/fragebogen',
        name: 'Fragebogen',
        component: () => import('../views/Fragebogen')
    },
    {
        path: '/impressum',
        name: 'Impressum',
        bezeichnung: "impressum",
        component: Impressum
    },
    {
        path: '/auswertung',
        name: "Auswertung",
        component: () => import('../views/Auswertung')
    },
    {
        path: '/listen/:fertig',
        name: "Listen",
        component: () => import('../views/Listen')
    },
    {
        path: '/login',
        name: 'Login',
        bezeichnung: "login",
        component: () => import('../views/Login')
    },
    {
        path: "/register",
        name: "Registrieren",
        bezeichnung: "register",
        component: () => import('../views/Registrieren')
    },
    {
        path: "/kontakt",
        name: "Kontakt",
        bezeichnung: "contact",
        component: () => import('../views/Kontakt')
    },
    {
        path: "/settings",
        name: "Einstellungen",
        component: () => import('../views/Einstellungen')
    },
    {
        path: "/datenschutz",
        name: "Datenschutzerklärung",
        bezeichnung: "datenschutz",
        component: Datenschutz
    },
    {
        path: "/feedback",
        name: "Feedback",
        bezeichnung: "feedback",
        component: () => import("../views/Feedback")

    },
    {
        path: '*',
        name: 'Fehler 404',
        component: () => import('../views/notFound')
    }
]

const router = new VueRouter({
    routes
})

// eslint-disable-next-line no-unused-vars
router.beforeEach((to, from, next) => {
    const t = routes[routes.findIndex(a => a.path === to.path)] || {bezeichnung: undefined};
    next(allowed(t.bezeichnung));
})

export default router
