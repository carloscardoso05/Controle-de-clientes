<template>
  <div class="space-y-4 mt-4">
    <DebtToolBar @eventSearchName="(name) => searchName = name" addBtnMsg='Adicionar' />

    <AllDebts :searchName="searchName" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, computed, ref, watch } from "vue";
import { useAppStore } from "../store/index";
import getUserData from "@/getUserData"
import IUser from "@/interfaces/IUser";
import AllDebts from "@/components/debts/AllDebts.vue";
import DebtToolBar from "@/components/debts/DebtToolBar.vue";

const searchName = ref("")

const store = useAppStore()
const userId = computed(() => store.userId)
const costumersData = computed(() => store.costumersData as IUser["costumers"])

onMounted(() => {
  getUserData(userId.value).then((data) => {
    store.userData = data as IUser
  })
})

watch([costumersData], () => store.allCostumersNames = Object.keys(costumersData.value))
</script>

<style>

</style>
