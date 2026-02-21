import { createRouter, createWebHashHistory } from 'vue-router'
import goodsComponent from '../components/goodsComponent.vue'
import stocksComponent from '../components/stocksComponent.vue'
import goodincomesComponent from '../components/goodincomesComponent.vue'
import goodmovesComponent from '../components/goodmovesComponent.vue'
import goodrestsComponent from '../components/goodrestsComponent.vue'
import AboutView from '../views/AboutView.vue'
import LoginComponent from '../components/LoginComponent.vue'
import UsersComponent from '../components/UsersComponent.vue'
import Dashboard from '../components/Dashboard.vue'

const routes = [
    {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true } // Если у вас настроена защита авторизацией
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginComponent
  },
  {
    path: '/goods',
    name: 'Goods',
    component: goodsComponent
  },
  {
    path: '/stocks',
    name: 'Stocks',
    component: stocksComponent
  },
  {
    path: '/goodincomes',
    name: 'Goodincomes',
    component: goodincomesComponent
  },
  {
    path: '/goodmoves',
    name: 'Goodmoves',
    component: goodmovesComponent
  },
  {
    path: '/goodrests',
    name: 'Goodrests',
    component: goodrestsComponent
  },
  {
    path: '/users',
    name: 'Users',
    component: UsersComponent
  },
  {
    path: '/',
    name: 'About',
    component: AboutView
  }     
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

/**
 * Глобальный Navigation Guard (Охранник маршрутов)
 * Реализует разграничение прав доступа (RBAC на минималках)
 */
router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/']; 
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('token');
  const username = localStorage.getItem('username'); // Проверяем, кто зашел

  // 1. Проверка авторизации
  if (authRequired && !loggedIn) {
    return next('/login');
  }

  // 2. Проверка прав администратора для раздела "Сотрудники"
  // Если путь /users, а в системе НЕ admin — доступ запрещен
  if (to.path === '/users' && username !== 'admin') {
    console.warn("Попытка несанкционированного доступа к разделу пользователей!");
    return next('/goods'); // Перенаправляем обычного юзера на список товаров
  }

  next(); // В остальных случаях — разрешаем переход
});

export default router
