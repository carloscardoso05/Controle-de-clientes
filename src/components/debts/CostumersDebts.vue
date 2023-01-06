<template>
    <div>
        <span class="flex place-content-between">
            <h2 class="text-2xl font-medium text-left ml-4">{{ props.costumerName }}</h2>
        </span>
        <div class="text-left ml-8 border-l-2 pl-1 border-gray-400 flex place-content-between"
            v-for="debt in costumerData.debts" :key="debt.id">
            <div>
                <p>{{ capitalize(debt.description) }}: {{ formatMoney(debt.price) }}</p>
                <p>{{ getDateString(debt.id) }}</p>
            </div>
            <DeleteDebtModal :debt="debt" :costumerName="props.costumerName" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useAppStore } from "@/store/index"
import { computed, defineProps } from "vue"
import ICostumer from "@/interfaces/ICostumer";
import IUser from "@/interfaces/IUser";
import DeleteDebtModal from "./DeleteDebtModal.vue";
import formatMoney from "@/util/formatMoney";
import getDateString from "@/util/getDateString";
import capitalize from "@/util/capitalize";

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