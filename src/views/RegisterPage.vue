<template>
  <h1 class="text-4xl my-4 font-bold pageName">Registre sua conta</h1>
  <form class="space-y-4">
    <fieldset class="">
      <input
        class="outline-none border-2 border-purple-300 focus:border-purple-600 bg-gray-100 rounded px-2 py-2 w-3/5 max-w-xs min-w-max"
        type="text" placeholder="Seu nome" v-model="appStore.userName" />
    </fieldset>

    <fieldset class="">
      <input
        class="outline-none border-2 border-purple-300 focus:border-purple-600 bg-gray-100 rounded px-2 py-2 w-3/5 max-w-xs min-w-max"
        type="text" placeholder="Email" v-model="email" />
    </fieldset>

    <fieldset class="">
      <input
        class="outline-none border-2 border-purple-300 focus:border-purple-600 bg-gray-100 rounded px-2 py-2 w-3/5 max-w-xs min-w-max"
        type="password" placeholder="Senha" v-model="password" />
    </fieldset>

    <button class="bg-sky-600 rounded-2xl px-3 py-2 w-3/5 max-w-xs text-white font-medium"
      @click.prevent="register">Registrar</button>
    <br>
    <button
      class="bg-transparent rounded px-3 py-2 w-3/5 max-w-xs border-2 border-emerald-500 bg-emerald-200 bg-opacity-75 font-medium"
      @click.prevent="logInWithGoogle">Entrar com Google</button>
  </form>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/main";
import { useRouter } from "vue-router";
import { useAppStore } from "@/store";
import IUser from "@/interfaces/IUser";

const appStore = useAppStore()
const email = ref("");
const password = ref();
const router = ref(useRouter());

function register() {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(async (data) => {
      console.log("Registro realizado com sucesso");
      const userName = appStore.userName
      await setDoc(doc(db, "users", data.user.uid), {
        costumers: {} as IUser["costumers"],
        userName: userName
      } as IUser);
      router.value.push("/");
    })
    .catch((error) => {
      console.log(error.code);
      alert(error.message);
    });
}

function logInWithGoogle() {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
    .then(async (result) => {
      console.log("Registro realizado com sucesso");
      console.log(result.user);
      const userName = appStore.userName
      await setDoc(doc(db, "users", result.user.uid), {
        costumers: {} as IUser["costumers"],
        userName: userName
      } as IUser);
      router.value.push("/");
    })
    .catch((error) => {
      console.log(error.message);
    });
}

// return {
//   register,
//   logInWithGoogle,
//   email,
//   password,
// };
</script>