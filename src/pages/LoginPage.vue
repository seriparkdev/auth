<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from 'stores/auth/auth-store';

const userId = ref('');
const userPassword = ref('');

const authStore = useAuthStore();

const onSubmit = () => {
  authStore.login({
    userId: userId.value,
    userPassword: userPassword.value,
  });
};
</script>

<template>
  <section class="flex justify-center q-mt-lg">
    <q-form
      @submit.prevent="onSubmit"
      class="q-pa-md"
      style="width: 300px; margin-top: 200px"
    >
      <q-input
        v-model="userId"
        label="id"
        color="deep-purple-12"
        aria-required="true"
        outlined
      />
      <q-input
        v-model="userPassword"
        label="password"
        type="password"
        color="deep-purple-12"
        aria-required="true"
        outlined
      />
      <q-btn
        type="submit"
        @submit.prevent="onSubmit"
        color="deep-purple-12"
        class="full-width q-mt-lg q-pa-md"
        >로그인</q-btn
      >
    </q-form>
  </section>
</template>
