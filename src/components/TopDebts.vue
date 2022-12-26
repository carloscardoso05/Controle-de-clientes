<template>
    <div v-for="costumer in costumersNames" :key="costumer" >
        {{ costumer }}
    </div>
</template>

<script lang="ts" setup>
import {useDespesasStore} from "@/store/index"
import {computed, ref, onMounted, watch} from "vue"

const store = useDespesasStore()
const costumersData = computed(() => store.costumersData)
const costumersNames = ref()

watch([costumersData], () => {
    costumersNames.value = Object.keys(costumersData.value)
})
</script>