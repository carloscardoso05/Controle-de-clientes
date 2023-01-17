<template>
  <nav class="flex justify-between items-baseline w-11/12 mx-auto mt-4">
    <span class="space-x-2">
      <router-link class="rounded-lg px-3 py-2 text-slate-700 font-bold hover:bg-blue-100 hover:text-slate-900"
        v-for="link in routerLinks" :key="link.path" :to="link.path">
        {{ link.label }}
      </router-link>
    </span>

    <button
      class="sm:hidden px-2 rounded bg-red-500 hover:bg-red-600 text-neutral-100 transition-colors p-1.5 text-sm font-medium"
      @click="handleSignOut" v-if="isLoggedIn">
      Sair
    </button>

    <button
      class="hidden sm:inline-block rounded bg-red-500 hover:bg-red-600 text-neutral-100 transition-colors p-1.5 text-sm font-medium"
      @click="handleSignOut" v-if="isLoggedIn">
      Sair da conta
    </button>
  </nav>

  <router-view/>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import router from "./router";
import { useAppStore } from "./store";
import { onSnapshot, doc } from "@firebase/firestore";
import { db } from "./main";
import IUser from "./interfaces/IUser";

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
const userId = computed(() => appStore.userId)

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
    appStore.userId = ''
  });
}

onMounted(() => {
  onAuthStateChanged(auth.value, (user) => {
    if(user){
      isLoggedIn.value = true
      appStore.userId = user.uid     

      onSnapshot(doc(db, "users", userId.value), (doc) => {
        appStore.userData = doc.data() as IUser
        appStore.loading = false
      })
    } else {
      isLoggedIn.value = false
      appStore.userId = ''      
    }
  });
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700;800&family=Rubik:wght@300;400;500;600;700&display=swap');

:root {
  --rubik: 'Rubik', sans-serif;
  --nunito: 'Nunito', sans-serif;
  background-color: #f1f5f9;
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
