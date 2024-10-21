import { componentSizeMap } from 'element-plus';
import {createRouter, createWebHistory, routerKey} from 'vue-router'

const routes = [
    {
        path:'/',
        name:'home',
        component: () => import('@/components/Home.vue'),
    },
    {
        path:'/login',
        name:"login",
        component:() => import('@/components/Login.vue'),
    },
    {
        path:'/register',
        name:'register',
        component:() => import('@/components/Register.vue')
    },
    {
        path:'/dashboard',
        name:'dashboard',
        component:() => import('@/components/DashBoard.vue')

    }
]

const router = createRouter({
    history:createWebHistory(),
    routes,
})

export default router;