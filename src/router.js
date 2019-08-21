import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Fragebogen from "./views/Fragebogen"

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/liste/:offen',
            name: 'listen',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './views/Listen.vue')
        },
        {
            path: '/:fragebogen/:frage',
            name: 'fragebogen',
            component: Fragebogen
        }
    ]
})
