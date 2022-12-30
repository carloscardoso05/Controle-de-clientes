<template>
    <div v-for="name in filterCostumersNames" :key="name">
        <CostumerData class="border-2 border-amber-500 rounded max-w-3xl mx-auto space-y-4" :costumerName="name"
        v-if="costumersData[name]['totalDebt' as keyof ICostumer] != 0" />
    </div>
</template>

<script lang="ts" setup>
import { useAppStore } from "@/store/index"
import { computed, ref, watch, defineProps } from "vue"
import ICostumer from "@/interfaces/ICostumer";
import IUser from "@/interfaces/IUser";
import CostumerData from "../costumers/CostumerData.vue";

const props = defineProps({
    searchName: {
        type: String,
        default: ''
    }
})

const store = useAppStore()
const costumersData = computed(() => store.costumersData as IUser["costumers"])
const allCostumersNames = computed(() => store.allCostumersNames as ICostumer["name"][])
const filterCostumersNames = ref([] as ICostumer["name"][])
const getSearchName = computed(() => props.searchName)

function filterName(searchName: string, name: string) {
    return searchName.length > 0 ? name.toLowerCase().includes(searchName.toLowerCase()) : name
}

watch([costumersData, getSearchName], () => {
    filterCostumersNames.value = allCostumersNames.value.filter(costumerName => filterName(getSearchName.value, costumerName))
    filterCostumersNames.value.sort()
})
</script>