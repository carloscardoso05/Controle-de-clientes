<template>
  <nav class="flex justify-between w-11/12 mx-auto mt-4">
    <span class="space-x-2">
      <router-link class="rounded-lg px-3 py-2 text-slate-700 font-bold hover:bg-blue-100 hover:text-slate-900"
        to="/">Home</router-link>
      <router-link class="rounded-lg px-3 py-2 text-slate-700 font-bold hover:bg-blue-100 hover:text-slate-900"
        to="/login">Login</router-link>
      <router-link class="rounded-lg px-3 py-2 text-slate-700 font-bold hover:bg-blue-100 hover:text-slate-900"
        to="/register">Registrar</router-link>
    </span>

    <button
      class="sm:hidden px-2 rounded-lg border-2 border-red-500 p-1 text-slate-800 text-sm font-medium hover:bg-red-400 hover:text-slate-900"
      @click="handleSignOut" v-if="isLoggedIn">
      Sair
    </button>

    <button
      class="hidden sm:inline-block rounded-lg border-2 border-red-500 p-1 text-slate-800 text-sm font-medium hover:bg-red-400 hover:text-slate-900"
      @click="handleSignOut" v-if="isLoggedIn">
      Sair da conta
    </button>
  </nav>

  <router-view />
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import router from "./router";

const auth = ref(getAuth());
const isLoggedIn = ref(false);

function handleSignOut() {
  console.log("Usuário deslogado");

  signOut(auth.value).then(() => {
    router.push("/");
  });
}

onMounted(() => {
  onAuthStateChanged(auth.value, (user) => user ? isLoggedIn.value = true : isLoggedIn.value = false);
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700;800&family=Rubik:wght@300;400;500;600;700&display=swap');

:root {
  --rubik: 'Rubik', sans-serif;
  --nunito: 'Nunito', sans-serif;
}

#app {
  font-family: var(--rubik);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>

<style src="./assets/tailwind.css"/>
