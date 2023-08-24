import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../views/HomeView.vue')
        },
        {
            path: '/favorites',
            name: 'favorites',
            component: () => import('../views/FavoritesView.vue')
        }
    ]
})

export default router
