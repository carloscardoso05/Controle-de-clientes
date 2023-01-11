<template>
	<AddDebtButton />

	<dialog id="addDebtModal" class="shadow-lg rounded w-full max-w-xl">
		<div>
			<form method="dialog" id="addDebtForm" class="space-y-4 text-left w-fit mx-auto">

				<fieldset>
					<label for="selectCostumerInput">
						<p>Nome do cliente</p>
						<select v-model="costumerName" v-if="costumers.length != 0" :class="inputClasses"
							id="selectCostumerInput" name="selectCostumerInput" required="true">
							<option v-for="costumer in costumers" :key="costumer" :value="costumer">
								{{ costumer }}
							</option>
						</select>
					</label>
				</fieldset>

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
						@click="$('#addDebtModal').close()">Cancelar</button>
					<button class="border-2 border-blue-500 bg-blue-500 text-white px-4 py-2 xs:px-3 xs:py-1.5 rounded"
						id="confirmBtn" value="default" @click="
						addDebt(userId, costumerName, newDebt);
						$('#addDebtModal').close();
						formReset();
						">Adicionar</button>
				</div>
			</form>
		</div>
	</dialog>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useAppStore } from "@/store/index"
import IDebt from '@/interfaces/IDebt';
import ICostumer from '@/interfaces/ICostumer';
import AddDebtButton from "./AddDebtButton.vue";
import { addDebt } from '@/firebase';

const inputClasses = 'bg-gray-200 rounded-md border-2 border-gray-300 focus:border-gray-600'

const appStore = useAppStore()
const userId = computed(() => appStore.userId)
const costumers = computed(() => appStore.allCostumersNames as ICostumer["name"][])

//Formulário
const date = ref('')
const year = computed(() => Number(date.value.substring(0, 4)));
const month = computed(() => Number(date.value.substring(5, 7)));
const day = computed(() => Number(date.value.substring(8, 10)));
const dateTime = computed(() => new Date(year.value, month.value - 1, day.value))

const costumerName = ref('')
const description = ref('')
const price = ref(NaN)

const newDebt = computed((): IDebt => {
	return {
		description: description.value,
		price: price.value,
		dateTime: dateTime.value,
		id: dateTime.value.getTime()
	}
})

function formReset() {
	date.value = ''
	costumerName.value = ''
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