<template>
	<div class="rounded-md max-w-3xl mx-auto space-y-6 border shadow-inner py-4">
		<div class="xs:mx-8 mx-2 mt-2 border-b border-neutral-400 flex justify-between">
			<h1 class="text-3xl font-medium">{{ costumerData.name }}</h1>
			<h2 class="shrink-0 max-w-fit text-right tabular-nums text-lg">{{ formatMoney(costumerData.totalDebt) }}</h2>
		</div>

		<div class="space-y-6 text-left xs:mx-10 mx-4 grid-cols-">
			<div class="flex place-content-between space-x-8 border-l-2 border-emerald-400" v-for="debt in costumerDebts" :key="debt.id">
				<div class="grow ml-4">
					<div>
						<p class="text-sm font-light">{{ getDateString((debt.dateTime.toJSON() as any)["seconds"] * 1000) }}</p>
						<p class="text-2xl font-medium">{{ capitalize(debt.description) }}</p>
					</div>
					<p class="align-bottom tabular-nums underline decoration-solid decoration-emerald-500">{{ formatMoney(debt.price) }}</p>
				</div>
				<div class="space-x-3 shrink-0 my-auto min-w-fit">
					<EditDebtModal :debt="debt" :costumerName="costumerData.name"/>
					<DeleteDebtModal :debt="debt" :costumerName="costumerData.name"/>
				</div>
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
import { inherits } from "@babel/types";

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