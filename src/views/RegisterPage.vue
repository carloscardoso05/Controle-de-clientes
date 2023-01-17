<template>
  <h1 class="text-4xl my-4 font-bold pageName">Registre sua conta</h1>
  <form class="space-y-4">
    <div class="w-full max-w-md mx-auto px-3">
      <AlertText v-if="errMsg">
        <p>{{ errMsg }}</p>
      </AlertText>
    </div>

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
import { createUser } from "@/firebase";
import { useRouter } from "vue-router";
import { useAppStore } from "@/store";
import IUser from "@/interfaces/IUser";
import AlertText from "@/components/AlertText.vue";

const appStore = useAppStore()
const email = ref("");
const password = ref();
const router = ref(useRouter());
const errMsg = ref("")

function register() {
  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then(async (result) => {
      console.log("Registro realizado com sucesso");

      const userName = appStore.userName
      const newUser: IUser = {
        costumers: {} as IUser["costumers"],
        userName: userName,
        userId: result.user.uid
      }
      await createUser(newUser)

      appStore.userId = result.user.uid
      router.value.push("/");
    })
    .catch((error) => {
      console.log(error.code);
      // alert(error.message)
      switch (error.code) {
        case "auth/weak-password":
          errMsg.value = "Sua senha é muito fraca. Ela deve conter pelo menos 6 caracteres.";
          break;
        case "auth/email-already-in-use":
          errMsg.value = "Esse email já está em uso";
          break;
        case "auth/internal-error":
          errMsg.value = "Senha ausente";
          break;
        case "auth/missing-email":
          errMsg.value = "Email ausente";
          break;
        case "auth/invalid-email":
          errMsg.value = "Email inválido";
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
    .then(async (result) => {
      console.log("Registro realizado com sucesso");
      console.log(result.user);

      const userName = appStore.userName

      await createUser({
        costumers: {} as IUser["costumers"],
        userName: userName,
        userId: result.user.uid
      } as IUser)

      appStore.userId = result.user.uid
      router.value.push("/");
    })
    .catch((error) => {
      console.log(error.message);
    });
}
</script>