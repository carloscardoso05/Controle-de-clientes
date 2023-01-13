<template>
    <div>
        <span class="flex place-content-between">
            <h2 class="text-2xl font-medium text-left ml-4">{{ costumerData.name }}</h2>
        </span>
        <div class="text-left ml-8 border-l-2 pl-1 border-gray-400 flex place-content-between"
            v-for="debt in costumerDebts" :key="debt.id">
            <div>
                <p>{{ capitalize(debt.description) }}: {{ formatMoney(debt.price) }}</p>
                <p>{{ getDateString((debt.dateTime.toJSON() as any)["seconds"] * 1000) }}</p>
            </div>
            <div>
                <EditDebtModal :debt="debt" :costumerName="costumerData.name"/>
                <DeleteDebtModal :debt="debt" :costumerName="costumerData.name" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineProps, computed, PropType } from "vue"
import DeleteDebtModal from "./DeleteDebtModal.vue";
import EditDebtModal from "./EditDebtModal.vue";
import formatMoney from "@/util/formatMoney";
import getDateString from "@/util/getDateString";
import capitalize from "@/util/capitalize";
import ICostumer from "@/interfaces/ICostumer";

const costumerDebts = computed(() => {
    const debts = props.costumerData.debts;
    debts.sort((a, b) => a.id - b.id)
    return debts
})

const props = defineProps({
    costumerData: {
        type: Object as PropType<ICostumer>,
        required: true
    }
})
</script>