<template>
    <div v-for="name in filterCostumersNames" :key="name">
        <CostumerData :costumerName="name" :extraInfo="true" class="border-2 border-amber-500 rounded max-w-3xl mx-auto space-y-4"/>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch, onMounted, defineProps } from 'vue';
import { useAppStore } from '@/store';
import IUser from '@/interfaces/IUser';
import ICostumer from '@/interfaces/ICostumer';
import CostumerData from '@/components/costumers/CostumerData.vue';
import getUserData from "@/getUserData"

const store = useAppStore()
const userId = computed(() => store.userId)
const allCostumersNames = computed(() => store.allCostumersNames as ICostumer["name"][])
const costumersData = computed(() => store.costumersData as IUser["costumers"])
const filterCostumersNames = ref([] as ICostumer["name"][])
const getSearchName = computed(() => props.searchName)

const props = defineProps({
    searchName: {
        type: String,
        default: ''
    }
})

function filterName(searchName: string, nameRef: string) {
    return searchName.length > 0 ? nameRef.toLowerCase().includes(searchName.toLowerCase()) : nameRef
}

onMounted(() => {
    getUserData(userId.value).then((data) => {
        store.userData = data as IUser
    })
})

watch([costumersData], () => store.allCostumersNames = Object.keys(costumersData.value))

watch([costumersData, getSearchName], () => {
    filterCostumersNames.value = allCostumersNames.value.filter(costumerName => filterName(getSearchName.value, costumerName))
    filterCostumersNames.value.sort()
})
</script>