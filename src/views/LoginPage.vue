<template>
  <h1 class="text-4xl my-4 font-bold pageName">Acesse sua conta</h1>
  <form class="space-y-4">
    <div class="w-full max-w-md mx-auto px-3">
      <AlertText v-if="errMsg">
        <p>{{ errMsg }}</p>
      </AlertText>
    </div>

    <fieldset class="">
      <input
        :class="inputStyle"
        type="text" placeholder="Email" v-model="email" />
    </fieldset>

    <fieldset class="">
      <input
        :class="inputStyle"
        type="password" placeholder="Senha" v-model="password" />
    </fieldset>

    <button class="bg-blue-600 rounded px-3 py-2 w-5/6 xs:w-3/5 max-w-xs text-white font-medium"
      @click.prevent="logIn">
      <font-awesome-icon icon="fa-solid fa-envelope" class="mr-2"/>
      Entrar com email e senha
    </button>
    <br>
    <button class="bg-emerald-500 rounded px-3 py-2 w-5/6 xs:w-3/5 max-w-xs text-white font-medium"
      @click.prevent="logInWithGoogle">
      <font-awesome-icon icon="fa-brands fa-google" class="mr-2"/>
      Entrar com Google
    </button>
  </form>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, } from "firebase/auth";
import { useRouter } from "vue-router";
import { useAppStore } from "@/store";
import AlertText from "@/components/AlertText.vue";

const appStore = useAppStore()
const email = ref("");
const password = ref("");
const router = ref(useRouter());
const errMsg = ref("");
const inputStyle = "outline-none border border-purple-500 focus:border-purple-600 bg-gray-100 rounded px-2 py-2 w-5/6 xs:w-3/5 max-w-xs"

function logIn() {
  signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((result) => {
      console.log("Login realizado com sucesso");
      console.log("Current User:", result.user.uid);
      appStore.userId = result.user.uid
      router.value.push("/");
    })
    .catch((error) => {
      console.log(error.code);
      switch (error.code) {
        case "auth/invalid-email":
          errMsg.value = "Email inválido";
          break;
        case "auth/user-not-found":
          errMsg.value = "Nenhuma conta com esse email foi encontrada";
          break;
        case "auth/wrong-password":
          errMsg.value = "Senha incorreta";
          break;
        default:
          errMsg.value = "Email ou senha incorretos";
          break;
      }
    });
}

function logInWithGoogle() {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
    .then((result) => {
      console.log("Login realizado com sucesso");
      console.log("Current User:", result.user.uid);
      appStore.userId = result.user.uid
      router.value.push("/");
    })
    .catch((error) => {
      console.log(error.message);
    });
}
</script>
