<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from 'stores/auth/auth-store';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { ROUTE_PATH } from 'src/router/paths';

const userId = ref('');
const userPassword = ref('');

const router = useRouter();

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const onSubmit = async () => {
  user.value = { id: userId.value };
  await authStore.login({
    userId: userId.value,
    userPassword: userPassword.value,
  });
  if (true) router.push(ROUTE_PATH.MAIN);
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
