<template>
  <nav class="flex justify-between w-11/12 mx-auto mt-4">
    <span class="space-x-2">
      <router-link class="rounded-lg px-3 py-2 text-slate-700 font-bold hover:bg-blue-100 hover:text-slate-900"
        v-for="link in routerLinks" :key="link.path" :to="link.path">
        {{ link.label }}
      </router-link>
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
import { ref, onMounted, computed, watch } from "vue";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import router from "./router";
import { useAppStore } from "./store";

const links = ref([
  {
    path: '/',
    label: 'Débitos',
    showIfLogged: true
  },
  {
    path: '/costumers',
    label: 'Clientes',
    showIfLogged: true
  },
  {
    path: '/login',
    label: 'Login',
    showIfLogged: false
  },
  {
    path: '/register',
    label: 'Registrar',
    showIfLogged: false
  },
])

const appStore = useAppStore()

const routerLinks = computed(() => {
  if(isLoggedIn.value){
    return links.value.filter((link) => link.showIfLogged)
  } else {
    return links.value.filter((link) => !link.showIfLogged)
  }
})

const auth = ref(getAuth());
const isLoggedIn = ref(false);

function handleSignOut() {
  console.log("Usuário deslogado");

  signOut(auth.value).then(() => {
    router.push("/login");
    appStore.$reset()
    appStore.userId = ''
  });
}

onMounted(() => {
  onAuthStateChanged(auth.value, (user) => user ? isLoggedIn.value = true : isLoggedIn.value = false);
  appStore.userId = getAuth().currentUser?.uid as string
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700;800&family=Rubik:wght@300;400;500;600;700&display=swap');

:root {
  --rubik: 'Rubik', sans-serif;
  --nunito: 'Nunito', sans-serif;
}

.pageName {
  font-family: var(--nunito);
}

#app {
  font-family: var(--rubik);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>





<style src="./assets/tailwind.css"/>
