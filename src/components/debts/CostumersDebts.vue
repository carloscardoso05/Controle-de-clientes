<template>
	<div class="rounded-md max-w-3xl mx-auto space-y-6 border shadow-inner py-4">
		<div class="xs:mx-8 mx-2 mt-2 border-b border-neutral-400 flex justify-between">
			<h1 class="text-xl xs:text-2xl font-medium text-left">{{ costumerData.name }}</h1>
			<h2 class="shrink-0 max-w-fit text-right tabular-nums text-base xs:text-lg">{{
				formatMoney(costumerData.totalDebt)
			}}</h2>
		</div>

		<div class="space-y-6 text-left xs:mx-10 mx-4">
			<div class="flex place-content-between space-x-8 border-l-2 border-emerald-400 ooo" v-for="debt in costumerDebts"
				:key="debt.id">
				<div class="grow ml-4" 
				@touchstart="beingTouched = true; debtTouched = debt"
				@touchend="beingTouched = false"
				>
					<div>
						<p class="text-xs xs:text-sm font-light">{{ getDateString((debt.dateTime.toJSON() as
						any)["seconds"] * 1000) }}</p>
						<p class="text-lg xs:text-xl font-medium">{{ capitalize(debt.description) }}</p>
					</div>
					<p class="text-sm xs:text-base align-bottom tabular-nums underline decoration-solid decoration-emerald-500">
						{{ formatMoney(debt.price) }}</p>
				</div>

				<div class="shrink-0 my-auto min-w-fit">
					<EditDebtModal :debt="debt" :costumerName="costumerData.name" class="mr-3 hidden xs:inline-block" />
					<DeleteDebtModal :debt="debt" :costumerName="costumerData.name" />
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { defineProps, computed, PropType, onMounted, ref, watch } from "vue"
import DeleteDebtModal from "./DeleteDebtModal.vue";
import EditDebtModal from "./EditDebtModal.vue";
import formatMoney from "@/util/formatMoney";
import getDateString from "@/util/getDateString";
import capitalize from "@/util/capitalize";
import ICostumer from "@/interfaces/ICostumer";
import IDebt from "@/interfaces/IDebt";
import showModal from "@/util/showModal";

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

const $ = (e: string) => document.querySelector(e)

const debtTouched = ref<IDebt>()

const beingTouched = ref(false)

const timeouts = ref<any>([])

const clearTimeouts = () => {
	timeouts.value.forEach((t:any) => clearTimeout(t))
	timeouts.value = []
}

watch([beingTouched], () => {
	console.log(timeouts.value);
	
	if(beingTouched.value){
		timeouts.value.push(setTimeout(() => {
			if(beingTouched.value){

				showModal(`editDebtModal${debtTouched.value?.id}`)

				clearTimeouts()
			}
		}, 700))
	} else {
		clearTimeouts()
	}
})
</script>