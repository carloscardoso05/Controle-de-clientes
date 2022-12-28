<template>
  <div class="space-y-4 mt-4">
    <div class="flex items-center mx-auto place-content-between max-w-3xl">
      <button id="addButton"
        class="hidden xs:inline-block shrink-0 border-2 space-x-2 px-3 py-1 text-xl rounded border-purple-300 active:bg-purple-200 text-gray-700 hover:bg-purple-200">
        <p class="inline-block text-lg font-medium">
          Adicionar
        </p>
        <font-awesome-icon icon="fa-solid fa-plus" class="inline-block" />
      </button>

      <button
        class="xs:hidden fixed bottom-3 right-3 rounded-full border-2 bg-white w-14 h-14">
        <font-awesome-icon icon="fa-solid fa-circle-plus" class="text-blue-600 h-full aspect-square"/>
      </button>

      <fieldset class="max-w-xl w-11/12 xs:pl-8 xs:w-4/5 flex justify-between xs:mx-0 mx-auto">
        <input v-model="searchName" placeholder="Nome do cliente" type="text"
          class="py-2 grow pl-3 outline-none border-2 border-r-0 border-purple-300 focus:border-purple-600 bg-gray-100 rounded rounded-r-none text-lg">
        <button
          class="px-2 border-2 rounded border-purple-300 active:bg-purple-200 rounded-l-none shrink-0 text-gray-700">
          <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
        </button>
      </fieldset>
    </div>

    <AllDebts :searchName="searchName" />
  </div>

</template>

<script lang="ts" setup>
import { onMounted, computed, ref } from "vue";
import getUserData from "@/getUserData"
import { useDespesasStore } from "../store/index";
import IUser from "@/interfaces/IUser";

import AllDebts from "@/components/AllDebts.vue";

const searchName = ref("")

const store = useDespesasStore()
const userId = computed(() => store.userId)

onMounted(() => {
  getUserData(userId.value).then((data) => {
    store.userData = data as IUser
  })
})
</script>

<style>

</style>
