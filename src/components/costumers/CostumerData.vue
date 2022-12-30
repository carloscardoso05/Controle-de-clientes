<template>
    <div v-if="props.extraInfo == false" >
        <h2 class="text-2xl font-medium text-left ml-4">{{ props.costumerName }}</h2>
        <div class="text-left ml-8 border-l-2 pl-1 border-gray-400" v-for="debt in costumerData.debts"
            :key="debt.id">
            <p>{{ capitalize(debt.description) }}: {{ formatMoney(debt.price) }}</p>
            <p>{{ getDateString(debt.id) }}</p>
        </div>
    </div>

    <div v-else >
        <h2 class="text-2xl font-medium text-left ml-4">{{ props.costumerName }}</h2>
        <div class="text-left ml-8 border-l-2 pl-1 border-gray-400">
            <h3>Total devido: {{ formatMoney(costumerData.totalDebt) }}</h3>
            <p>Número de telefone 1: {{ costumerData.phoneNumber1 }}</p>
            <p>Número de telefone 2: {{ costumerData.phoneNumber2 }}</p>
            <p>Endereço: {{ costumerData.adress }}</p>
            <p>Email: {{ costumerData.email }}</p>
            <p>Último pagamento: {{ costumerData.lastPayment }}</p>
        </div>
        <!-- <div class="text-left ml-8 border-l-2 pl-1 border-gray-400" v-for="debt in costumerData.debts"
            :key="debt.id">
            <p>{{ capitalize(debt.description) }}: {{ formatMoney(debt.price) }}</p>
            <p>{{ getDateString(debt.id) }}</p>
        </div> -->
    </div>
</template>

<script lang="ts" setup>
import { useAppStore } from "@/store/index"
import { computed, defineProps } from "vue"
import ICostumer from "@/interfaces/ICostumer";
import IUser from "@/interfaces/IUser";

const store = useAppStore()
const costumersData = computed(() => store.costumersData as IUser["costumers"])
const costumerData = computed(() => costumersData.value[props.costumerName as keyof IUser["costumers"]] as ICostumer)

const props = defineProps({
    costumerName: {
        type: String,
        default: ''
    },
    extraInfo: {
        type: Boolean,
        default: false
    }
})

function getDateString(milliseconds: number){
    return new Date(milliseconds).toLocaleDateString()
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
</script>