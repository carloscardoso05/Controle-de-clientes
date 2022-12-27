<template>
<div v-bind="costumerName" class="mx-auto w-4/5 max-w-xl flex mt-8">
  <input placeholder="Nome do cliente" type="text" class="py-3 grow pl-3 outline-none border-2 border-r-0 border-purple-300 focus:border-purple-600 bg-gray-100 rounded rounded-r-none">
  <button class="px-2 border-2 rounded border-purple-300 active:bg-purple-200 rounded-l-none shrink-0 text-gray-700">
    <Icon icon="fa-solid fa-magnifying-glass" class=""/>
  </button>
</div>

<AllDebts/>

</template>

<script lang="ts" setup>
import { onMounted, computed, ref } from "vue";
import getUserData from "@/getUserData"
import { useDespesasStore } from "../store/index";
import IUser from "@/interfaces/IUser";

import AllDebts from "@/components/AllDebts.vue";

const costumerName = ref("")

const store = useDespesasStore()
const userId = computed(() => store.userId)
const userData = computed(() => store.userData)
const costumersData = computed(() => store.costumersData)

onMounted(() => {
  getUserData(userId.value).then((data) => {
    store.userData = data as IUser
  })
})
</script>

<style></style>
