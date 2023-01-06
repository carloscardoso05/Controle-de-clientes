<template>
  <div class="space-y-4 mt-4">
    <div class="flex items-center mx-auto place-content-between max-w-3xl">
        <AddDebtModal/>

        <SearchBar :store="useHomeStore()" class=" xs:mx-0 mx-auto"/>
    </div>

    <AllDebts/>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, computed, watch } from "vue";
import { useAppStore } from "../store/index";
import getUserData from "@/util/getUserData"
import IUser from "@/interfaces/IUser";
import AllDebts from "@/components/debts/AllDebts.vue";
import AddDebtModal from "@/components/debts/AddDebtModal.vue";
import SearchBar from "@/components/SearchBar.vue";
import { useHomeStore } from "../store/index";

const appStore = useAppStore()
const userId = computed(() => appStore.userId)
const costumersData = computed(() => appStore.costumersData as IUser["costumers"])

onMounted(() => {
  getUserData(userId.value).then((data) => {
    appStore.userData = data as IUser
  })
})

watch([costumersData], () => appStore.allCostumersNames = Object.keys(costumersData.value))
</script>
