<template>
  <div class="bg-white max-w-4xl pt-4 pb-12 my-4 mx-auto rounded-2xl shadow-lg">
    <h1 class="text-4xl my-4 font-bold pageName">Débitos</h1>

    <LoadingComponent v-if="loading" />

    <div class="space-y-6 w-full max-w-xl mx-auto px-3" v-else-if="allCostumersNames.length == 0">
      <AlertText :text="'Não há nem um cliente adicionado ainda. Por favor, adicione um primeiro.'" />
      <div class="flex justify-center flex-col space-y-2 xs:flex-row xs:space-x-4 xs:space-y-0">
        <button id="goToCostumer"
          class="border-sky-600 border-2 bg-sky-600 rounded px-3 py-2 w-full xs:max-w-2xs text-white font-medium">
          <router-link :to="'/costumers'">
            Ir para Clientes
            <font-awesome-icon icon="fa-solid fa-up-right-from-square" class="ml-1" />
          </router-link>
        </button>
      </div>
    </div>
    
    <div class="space-y-6 mt-4" v-else>
      <div class="flex items-center mx-auto xs:px-3 place-content-between max-w-3xl">
        <AddDebtModal />
        <SearchBar :store="useDebtsStore()" class=" xs:mx-0 mx-auto" />
      </div>
      
      <AllDebts />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useAppStore } from "../store/index";
import AllDebts from "@/components/debts/AllDebts.vue";
import AddDebtModal from "@/components/debts/AddDebtModal.vue";
import SearchBar from "@/components/SearchBar.vue";
import { useDebtsStore } from "../store/index";
import LoadingComponent from "@/components/LoadingComponent.vue";
import AlertText from "@/components/AlertText.vue";

const appStore = useAppStore()
const allCostumersNames = computed(() => appStore.allCostumersNames)
const loading = computed(() => appStore.loading)
</script>
