<template>
    <div class="rounded-md max-w-3xl mx-auto space-y-6 border shadow-inner py-4">
        <div class="xs:mx-8 mx-2 border-b border-neutral-400 flex justify-between">
            <h1 class="my-auto text-xl xs:text-2xl font-medium text-left break-words">{{ costumer.name }}</h1>
            <div class="shrink-0 mb-2 my-auto min-w-fit">
                <!-- EditCostumerModal -->
                <EditCostumerModal :costumer="costumer" class="mr-3 hidden xs:inline-block" />
                <DeleteCostumerModal :costumer="costumer" />
            </div>
        </div>

        <div class="text-left xs:mx-10 mx-4 border-l-2 border-purple-500 pl-4">
            <h2 class="tabular-nums text-lg xs:text-xl underline decoration-1 decoration-solid decoration-purple-500">
                Total devido: {{ formatMoney(costumer.totalDebt) }}</h2>
            <p v-if="costumer.address">Endereço: {{ costumer.address }}</p>
            <p v-if="costumer.email">Email: {{ costumer.email }}</p>
            <div v-if="costumer.phoneNumber1 || costumer.phoneNumber2">
                <p>Números de telefone:</p>
                <ul class="tabular-nums list-disc list-inside ml-2">
                    <li v-if="costumer.phoneNumber1">{{ costumer.phoneNumber1.replaceAll(' ', '-') }}</li>
                    <li v-if="costumer.phoneNumber2">{{ costumer.phoneNumber2.replaceAll(' ', '-') }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineProps, PropType } from "vue"
import ICostumer from "@/interfaces/ICostumer";
import formatMoney from "@/util/formatMoney";
import DeleteCostumerModal from "./DeleteCostumerModal.vue";
import EditCostumerModal from "./EditCostumerModal.vue";

const props = defineProps({
    costumer: {
        type: Object as PropType<ICostumer>,
        required: true
    }
})
</script>