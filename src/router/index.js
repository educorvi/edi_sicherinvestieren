import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Uebersicht.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Übersicht',
        component: Home
    },
    {
        path: '/about',
        name: 'Über',
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
        component: () => import('../views/Impressum')
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
        component: () => import('../views/Login')
    },
    {
        path: "/register",
        name: "Registrieren",
        component: () => import('../views/Registrieren')
    },
    {
        path: "/kontakt",
        name: "Kontakt",
        component: () => import('../views/Kontakt')
    },
    {
        path: "/settings",
        name: "Einstellungen",
        component: () => import('../views/Einstellungen')
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

export default router
