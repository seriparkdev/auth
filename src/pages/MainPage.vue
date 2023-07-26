<script setup lang="ts">
import { getAccessToken, getRefreshToken } from '../helpers/storage-helper';
import { useAuthStore } from 'stores/auth/auth-store';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
import { ROUTE_PATH } from 'src/router/paths';

const authStore = useAuthStore();

const router = useRouter();

const logoutHandler = async () => {
  await authStore.logout();
  if (true) router.push(ROUTE_PATH.LOGIN);
};

onMounted(() => {
  setTimeout(() => {
    authStore.reissueToken();
  }, 40000);
});
</script>

<template>
  <container class="flex justify-center" style="margin-top: 200px">
    <section>
      <div class="text-h6">
        {{ authStore.user.id }}님의 access token: {{ getAccessToken() }}
      </div>
      <div class="text-h6">
        {{ authStore.user.id }}님의 refresh token: {{ getRefreshToken() }}
      </div>
      <q-btn
        @click="logoutHandler"
        color="deep-purple-12"
        class="q-mt-lg full-width"
        >로그아웃</q-btn
      >
    </section>
  </container>
</template>
