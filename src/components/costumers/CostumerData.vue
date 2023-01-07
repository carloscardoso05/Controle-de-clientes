<template>
    <div>
        <h2 class="text-2xl font-medium text-left ml-4">{{ data.name }}</h2>
        <div class="text-left ml-8 border-l-2 pl-1 border-gray-400">
            <h3>Total devido: {{ formatMoney(data.totalDebt) }}</h3>
            <div v-if="data.phoneNumber1 || data.phoneNumber2">
                <p>Números de telefone:</p>
                <ul>
                    <li v-if="data.phoneNumber1">{{ data.phoneNumber1 }}</li>
                    <li v-if="data.phoneNumber2">{{ data.phoneNumber2 }}</li>
                </ul>
            </div>
            <p v-if="data.address">Endereço: {{ data.address }}</p>
            <p v-if="data.email">Email: {{ data.email }}</p>
            <p v-if="data.lastPayment">Último pagamento: {{ data.lastPayment }}</p>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, defineProps } from "vue"
import ICostumer from "@/interfaces/ICostumer";
import formatMoney from "@/util/formatMoney";

const data = computed(() => props.costumerData as ICostumer)

const props = defineProps({
    costumerData: {
        type: Object,
        required: true
    }
})
</script>