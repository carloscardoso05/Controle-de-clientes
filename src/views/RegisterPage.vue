<template>
  <h1 class="text-4xl my-4 font-bold pageName">Registre sua conta</h1>
  <form class="space-y-4">
    <div class="w-full max-w-md mx-auto px-3">
      <AlertText v-if="errMsg">
        <p>{{ errMsg }}</p>
      </AlertText>
    </div>

    <fieldset class="">
      <input :class="inputStyle" type="text" placeholder="Seu nome" v-model="appStore.userName" required />
    </fieldset>

    <fieldset class="">
      <input :class="inputStyle" type="text" placeholder="Email" v-model="email" required />
    </fieldset>

    <fieldset class="">
      <input :class="inputStyle" type="password" placeholder="Senha" v-model="password" required />
    </fieldset>

    <button class="bg-blue-600 rounded px-3 py-2 w-5/6 xs:w-3/5 max-w-xs text-white font-medium"
      @click.prevent="register">
      <font-awesome-icon icon="fa-solid fa-envelope" class="mr-2" />
      Registrar com email e senha
    </button>
    <br>
    <button class="bg-emerald-500 rounded px-3 py-2 w-5/6 xs:w-3/5 max-w-xs text-white font-medium"
      @click.prevent="logInWithGoogle">
      <font-awesome-icon icon="fa-brands fa-google" class="mr-2" />
      Registrar com Google
    </button>
    <br>
    <button class="relative border border-rose-500 rounded px-3 py-2 w-5/6 xs:w-3/5 max-w-xs text-rose-500 font-medium after:content-[''] after:rounded-full after:w-3 after:h-3 after:bg-rose-500 after:absolute after:-top-1 after:-right-1 after:animate-pulse"
      @click.prevent="logInDemo()">
      <font-awesome-icon icon="fa-solid fa-id-card" class="mr-2"/>
      Demonstração
    </button>
  </form>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword
} from "firebase/auth";
import { createUser } from "@/firebase";
import { useRouter } from "vue-router";
import { useAppStore } from "@/store";
import IUser from "@/interfaces/IUser";
import AlertText from "@/components/AlertText.vue";

const appStore = useAppStore()
const usersList = computed(() => appStore.usersList)
const userName = computed(() => appStore.userName)
const email = ref("");
const password = ref();
const router = ref(useRouter());
const errMsg = ref("")
const inputStyle = "outline-none border border-purple-500 focus:border-purple-600 bg-gray-100 rounded px-2 py-2 w-5/6 xs:w-3/5 max-w-xs"

function register() {
  if (userName.value !== "") {
    createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then(async (result) => {
      console.log("Registro realizado com sucesso");

      const newUser: IUser = {
        costumers: {} as IUser["costumers"],
        userName: userName.value,
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
    })
  } else {
    errMsg.value = "Insira um nome de usuário"
  }
}

function logInWithGoogle() {
  if (userName.value !== "") {
    const provider = new GoogleAuthProvider();
    signInWithPopup(getAuth(), provider)
      .then(async (result) => {
        console.log("Registro realizado com sucesso");
        console.log(result.user);
  
        if(!usersList.value.includes(result.user.uid)){
          await createUser({
            costumers: {} as IUser["costumers"],
            userName: userName.value,
            userId: result.user.uid
          } as IUser)
        }
  
        appStore.userId = result.user.uid
        router.value.push("/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  } else {
    errMsg.value = "Insira um nome de usuário"
  }
}

function logInDemo(){
  signInWithEmailAndPassword(getAuth(), "conta_demonstracao@gmail.com", "demo_conta_05")
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
</script>