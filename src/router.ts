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
        path:'/user',
        name:'user',
        component:() => import('@/components/dashboard/UserDashBoard.vue')
    },
    {
        path:'/admin',
        name:'name',
        comopnent : () => import('@/components/dashboard/UserDashBoard.vue')
    }
]

const router = createRouter({
    history:createWebHistory(),
    routes,
})

export default router;