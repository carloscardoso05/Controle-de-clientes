<template>
    <div class="border-2 border-amber-500 rounded max-w-3xl mx-auto space-y-4" v-for="costumer in costumersNames"
        :key="costumer">
        <h2 class="text-2xl font-medium text-left ml-4">{{ costumer }}</h2>
        <div class="text-left ml-8 border-l-2 pl-1 border-gray-400" v-for="debt in getCostumerData(costumer)"
            :key="debt.dateTime">
            <p>{{ capitalize(debt.description) }}: {{ formatMoney(debt.price) }}</p>
            <p>{{ debt.dateTime }}</p>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useAppStore } from "@/store/index"
import { computed, ref, watch, defineProps } from "vue"
import ICostumer from "@/interfaces/ICostumer";
import IDebt from "@/interfaces/IDebt";

const props = defineProps({
    searchName: {
        type: String,
        default: ''
    }
})

const store = useAppStore()
const costumersData = computed(() => store.costumersData as ICostumer)
const costumersNames = ref()
const getSearchName = computed(() => props.searchName)


function getCostumerData(costumerName: string): IDebt[] {
    return costumersData.value[costumerName as keyof ICostumer]
}

function formatMoney(number: number, currency = 'R$') {
    let formated = number.toString().replace(".", ",");
    if (formated.includes(',')) {
        if (formated.lastIndexOf(',') == formated.length - 2) {
            formated += '0'
        } else {
            formated = formated.slice(0, formated.lastIndexOf(',') + 3)
        }
    } else {
        formated += ',00'
    }

    formated = `${currency} ${formated}`;
    return formated;
}

function capitalize(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

function filterName(nameReference: string, nameToMatch: string) {
    return nameReference.length > 0 ? nameToMatch.toLowerCase().includes(nameReference.toLowerCase()) : nameToMatch
}

watch([costumersData, getSearchName], () => {
    costumersNames.value = Object.keys(costumersData.value).filter(costumerName => filterName(getSearchName.value, costumerName))
})
</script>