import { defineStore } from 'pinia';
import { ref } from 'vue';
import { api } from 'src/api';
import { LoginInfo, LoginResponse } from 'stores/auth/type';
import {
  getAccessToken,
  getRefreshToken,
  removeAccessToken,
  removeRefreshToken,
  setAccessToken,
  setRefreshToken,
} from 'src/helpers/storage-helper';
import { Notify } from 'quasar';
import { useRouter } from 'vue-router';
import { ROUTE_PATH } from 'src/router/paths';

export const useAuthStore = defineStore(
  'auth',
  () => {
    const user = ref({ accessToken: '', refreshToken: '' });
    const router = useRouter();

    const login = async (formValues: LoginInfo) => {
      try {
        const response = await api.post<LoginResponse>(
          '/auth/login',
          formValues
        );
        user.value.accessToken = response.data.accessToken;
        user.value.refreshToken = response.data.refreshToken;

        setAccessToken(response.data.accessToken);
        setRefreshToken(response.data.refreshToken);

        router.push(ROUTE_PATH.MAIN);
      } catch (error) {
        Notify.create({
          message: '로그인에 실패했습니다.',
          color: 'negative',
        });
      }
    };

    const logout = async () => {
      try {
        await api.post('/auth/logout', { accessToken: getAccessToken() });

        removeRefreshToken();
        removeAccessToken();

        router.push(ROUTE_PATH.LOGIN);
      } catch (error) {
        Notify.create({
          message: '로그아웃에 실패했습니다.',
          color: 'negative',
        });
      }
    };

    const reissueToken = async () => {
      try {
        if (!getAccessToken()) return;
        const response = await api.post('/token/reissue', {
          accessToken: getAccessToken(),
          refreshToken: getRefreshToken(),
        });

        console.log(response);

        setAccessToken(response.data.accessToken);
        user.value.accessToken = response.data.accessToken;

        Notify.create({
          message: '토큰이 재발급 되었습니다.',
          color: 'positive',
        });

        setTimeout(() => {
          reissueToken();
        }, 40000);
      } catch (error) {
        logout();
        router.push(ROUTE_PATH.LOGIN);
        Notify.create({
          message: '다시 로그인 해주세요.',
          color: 'negative',
        });
      }
    };

    return {
      user,
      login,
      logout,
      reissueToken,
    };
  },
  { persist: true }
);
