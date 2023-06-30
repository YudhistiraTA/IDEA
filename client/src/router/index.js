import { createRouter, createWebHistory } from 'vue-router'
import EntryView from '../views/EntryView.vue';
import HomeView from '../views/HomeView.vue';
import WishlistView from '../views/WishlistView.vue';
import ProductView from '../views/ProductView.vue';
import { useMainStore } from '../stores';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'LoginView',
      component: EntryView,
      props: { formType: 'Login' },
      beforeEnter: (to, from) => {
        const store = useMainStore();
        if (store.isSigned) return { name: 'HomeView' };
      }
    },
    {
      path: '/register',
      name: 'RegisterView',
      component: EntryView,
      props: { formType: 'Register' },
      beforeEnter: (to, from) => {
        const store = useMainStore();
        if (store.isSigned) return { name: 'HomeView' };
      }
    },
    {
      path: '/home',
      name: 'HomeView',
      component: HomeView,
    },
    {
      path: '/wishlist',
      name: 'WishlistView',
      component: WishlistView
    },
    {
      path: '/product/:id',
      name: 'ProductView',
      component: ProductView
    },
    { 
    path: '/:pathMatch(.*)*',
    redirect: '/home'
  },
  ]
});
router.beforeEach((to, from) => {
  const store = useMainStore();
  if (!store.isSigned &&
    to.name !== 'LoginView' &&
    to.name !== 'RegisterView') {
    return { name: 'LoginView' }
  }
})

export default router
