import Vue from 'vue'
import Router from 'vue-router'

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
