<template>
    <div>
        <h2 class="text-2xl font-medium text-left ml-4">{{ props.costumerName }}</h2>
        <div class="text-left ml-8 border-l-2 pl-1 border-gray-400">
            <h3 v-if="costumerData.totalDebt">Total devido: {{ formatMoney(costumerData.totalDebt) }}</h3>
            <div v-if="costumerData.phoneNumber1 || costumerData.phoneNumber2">
                <p>Números de telefone:</p>
                <ul>
                    <li v-if="costumerData.phoneNumber1">{{ costumerData.phoneNumber1 }}</li>
                    <li v-if="costumerData.phoneNumber2">{{ costumerData.phoneNumber2 }}</li>
                </ul>
            </div>
            <p v-if="costumerData.adress">Endereço: {{ costumerData.adress }}</p>
            <p v-if="costumerData.email">Email: {{ costumerData.email }}</p>
            <p v-if="costumerData.lastPayment">Último pagamento: {{ costumerData.lastPayment }}</p>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useAppStore } from "@/store/index"
import { computed, defineProps } from "vue"
import ICostumer from "@/interfaces/ICostumer";
import IUser from "@/interfaces/IUser";
import formatMoney from "@/util/formatMoney";

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
</script>