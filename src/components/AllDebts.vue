<template>
    <div class="border-2 border-amber-500 rounded" v-for="costumer in costumersNames" :key="costumer">
        <h2 class="text-2xl font-medium text-left ml-4">{{ costumer }}</h2>
        <div class="text-left ml-8 border-2 border-blue-400" v-for="debt in getCostumerData(costumer)"
            :key="debt.timestamp">
            <p>{{ capitalize(debt.description) }}: {{ formatMoney(debt.price) }}</p>
            <p>{{ debt.timestamp }}</p>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useDespesasStore } from "@/store/index"
import { computed, ref, watch } from "vue"
import ICostumer from "@/interfaces/ICostumer";
import IDebt from "@/interfaces/IDebt";

const store = useDespesasStore()
const costumersData = computed(() => store.costumersData as ICostumer)
const costumersNames = ref()

function getCostumerData(costumerName: string): IDebt[] {
    return costumersData.value[costumerName as keyof ICostumer]
}

function formatMoney(number: number, currency = 'R$') {
    let formated = number.toString().replace(".", ",");
    if (formated.includes(',')) {
        if (formated.lastIndexOf(',') == formated.length-2){
            formated += '0'
        } else {
            formated = formated.slice(0, formated.lastIndexOf(',')+3)
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

watch([costumersData], () => {
    costumersNames.value = Object.keys(costumersData.value)
})
</script>