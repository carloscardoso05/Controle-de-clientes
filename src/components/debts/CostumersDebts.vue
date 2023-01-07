<template>
    <div>
        <span class="flex place-content-between">
            <h2 class="text-2xl font-medium text-left ml-4">{{ data.name }}</h2>
        </span>
        <div class="text-left ml-8 border-l-2 pl-1 border-gray-400 flex place-content-between"
            v-for="debt in data.debts" :key="debt.id">
            <div>
                <p>{{ capitalize(debt.description) }}: {{ formatMoney(debt.price) }}</p>
                <p>{{ getDateString(debt.id) }}</p>
            </div>
            <DeleteDebtModal :debt="debt" :costumerName="data.name" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineProps, computed } from "vue"
import DeleteDebtModal from "./DeleteDebtModal.vue";
import formatMoney from "@/util/formatMoney";
import getDateString from "@/util/getDateString";
import capitalize from "@/util/capitalize";
import ICostumer from "@/interfaces/ICostumer";

const data = computed(() => props.costumerData as ICostumer)

const props = defineProps({
    costumerData: {
        type: Object,
        required: true
    }
})
</script>