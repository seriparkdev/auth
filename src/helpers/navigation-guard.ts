import { NavigationGuardNext } from 'vue-router';
import { getAccessToken } from 'src/helpers/storage-helper';
import { ROUTE_PATH } from 'src/router/paths';

export const checkAuthenticated = (next: NavigationGuardNext) => {
  const hasAccessToken = !!getAccessToken();
  !hasAccessToken ? next(ROUTE_PATH.LOGIN) : next();
};
