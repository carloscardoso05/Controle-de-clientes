<template>
	<EditButton :modalId="modalId" />

	<dialog :id="modalId" class="shadow-lg rounded w-full max-w-xl">
		<div>
			<form method="dialog" id="editDebtForm" class="space-y-4 text-left w-fit mx-auto">

				<fieldset>
					<label for="priceInput">
						<p>Valor</p>
						<input :class="inputClasses" v-model="price" type="number" min="0.01" step="0.01"
							id="priceInput" required="true">
					</label>
				</fieldset>

				<fieldset>
					<label for="descriptionInput">
						<p>Descrição</p>
						<input :class="inputClasses" v-model="description" type="text" id="descriptionInput"
							required="true" autocapitalize="on" autocomplete="off">
					</label>
				</fieldset>

				<fieldset>
					<label for="dateInput">
						<p>Data</p>
						<input :class="inputClasses" v-model="date" type="date" id="dateInput" required="true" maxlength="10">
					</label>
				</fieldset>

				<div class="space-x-16 pt-6">
					<button class="border-2 border-red-500 px-4 py-2 xs:px-3 xs:py-1.5 rounded" value="cancel"
						@click="
						$('#editDebtModal').close();
						formReset();
						">Cancelar</button>
					<button class="border-2 border-blue-500 bg-blue-500 text-white px-4 py-2 xs:px-3 xs:py-1.5 rounded"
						id="confirmBtn" value="default" @click="
						updateDebt(userId, costumerName, props.debt, newDebt);
						$('#editDebtModal').close();
						formReset();
						">Adicionar</button>
				</div>
			</form>
		</div>
	</dialog>
</template>

<script lang="ts" setup>
import { ref, computed, defineProps, PropType } from 'vue';
import { useAppStore } from "@/store/index"
import IDebt from '@/interfaces/IDebt';
import EditButton from '../EditButton.vue';
import { updateDebt } from '@/firebase';

const inputClasses = 'bg-gray-200 rounded-md border-2 border-gray-300 focus:border-gray-600'

const modalId = computed(() => `editDebtModal${props.debt.id}`)

const props = defineProps({
    debt: {
        type : Object as PropType<IDebt>,
        required: true
    },
    costumerName: {
        type: String,
        required: true
    }
})

const appStore = useAppStore()
const userId = computed(() => appStore.userId)

//Formulário
const date = ref(new Date((props.debt.dateTime.toJSON() as any)["seconds"] * 1000).toISOString().slice(0, 10))
const year = computed(() => Number(date.value.substring(0, 4)));
const month = computed(() => Number(date.value.substring(5, 7)));
const day = computed(() => Number(date.value.substring(8, 10)));
const dateTime = computed(() => new Date(year.value, month.value - 1, day.value))

const description = ref(props.debt.description)
const price = ref(props.debt.price)

const newDebt = computed((): IDebt => {
	return {
		description: description.value,
		price: price.value,
		dateTime: dateTime.value,
		id: dateTime.value.getTime() + Date.now()
	}
})

function formReset() {
	date.value = ''
	description.value = ''
	price.value = NaN
}

const $ = (e: string): any => document.querySelector(e)
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
	-webkit-appearance: none;
	margin: 0;
}

#addDebtModal::backdrop {
	background-color: rgb(0, 0, 0, 0.25);
}

input,
select {
	width: 100%;
	outline: none;
}
</style>