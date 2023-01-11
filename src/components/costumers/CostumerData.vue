<template>
    <div>
        <h2 class="text-2xl font-medium text-left ml-4">{{ costumer.name }}</h2>
        <div class="text-left ml-8 border-l-2 pl-1 border-gray-400 flex place-content-between">
            <div>
                <h3>Total devido: {{ formatMoney(costumer.totalDebt) }}</h3>
                <div v-if="costumer.phoneNumber1 || costumer.phoneNumber2">
                    <p>Números de telefone:</p>
                    <ul>
                        <li v-if="costumer.phoneNumber1">{{ costumer.phoneNumber1 }}</li>
                        <li v-if="costumer.phoneNumber2">{{ costumer.phoneNumber2 }}</li>
                    </ul>
                </div>
                <p v-if="costumer.address">Endereço: {{ costumer.address }}</p>
                <p v-if="costumer.email">Email: {{ costumer.email }}</p>
                <p v-if="costumer.lastPayment">Último pagamento: {{ costumer.lastPayment }}</p>
            </div>
            <DeleteCostumerModal :costumer="costumer"/>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineProps, PropType } from "vue"
import ICostumer from "@/interfaces/ICostumer";
import formatMoney from "@/util/formatMoney";
import DeleteCostumerModal from "./DeleteCostumerModal.vue";

const props = defineProps({
    costumer: {
        type: Object as PropType<ICostumer>,
        required: true
    }
})
</script>