import { defineStore } from 'pinia';
import { ref } from 'vue';
import { api } from 'src/api';
import { LoginInfo, LoginResponse } from 'stores/auth/type';
import {
  getAccessToken,
  removeAccessToken,
  removeRefreshToken,
  setAccessToken,
  setRefreshToken,
} from 'src/helpers/storage-helper';
import { Notify } from 'quasar';
import { useRouter } from 'vue-router';
import { ROUTE_PATH } from 'src/router/paths';

export const useAuthStore = defineStore('auth', () => {
  const user = ref({ id: '' });
  const router = useRouter();

  const login = async (formValues: LoginInfo) => {
    try {
      const response = await api.post<LoginResponse>('/auth/login', formValues);
      setAccessToken(response.data.accessToken);
      setRefreshToken(response.data.refreshToken);
    } catch (error) {
      Notify.create({
        message: '로그인에 실패했습니다.',
        color: 'negative',
      });
    }
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout', getAccessToken());
      removeRefreshToken();
      removeAccessToken();
    } catch (error) {
      Notify.create({
        message: '로그아웃에 실패했습니다.',
        color: 'negative',
      });
    }
  };

  const reissueToken = async () => {
    try {
      const response = await api.post('/token/reissue', getAccessToken());
      setAccessToken(response.data.accessToken);

      setTimeout(() => {
        if (!getAccessToken()) return;
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
});
