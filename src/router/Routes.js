import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: () => import("../pages/auth/Login")
        },
        {
            path: '/signup',
            name: 'Sign up',
            component: () => import("../pages/auth/Register")
        },
        {
            path: '/',
            name: 'Chat Home',
            component: () => import("../pages/chats/Index")
        },
        {
            path: '/chat/view/:id',
            name: 'Chat Home',
            component: () => import("../pages/chats/View")
        },
    ],
});
