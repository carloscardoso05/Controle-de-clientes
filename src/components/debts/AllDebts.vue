<template>
    <div class="w-full max-w-md mx-auto px-3">
        <AlertText :text="'Nem um débito adicionado ainda.'"/>
    </div>

    <div v-for="name in filterCostumersNames" :key="name">
        <CostumersDebts class="border-2 border-amber-500 rounded max-w-3xl mx-auto space-y-4"
            :costumerData="costumersData[name]"
            v-if="costumersData[name]['totalDebt' as keyof ICostumer] != 0" />
    </div>
</template>

<script lang="ts" setup>
import { useAppStore, useDebtsStore } from "@/store/index"
import { computed, ref, watch } from "vue"
import ICostumer from "@/interfaces/ICostumer";
import IUser from "@/interfaces/IUser";
import CostumersDebts from "./CostumersDebts.vue"
import AlertText from "../AlertText.vue";

const appStore = useAppStore()
const debtsStore = useDebtsStore()
const searchName = computed(() => debtsStore.searchName)
const costumersData = computed(() => appStore.costumersData as IUser["costumers"])
const allCostumersNames = computed(() => appStore.allCostumersNames as ICostumer["name"][])
const filterCostumersNames = ref(allCostumersNames.value as ICostumer["name"][])

function filterName(searchName: string, name: string) {
    return searchName.length > 0 ? name.toLowerCase().includes(searchName.toLowerCase()) : true
}

watch([costumersData, searchName], () => {
    filterCostumersNames.value = allCostumersNames.value.filter(costumerName => filterName(searchName.value, costumerName))
    filterCostumersNames.value.sort()
})
</script>