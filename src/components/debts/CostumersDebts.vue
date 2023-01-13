<template>
    <div>
        <span class="flex place-content-between">
            <h2 class="text-2xl font-medium text-left ml-4">{{ costumer.name }}</h2>
        </span>
        <div class="text-left ml-8 border-l-2 pl-1 border-gray-400 flex place-content-between"
            v-for="debt in costumer.debts" :key="debt.dateTime.toString()">
            <div>
                <p>{{ capitalize(debt.description) }}: {{ formatMoney(debt.price) }}</p>
                <p>{{ getDateString(debt.id) }}</p>
            </div>
            <div>
                <EditDebtModal :debt="debt" :costumerName="costumer.name"/>
                <DeleteDebtModal :debt="debt" :costumerName="costumer.name" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineProps, computed } from "vue"
import DeleteDebtModal from "./DeleteDebtModal.vue";
import EditDebtModal from "./EditDebtModal.vue";
import formatMoney from "@/util/formatMoney";
import getDateString from "@/util/getDateString";
import capitalize from "@/util/capitalize";
import ICostumer from "@/interfaces/ICostumer";

const costumer = computed(() => props.costumerData as ICostumer)

const props = defineProps({
    costumerData: {
        type: Object,
        required: true
    }
})
</script>