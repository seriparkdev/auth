import { RouteRecordRaw } from 'vue-router';
import { ROUTE_PATH } from 'src/router/paths';
import { checkAuthenticated } from 'src/helpers/navigation-guard';

const routes: RouteRecordRaw[] = [
  {
    path: ROUTE_PATH.MAIN,
    component: () => import('pages/MainPage.vue'),
    beforeEnter: async (to, from, next) => {
      checkAuthenticated(next);
    },
  },
  {
    path: ROUTE_PATH.LOGIN,
    component: () => import('pages/LoginPage.vue'),
  },
];

export default routes;
