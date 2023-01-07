<template>
  <h1 class="text-4xl my-4 font-bold pageName">Débitos</h1>

  <div v-if="loading" class="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded text-white bg-blue-500 hover:bg-blue-400 transition ease-in-out duration-150">
    <!-- <font-awesome-icon class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" icon="fa-solid fa-circle-notch" /> -->
    <font-awesome-icon class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" icon="fa-solid fa-fan" />
    Carregando...
  </div>

  <div class="space-y-4 mt-4" v-else>
    <div class="flex items-center mx-auto place-content-between max-w-3xl">
      <AddDebtModal />

      <SearchBar :store="useDebtsStore()" class=" xs:mx-0 mx-auto" />
    </div>

    <AllDebts />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, computed, watch, ref } from "vue";
import { useAppStore } from "../store/index";
import getUserData from "@/util/getUserData"
import IUser from "@/interfaces/IUser";
import AllDebts from "@/components/debts/AllDebts.vue";
import AddDebtModal from "@/components/debts/AddDebtModal.vue";
import SearchBar from "@/components/SearchBar.vue";
import { useDebtsStore } from "../store/index";

const appStore = useAppStore()
const userId = computed(() => appStore.userId)
const costumersData = computed(() => appStore.costumersData as IUser["costumers"])
const loading = ref(true)

onMounted(() => {
  getUserData(userId.value)
    .then((data) => {
      appStore.userData = data as IUser
    })
    .then(() => loading.value = false)
    .catch(e => console.log(e))
})

watch([costumersData], () => appStore.allCostumersNames = Object.keys(costumersData.value))
</script>
