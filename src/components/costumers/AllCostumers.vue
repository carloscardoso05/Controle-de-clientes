<template>
    <div v-for="name in filterCostumersNames" :key="name">
        <CostumerData :costumerName="name" :extraInfo="true" class="border-2 border-amber-500 rounded max-w-3xl mx-auto space-y-4"/>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { useAppStore, useCostumersStore } from '@/store';
import IUser from '@/interfaces/IUser';
import ICostumer from '@/interfaces/ICostumer';
import CostumerData from '@/components/costumers/CostumerData.vue';

const appStore = useAppStore()
const costumersStore = useCostumersStore()
const searchName = computed(() => costumersStore.searchName)
const allCostumersNames = computed(() => appStore.allCostumersNames as ICostumer["name"][])
const costumersData = computed(() => appStore.costumersData as IUser["costumers"])
const filterCostumersNames = ref([] as ICostumer["name"][])

function filterName(searchName: string, nameRef: string) {
    return searchName.length > 0 ? nameRef.toLowerCase().includes(searchName.toLowerCase()) : nameRef
}

watch([costumersData, searchName], () => {
    filterCostumersNames.value = allCostumersNames.value.filter(costumerName => filterName(searchName.value, costumerName))
    filterCostumersNames.value.sort()
})
</script>