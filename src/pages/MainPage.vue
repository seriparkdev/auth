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
    <section>
      <div class="text-h6">
        access token:
        {{ authStore.user.accessToken }}
      </div>
      <div class="text-h6">
        refresh token:
        {{ authStore.user.refreshToken }}
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
