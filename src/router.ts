import {createRouter, createWebHistory, routerKey} from 'vue-router'

const routes = [
    {
        path:'/',
        name:'Home',
        component: () => import('@/components/Home.vue'),
    },
    {
        path:'/login',
        name:"Login",
        component:() => import('@/components/Login.vue'),
    },
    {
        path:'/register',
        name:"Register",
        component:() => import('@/components/Register.vue')
    }
]

const router = createRouter({
    history:createWebHistory(),
    routes,
})

export default router;