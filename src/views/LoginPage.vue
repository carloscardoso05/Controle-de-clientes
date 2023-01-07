<template>
  <h1 class="text-4xl my-4 font-bold pageName">Acesse sua conta</h1>
  <form class="space-y-4">
    <p v-if="errMsg"
      class="text-lg font-medium bg-amber-500 bg-opacity-40 border-2 border-amber-500 mx-auto w-3/5 py-1">
      ⚠ {{ errMsg }}
    </p>

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
      @click.prevent="logIn">Entrar</button>
    <br>
    <button
      class="bg-transparent rounded px-3 py-2 w-3/5 max-w-xs border-2 border-emerald-500 bg-emerald-200 bg-opacity-75 font-medium"
      @click="logInWithGoogle">Entrar com Google</button>
  </form>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, } from "firebase/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const router = ref(useRouter());
const errMsg = ref("");

function logIn() {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((result) => {
      console.log("Login realizado com sucesso");
      console.log("Current User:", result.user.uid);
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
  const auth = getAuth();
  signInWithPopup(getAuth(), provider)
    .then((result) => {
      console.log("Login realizado com sucesso");
      console.log("Current User:", result.user.uid);
      router.value.push("/");
    })
    .catch((error) => {
      console.log(error.message);
    });
}

// return {
//   logIn,
//   logInWithGoogle,
//   errMsg,
//   password,
//   email,
// };

</script>
