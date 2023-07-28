<script setup lang="ts">
import { useAuthStore } from 'stores/auth/auth-store';
import { onMounted } from 'vue';

const authStore = useAuthStore();

const logoutHandler = () => {
  authStore.logout();
};

onMounted(() => {
  setTimeout(() => {
    authStore.reissueToken();
  }, 40000);
});
</script>

<template>
  <main class="flex justify-center" style="margin-top: 200px">
    <section style="width: 300px; word-break: break-all">
      <h5 class="text-center">토큰 목록</h5>
      <div>
        <strong>access token</strong>
        <div>{{ authStore.user.accessToken }}</div>
      </div>
      <div>
        <strong>refresh token</strong>
        <div>{{ authStore.user.refreshToken }}</div>
      </div>
      <q-btn
        @click="logoutHandler"
        color="deep-purple-12"
        class="q-mt-lg full-width"
        >로그아웃</q-btn
      >
    </section>
  </main>
</template>
