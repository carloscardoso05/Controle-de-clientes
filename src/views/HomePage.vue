<template>
  <div class="space-y-4 mt-4">
    <ToolBar @eventSearchName="(name) => searchName = name"/>

    <AllDebts :searchName="searchName" />
  </div>

</template>

<script lang="ts" setup>
import { onMounted, computed, ref, watch } from "vue";
import getUserData from "@/getUserData"
import { useAppStore } from "../store/index";
import IUser from "@/interfaces/IUser";
import ICostumer from "@/interfaces/ICostumer";

import AllDebts from "@/components/AllDebts.vue";
import ToolBar from "@/components/ToolBar.vue";

const searchName = ref("")

const store = useAppStore()
const userId = computed(() => store.userId)
const costumersData = computed(() => store.costumersData as ICostumer)

onMounted(() => {
  getUserData(userId.value).then((data) => {
    store.userData = data as IUser
  })
})

watch([costumersData], () => store.costumersNames = Object.keys(costumersData.value))
</script>

<style>

</style>
